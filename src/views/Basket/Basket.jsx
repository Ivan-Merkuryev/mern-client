import "./Basket.sass";
import moment from "moment";
import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import BasketProduct from "../../components/BasketProduct";
import Header from "../../components/Header/Header";
import axios from "../../axios";
import Modal from "../../components/Modal/Modal";
import { selectIsAuth } from "../../redux/slices/auth";
import Loader from "../../components/Loader";

function Basket() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [emptyBasket, setEmptyBasket] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orLoading, setOrLoading] = useState(true);
  const [basketLoading, setBasketLoading] = useState(true);
  const [noGoods, setNoGoods] = useState(false);
  //Modal
  const [modalActive, setModalActive] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  const isAuth = useSelector(selectIsAuth);

  const getArrProducts = async () => {
    try {
      const data = await axios.get("/basket");
      setProducts(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert("Не удалось получить корзину");
    }
  };

  // console.log(products)

  React.useEffect(() => {
    getArrProducts();
  }, []);

  const getArrOrders = async () => {
    try {
      const data = await axios.get("/orders");
      setOrders(data.data);
      setOrLoading(false);
    } catch (err) {
      console.log(err);
      alert("Не удалось получить заказы");
    }
  };

  React.useEffect(() => {
    getArrOrders();
  }, [products]);

  //Пустая ли корзина
  React.useEffect(() => {
    if (!isLoading) {
      const arr = [];
      let sum;
      if (products.length !== 0 && products.length !== undefined) {
        products.forEach((e) => arr.push(e.product.quantity));
        sum = arr.reduce((a, b) => a + b);
      }
      if (
        (!isLoading && products.message === "В корзине нет товаров") ||
        products.length === 0
      ) {
        setEmptyBasket(true);
        setBasketLoading(false);
      } else if (sum === 0) {
        setNoGoods(true);
        setEmptyBasket(false);
        setBasketLoading(false);
      } else {
        setEmptyBasket(false);
        setBasketLoading(false);
      }
    }
  }, [products]);

  ////Проверка не купил-ли кто-то товар
  React.useEffect(() => {
    if (products && products.length > 0) {
      products.map((el) => {
        if (el.quantity > el.product.quantity) {
          el.quantity = el.product.quantity;
        }
      });
    }
  }, [products]);

  React.useEffect(() => {
    if (products && products.length > 0) {
      const arrSum = [];
      products.map((el) => {
        arrSum.push(el.quantity);
      });
      if (arrSum.length !== 0) {
        const sum = arrSum.reduce((a, b) => a + b);
        setQuantity(sum);
      }
    }
  }, [products]);

  React.useEffect(() => {
    if (products && products.length > 0) {
      const arrSum = [];
      products.map((el) => {
        const totalPrice = el.product.price * el.quantity;
        arrSum.push(totalPrice);
      });
      if (arrSum.length !== 0) {
        const sum = arrSum.reduce((a, b) => a + b);
        setPrice(sum);
      }
    }
  }, [products]);

  const addToBasket = async (id) => {
    try {
      const updatedProducts = products.map((el) => {
        if (el.product._id === id && el.quantity < el.product.quantity) {
          return { ...el, quantity: el.quantity + 1 };
        }
        return el;
      });
      setProducts(updatedProducts);
      await axios.post(`/addToBasket/${id}`);
    } catch (err) {
      console.log(err);
      alert("Не удалось добавить товар в корзину");
    }
  };

  const removeFromBasket = async (id) => {
    try {
      const updatedProducts = products.filter((el) => el.product._id !== id);
      setProducts(updatedProducts);
      await axios.post(`/removeFromBasket/${id}`);
    } catch (err) {
      console.log(err);
      alert("Не удалось удалить товар из корзины");
    }
  };

  const removeOneFromBasket = async (id) => {
    try {
      const updatedProducts = products.map((el) => {
        if (el.product._id === id && el.quantity > 1) {
          return { ...el, quantity: el.quantity - 1 };
        }
        return el;
      });
      setProducts(updatedProducts);
      await axios.post(`/removeOneFromBasket/${id}`);
    } catch (err) {
      console.log(err);
      alert("Не удалось уменьшить количество товара");
    }
  };

  const order = async () => {
    try {
      await axios.post("clearBasketAndAddToOrders");
      setModalActive(true);
      setModalTitle("Успешно");
      setModalText("Спасибо за заказ!");
      getArrProducts();
      setEmptyBasket(true);
    } catch (err) {
      console.log(err);
      setModalActive(true);
      setModalTitle("Ошибка!");
      setModalText("Не удалось заказать");
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  const ordersList = () => {
    return (
      <div className="orders">
        <div>
          {orders.length > 0 ? <h3 className="h-orders">Заказы</h3> : null}
          {orders.map((el) => (
            <div className="order-cart">
              <div className="order-info">
                <p>Итоговая цена: {el.totalPrice}₽</p>

                <p>Дата заказа: {moment(el.date).format("DD. MM. YY.")}</p>
              </div>

              {el.products.map((product) => (
                <div className="basket-product order-product">
                  <Link
                    to={
                      product.product.quantity === 0
                        ? ""
                        : `/store/${product.product._id}`
                    }
                    className={product.product.quantity === 0 ? "cursor" : ""}
                  >
                    <img
                      className="basket-img"
                      src={`https://mern-art-app.onrender.com${product.product.productUrl[0]}`}
                      alt=""
                    />
                  </Link>
                  <Link
                    to={
                      product.product.quantity === 0
                        ? ""
                        : `/store/${product.product._id}`
                    }
                    className={product.product.quantity === 0 ? "cursor" : ""}
                  >
                    <h3>{product.product.title}</h3>
                  </Link>
                  <p>{product.quantity}</p>
                  <p>{product.product.price * product.quantity}₽</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  let outOfStockProducts;
  if (!emptyBasket) {
    outOfStockProducts = products.filter((el) => el.product.quantity === 0);
  }

  if (isLoading || basketLoading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  if (emptyBasket) {
    return (
      <>
        <Header />
        <h2 className="h2-page">Корзина</h2>
        <div className="grid">
          {ordersList()}
          <div className="basket-board">
            <h3 className="title-basket">Ваша корзина пуста</h3>
            <Link to="/store">
              <button className="button">В магазин</button>
            </Link>
          </div>
        </div>
        <Modal
          active={modalActive}
          setActive={setModalActive}
          title={modalTitle}
          text={modalText}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <h2 className="h2-page">Корзина</h2>
      {isLoading ? (
        <p>Загрузка</p>
      ) : (
        <div className="grid">
          <div className="basket-list">
            {emptyBasket ? null : (
              <>
                {products.map((el) => {
                  if (el.product.quantity !== 0) {
                    return (
                      <BasketProduct
                        id={el.product._id}
                        productUrl={el.product.productUrl[0]}
                        title={el.product.title}
                        price={el.product.price}
                        quantity={el.product.quantity}
                        quantityInCart={el.quantity}
                        address={el.product.member.info}
                        logo={el.product.member.info}
                        removeFromBasket={removeFromBasket}
                        removeOneFromBasket={removeOneFromBasket}
                        addToBasket={addToBasket}
                      />
                    );
                  }
                  return null;
                })}

                {outOfStockProducts.length > 0 && (
                  <>
                    <p>Товара нет в наличии:</p>
                    {outOfStockProducts.map((el) => (
                      <BasketProduct
                        key={el.product._id}
                        id={el.product._id}
                        productUrl={el.product.productUrl[0]}
                        title={el.product.title}
                        price={el.product.price}
                        quantity={el.product.quantity}
                        quantityInCart={el.quantity}
                        address={el.product.member.info}
                        logo={el.product.member.info}
                        removeFromBasket={removeFromBasket}
                        removeOneFromBasket={removeOneFromBasket}
                        addToBasket={addToBasket}
                        isOutOfStock
                      />
                    ))}
                  </>
                )}
                {/* <button onClick={showOrders} className="button">Показать все</button> */}
                {ordersList()}
              </>
            )}
          </div>
          <div className="basket-board">
            <h3 className="title-basket">
              Ваша корзина {noGoods ? "пуста" : ""}
            </h3>
            {!noGoods ? (
              <>
                <p>Товары: ({quantity})</p>
                <p>Цена: {price}₽</p>
              </>
            ) : null}
            <Link to={noGoods ? "/store" : ""}>
              <button onClick={!noGoods ? order : null} className="button">
                {noGoods ? "В магазин" : "Оплатить"}
              </button>
            </Link>
          </div>
        </div>
      )}
      <Modal
        active={modalActive}
        setActive={setModalActive}
        title={modalTitle}
        text={modalText}
      />
    </>
  );
}
export default Basket;
