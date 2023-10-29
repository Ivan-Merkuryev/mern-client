import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/posts";

import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import "./Blog.sass";

function Blog() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);

  React.useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <>
    <Header/>
      <h1>Блог</h1>
      <div className="list">
        {posts.items.map((obj, index) => (
          <Post
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
