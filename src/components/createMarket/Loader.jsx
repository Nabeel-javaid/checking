import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoadingSpinner = ({ isLoading }) => {
  return (
    isLoading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ScaleLoader color={"#123abc"} loading={isLoading} size={22} />
      </div>
    )
  );
};

export default LoadingSpinner;
