import styled from "styled-components";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => (props.color ? props.color : "#FFFFFF")};
  transition: background 300ms ease-in-out;
`;

export default Page;
