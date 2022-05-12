import React, { useEffect, useState } from "react";
import { Container, Grid, TextField, Button, Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { async } from "@firebase/util";
import { Loader } from "./Loader";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

export const Chat = () => {
  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      const data = await getDocs(collection(db, "messages"));
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort(function(a,b){      
        return a.createAt - b.createAt;
      }));
    };
    // messages.sort(function(a,b){      
    //   return a.createAt - b.createAt;
    // })
    

    getMessages();
    
  }, [value]);

  // getMessages()
  //  const data =  getDocs(collection(db,"messages"))
  // console.log(data)
  // const res = data.docs.map((doc)=>({...doc.data(), id: doc.id}))
  // const [messages, loading] = useCollectionData (
  //   data.docs)

  // console.log(messages)

  //  if(loading){
  //     return <Loader/>
  //   }

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createAt: serverTimestamp(),
    });
    setValue("");
    
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, marginTop: "20px" }}
        justifyContent={"center"}
      >
        <div
          style={{
            width: "80%",
            height: "70vh",
            border: "1px solid gray",
            overflowY: "auto",
          }}
        >
          {messages.map((message) => (
            <div
            
            key={message.id}
              style={{
                margin: 10,
                border:
                  user.uid === message.uid
                    ? "2px solid green"
                    : "2px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                width: "fit-content",
                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL}></Avatar>
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            variant="outlined"
            fullWidth
            maxRows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></TextField>
          <Button variant="outlined" onClick={sendMessage}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
