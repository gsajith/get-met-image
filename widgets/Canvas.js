import React from "react";

const Canvas = ({ canvasRef }) => {
  return (
    <div
      ref={canvasRef}
      id="canvas"
      style={{
        position: "absolute",
        left: "120%",
        width: 888,
        height: 1921,
        background: "red",
      }}></div>
  );
};

export default Canvas;
