import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// import Modal from "../components/Modal/Modal";
import Header from "../components/Header/Header";
import Loader from "../components/Loader";
import MembersPreview from "../components/MembersPreview";
import BlogPreview from "../components/BlogPreview";
import StorePreview from "../components/Product/StorePreview";
import ButtonLink from "../components/ButtonLink";
import { fetchLastPosts } from "../redux/slices/posts";
import { fetchLastProducts } from "../redux/slices/products";
import { fetchMemberInfo } from "../redux/slices/member";
import useIsMobile from "../components/isMobile";
import { selectIsAuth } from "../redux/slices/auth";
import ErrorBtn from "../components/ErrorBtn";

function Home() {
  const dispatch = useDispatch();
  const { lastPosts } = useSelector((state) => state.posts);
  const { lastProducts } = useSelector((state) => state.products);
  const members = useSelector((state) => state.member);

  const isMembersLoading = members.status === "loading";
  const isPostsLoading = lastPosts.status === "loading";
  const isProductsLoading = lastProducts.status === "loading";

  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchMemberInfo());
    dispatch(fetchLastPosts());
    dispatch(fetchLastProducts());
  }, []);

  if (isPostsLoading || isProductsLoading || isMembersLoading) {
    return (
      <>
        <Header />
        <Loader
          err={
            lastPosts.status === "error" ||
            lastProducts.status === "error" ||
            members.status === "error"
          }
        />
      </>
    );
  }
  return (
    <>
      <Header />
      <p className="text">
        ART - это группа творческих людей, объединённых общим делом -
        искусством.
      </p>
      <div className="flex">
        <div>
          <h2 className="h2">
            <Link to="/members" className="link-h">
              Участники
            </Link>
          </h2>
          <MembersPreview members={members} />
        </div>

        <p className="text">
          Мы создали эту площадку для молодых художников, фотографов и других
          творческих личностей, где они могут выразить свою индивидуальность,
          делиться своими уникальными идеями и находить вдохновение друг у
          друга.
        </p>
      </div>

      <h2 className="h2">
        <Link to="/blog"> Блог </Link>
      </h2>

      <div className="posts">
        {lastPosts.items.map((obj) => (
          <BlogPreview
            key={obj._id}
            id={obj._id}
            title={obj.title}
            text={obj.text}
            member={obj.member}
            previewImg={obj.previewImg}
            address={obj.address}
          />
        ))}
      </div>
      <div className="m-top">{ButtonLink("/blog", "Открыть полностью")}</div>
      <p className="text">
        Мы поддерживаем молодых талантов и предлагаем им возможность продавать
        свои творения. В нашем сообществе вы найдете именно то, что ищете:
        уникальные произведения искусства, запечатленные в снимках и картинах,
        сделанные с любовью и страстью.
      </p>
      <h2 className="h2">
        <Link to="/store">Новинки в магазине</Link>
      </h2>
      <div className="carts">
        {lastProducts.items.map((obj) => (
          <StorePreview
            key={obj._id}
            id={obj._id}
            title={obj.title}
            description={obj.description}
            member={obj.member}
            productUrl={obj.productUrl}
            size={obj.size}
            price={obj.price}
          />
        ))}
      </div>
      <div className="m-top">{ButtonLink("/store", "Открыть полностью")}</div>
      {!isAuth ? (
        <>
          <p className="text">
            Присоединяйтесь к нам и окунитесь в мир красоты, творчества и
            вдохновения. Здесь вы сможете открыть для себя новые таланты,
            вдохновиться и быть частью глобальной художественной семьи.
          </p>
          <div className="m-top btn-flex">
            {ButtonLink("/login", "Войти")}{" "}
            {ButtonLink("/register", "Зарегистрироваться")}
          </div>
        </>
      ) : null}
    </>
  );
}

export default Home;
