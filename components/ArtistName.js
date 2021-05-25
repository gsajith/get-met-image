import styled from "styled-components";

const ArtistName = styled.div`
  ${(props) => (props.color ? "color: " + props.color + ";" : "")}
  font-size: ${(props) => (props.offscreen ? "32px" : "4vw")};
  margin-top: ${(props) => (props.offscreen ? "-12px" : "-1.5vw")};
  margin-bottom: ${(props) => (props.offscreen ? "12px" : "1.5vw")};
  line-height: 2;
  max-width: 700px;
  width: 90%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01vw;
  @media (min-width: 800px) {
    font-size: 32px;
    margin-top: -12px;
    margin-bottom: 12px;
  }
  transition: all 300ms ease-in-out;
`;

export default ArtistName;
