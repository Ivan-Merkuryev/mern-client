import "./FullProduct.sass";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "../../axios";
import Header from "../../components/Header/Header";
import Author from "../../components/Author";
import { fetchRemoveProduct } from "../../redux/slices/products";

function FullProduct() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInfoLoading, setInfoLoading] = useState(true);
  const [products, setProducts] = useState();
  const [itemInCart, setItemInCart] = useState();
  const [productValues, setProductValues] = useState();
  const [price, setPrice] = useState();

  const userData = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(userData)
  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при открытии товара");
      });
  }, []);

  console.log(data);
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

  const getArrProductsId = async () => {
    try {
      const data = await axios.get("/basket");
      // setInfoLoading(false);
      setProducts(data.data);
    } catch (err) {
      alert("Ошибка получения данных о корзине");
      console.log(err);
    }
  };

  // console.log(productValues)
  useEffect(() => {
    getArrProductsId();
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      products.forEach((el) => {
        if (el.product._id === id) {
          setItemInCart(true);
          setInfoLoading(false);
          setProductValues(el);
          setPrice(el.product.price * el.quantity);
        }
      });
    }
  }, [products]);

  // if(products) {
  //   return <p>Загрузка</p>
  // }

  // if (setInfoLoading && setLoading && productValues) {
  //   console.log(productValues.quantity);
  // }

  const addToBasket = async () => {
    try {
      await axios.post(`/addToBasket/${id}`);
      getArrProductsId();
    } catch (err) {
      console.log(err);
      alert("Не удалось добавить товар в корзину");
    }
  };

  const addOneToBasket = async () => {
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

  // const removeOneFromBasket = async () => {
  //   try {
  //     await axios.post(`/removeOneFromBasket/${id}`);
  //     getArrProductsId();
  //   } catch (err) {
  //     console.log(err);
  //     alert("Не удалось уменьшить количество товара");
  //   }
  // };

  const removeFromBasket = async () => {
    try {
      await axios.post(`/removeFromBasket/${id}`);
      getArrProductsId();
      setItemInCart(false);
    } catch (err) {
      console.log(err);
      alert("Не удалось удалить товар из корзины");
    }
  };

  // const addToBasket = async (id) => {
  //   try {
  //     const updatedProducts = products.map((el) => {
  //       if (el.product._id === id && el.quantity < el.product.quantity) {
  //         return { ...el, quantity: el.quantity + 1 };
  //       }
  //       return el;
  //     });
  //     setProducts(updatedProducts);
  //     await axios.post(`/addToBasket/${id}`);
  //   } catch (err) {
  //     console.log(err);
  //     alert("Не удалось добавить товар в корзину");
  //   }
  // };

  const removeOneFromBasket = async () => {
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

  if (isLoading) {
    return <p>Загрузка</p>;
  }
  
  if (data.quantity <= 0) {
    return <Navigate to="/store" />;
  }
  /////Удалить товар
  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить товар?")) {
      dispatch(fetchRemoveProduct(id));
      navigate("/");
    }
  };

  // console.log(productValues.quantity);
  // console.log(isInfoLoading)
  const carousel = () => {
    return (
      <div>
        <div className="main-image">
          <img
            className="big-image"
            src={`http://localhost:4080${data.productUrl[selectedImageIndex]}`}
            alt=""
          />
        </div>

        <div className="product-slider">
          {data.productUrl.map((image, index) => (
            <div
              onClick={() => setSelectedImageIndex(index)}
              className="small-image"
              key={index}
            >
              <img
                className="slider-img"
                src={`http://localhost:4080${image}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <Header />
      <h2>Товар {data.title}</h2>

      <Author
        name={data.member.info.nameGroup}
        logo={data.member.info.avatar}
        address={data.member.address}
      />
      <div className="product">
        {carousel()}
        <div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          {/* {productValues.quantity ? <p>Загрузка</p> : <p>{data.price * productValues.quantity}₽</p>} */}
          {/* <p>{setInfoLoading && setLoading && productValues ? `${data.price * productValues.quantity}` : `${data.price}`}</p> */}
          {setInfoLoading && setLoading && productValues && itemInCart ? (
            <p>{price}₽</p>
          ) : (
            <p>{data.price}₽</p>
          )}
          <div>
            {/* {data.member ? <p>{data.member._id}</p> : <p>Нет автора</p>} */}
            {userData._id === data.member._id ? (
              <div>
                <Link to={`/product/${id}/edit`}>
                  <button className="fullpost-buttons">
                    <img src="../icons/edit.svg" />
                  </button>
                </Link>

                <button onClick={onClickRemove} className="fullpost-buttons">
                  <img src="../icons/remove.svg" />
                </button>
              </div>
            ) : null}
            {data.quantity === 1 ? (
              <>
                {itemInCart ? (
                  <>
                    <Link to="/basket">
                      <button className="button">Перейти</button>
                    </Link>
                    <button
                      onClick={removeFromBasket}
                      className="button close-btn"
                    >
                      Удалить
                    </button>
                  </>
                ) : (
                  <button onClick={addToBasket} className="button">
                    Добавить в корзину
                  </button>
                )}
              </>
            ) : (
              <>
                {itemInCart ? (
                  <div className="addToBasket">
                    <Link to="/basket">
                      <button className="button">В корзине</button>
                    </Link>
                    <div className="basket-buttons">
                      <button
                        className="fullpost-buttons"
                        onClick={() => removeOneFromBasket()}
                        disabled={productValues.quantity === 1}
                        style={{
                          cursor:
                            productValues.quantity <= 1 ? "default" : "pointer",
                        }}
                      >
                        <img
                          src="../icons/minus.svg"
                          style={{
                            opacity: productValues.quantity === 1 ? 0.5 : 1,
                          }}
                        />
                      </button>
                      <span>{productValues.quantity}</span>
                      <button
                        className="fullpost-buttons"
                        onClick={() => addOneToBasket()}
                        disabled={
                          productValues.quantity >=
                          productValues.product.quantity
                        }
                        style={{
                          cursor:
                            productValues.quantity >=
                            productValues.product.quantity
                              ? "default"
                              : "pointer",
                        }}
                      >
                        <img
                          src="../icons/addProduct.svg"
                          style={{
                            opacity:
                              productValues.quantity >=
                              productValues.product.quantity
                                ? 0.5
                                : 1,
                          }}
                        />
                      </button>
                      <button
                        className="fullpost-buttons"
                        onClick={() => removeFromBasket()}
                      >
                        <img src="../icons/remove.svg" alt="" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={addToBasket} className="button">
                    Добавить в корзину
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default FullProduct;
