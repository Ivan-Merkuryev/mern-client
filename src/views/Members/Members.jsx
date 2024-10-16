import "./Members.sass";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import { fetchMemberInfo } from "../../redux/slices/member";
import Loader from "../../components/Loader";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Avatar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

const CardContentNoPadding = styled(CardContent)(`
padding: 0;
&:last-child {
  padding-bottom: 0;
}
`);

function Members() {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMemberInfo());
  }, []);

  const members = useSelector((state) => state.member);

  const membersStatus = members.status;

  const searchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Header />
      <h2 className="h2 members-h">Участники</h2>
      <input
        className="search"
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={searchInput}
      />
      <ThemeProvider theme={theme}>
        <div className="members-page border-solid">
          {membersStatus !== "loaded" ? (
            <>
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "700px",
                  boxShadow: 0,
                }}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <div>
                    <CardContentNoPadding
                      key={index}
                      sx={{
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        width: 500,
                        height: 84,
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        sx={{ width: 60, height: 60, m: 1.5 }}
                      />
                      {/* Заглушка для Avatar */}
                      <Skeleton variant="text" width={230} height={30} />
                      {/* Заглушка для текста */}
                    </CardContentNoPadding>
                  </div>
                ))}
              </Card>
            </>
          ) : (
            <>
              {members.data
                .filter((el) => {
                  return el.nameGroup
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                })
                .map((el) => (
                  <Link
                    to={`/members/${el.address}`}
                    key={el._id}
                    style={{ width: "100%" }}
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
                        sx={{ width: 60, height: 60, m: 1.5 }}
                      />
                      <Typography variant="body1">{el.nameGroup}</Typography>
                    </CardActionArea>
                  </Link>
                ))}
            </>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}
export default Members;
