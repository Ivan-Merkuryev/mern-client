import "./AddPost.sass";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import { selectIsAuth, selectIsMember } from "../../redux/slices/auth";
import axios from "../../axios";

function AddPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputFileRef = React.useRef(null);
  const isAuth = useSelector(selectIsAuth);

  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setPreviewImg(data.previewImg);
          setTitle(data.title);
          setText(data.text);
        })
        .catch((err) => {
          console.log(err);
          alert("Ошибка получения поста");
        });
    }
  }, []);

  const handleChangeCover = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      setPreviewImg(data.url);

      // console.log(data);
    } catch (err) {
      console.log(err);
      alert("Ошибка загрузки файла");
    }
  };

  const removePreviewImg = () => {
    setPreviewImg("");
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }
  // console.log(isAuth);

  const publishPost = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const fields = {
        previewImg,
        title,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.log(err);
      alert("Ошибка загрузки поста");
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={publishPost}>
        <h2 className="h2"> {isEditing ? "Редактировать" : "Написать"} пост</h2>
        <div className="formAdd">
          {previewImg ? (
            <div>
              <img
                className="previewImg"
                src={`https://mern-art-app.onrender.com${previewImg}`}
                alt=""
              />
              <button onClick={removePreviewImg}>Удалить изображение</button>
            </div>
          ) : (
            <button
              className="add"
              type="button"
              onClick={() => inputFileRef.current.click()}
            >
              <img src="../icons/addImage.svg" alt="" />
              <span>Добавить обложку</span>
            </button>
          )}

          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={handleChangeCover}
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
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Текст"
            ></textarea>
          </div>
        </div>
        <div className="form-btns">
          <button onClick={publishPost} type="button" className="button">
            {isEditing ? "Сохранить" : "Опубликовать"}
          </button>
          <button className="button close-btn">Отмена</button>
        </div>
      </form>
    </>
  );
}
export default AddPost;

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
// };


// const handleChangeProductUrl = async (event) => {
//   try {
//     const formData = new FormData();
//     const files = event.target.files;
//     for (let i = 0; i < files.length; i++) {
//       formData.append("images", files[i]);
//     }

//     const { data } = await axios.post("/upload", formData);

//     setImages(data.urls);
//   } catch (err) {
//     console.log(err);
//     alert("Ошибка загрузки файлов");
//   }
// };


{/* <Header />
<>
<input type="file" multiple onChange={handleChangeProductUrl} />
<Slider {...settings}>
  {images.map((image, index) => (
    <div key={index}>
      <img src={`https://mern-art-app.onrender.com${image}`} alt={`Image ${index}`} />
    </div>
  ))}
</Slider>
</>
</> */}
