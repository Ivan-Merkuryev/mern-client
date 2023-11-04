import { Link } from "react-router-dom";
import { useEffect } from "react";
import TrimText from "./trimText";
import marking from "./marking";

function BlogPreview({ id, title, text, previewImg, member, address }) {
  return (
    <>
      <div className="posts-post">
        <div style={{ display: "flex", alignContent: "flex-start" }}>
          <Link to={`/members/${member.address}`} className="min-avatar">
            <img
              className="ava"
              src={`http://localhost:4080${member.info.avatar}`}
              alt=""
            />
            <p> {member.info.nameGroup} </p>
          </Link>
        </div>

        <Link to={`/posts/${id}`}>
          <div className="posts-post_img">
            <img
              src={`http://localhost:4080${previewImg}`}
              alt=""
              className="img"
            />
            <p> {title} </p>
          </div>
          {/* <p className="posts-post_text">  {TrimText(text)} </p> */}
          <p className="posts-post_text"> {TrimText(marking(text))} </p>
        </Link>
      </div>
    </>
  );
}

export default BlogPreview;
