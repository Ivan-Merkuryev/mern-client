import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/posts";

import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import "./Blog.sass";

import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Blog() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const postsStatus = posts.status;

  return (
    <>
      <Header />
      <h2 className="h2-page">Блог</h2>
      <div className="posts">
        {postsStatus !== "loaded" ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <>
                <Card sx={{ width: 520, borderRadius: "16px" }}>
                  <CardContent
                    sx={{
                      padding: 0,
                      m: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      sx={{ width: 60, height: 60, mr: 1.5 }}
                    />
                    <Skeleton variant="text" width={190} height={30} />
                  </CardContent>
                  <CardContent
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "2%",
                      paddingTop: 0,
                      paddingBottom: "24px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: 245,
                        height: 150,
                        pt: 0,
                        pb: 0,
                        borderRadius: "12px",
                      }}
                    />
                  </CardContent>
                </Card>
              </>
            ))}
          </>
        ) : (
          <>
            {posts.items.map((obj, index) => (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                text={obj.text}
                member={obj.member}
                previewImg={obj.previewImg}
              />
            ))}
          </>
        )}
      </div>
      <div className="posts">
        {Array.from({ length: 4 }).map((_, index) => (
          <>
            <Card sx={{ width: 520, borderRadius: "16px" }}>
              <CardContent
                sx={{
                  padding: 0,
                  m: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Skeleton
                  variant="circular"
                  sx={{ width: 60, height: 60, mr: 1.5 }}
                />
                <Skeleton variant="text" width={190} height={30} />
              </CardContent>
              <CardContent
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2%",
                  paddingTop: 0,
                  // paddingBottom: "24px",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: 245,
                    height: 150,
                    pt: 0,
                    pb: 0,
                    borderRadius: "12px",
                  }}
                />
              </CardContent>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
export default Blog;
