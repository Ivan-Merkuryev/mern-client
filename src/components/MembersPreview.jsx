import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { fetchMemberInfo } from "../redux/slices/member";
import useIsMobile from "./isMobile";

function MembersPreview({members}) {

  const isMobile = useIsMobile();
  const [page, setPage] = useState(1);
  // useEffect(() => {
  //   dispatch(fetchMemberInfo());
  // }, []);
  // console.log(members)

  // const members = useSelector((state) => state.member);

  // if (members.status !== "loaded") {
  //   return null;
  // }

  const quantity = 4;
  const allMembers = members.data.length;
  const quantityPages = Math.ceil(allMembers / quantity);
  const start = (page - 1) * quantity;
  const end = page * quantity;
  const currentMembers = members.data.slice(start, end);

  const next = () => {
    if (page < quantityPages) {
      setPage((page) => page + 1);
    } else {
      setPage(1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    } else {
      setPage(quantityPages);
    }
  };

  // console.log(useIsMobile);

  return (
    <>
      {!isMobile ? (
        <div className="members">
          <button onClick={prev} className="members-btn">
            <img
              className="members-btn_icon "
              src="../icons/chevronPrev.png"
              alt=""
            />
          </button>
          <motion.div
            className="members-logos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentMembers.map((el, index) => (
              <Link key={el._id} to={`/members/${el.address}`}>
                <motion.img
                  className="logo"
                  src={`https://mern-art-app.onrender.com${el.avatar}`}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
            ))}
          </motion.div>
          <button onClick={next} className="members-btn">
            <img
              className="members-btn_icon "
              src="../icons/chevronNext.png"
              alt=""
            />
          </button>
        </div>
      ) : (
        <div className="members-desctop">
          <button onClick={prev} className="members-btn">
            <img
              className="members-btn_icon members-btn_desctop"
              src="../icons/chevronPrev.png"
              alt=""
            />
          </button>
          <motion.div
            className="members-logos m-desctop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="links-desctop">
              {currentMembers.map((el, index) => (
                <Link key={el._id} to={`/members/${el.address}`} className="link-desctop">
                  <motion.img
                    className="logo"
                    src={`https://mern-art-app.onrender.com${el.avatar}`}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span>{el.nameGroup}</span>
                </Link>
              ))}
            </div>
          </motion.div>
          <button onClick={next} className="members-btn">
            <img
              className="members-btn_icon members-btn_desctop"
              src="../icons/chevronNext.png"
              alt=""
            />
          </button>
        </div>
      )}
    </>
  );
}

export default MembersPreview;
