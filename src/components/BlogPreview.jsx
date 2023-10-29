import { Link } from "react-router-dom";
import { useEffect } from "react";
import TrimText from "./trimText";

function BlogPreview({ id, title, text, previewImg, member, address }) {
 
  return (
    <>
      <div className="posts-post">
        <Link to={`/members/${member.address}`}>
          <div className="posts-post_title">
            <img className="ava" src={`http://localhost:4080${member.info.avatar}`} alt="" />
            <p> {member.info.nameGroup} </p>
          </div>
        </Link>
        <Link to={`/posts/${id}`}>
          <div className="posts-post_img">
            <img  src={`http://localhost:4080${previewImg}`} alt="" className="img" />
            <p> {title} </p>
          </div>
          <p className="posts-post_text">  {TrimText(text)} </p>
        </Link>
      </div>
    </>
  );
}

export default BlogPreview;
