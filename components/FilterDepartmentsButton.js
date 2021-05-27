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
  border-radius: ${(props) => (props.shown ? "0px 0px 8px 8px" : "8px")};
  transition: background 300ms ease-in-out;
  cursor: pointer;
  margin-right: 8px;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  &:focus {
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.5);
  }
`;

const FilterDepartmentsButton = (props) => {
  return (
    <StyledButton {...props}>
      <img src={"/Filter.svg"} />
    </StyledButton>
  );
};

export default FilterDepartmentsButton;
