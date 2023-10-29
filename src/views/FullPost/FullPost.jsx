import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Markdown from 'react-markdown'

import Header from "../../components/Header/Header";
import { fetchRemovePost } from "../../redux/slices/posts";
import "./FullPost.sass";
import axios from "../../axios";

function FullPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

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

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить пост?")) {
      dispatch(fetchRemovePost(id));
      navigate("/");
    }
  };

  if (isLoading) {
    return <p>Загрузка</p>;
  }
  // console.log(data);
  return (
    <>
      <Header />
      <div className="fullpost">
        <h2> {data.title} </h2>
        <div className="fullpost-top">
          <Link
            className="fullpost-top_member"
            to={`/members/${data.member.address}`}
          >
            <img className="logo" src={`https://mern-art-app.onrender.com${data.member.info.avatar}`} />
            <p>{data.member.info.nameGroup}</p>
          </Link>
          {userData?._id === data.member._id ? (
            <div>
              <Link to={`/posts/${id}/edit`}>
                <button className="fullpost-buttons">
                  <img src="../icons/edit.svg" />
                </button>
              </Link>

              <button onClick={onClickRemove} className="fullpost-buttons">
                <img src="../icons/remove.svg" />
              </button>
            </div>
          ) : null}
        </div>

        <hr />
        <img
          className="post-img"
          src={`https://mern-art-app.onrender.com${data.previewImg}`}
          alt=""
        />
        <Markdown>{data.text}</Markdown>
        {/* <p>{data.text}</p> */}
      </div>
    </>
  );
}

export default FullPost;
