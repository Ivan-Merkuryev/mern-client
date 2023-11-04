import "./CreateProfile.sass";
import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";

import axios from "../../axios";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
function EditProfile() {
  const { addressMember } = useParams();

  const inputAvatar = useRef(null);
  const background = useRef(null);
  const slider = useRef(null);
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);
  const isEditing = Boolean(addressMember);

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [info, setInfo] = useState("");
  const [sliderImg, setSliderImg] = useState("");

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      setAvatar(data.url);

      // console.log(event);
    } catch (err) {
      alert("Ошибка загрузки файла");
    }
  };

  const handleChangeBackground = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      setBackgroundImg(data.url);
    } catch (err) {
      console.log(err);
      alert("Ошибка загрузки файла");
    }
  };

  const handleChangeSlider = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      setSliderImg(data.url);

      // console.log(event);
    } catch (err) {
      alert("Ошибка загрузки файла");
    }
  };

  React.useEffect(() => {
    if (addressMember) {
      axios
        .get(`/member/${addressMember}`)
        .then(({ data }) => {
          setAvatar(data.avatar);
          setAddress(data.address);
          setName(data.name);
          setAvatar(data.avatar);
          setNameGroup(data.nameGroup);
          setBackgroundImg(data.backgroundImg);
          setInfo(data.info);
          setSliderImg(data.sliderImg);
        })
        .catch((err) => {
          console.log(err);
          alert("Ошибка получения профиля");
        });
    }
  }, []);

  // console.log(addressMember)

  const saveChanges = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const fields = {
        avatar,
        address,
        name,
        nameGroup,
        backgroundImg,
        info,
        sliderImg,
      };

      const { data } = isEditing
        ? await axios.patch(`/member/update/${addressMember}`, fields)
        : await axios.post("/member", fields);
      setLoading(false);

      const addressLink = isEditing ? addressMember : data.address;
      // const addressMember = data.address;
      navigate(`/members/${addressLink}`);
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Ошибка обновления профиля");
    }
  };

  return (
    <>
      <Header />
      <h2 className="h2"> {isEditing ? "Редактировать" : "Создать"} профиль</h2>
      <form onSubmit={saveChanges}>
        <div className="ava-name">
          <button
            className="form-avatar"
            type="button"
            onClick={() => inputAvatar.current.click()}
          >
            {avatar ? (
              <img
                className="form-avatar_img"
                src={`http://localhost:4080${avatar}`}
                alt=""
              />
            ) : (
              <img
                className="form-avatar_img"
                src="../icons/avatar.svg"
                alt=""
              />
            )}
            <span>Аватарка</span>
          </button>

          <input
            ref={inputAvatar}
            required
            type="file"
            name="avatar"
            style={{ display: "none" }}
            onChange={handleChangeFile}
          />

          <input
            className="input input-name"
            type="text"
            name="name"
            value={nameGroup}
            required
            placeholder="Псевдоним или имя"
            onChange={(e) => setNameGroup(e.target.value)}
          />
        </div>

        <div className="bg-button">
          <button
            className="form-background"
            onClick={() => background.current.click()}
            type="button"
          >
            {backgroundImg ? (
              <img
                className="form-background_img"
                src={`http://localhost:4080${backgroundImg}`}
                alt=""
              />
            ) : (
              <img
                className="form-background_img"
                src="../icons/addImage.svg"
                alt=""
              />
            )}
            <span>Фон</span>
          </button>

          <input
            ref={background}
            required
            type="file"
            name="avatar"
            style={{ display: "none" }}
            onChange={handleChangeBackground}
          />
        </div>

        <div className="create-info">
          <div className="btn-con">
            <button
              className="slider-btn"
              onClick={() => slider.current.click()}
              type="button"
            >
              {sliderImg ? (
                <img
                  className="form-background_img"
                  src={`http://localhost:4080${sliderImg}`}
                  alt=""
                />
              ) : (
                <img
                  className="form-background_img1"
                  src="../icons/addImage.svg"
                  alt=""
                />
              )}
              <span>Слайдер</span>
            </button>
          </div>

          <input
            ref={slider}
            required
            type="file"
            name="slider"
            style={{ display: "none" }}
            onChange={handleChangeSlider}
          />

          <div className="text-input">
            <input
              className="input"
              type="text"
              name="name"
              value={name}
              required
              placeholder="Имя"
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              style={{ height: "60%", width: '100%' }}
              className="textarea"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="О себе"
            ></textarea>

            <input
              className="input"
              type="text"
              name="address"
              value={address}
              required
              placeholder="Короткий адрес"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="open margin" style={{marginTop: '50px'}}>
          <button onClick={saveChanges} type="submit" className="button">
            Сохранить
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
