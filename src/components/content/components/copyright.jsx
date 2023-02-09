import React from "react";

//Material UI components

import Typography from "@mui/material/Typography";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="GrayText"
      align="center"
      style={{ marginLeft: "-700px", padding: "13px" }}
    >
      @ {new Date().getFullYear()} Copyright Biblioteca Nacional del Perú
    </Typography>
  );
};

export default Copyright;
