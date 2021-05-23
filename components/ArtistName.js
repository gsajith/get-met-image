import styled from "styled-components";

const ArtistName = styled.div`
  ${(props) => (props.color ? "color: " + props.color + ";" : "")}
  font-size: 4vw;
  line-height: 2;
  max-width: 700px;
  width: 80vw;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: -1.5vw;
  margin-bottom: 1.5vw;
  letter-spacing: -0.01vw;
  @media (min-width: 800px) {
    font-size: 32px;
    margin-top: -12px;
    margin-bottom: 12px;
  }
  transition: all 300ms ease-in-out;
`;

export default ArtistName;
