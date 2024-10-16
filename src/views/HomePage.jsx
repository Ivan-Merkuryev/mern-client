import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

// import { motion } from "framer-motion";

// import Modal from "../components/Modal/Modal";
import { HCartS } from "../components/ui/MaterialUi";
import { AvatarUiS } from "../components/ui/MaterialUi";
import { DescriptionCartS } from "../components/ui/MaterialUi";
import { CartStyles } from "../components/ui/MaterialUi";
import Header from "../components/Header/Header";
import MembersPreview from "../components/MembersPreview";
import BlogPreview from "../components/BlogPreview";
import StorePreview from "../components/Product/StorePreview";
import ButtonLink from "../components/ButtonLink";
import { fetchLastPosts } from "../redux/slices/posts";
import { fetchLastProducts } from "../redux/slices/products";
import { fetchMemberInfo } from "../redux/slices/member";
import { selectIsAuth } from "../redux/slices/auth";

function Home() {
  const dispatch = useDispatch();
  const { lastPosts } = useSelector((state) => state.posts);
  const { lastProducts } = useSelector((state) => state.products);
  const members = useSelector((state) => state.member);

  const productsStatus = lastProducts.status;
  const postsStatus = lastPosts.status;
  const membersStatus = members.status;
  // console.log(lastProducts)

  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchMemberInfo());
    dispatch(fetchLastPosts());
    dispatch(fetchLastProducts());
  }, []);

  const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);
  function skelet() {
    return (
      <Card
        sx={{
          width: 500,
          height: 414.89,
          borderRadius: "16px",
          paddingTop: "39.44px",
          paddingBottom: "39.44px",
          "@media (max-width: 720px)": {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            maxWidth: "500px",
            width: "97%",
            m: "0 auto",
            paddingLeft: "30.7px",
            paddingRight: "30.7px",
            height: "auto",
            pt: 0,
            pb: 0,
          },
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div style={{ margin: "0 auto" }}>
            <CardContentNoPadding
              key={index}
              sx={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                width: 500,
                height: 84,
                "@media (max-width: 720px)": {
                  width: "auto",
                  m: "0 auto",
                },
                "@media (max-width: 400px)": {
                  height: 76,
                },
              }}
            >
              <Skeleton
                variant="circular"
                sx={{
                  width: 60,
                  height: 60,
                  m: 1.5,
                  "@media (max-width: 400px)": {
                    width: 52,
                    height: 52,
                    ml: 0.6,
                    mr: 0.6,
                  },
                }}
              />

              <Skeleton
                variant="text"
                width={230}
                height={30}
                sx={{
                  "@media (max-width: 720px)": {
                    display: "none",
                  },
                }}
              />
            </CardContentNoPadding>
          </div>
        ))}
      </Card>
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
          {membersStatus !== "loaded" ? (
            skelet()
          ) : (
            <>
              <MembersPreview members={members} />
            </>
          )}
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

      <div className="carts">
        {postsStatus !== "loaded" ? (
          <>
            {Array.from({ length: 2 }).map((_, index) => (
              <>
                <Card sx={CartStyles()}>
                  {AvatarUiS()}
                  <CardContent sx={{ m: 0, p: 0 }}>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: 345,
                        height: 140,
                        pt: 0,
                        pb: 0,
                        "@media (max-width: 550px)": {
                          height: 100,
                        },
                        "@media (max-width: 425px)": {
                          height: 90,
                        },
                      }}
                    />
                  </CardContent>
                  <CardContent
                    sx={{
                      "@media (max-width: 700px)": {
                        height: 95,
                      },
                      "@media (max-width: 600px)": {
                        height: 88,
                        pl: "8px",
                      },
                    }}
                  >
                    {HCartS()}
                    {DescriptionCartS()}
                  </CardContent>
                </Card>
              </>
            ))}
          </>
        ) : (
          <>
            {lastPosts.items.map((obj) => (
              <BlogPreview
                key={obj._id}
                id={obj._id}
                title={obj.title}
                text={obj.text}
                member={obj.member}
                previewImg={obj.previewImg}
                // address={obj.address}
              />
            ))}
          </>
        )}
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
        {productsStatus !== "loaded" ? (
          <>
            {Array.from({ length: 2 }).map((_, index) => (
              <>
                <Card sx={CartStyles("store")}>
                  {AvatarUiS()}
                  <CardContent sx={{ p: 0 }}>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: 200,
                        height: 140,
                        p: 0,
                        m: "0 auto",
                        "@media (max-width: 550px)": {
                          height: 120,
                          width: 170,
                        },
                        "@media (max-width: 425px)": {
                          height: 110,
                          width: 130,
                        },
                      }}
                    />
                  </CardContent>
                  <CardContent
                    sx={{
                      "@media (max-width: 600px)": {
                        pl: "8px",
                        pr: "8px",
                      },
                    }}
                  >
                    {HCartS()}

                    <Skeleton
                      variant="text"
                      width={50}
                      height={28}
                      style={{ marginBottom: 10 }}
                    />
                    {DescriptionCartS()}
                  </CardContent>
                </Card>
              </>
            ))}
          </>
        ) : (
          <>
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
                status={postsStatus}
              />
            ))}
          </>
        )}
      </div>
      {/* 
      <div className="carts">
       
      </div> */}
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
