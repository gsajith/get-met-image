import styled from "styled-components";

const CopiedNotification = styled.div`
  position: absolute;
  top: 48px;
  right: 16px;
  text-align: right;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 8px;
  z-index: 3;
  pointer-events: none;
  opacity: ${(props) => (props.opacity ? props.opacity : 0)};
  transition: opacity 300ms ease-in-out;
`;

export default CopiedNotification;
