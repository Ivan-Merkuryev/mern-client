import { HCart } from "../ui/MaterialUi";
import { AvatarUi } from "../ui/MaterialUi";
import { DescriptionCart } from "../ui/MaterialUi";
import { CartStyles } from "../ui/MaterialUi";

import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

export default function ActionAreaCard({
  id,
  title,
  description,
  member,
  productUrl,
  price,
  status,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={CartStyles("store")}>
        <CardActionArea sx={{ borderRadius: 0 }}>
          <Link
            to={`/members/${member.address}`}
            className="min-avatar"
            style={{ margin: "10px 0 10px 10px" }}
          >
            {AvatarUi(member.info.avatar, member.info.nameGroup)}
          </Link>
        </CardActionArea>
        <CardActionArea sx={{ borderRadius: 0 }}>
          <Link to={`/store/${id}`}>
            <CardMedia
              component="img"
              sx={{
                height: 140,
                width: "auto",
                m: "0 auto",
                "@media (max-width: 550px)": {
                  height: 120,
                },
                "@media (max-width: 425px)": {
                  height: 110,
                },
              }}
              image={`https://mern-art-app.onrender.com${productUrl[0]}`}
              // alt="green iguana"
            />
            <CardContent
              sx={{
                "@media (max-width: 600px)": {
                  pl: "8px",
                  pr: '8px'
                },
              }}
            >
              {HCart(title)}
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                {price}₽
              </Typography>
              {DescriptionCart(description)}
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}
