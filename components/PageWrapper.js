import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => (props.color ? props.color : "#dadada")};
  transition: background 300ms ease-in-out;
`;

export default PageWrapper;
