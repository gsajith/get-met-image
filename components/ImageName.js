import styled from "styled-components";

const ImageName = styled.div`
  ${(props) => (props.color ? "color: " + props.color + ";" : "")}
  font-size: ${(props) => (props.offscreen ? "16px" : "2vw")};
  margin-top: ${(props) => (props.offscreen ? "12px" : "1vw")};
  max-width: 700px;
  line-height: 2;
  width: 90%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (min-width: 800px) {
    font-size: 16px;
    margin-top: 12px;
  }
  transition: all 300ms ease-in-out;
`;

export default ImageName;
