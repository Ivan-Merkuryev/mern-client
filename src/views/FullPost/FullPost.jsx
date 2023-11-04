import React, { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Markdown from "react-markdown";

import Header from "../../components/Header/Header";
import { fetchRemovePost } from "../../redux/slices/posts";
import "./FullPost.sass";
import axios from "../../axios";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal/Modal";


function FullPost() {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);

  const userData = useSelector((state) => state.auth.data);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при открытии поста");
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="fullpost">
        <h2 className="h2"> {data.title} </h2>
        <div className="fullpost-top">
          <Link
            className="fullpost-top_member"
            to={`/members/${data.member.address}`}
          >
            <img
              className="logo"
              src={`http://localhost:4080${data.member.info.avatar}`}
            />
            <p>{data.member.info.nameGroup}</p>
          </Link>
          {userData?._id === data.member._id ? (
            <div>
              <Link to={`/posts/${id}/edit`}>
                <button className="fullpost-buttons">
                  <img src="../icons/edit.svg" />
                </button>
              </Link>

              <button onClick={() => setModalActive(true)} className="fullpost-buttons">
                <img src="../icons/remove.svg" />
              </button>
            </div>
          ) : null}
        </div>
        
        <div className="fullproduct-content">
          <img
            className="post-img"
            src={`http://localhost:4080${data.previewImg}`}
            alt=""
          />
          <div className="fullpost-text">
            <Markdown>{data.text}</Markdown>
          </div>
        </div>

        {/* <p>{data.text}</p> */}
      </div>
      <Modal isRemovePost active={modalActive} setActive={setModalActive} postId={id} text={"Вы действительно хотите удалить пост?"} btn1={'Оставить'} btn2={'Удалить'}/>
    </>
  );
}

export default FullPost;
