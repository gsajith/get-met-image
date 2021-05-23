import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: rgba(0, 0, 0, 0.2);
  outline: none;
  border: none;
  padding: 12px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 8px;
  transition: background 300ms ease-in-out;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  display: flex;
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
