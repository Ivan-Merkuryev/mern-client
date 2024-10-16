import "./Modal.sass";
import { motion } from "framer-motion";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { logout } from "../../redux/slices/auth";
import { fetchRemovePost } from "../../redux/slices/posts";
import ButtonLink from "../ButtonLink";

function Modal({
  isLogout,
  errProduct,
  active,
  setActive,
  title,
  text,
  isRemovePost,
  btn1,
  btn2,
  postId,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    setActive(false);
  };

  const onClickRemove = () => {
    dispatch(fetchRemovePost(postId));
    navigate("/");
  };

  return (
    <div
      className={active ? "modal-background modal-active" : "modal-background"}
      onClick={() => setActive(false)}
    >
      {active && (
        <motion.div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: "spring",
          }}
        >
          {isLogout || isRemovePost ? (
            <div className="modal-logout">
              <p>{text}</p>
              <div className="modal-btns">
                <button className="open-btn" onClick={() => setActive(false)}>
                  {btn1}
                </button>
                <button
                  className="close-btn open-btn"
                  onClick={isLogout ? clickLogout : onClickRemove}
                >
                  {btn2}
                </button>
              </div>
            </div>
          ) : (
            <div className="modal-message" style={!title? {height: '140px'} : null }>
              {title ? <h4 style={{ textAlign: "center" }}>{title}</h4> : null}
              <p>{text}</p>
              {errProduct ? (
                <div className="modal-btns">
                  {ButtonLink("/login", "Войти")}
                  {ButtonLink("/register", "Зарегистрироваться")}
                </div>
              ) : null}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Modal;