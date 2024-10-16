import { Link } from "react-router-dom";
import marking from "./marking";
import { HCart } from "./ui/MaterialUi";
import { AvatarUi } from "./ui/MaterialUi";
import { DescriptionCart } from "./ui/MaterialUi";
import { CartStyles } from "./ui/MaterialUi";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Avatar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif", // замените шрифт на нужный вам
  },
});

export default function ActionAreaCard({
  id,
  title,
  text,
  previewImg,
  member,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={CartStyles()}
      >
        <CardActionArea sx={{ borderRadius: 0 }}>
          <Link
            to={`/members/${member.address}`}
            className="min-avatar"
            style={{ margin: "10px 0 10px 10px" }}
          >
            {AvatarUi(member.info.avatar, member.info.nameGroup)}
          </Link>
        </CardActionArea>
        <CardActionArea>
          <Link to={`/posts/${id}`}>
            <CardMedia
              component="img"
              image={`https://mern-art-app.onrender.com${previewImg}`}
              // alt="green iguana"
              sx={{
                height: 140,
                "@media (max-width: 550px)": {
                  height: 100,
                },
                "@media (max-width: 425px)": {
                  height: 90,
                },
              }}
            />
            <CardContent
              sx={{
                // height: 120.43,
                "@media (max-width: 700px)": {
                  height: 95,
                },
                "@media (max-width: 600px)": {
                  height: 88,
                  pl: '8px',
                  pr: '8px'
                },
                "@media (max-width: 500px)": {
                  height: 90,
                },
              }}
            >
              {HCart(title)}
              {DescriptionCart(text)}
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}
