import styled from "styled-components";

const ColorSwatch = styled.div`
  width: ${(props) => (props.offscreen ? "16px" : "2vw")};
  height: ${(props) => (props.offscreen ? "12px" : "1.5vw")};
  margin: ${(props) => (props.offscreen ? "2px" : "0.25vw")};
  @media (min-width: 800px) {
    width: 16px;
    height: 12px;
    margin: 2px;
  }
`;

export default ColorSwatch;
