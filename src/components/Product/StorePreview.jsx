import { Link } from "react-router-dom";
import "./Product.sass";
import TrimText from "../trimText";

function StorePreview({ id, title, description, member, productUrl, price }) {
  return (
    <>
      <div className="carts-cart">
        <div style={{ display: "flex", alignContent: "flex-start" }}>
          <Link to={`/members/${member.address}`} className="min-avatar">
            <img
              className="ava"
              src={`https://mern-art-app.onrender.com${member.info.avatar}`}
              alt=""
            />
            <p> {member.info.nameGroup} </p>
          </Link>
        </div>
        <Link to={`/store/${id}`}>
          <div className="img">
            <img
              src={`https://mern-art-app.onrender.com${productUrl[0]}`}
              alt=""
              className="carts-cart_img"
            />
          </div>
          <p className="carts-cart_title">{title}</p>
          <span className="carts-cart_text"> {TrimText(description)}</span>
          <span className="carts-cart_span"> {price}₽</span>
        </Link>
      </div>
    </>
  );
}

export default StorePreview;
