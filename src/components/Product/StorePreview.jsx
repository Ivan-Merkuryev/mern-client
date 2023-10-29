import { Link } from "react-router-dom";
import './Product.sass'

function StorePreview({
  id,
  title,
  description,
  member,
  productUrl,
  price,
}) {
  return (
    <>
      <div className="carts-cart">
        <Link to={`/members/${member.address}`}>
          <div className="member-store">
            <img className="cart-avatar" src={`http://localhost:4080${member.info.avatar}`} alt="" />
            <p> {member.info.nameGroup} </p>
          </div>
        </Link>
        <Link to={`/store/${id}`} class="link">
          <div className="img">
            <img  src={`http://localhost:4080${productUrl[0]}`} alt="" className="carts-cart_img" />
          </div>
          <p className="carts-cart_title">{title}</p>
          <span className="carts-cart_text">{description}</span>
          <span className="carts-cart_span"> {price}₽</span>
        </Link>
      </div>
    </>
  );
}

export default StorePreview;
