import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/posts";

import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader";
import "./Blog.sass";

function Blog() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (posts.status === "loading") {
    return (
      <>
        <Header />
        <Loader err={posts.status === "error"} />
      </>
    );
  }

  return (
    <>
      <Header />
      <h2 className="h2-page">Блог</h2>
      <div className="blog-list">
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
      </div>
    </>
  );
}
export default Blog;
