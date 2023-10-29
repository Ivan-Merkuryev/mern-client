import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Header from "../components/Header/Header";
import EmailInput from "../components/ui/EmailInput";
import NameInput from "../components/ui/NameInput";
import PasswordInput from "../components/ui/PasswordInput";

import { fetchRegister, selectIsAuth } from "../redux/slices/auth";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert("не удалось зарегистрироваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <h2>Регистрация</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <NameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />

        <button type="submit" className="button">
          Зарегистрироваться
        </button>
      </form>
    </>
  );
}

export default Register;


// function PersonalPage() {
//   const { address } = useParams();

//   const [data, setData] = useState();
//   const [isLoading, setLoading] = useState(true);
//   const [isFollow, setIsFollow] = useState();
//   const [showActions, isShowActions] = useState(false);

//   const isAuth = useSelector(selectIsAuth);
//   const userData = useSelector((state) => state.auth.data);

//   React.useEffect(() => {
//     axios
//       .get(`/member/${address}`)
//       .then((res) => {
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         alert("Произошла ошибка при загрузке данных");
//       });
//   }, [address]);

//   React.useEffect(() => {
//     if (userData && data) {
//       setIsFollow(userData.following.includes(data.member._id));
//     }
//   }, [userData, data]);

//   const actions = () => {
//     const addressMember = data.address
//     return (
//       <>
//         <button className="button follow-btn" onClick={() => isShowActions(!showActions)}>
//           Действия
//         </button>
//         {showActions ?
//         <ul className="actions-list">
//           <li>
//             <Link className="open-btn" to="/add">
//               Написать пост
//             </Link>
//           </li>
//           <li>
//             <Link className="open-btn" to="/add/product">
//               Добавить товар
//             </Link>
//           </li>
//           <li>
//             <Link className="open-btn" to={`/edit/${addressMember}`}>
//               Редактировать профиль
//             </Link>
//           </li>
//         </ul> : null}
//       </>
//     );
//   };

//   const followBtn = () => {
//     if (!data) {
//       return null;
//     }
//     return (
//       <button
//         className={
//           isFollow ? "close-btn button follow-btn" : "button follow-btn"
//         }
//         onClick={isFollow ? unFollow : follow}
//       >
//         {isFollow ? "Отписаться" : "Подписаться"}
//       </button>
//     );
//   };

//   // console.log(data);

//   const follow = async () => {
//     if (!isAuth) {
//       alert("Сначала зарегистрируйтесь");
//     } else {
//       try {
//         await axios.post(`/auth/follow/${address}`);
//         setIsFollow(true);
//       } catch (err) {
//         console.log(err);
//         alert("Не удалось подписаться");
//       }
//     }
//   };

//   const unFollow = async () => {
//     if (!isAuth) {
//       alert("Сначала зарегистрируйтесь");
//     } else {
//       try {
//         await axios.post(`/auth/unfollow/${address}`);
//         setIsFollow(false);
//       } catch (err) {
//         console.log(err);
//         alert("Не удалось отписаться");
//       }
//     }
//   };

//   if (isLoading) {
//     return <p>Загрузка</p>;
//   }

//   return (
//     <>
//       <Header avatar={data.avatar} nameGroup={data.nameGroup} />
//       {/* <img className="bg" src="../icons/bg.png" alt="" /> */}
//       <img
//         className="bg"
//         src={`http://localhost:4080${data.backgroundImg}`}
//         alt=""
//       />

//       <div className="slider-info margin">
//         <img
//           className="slider"
//           src={`http://localhost:4080${data.sliderImg}`}
//           alt=""
//         />
//         <div>
//           <h2>{data.name}</h2>
//           <p className="page-info">{data.info}</p>
//         </div>
//       </div>

//       {isAuth && userData.address === data.address ? actions() : followBtn()}
//     </>
//   );
// }

// export default PersonalPage;

