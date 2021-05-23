import styled from "styled-components";

const ImageName = styled.div`
  ${(props) => (props.color ? "color: " + props.color + ";" : "")}
  font-size: 2vw;
  max-width: 700px;
  line-height: 2;
  width: 80vw;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 1vw;
  @media (min-width: 800px) {
    font-size: 16px;
    margin-top: 12px;
  }
  transition: all 300ms ease-in-out;
`;

export default ImageName;
