import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, useCycle } from "framer-motion";
import { selectIsAuth } from "../../redux/slices/auth";
import "./Header.sass";
import useIsMobile from "../isMobile";
import Modal from "../Modal/Modal";
import { fetchAuthMe } from "../../redux/slices/auth";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 260px 38px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 260px 38px)",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const livariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

function Header({ avatar, nameGroup }) {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  // if (isMobile !== undefined) {
  //   console.log(isMobile);
  // }

  const [modalActive, setModalActive] = useState(false);
  const [isDisplayNone, setIsDisplayNone] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    dispatch(fetchAuthMe);
  }, []);

  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    let timeout;
    if (!isOpen) {
      timeout = setTimeout(() => {
        setIsDisplayNone(true);
      }, 1000);
    } else {
      setIsDisplayNone(false);
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  const user = useSelector((state) => state.auth);

  if (user.status === "loading") {
    return null;
  }

  return (
    <header>
      <div>
        <Link to="/">
          {avatar ? (
            <div className="header-logo">
              <img
                src={`http://localhost:4080${avatar}`}
                className="logo"
                alt="logo"
              />
              <span className="header-logo_name">{nameGroup}</span>
            </div>
          ) : (
            <img src="../icons/logoHome.svg" alt="logo" />
            // <img src="http://localhost:3000/icons/logoHome.svg" alt="logo" />
          )}
        </Link>
      </div>
      {!isMobile ? (
        <>
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            onClick={toggleOpen}
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              backgroundColor: "transparent",
              display: isOpen ? "block" : "none",
              zIndex: 2
            }}
          ></motion.div>
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="nav-mobile"
          >
            <motion.div className="background" variants={sidebar} />
            <motion.ul
              variants={variants}
              className="sidebar"
              style={{
                zIndex: isOpen ? 4 : null,
                display: isDisplayNone ? "none" : null,
              }}
            >
              <motion.li className="list-item" variants={livariants}>
                <Link to="/members">Участники</Link>
              </motion.li>
              <motion.li className="list-item" variants={livariants}>
                <Link to="/blog">Блог</Link>
              </motion.li>
              <motion.li className="list-item" variants={livariants}>
                <Link to="/store">Магазин</Link>
              </motion.li>
              {isAuth || window.localStorage.getItem("token") ? (
                <>
                  {user.data.role === "user" ? (
                    <>
                      <motion.li className="list-item" variants={livariants}>
                        <Link to="/basket">Корзина</Link>
                      </motion.li>
                      <motion.li className="list-item" variants={livariants}>
                        <Link className="open-btn" to="/feed">
                          Лента
                        </Link>
                      </motion.li>
                    </>
                  ) : (
                    <>
                      <motion.li className="list-item" variants={livariants}>
                        <Link to="/basket">Корзина</Link>
                      </motion.li>
                      <motion.li className="list-item" variants={livariants}>
                        <Link className="open-btn" to="/feed">
                          Лента
                        </Link>
                      </motion.li>
                      <motion.li className="list-item" variants={livariants}>
                        {!user.data.info ? (
                          <Link to="/create" className="open-btn">
                            Создать профиль
                          </Link>
                        ) : (
                          <Link to={`/members/${user.data.info.address}`} className="open-btn ">
                          Моя страница
                        </Link>
                        )}
                      </motion.li>
                    </>
                  )}

                  <motion.li className="list-item" variants={livariants}>
                    <button
                      onClick={() => setModalActive(true)}
                      className="close-btn open-btn"
                    >
                      Выйти
                    </button>
                  </motion.li>
                </>
              ) : (
                <>
                  <motion.li className="list-item" variants={livariants}>
                    <Link className="open-btn" to="/register">
                      Зарегистрироваться
                    </Link>
                  </motion.li>
                  <motion.li className="list-item" variants={livariants}>
                    <Link className="open-btn" to="/login">
                      Войти
                    </Link>
                  </motion.li>
                </>
              )}
            </motion.ul>
            <button className="sidebar-btn" onClick={toggleOpen}>
              <svg width="23" height="23" viewBox="0 0 23 23">
                <Path
                  variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                  }}
                />
                <Path
                  d="M 2 9.423 L 20 9.423"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.1 }}
                />
                <Path
                  variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                  }}
                />
              </svg>
            </button>
          </motion.nav>
        </>
      ) : (
        <nav>
          <ul className="list">
            <li className="list-item">
              <Link to="/members">Участники</Link>
            </li>
            <li className="list-item">
              <Link to="/blog">Блог</Link>
            </li>
            <li className="list-item">
              <Link to="/store">Магазин</Link>
            </li>
            {isAuth || window.localStorage.getItem("token") ? (
              <>
                {user.data.role === "user" ? (
                  <>
                    <li className="list-item">
                      <Link to="/basket">Корзина</Link>
                    </li>
                    <li className="list-item">
                      <Link className="open-btn" to="/feed">
                        Лента
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="list-item">
                      <Link to="/basket">Корзина</Link>
                    </li>
                    <li className="list-item">
                      <Link className="open-btn" to="/feed">
                        Лента
                      </Link>
                    </li>
                    <li className="list-item">
                      {!user.data.info ? (
                        <Link to="/create" className="open-btn">
                          Создать профиль
                        </Link>
                      ) : (
                        <Link to={`/members/${user.data.info.address}`} className="open-btn ">
                          Моя страница
                        </Link>
                      )}
                    </li>
                  </>
                )}

                <li className="list-item">
                  <button
                    onClick={() => setModalActive(true)}
                    className="close-btn open-btn"
                  >
                    Выйти
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="list-item">
                  <Link className="open-btn" to="/register">
                    Зарегистрироваться
                  </Link>
                </li>
                <li className="list-item">
                  <Link className="open-btn " to="/login">
                    Войти
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
      <Modal
        isLogout
        active={modalActive}
        setActive={setModalActive}
        text={"Вы действительно хотите выйти?"}
        btn1={"Остаться"}
        btn2={"Выйти"}
      />
    </header>
  );
}
export default Header;
