import "./Newsline.sass";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import StorePreview from "../../components/Product/StorePreview";
import { fetchFeed } from "../../redux/slices/posts";
import { selectIsAuth } from "../../redux/slices/auth";
import Loader from "../../components/Loader";
import ButtonLink from "../../components/ButtonLink";

function Newsline() {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.posts);
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  if (feed.status === "loading") {
    return (
      <>
        <Header />
        <Loader err={feed.status === "error"} />
      </>
    );
  }

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  if (feed.items.length === 0) {
    return (
      <>
        <Header />
        <div className="feed-null border-solid">
          <p>Похоже, Вы ни на кого не подписаны</p>
          {ButtonLink("/members", "К участникам")}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="feed">
        {feed.items.map((item) => {
          if (item.hasOwnProperty("text")) {
            return (
              <div className="post-feed" key={item._id}>
                <Post
                  id={item._id}
                  title={item.title}
                  text={item.text}
                  member={item.member}
                  previewImg={item.previewImg}
                  address={item.address}
                />
              </div>
            );
          } else {
            return (
              <div className="product-feed"  key={item._id}>
                <StorePreview
                  id={item._id}
                  title={item.title}
                  description={item.description}
                  member={item.member}
                  productUrl={item.productUrl}
                  size={item.size}
                  price={item.price}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default Newsline;
