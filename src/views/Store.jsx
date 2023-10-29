import React from "react";
import { fetchProducts } from "../redux/slices/products";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StorePreview from "../components/Product/StorePreview";
import Header from "../components/Header/Header";

function Store() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log(products);

  return (
    <>
      <Header />
      <h1>Магазин</h1>
      <div className="list2">
        {products.items.map((obj, index) => (
          <StorePreview
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
