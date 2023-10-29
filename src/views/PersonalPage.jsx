import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "../axios";
import { selectIsAuth } from "../redux/slices/auth";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
function PersonalPage() {
  const { address } = useParams();
  // {(data.subs)}
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isFollow, setIsFollow] = useState();
  const [showActions, isShowActions] = useState(false);

  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    axios
      .get(`/member/${address}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Произошла ошибка при загрузке данных");
      });
  }, [address]);

  if (isAuth) {
    const handleFollow = async () => {
      try {
        const res = await axios.get(`/auth/handleFollow/${address}`);
        if (res.data.message === "Пользователь в подписках") {
          setIsFollow(true);
        } else {
          setIsFollow(false);
        }
      } catch (err) {
        console.log(err);
        alert("Ошибка!");
      }
    };
    handleFollow();
  }

  const actions = () => {
    return (
      <>
        <button
          className="button follow-btn"
          onClick={() => isShowActions(!showActions)}
        >
          Действия
        </button>
      </>
    );
  };

  const actionsBtn = () => {
    const addressMember = data.address;
    return (
      <>
        {showActions ? (
          <ul className="actions-list">
            <li>
              <Link className="open-btn" to="/add">
                Написать пост
              </Link>
            </li>
            <li>
              <Link className="open-btn" to="/add/product">
                Добавить товар
              </Link>
            </li>
            <li>
              <Link className="open-btn" to={`/edit/${addressMember}`}>
                Редактировать профиль
              </Link>
            </li>
          </ul>
        ) : null}
      </>
    );
  };

  let myPage;
  if (userData !== null && !isLoading) {
    if (userData._id === data.member._id) {
      myPage = true;
    }
  }

  const followBtn = () => {
    if (!data) {
      return null;
    }
    return (
      <button
        className={
          isFollow ? "close-btn button follow-btn" : "button follow-btn"
        }
        onClick={isFollow ? unFollow : follow}
      >
        {isFollow ? "Отписаться" : "Подписаться"}
      </button>
    );
  };

  const follow = async () => {
    if (!isAuth) {
      alert("Сначала зарегистрируйтесь");
    } else {
      try {
        await axios.post(`/auth/follow/${address}`);
        setIsFollow(true);
      } catch (err) {
        console.log(err);
        alert("Не удалось подписаться");
      }
    }
  };

  const unFollow = async () => {
    if (!isAuth) {
      alert("Сначала зарегистрируйтесь");
    } else {
      try {
        await axios.post(`/auth/unfollow/${address}`);
        setIsFollow(false);
      } catch (err) {
        console.log(err);
        alert("Не удалось отписаться");
      }
    }
  };

  if (isLoading) {
    return null;
  }
  return (
    <>
      <Header
        avatar={data.avatar}
        nameGroup={data.nameGroup}
        address={data.address}
        isFullProfile={myPage}
      />
      <img
        className="bg"
        src={`http://localhost:4080${data.backgroundImg}`}
        alt=""
      />

      <div className="slider-info margin">
        <img
          className="slider"
          src={`http://localhost:4080${data.sliderImg}`}
          alt=""
        />
        <div>
          <div className="page-name">
            <h2>{data.name}</h2>
            {/* {userData === null || isLoading ? (
              <p>Загрузка</p>
            ) : ( */}
            <>{myPage ? actions() : followBtn()}</>
            {/* )} */}
          </div>
          {actionsBtn()}

          <p className="page-info">{data.info}</p>
        </div>
      </div>
    </>
  );
}

export default PersonalPage;
