import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => (props.color ? props.color : "#FFFFFF")};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  opacity: ${(props) => (props.opacity ? props.opacity : 0)};
  transition: opacity 200ms 500ms ease-in-out, background 200ms ease-in-out;
  pointer-events: none;
`;
const LoadingPage = ({ color, opacity }) => {
  return (
    <Overlay color={color} opacity={opacity}>
      <LoadingSpinner
        size={"7vw"}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          zIndex: 3,
          transform: "translate(-50%, -50%)",
        }}
      />
    </Overlay>
  );
};

export default LoadingPage;
