import "../views/Basket/Basket.sass";
import { Link } from "react-router-dom";
import { IconButton, Typography, Paper } from '@mui/material';
import { Remove, Add, RemoveCircleOutline } from '@mui/icons-material';
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
    <Paper className="basket-product" key={id} sx={isOutOfStock ? { border: "solid 1px #EB6E67" } : {}}>
    <Link component={isOutOfStock ? 'div' : 'button'} to={isOutOfStock ? "" : `/store/${id}`} className={isOutOfStock ? "cursor" : ""}>
      <img className="basket-img" src={`https://mern-art-app.onrender.com${productUrl}`} alt="" />
    </Link>
    <div className="basket-group">
      <Link component={isOutOfStock ? 'div' : 'button'} to={isOutOfStock ? "" : `/store/${id}`} className={isOutOfStock ? "cursor" : ""}>
        <Typography variant="h6">{title}</Typography>
      </Link>
      <Typography variant="body1">
        {isOutOfStock ? `${price}₽` : `${price * quantityInCart}₽`}
      </Typography>
    </div>
    <div className="basket-group">
      <Typography variant="body1">Товары: ({quantityInCart})</Typography>
      <div className="basket-buttons">
        {isOutOfStock ? (
          <IconButton onClick={() => removeFromBasket(id)}>
            <RemoveCircleOutline />
          </IconButton>
        ) : (
          <>
            {quantity === 1 ? (
              <>
                <Typography>{quantityInCart}</Typography>
                <IconButton onClick={() => removeFromBasket(id)}>
                  <Remove />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => removeOneFromBasket(id)} disabled={quantityInCart === 1} style={{ cursor: quantityInCart <= 1 ? "default" : "pointer" }}>
                  <Remove />
                </IconButton>
                <Typography>{quantityInCart}</Typography>
                <IconButton onClick={() => addToBasket(id)} disabled={quantityInCart >= quantity} style={{ cursor: quantityInCart >= quantity ? "default" : "pointer" }}>
                  <Add />
                </IconButton>
                <IconButton onClick={() => removeFromBasket(id)}>
                  <RemoveCircleOutline />
                </IconButton>
              </>
            )}
          </>
        )}
      </div>
    </div>
    <Link to={`/members/${address.address}`}>
      <img className="basket-logo" src={`https://mern-art-app.onrender.com${logo.avatar}`} alt="" />
    </Link>
  </Paper>
  );
}

export default BasketProduct;
