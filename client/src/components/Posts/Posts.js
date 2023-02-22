import React from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.loading);
  // const postsData = posts.data;
  // const allPost = postsData.post;
  // console.log("posts:::", posts);
  const classes = useStyles();

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   helloHandeler();
  // }, []);

  // const helloHandeler = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // };

  // if (loading) {
  //   return <CircularProgress />;
  // }

  // return !posts.length ? (
  //   <CircularProgress />
  // ) : (
  //   <Grid
  //     className={classes.container}
  //     container
  //     alignItems="stretch"
  //     spacing={3}>
  //     {posts.map((post) => (
  //       <Grid key={post._id} item xs={12} sm={6} md={6}>
  //         <Post post={post} setCurrentId={setCurrentId} />
  //       </Grid>
  //     ))}
  //   </Grid>
  // );
  return (
    <div>
      {/* {loading && <CircularProgress />}
      {!posts.length ? (
        <Typography variant="h3">No Post Availabe</Typography>
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )} */}
      {loading ? (
        <CircularProgress />
      ) : !posts.length ? (
        <Typography variant="h3">No Post Availabe</Typography>
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Posts;
