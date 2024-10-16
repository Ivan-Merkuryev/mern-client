import { Link } from "react-router-dom";
import "./Post.sass";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Avatar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif", // замените шрифт на нужный вам
  },
});

const CartMedia = styled(CardContent)(`
  width: 245px;
  height: 150px;
  object-fit: cover;
  padding: 0;
  border-radius: 12px;
  overflow-x: visible;
`);

function Post({ id, title, text, member, previewImg }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Card sx={{ width: 520, borderRadius: "16px", paddingBottom: 0 }}>
          <CardActionArea sx={{ borderRadius: 0 }}>
            <Link to={`/members/${member.address}`} className="min-avatar">
              <Avatar
                alt={member.info.nameGroup}
                src={`https://mern-art-app.onrender.com${member.info.avatar}`}
                sx={{ width: 60, height: 60, mr: 1.5 }}
              />
              <span>{member.info.nameGroup}</span>
            </Link>
          </CardActionArea>
          <CardActionArea sx={{ borderRadius: 0 }}>
            <Link to={`/posts/${id}`}>
              <CardContent
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2%",
                  paddingTop: 0,
                  height: 174,
                  boxSizing: 'content-box',
                  overflowY: 'visible',
                  "&:last-child": {
                    paddingBottom: 0,
                  },
                }}
              >
                <CartMedia
                  component="img"
                  src={`https://mern-art-app.onrender.com${previewImg}`}
                  // alt="green iguana"
                />
                <CardContent
                  sx={{
                    width: 245,
                    padding: 0,
                    height: 140,
                    "&:last-child": {
                      paddingBottom: 0,
                    },
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {text}
                  </Typography>
                </CardContent>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </ThemeProvider>
    </>
  );
}

export default Post;
