import "./Members.sass";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import { fetchMemberInfo } from "../../redux/slices/member";

function Members() {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemberInfo());
  }, []);

  const members = useSelector((state) => state.member);

  if (members.status !== "loaded") {
    return <Header />
  }

  const searchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Header />
      <h2 className="members-h">Участники</h2>
      <input
      className="search"
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={searchInput}
      />
      <div className="members-page border-solid">
        {members.data
          .filter((el) => {
            return el.nameGroup
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
          .map((el) => (
            <Link to={`/members/${el.address}`} className="link-desctop">
              <img src={`https://mern-art-app.onrender.com${el.avatar}`} className="logo" />
              <p>{el.nameGroup}</p>
            </Link>
          ))}
      </div>
    </>
  );
}
export default Members;
