import React from "react";
import { fetchProducts } from "../redux/slices/products";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StorePreview from "../components/Product/StorePreview";
import Header from "../components/Header/Header";
import Loader from "../components/Loader";

function Store() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (products.status === "loading") {
    return (
      <>
        <Header />
        <Loader err={products.status === "error"} />
      </>
    );
  }

  return (
    <>
      <Header />
      <h2 className="h2-page">Магазин</h2>
      <div className="list2">
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
      </div>
    </>
  );
}
export default Store;
