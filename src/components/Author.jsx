import { Link } from "react-router-dom";

function Author({ name, logo, address }) {
  return (
    <div style={{display: 'flex', alignContent: 'flex-start'}}>
      <Link to={`/members/${address}`} className="author">
        <img src={`https://mern-art-app.onrender.com${logo}`} alt="" className="logo" />
        <p>{name}</p>
      </Link>
    </div>
  );
}

export default Author;
