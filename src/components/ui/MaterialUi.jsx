import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Avatar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Skeleton } from "@mui/material";

export function CartStyles(store) {
  if (store) {
    return {
      width: 345,
      height: 350,
      borderRadius: "16px",
      "@media (max-width: 900px)": {
        width: 300,
      },
      "@media (max-width: 700px)": {
        width: 250,
        // height: 305,
      },
      "@media (max-width: 600px)": {
        // height: 298,
      },
      "@media (max-width: 550px)": {
        width: 200,
        height: 310,
      },
      "@media (max-width: 425px)": {
        width: 180,
        height: 290,
      },
      "@media (max-width: 380px)": {
        width: 170,
      },
      "@media (max-width: 360px)": {
        width: 160,
      },
      "@media (max-width: 350px)": {
        width: 150,
      },
    };
  } else
    return {
      width: 345,
      height: 320.7,
      borderRadius: "16px",
      "@media (max-width: 900px)": {
        width: 300,
        height: 316.7,
      },
      "@media (max-width: 700px)": {
        width: 250,
        height: 305,
      },
      "@media (max-width: 600px)": {
        height: 298,
      },
      "@media (max-width: 550px)": {
        width: 200,
        height: 258,
      },
      "@media (max-width: 425px)": {
        width: 180,
        height: 238,
      },
      "@media (max-width: 380px)": {
        width: 170,
      },
      "@media (max-width: 360px)": {
        width: 160,
      },
      "@media (max-width: 350px)": {
        width: 150,
      },
    };
}

export function AvatarUi(img, name) {
  return (
    <>
      <Avatar
        alt={name}
        src={`https://mern-art-app.onrender.com${img}`}
        sx={{
          width: 50,
          height: 50,
          mr: 1.5,
          "@media (max-width: 425px)": {
            width: 38,
            height: 38,
            mr: 1,
          },
        }}
      />
      <Typography
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          "@media (max-width: 425px)": {
            fontSize: 12,
          },
        }}
      >
        {name}
      </Typography>
    </>
  );
}

export function AvatarUiS() {
  return (
    <>
      <CardContent
        sx={{
          padding: 0,
          m: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            width: 50,
            height: 50,
            mr: 1.5,
            "@media (max-width: 425px)": {
              width: 38,
              height: 38,
              mr: 1,
            },
          }}
        />

        <Skeleton
          variant="text"
          sx={{
            width: 150,
            height: 30,
            "@media (max-width: 550px)": {
              width: 100,
            },
            "@media (max-width: 4250px)": {
              height: 24,
            },
            "@media (max-width: 380px)": {
              width: 70,
            },
          }}
        />
      </CardContent>
    </>
  );
}

export function HCart(title) {
  return (
    <Typography
      variant="h5"
      component="div"
      sx={{
        fontSize: 23,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "@media (max-width: 900px)": {
          fontSize: 20,
        },
        "@media (max-width: 600px)": {
          fontSize: 18,
          fontWeight: 500,
        },
      }}
    >
      {title}
    </Typography>
  );
}

export function HCartS() {
  return (
    <Skeleton
      variant="text"
      sx={{
        width: 200,
        height: 35,
        "@media (max-width: 900px)": {
          height: 30,
        },
        "@media (max-width: 550px)": {
          width: 110,
          height: 25,
        },
      }}
    />
  );
}

export function DescriptionCart(text) {
  return (
    <Typography
      variant="body2"
      sx={{
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "@media (max-width: 550px)": {
          fontSize: 12,
          mt: "5px",
        },
      }}
    >
      {text}
    </Typography>
  );
}

export function DescriptionCartS() {
  return (
    <>
      <Skeleton
        variant="text"
        sx={{
          width: 300,
          "@media (max-width: 900px)": {
            width: 200,
          },
          "@media (max-width: 550px)": {
            width: 110,
            height: 16,
            mt: "5px",
          },
        }}
      />
      <Skeleton
        variant="text"
        sx={{
          width: 100,
          "@media (max-width: 550px)": {
            height: 16,
          },
        }}
      />
    </>
  );
}
