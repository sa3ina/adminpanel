import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import "../App.css";
import { Outlet } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupIcon from "@mui/icons-material/Group";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItem from "@mui/material/ListItem";
import AppBar from "@mui/material/AppBar";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { addUser } from "../redux/slices/userSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteUsers, fetchUsers } from "../redux/slices/userSlice";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function AddUser() {
  const dispatch = useDispatch();
  const [searchh, setSearchh] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [open, setOpen] = React.useState(true);
  const [username, setUsername] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [id, setId] = useState<string>("");

  const handleAddUser = (e) => {
    e.preventDefault();
    const userObj = {
      bio: {
        info: info,
        country: country,
      },
      username: username,
      surname: surname,
      email: email,
      password: password,
      id: id,
      isPublic: true,
      follower: [],
      following: [],
      posts: [],
      blockList: [],
      stories: [],
      notifications: [],
    };

    dispatch(addUser(userObj));
    setUsername("");
    setSurname("");
    setEmail("");
    setPassword("");
    setInfo("");
    setCountry("");
    setId("");
  };
  const drawerWidth: number = 240;

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      backgroundColor: "white",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const defaultTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppBar sx={{ backgroundColor: "white", boxShadow: 0 }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="white"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Admin Panel{" "}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer className="drawer" variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            ></Toolbar>
            <Divider />
            <List component="nav">
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    backgroundColor: "#134074",
                    borderRadius: "7px",
                    width: "100%",
                    paddingLeft: "10px",
                  }}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                      display: "flex",
                    }}
                    to="/"
                  >
                    <GroupIcon style={{ marginRight: "10px" }} />
                    Users{" "}
                  </Link>
                </Typography>
              </ListItem>{" "}
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    backgroundColor: "#134074",
                    borderRadius: "7px",
                    width: "100%",
                    paddingLeft: "10px",
                  }}
                >
                  <Link
                    to="/adduser"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      display: "flex",
                    }}
                  >
                    <PersonAddAlt1Icon style={{ marginRight: "10px" }} />
                    Add User{" "}
                  </Link>
                </Typography>
              </ListItem>{" "}
              <ListItem>
                <Typography
                  variant="subtitle1"
                  sx={{
                    backgroundColor: "#134074",
                    borderRadius: "7px",
                    width: "100%",
                    paddingLeft: "10px",
                  }}
                >
                  <Link
                    to="/notification"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      display: "flex",
                    }}
                  >
                    <NotificationsNoneIcon style={{ marginRight: "10px" }} />
                    Notification{" "}
                  </Link>
                </Typography>
              </ListItem>{" "}
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: "#EAF4F4",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid>
                    <form action="" onSubmit={handleAddUser}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "20px",
                          padding: "20px",
                        }}
                      >
                        <input
                          type="text"
                          value={username}
                          style={{
                            height: "30px",
                            fontSize: "18px",
                            color: "black",
                            width: "500px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                          }}
                          placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                          type="text"
                          value={surname}
                          style={{
                            height: "30px",
                            fontSize: "18px",
                            color: "black",
                            width: "500px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                          }}
                          placeholder="Surname"
                          onChange={(e) => setSurname(e.target.value)}
                        />
                        <input
                          type="text"
                          value={email}
                          style={{
                            height: "35px",
                            fontSize: "18px",
                            color: "black",
                            width: "500px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                          }}
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                          type="text"
                          value={password}
                          style={{
                            height: "30px",
                            fontSize: "18px",
                            color: "black",
                            width: "500px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                          }}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                          type="text"
                          value={info}
                          style={{
                            height: "35px",
                            fontSize: "18px",
                            color: "black",
                            width: "500px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                          }}
                          placeholder="Info"
                          onChange={(e) => setInfo(e.target.value)}
                        />
                        <input
                          type="text"
                          value={country}
                          style={{
                            height: "35px",
                            fontSize: "18px",
                            color: "black",
                            width: "500px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                          }}
                          placeholder="Country"
                          onChange={(e) => setCountry(e.target.value)}
                        />{" "}
                        <input
                          type="number"
                          value={id}
                          style={{
                            height: "35px",
                            fontSize: "18px",
                            color: "black",
                            width: "500px",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                          }}
                          placeholder="Id"
                          onChange={(e) => setId(e.target.value)}
                        />
                        <button
                          style={{
                            backgroundColor: "#134074",
                            color: "white",
                            padding: "7px 20px",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "3px",
                            fontSize: "18px",
                          }}
                          type="submit"
                        >
                          Add User
                        </button>
                      </div>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
