import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/const";
import {useAuthState} from "react-firebase-hooks/auth"
import { Context } from "../index";
import { useContext } from "react";

export const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth)
  return (
    <AppBar color="success" position="static">
      <Toolbar >
        <Grid container justifyContent={"flex-end"}>
          {user ? 
            <Button onClick={()=>auth.signOut()} variant="outline">Exit</Button>
           : 
            <NavLink to={LOGIN_ROUTE}>
              <Button variant="outline">Login</Button>
            </NavLink>
          }
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
