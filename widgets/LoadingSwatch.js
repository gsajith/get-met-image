import React, { useEffect, useState } from "react";
import ColorSwatch from "../components/ColorSwatch";

const LoadingSwatch = ({}) => {
  const [colors, setColors] = useState([
    "#222",
    "#444",
    "#666",
    "#888",
    "#aaa",
    "#ccc",
  ]);

  useEffect(() => {
    setTimeout(() => {
      setColors((colors) => {
        let arr = [...colors];
        arr.unshift(arr.pop());
        return arr;
      });
    }, 1000 / 6);
  }, [colors]);
  return (
    <>
      {colors.map((color, index) => (
        <ColorSwatch
          key={"swatch" + index}
          style={{ backgroundColor: color }}
        />
      ))}
    </>
  );
};

export default LoadingSwatch;
