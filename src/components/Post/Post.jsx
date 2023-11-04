import { Link } from "react-router-dom";
import "./Post.sass";
import marking from "../marking";
import TrimText from "../trimText";


function Post({ id, title, text, member, previewImg }) {
  return (
    <div className="post">
        <Link to={`/members/${member.info.address}`} className="post-author">
          <img
            src={`https://mern-art-app.onrender.com${member.info.avatar}`}
            alt=""
            className="ava"
          />
          <p>{member.info.nameGroup}</p>
        </Link>

      <div className="post-content">
        <Link to={`/posts/${id}`}>
          <div className="image-wrapper">
            <img
              src={`https://mern-art-app.onrender.com${previewImg}`}
              alt=""
              className="image"
            />
          </div>
        </Link>
        <Link to={`/posts/${id}`}>
          <div className="post-right">
            <p className="bold">{title}</p>
            <p className="m-top">{TrimText(marking(text))}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Post;
