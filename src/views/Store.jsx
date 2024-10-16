import React from "react";
import { fetchProducts } from "../redux/slices/products";
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
import StorePreview from "../components/Product/StorePreview";
import Header from "../components/Header/Header";
import Loader from "../components/Loader";

function Store() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productsStatus = products.status;
  // if (products.status === "loading") {
  //   return (
  //     <>
  //       <Header />
  //       <Loader err={products.status === "error"} />
  //     </>
  //   );
  // }

  return (
    <>
      <Header />
      <h2 className="h2-page">Магазин</h2>
      <div className="list2">
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
            {products.items.map((obj, index) => (
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
          </>
        )}
      </div>
    </>
  );
}
export default Store;
