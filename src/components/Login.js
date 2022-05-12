import { Box, Container, Grid, Button } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../index";
import { signInWithPopup } from "firebase/auth";

export const Login = () => {
  const { auth, provider } = useContext(Context);

  const login = async () => {
    const { user } = await signInWithPopup(auth, provider);
  };
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justifyContent="center"
      >
        <Grid
          style={{ width: 400, background: "lightgray" }}
          container
          alignItems={"center"}
          direction={"column"}
        >
          <Box p={5}>
            <Button onClick={login} variant={"outline"}>
              Enter with Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
