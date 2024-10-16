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
      <h2 className="h2">Регистрация</h2>
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