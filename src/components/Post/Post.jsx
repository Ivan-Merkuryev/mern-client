import { Link } from "react-router-dom";
import "./Post.sass";
// import TrimText from "../trimText";

function Post({ id, title, text, member, previewImg }) {
  console.log(member);
  return (
    <div className="post">
      <div className="post-left">
        <Link to={`/members/${member.info.address}`}>
          <div className="post-left_title">
            <img
              src={`https://mern-art-app.onrender.com${member.info.avatar}`}
              alt=""
              className="ava"
            />
            <p>{member.info.nameGroup}</p>
          </div>
        </Link>
        <Link to={`/posts/${id}`}>
          <div className="image-wrapper">
            <img
              src={`https://mern-art-app.onrender.com${previewImg}`}
              alt=""
              className="image"
            />
          </div>
        </Link>
      </div>
      <Link to={`/posts/${id}`}>
        <div className="post-right">
          <p className="title">{title}</p>
          {/* <p className="text">{TrimText(text)}</p> */}
          <p className="text">{text}</p>
        </div>
      </Link>
    </div>
  );
}

export default Post;
