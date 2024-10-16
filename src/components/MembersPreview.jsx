// import { motion } from "framer-motion";

// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import { fetchMemberInfo } from "../redux/slices/member";

// function MembersPreview({members}) {

//   const isMobile = useIsMobile();
//   const [page, setPage] = useState(1);
//   // useEffect(() => {
//   //   dispatch(fetchMemberInfo());
//   // }, []);
//   // console.log(members)

//   // const members = useSelector((state) => state.member);

//   // if (members.status !== "loaded") {
//   //   return null;
//   // }

//   const quantity = 4;
//   const allMembers = members.data.length;
//   const quantityPages = Math.ceil(allMembers / quantity);
//   const start = (page - 1) * quantity;
//   const end = page * quantity;
//   const currentMembers = members.data.slice(start, end);

//   const next = () => {
//     if (page < quantityPages) {
//       setPage((page) => page + 1);
//     } else {
//       setPage(1);
//     }
//   };

//   const prev = () => {
//     if (page > 1) {
//       setPage((page) => page - 1);
//     } else {
//       setPage(quantityPages);
//     }
//   };

//   // console.log(useIsMobile);

//   return (
//     <>
//       {!isMobile ? (
//         <div className="members">
//           <button onClick={prev} className="members-btn">
//             <img
//               className="members-btn_icon "
//               src="../icons/chevronPrev.png"
//               alt=""
//             />
//           </button>
//           <motion.div
//             className="members-logos"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             {currentMembers.map((el, index) => (
//               <Link className="logo" key={el._id} to={`/members/${el.address}`}>
//                 <motion.img
//                   className="logo"
//                   src={`http://localhost:4080${el.avatar}`}
//                   alt=""
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                 />
//               </Link>
//             ))}
//           </motion.div>
//           <button onClick={next} className="members-btn">
//             <img
//               className="members-btn_icon "
//               src="../icons/chevronNext.png"
//               alt=""
//             />
//           </button>
//         </div>
//       ) : (
//         <div className="members-desctop">
//           <button onClick={prev} className="members-btn">
//             <img
//               className="members-btn_icon members-btn_desctop"
//               src="../icons/chevronPrev.png"
//               alt=""
//             />
//           </button>
//           <motion.div
//             className="members-logos m-desctop"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div className="links-desctop">
//               {currentMembers.map((el, index) => (
//                 <Link key={el._id} to={`/members/${el.address}`} className="link-desctop">
//                   <motion.img
//                     className="logo"
//                     src={`http://localhost:4080${el.avatar}`}
//                     alt=""
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                   />
//                   <span>{el.nameGroup}</span>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//           <button onClick={next} className="members-btn">
//             <img
//               className="members-btn_icon members-btn_desctop"
//               src="../icons/chevronNext.png"
//               alt=""
//             />
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// export default MembersPreview;

import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Avatar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

export default function ActionAreaCard({ members }) {
  // console.log(members);

  const [page, setPage] = React.useState(1);

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

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          width: 500,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "@media (max-width: 720px)": {
            flexDirection: "row",
            maxWidth: "500px",
            width: "97%",
            m: "0 auto",
          },
        }}
      >
        <button
          onClick={prev}
          className="members-btn"
          style={{ height: "39px" }}
        >
          <img
            className="members-btn_icon members-btnPrev"
            src="../icons/chevronPrev.png"
            alt=""
            style={{ width: "30.7px" }}
          />
        </button>
        <div className="members">
          {currentMembers.map((el) => (
            <Link
              to={`/members/${el.address}`}
              className="members-link members-logos"
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderRadius: 0,
                }}
              >
                <Avatar
                  alt={el}
                  src={`https://mern-art-app.onrender.com${el.avatar}`}
                  sx={{
                    width: 60,
                    height: 60,
                    m: 1.5,
                    "@media (max-width: 400px)": {
                      width: 52,
                      height: 52,
                      ml: 0.4,
                      mr: 0.4,
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    "@media (max-width: 720px)": {
                      display: "none",
                    },
                  }}
                >
                  {el.nameGroup}
                </Typography>
              </CardActionArea>
            </Link>
          ))}
        </div>
        <button
          onClick={next}
          className="members-btn"
          style={{ height: "39px" }}
        >
          <img
            className="members-btn_icon members-btnNext"
            src="../icons/chevronPrev.png"
            alt=""
            style={{ width: "30.7px" }}
          />
        </button>
      </Card>
    </ThemeProvider>
  );
}
