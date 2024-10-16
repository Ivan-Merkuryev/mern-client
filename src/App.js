import "./App.sass";
import React, { lazy, Suspense } from "react";
import { Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";

import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import Protected from "./components/Protected";
import Header from "./components/Header/Header.jsx";

const Home = lazy(() => import("./views/HomePage.jsx"));
const Members = lazy(() => import("./views/Members/Members"));
const Blog = lazy(() => import("./views/Blog/Blog"));
const Store = lazy(() => import("./views/Store"));
const Register = lazy(() => import("./views/Registration"));
const Login = lazy(() => import("./views/Autorization"));
const FullPost = lazy(() => import("./views/FullPost/FullPost"));
const FullProduct = lazy(() => import("./views/FullProduct/FullProduct"));
const AddPost = lazy(() => import("./views/addPost/AddPost"));
const AddProduct = lazy(() => import("./views/AddProduct/AddProduct"));
const PersonalPage = lazy(() => import("./views/PersonalPage"));
const CreateProfile = lazy(() => import("./views/CreateProfile/CreateProfile"));
const Newsline = lazy(() => import("./views/Newsline/Newsline"));
const Basket = lazy(() => import("./views/Basket/Basket"));
// import Home from "./views/HomePage.jsx";
// import Members from "./views/Members/Members";
// import Blog from "./views/Blog/Blog";
// import Store from "./views/Store";
// import Register from "./views/Registration";
// import Login from "./views/Autorization";
// import FullPost from "./views/FullPost/FullPost";
// import FullProduct from "./views/FullProduct/FullProduct";
// import AddPost from "./views/addPost/AddPost";
// import AddProduct from "./views/AddProduct/AddProduct";
// import PersonalPage from "./views/PersonalPage";
// import CreateProfile from "./views/CreateProfile/CreateProfile";

// import Newsline from "./views/Newsline/Newsline";
// import Basket from "./views/Basket/Basket";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Suspense
        fallback={
          <>
            <Header /> 
            <Loader />
          </>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:address" element={<PersonalPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/store" element={<Store />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={
              <Protected isAuth={isAuth}>
                <CreateProfile />
              </Protected>
            }
          />
          <Route path="/edit/:addressMember" element={<CreateProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add/product" element={<AddProduct />} />
          <Route path="/product/:id/edit" element={<AddProduct />} />
          <Route path="/store/:id" element={<FullProduct />} />
          <Route path="/feed" element={<Newsline />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
