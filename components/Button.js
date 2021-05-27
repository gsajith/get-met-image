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
  cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
  display: flex;
  &:hover {
    ${(props) => !props.disabled && "background: rgba(0,0,0,.4);"}
  }
  &:focus {
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.5);
  }
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
