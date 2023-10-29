import "../views/Basket/Basket.sass";
import { Link } from "react-router-dom";

function BasketProduct({
  id,
  productUrl,
  title,
  price,
  quantity,
  quantityInCart,
  address,
  logo,
  removeFromBasket,
  removeOneFromBasket,
  addToBasket,
  isOutOfStock,
}) {
  return (
    <div
      className="basket-product"
      key={id}
      style={isOutOfStock ? { border: "solid 1px #EB6E67" } : {}}
    >
      <Link
        to={isOutOfStock ? "" : `/store/${id}`}
        className={isOutOfStock ? "cursor" : ""}
      >
        <img
          className="basket-img"
          src={`https://mern-art-app.onrender.com${productUrl}`}
          alt=""
        />
      </Link>
      <div className="basket-group">
        <Link
          to={isOutOfStock ? "" : `/store/${id}`}
          className={isOutOfStock ? "cursor" : ""}
        >
          <h3>{title}</h3>
        </Link>
        {isOutOfStock ? <p>{price}₽</p> : <p>{price * quantityInCart}₽</p>}
      </div>

      <div className="basket-group">
        <p>Товары: ({quantityInCart})</p>

        <div className="basket-buttons">
          {isOutOfStock ? (
            <button
              className="fullpost-buttons"
              onClick={() => removeFromBasket(id)}
            >
              <img src="../icons/remove.svg" alt="" />
            </button>
          ) : (
            <>
              {quantity === 1 ? (
                <>
                  <span>{quantityInCart}</span>
                  <button
                    className="fullpost-buttons"
                    onClick={() => removeFromBasket(id)}
                  >
                    <img src="../icons/remove.svg" alt="" />
                  </button>{" "}
                </>
              ) : (
                <>
                  <button
                    className="fullpost-buttons"
                    onClick={() => removeOneFromBasket(id)}
                    disabled={quantityInCart === 1}
                    style={{
                      cursor: quantityInCart <= 1 ? "default" : "pointer",
                    }}
                  >
                    <img
                      src="../icons/minus.svg"
                      style={{ opacity: quantityInCart === 1 ? 0.5 : 1 }}
                    />
                  </button>
                  <span>{quantityInCart}</span>
                  <button
                    className="fullpost-buttons"
                    onClick={() => addToBasket(id)}
                    disabled={quantityInCart >= quantity}
                    style={{
                      cursor:
                        quantityInCart >= quantity ? "default" : "pointer",
                    }}
                  >
                    <img
                      src="../icons/addProduct.svg"
                      style={{
                        opacity: quantityInCart >= quantity ? 0.5 : 1,
                      }}
                    />
                  </button>
                  <button
                    className="fullpost-buttons"
                    onClick={() => removeFromBasket(id)}
                  >
                    <img src="../icons/remove.svg" alt="" />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Link to={`/members/${address.address}`}>
        <img
          className="basket-logo"
          src={`https://mern-art-app.onrender.com${logo.avatar}`}
          alt=""
        />
      </Link>
    </div>
  );
}

export default BasketProduct;
