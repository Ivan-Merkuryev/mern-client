import { Link } from "react-router-dom";

function Button(to, text) {
  return (
    <div className="open">
      <Link to={to}>
        <button className="open-btn">{text}</button>
      </Link>
    </div>
  );
}

export default Button;
