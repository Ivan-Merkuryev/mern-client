import { Link } from "react-router-dom";

function Author({name, logo, address}) {
  return (
    <Link to={`/members/${address}`}>
      <div className="author">
        <img src={`http://localhost:4080${logo}`} alt="" className="logo" />
        <p>{name}</p>
      </div>
    </Link>
  );
}

export default Author