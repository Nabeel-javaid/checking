import React, { useState,useEffect } from "react";
import {Typography} from "@mui/material/Typography";

const Heading = () => {
  const [heading, setHeading] = useState("RULES");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeading(prevHeading => (prevHeading === "RULES" ? "MARKET" : "RULES"));
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  const toggleHeading = () => {
    setHeading(prevHeading => (prevHeading === "RULES" ? "MARKET" : "RULES"));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", width: "100%" }}>
    <Typography
      variant="h3"
      style={{
        display: "flex",
        fontWeight: "bold",
        color: "black",
        justifyContent: "center",
        marginLeft: "49px",
        alignItems: "center",
      }}
    >
      &nbsp; &nbsp; &nbsp; You make the
      <span
        style={{
          display: "flex",
          color: heading === "RULES" ? "#FFEB3B" : "#2196F3",
          justifyContent: "center",
          padding: "10px",
          cursor: "pointer"
        }}
      >
        {heading}
      </span>
    </Typography>
  </div>  );
};

export default Heading;
