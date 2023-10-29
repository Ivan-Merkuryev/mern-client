import { Link } from "react-router-dom";

function Author({name, logo, address}) {
  return (
    <Link to={`/members/${address}`}>
      <div className="author">
        <img src={`https://mern-art-app.onrender.com${logo}`} alt="" className="logo" />
        <p>{name}</p>
      </div>
    </Link>
  );
}

export default Author
