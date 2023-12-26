import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Grid, Card, CardContent, Container } from "@mui/material";
import { deletePost } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteUsers, fetchUsers } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Detail = () => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [users]);
  const handleDeletePost = (postId) => {
    dispatch(deletePost({ userId: id, postId }));
  };
  const { id } = useParams();
  const user = users.find((user) => user.id === id);

  return (
    <Container
      style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
    >
      <Link to="/" style={{ color: "black" }}>
        <ArrowBackIcon
          style={{ position: "absolute", top: "20px", left: "50px" }}
        />
      </Link>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        gap="10px"
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Name: {user?.username}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Surname: {user?.surname}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Email: {user?.email}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Password: {user?.password}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Bio: {user?.bio.info}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Country: {user?.bio.country}
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Grid container spacing={2}>
            {user?.posts.map((post) => (
              <Grid key={post.postId} item xs={4}>
                <Card
                  style={{
                    width: "300px",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <CardContent>
                    <img
                      src={post.imgSRC}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="h6" component="div">
                      {post.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {post.content}
                    </Typography>
                    <button
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        cursor: "pointer",
                        backgroundColor: "#A8010D",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        padding: "5px",
                      }}
                      onClick={() => handleDeletePost(post.postId)}
                    >
                      Delete post
                    </button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Detail;
