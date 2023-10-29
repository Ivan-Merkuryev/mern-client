import "./Modal.sass";
import { motion } from "framer-motion";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/slices/auth";

function Modal({
  isLogout,
  active,
  setActive,
  title,
  text,
  err,
  btnText,
  closeModal,
}) {
  const dispatch = useDispatch();

  const clickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    setActive(false);
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
            // ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {isLogout && (
            <>
              <p>Вы действительно хотите выйти?</p>
              <div className="modal-btns">
                <button className="open-btn" onClick={() => setActive(false)}>
                  Остаться
                </button>
                <button className="close-btn open-btn" onClick={clickLogout}>
                  Выйти
                </button>
              </div>
            </>
          )}
          <>
            <h4>{title}</h4>
            <p>{text}</p>
          </>
        </motion.div>
      )}
    </div>
  );
}

export default Modal;
