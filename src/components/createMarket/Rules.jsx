import React from "react";
import {Typography} from "@mui/material/Typography";

const Rules = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", width: "fit-content" }}>
      <Typography variant="body1" style={{ color: "black", marginRight: "10px" }}>
        &nbsp; &nbsp; &nbsp; These rules impact the borrower’s experience.
      </Typography>
      <Typography variant="body1" style={{ color: "black" }}>
        All selections made here can be updated in Settings later.
      </Typography>
    </div>
  );
};

export default Rules;
