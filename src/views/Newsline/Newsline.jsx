import "./Newsline.sass";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import Post from "../../components/Post/Post";
import StorePreview from "../../components/Product/StorePreview";
import { fetchFeed } from "../../redux/slices/posts";

function Newsline() {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.posts);

  React.useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  // console.log(feed);

  // const allItems = [...postsFeed.items, ...productsFeed.items];
  // const sortedItems = allItems.sort(
  //   (a, b) => new Date(b.date) - new Date(a.date)
  // );

  return (
    <>
      <Header />
      <div className="feed">
        {feed.items.map((item) => {
          if (item.hasOwnProperty("text")) {
            return (
              <div className="post-feed" key={item.id}>
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
              <div className="product-feed">
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
