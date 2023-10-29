import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import EmailInput from "../components/ui/EmailInput";
import PasswordInput from "../components/ui/PasswordInput";
import { fetchAuth, selectIsAuth } from "../redux/slices/auth";
import Header from "../components/Header/Header";

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert("не удалось авторизоваться");
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
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">

        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors}/>

        <button className="button" type="submit">
          Войти
        </button>
      </form>
    </>
  );
}
export default Login;
