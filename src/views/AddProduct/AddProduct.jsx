import "../addPost/AddPost.sass";
import React, { useState } from "react";
import Slider from "react-slick";
import "./AddProduct.sass";

import Header from "../../components/Header/Header";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../axios";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [productUrl, setProductUrl] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState();
  const [color, setColor] = useState();

  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);

  const inputFileRef = React.useRef(null);

  const handleChangeProductUrl = async (event) => {
    try {
      const formData = new FormData();
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/uploadArr", formData);

      setProductUrl(data.urls);
    } catch (err) {
      console.log(err);
      alert("Ошибка загрузки файла");
    }
  };

  const removeProductUrl = () => {
    setProductUrl("");
  };

  const publishProduct = async (event) => {
    event.preventDefault();
    try {
      const fields = {
        title,
        productUrl,
        description,
        price,
        quantity,
        color
      };
      const { data } = await axios.post("/products", fields);

      const id = data._id;
      navigate(`/store/${id}`);
    } catch (err) {
      console.log(err);
      alert("Не удалось опубликовать товар");
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  // console.log(productUrl);

  return (
    <>
      <Header />
      <h2 className="h2">Добавить товар</h2>
      <div className="formAdd">
        {productUrl.length !== 0 ? (
          <div className="slider">
            {productUrl.map((image) => (
              <div className="product-img" key={image}>
                <img
                  className="slider-img"
                  src={`https://mern-art-app.onrender.com${image}`}
                />
              </div>
            ))}
            {/* <button onClick={removeProductUrl}>Удалить изображение</button> */}
          </div>
        ) : (
          <button
            className="add"
            type="button"
            onClick={() => inputFileRef.current.click()}
          >
            <img src="../icons/addImage.svg" alt="" />
            <span>Добавьте от 1 до 4 изображений</span>
          </button>
        )}

        <input
          type="file"
          multiple
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleChangeProductUrl}
        />

        <div>
          <input
            className="add-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название"
          />
          <textarea
            className="add-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
          ></textarea>
          <input
            type="number"
            className="add-price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Цена"
          />
          <input
            type="number"
            className="add-price"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Количество"
          />
          <input
            type="number"
            className="add-price"
            onChange={(e) => setColor(e.target.value)}
            placeholder="Цвет"
          />
          <span style={{ fontSize: "22px" }}>₽</span>
        </div>
      </div>
      <div className="form-btns">
        <button onClick={publishProduct} type="button" className="button">
          Опубликовать
        </button>
        <button className="button close-btn">Отмена</button>
      </div>
    </>
  );
}

export default AddProduct;
