import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  transition: background 300ms ease-in-out;
  position: absolute;
  height: 300px;
  width: 300px;
  bottom: 19px;
  left: 8px;
  z-index: 4;
  border-radius: 8px 8px 8px 0px;
  color: white;
  padding: 16px 8px;
  overflow-y: scroll;
`;

const DepartmentChecker = styled.div`
  font-size: 10px;
  padding: 8px;
  transition: background 300ms ease-in-out;
  cursor: pointer;
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  display: flex;
  flex-direction: row;
`;

const CheckCircle = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 10px;
  margin-right: 8px;
  margin-left: -4px;
  background: ${(props) => (props.selected ? "#FFFFFF" : "transparent")};
  border: 1px solid white;
`;

const ClearButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  color: white;
  border: none;
  outline: none;
  border: 1px solid white;
  padding: 4px 8px;
  border-radius: 8px;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 300ms ease-in-out;
  z-index: 5;
  &:hover {
    opacity: 1;
  }
`;

const DepartmentsFilter = ({
  departments,
  selectedDepartments,
  setSelectedDepartments,
}) => {
  return (
    <>
      <FilterContainer>
        {selectedDepartments.length > 0 && (
          <ClearButton onClick={() => setSelectedDepartments([])}>
            Clear
          </ClearButton>
        )}
        {departments.map((department) => (
          <DepartmentChecker
            key={department.departmentId}
            onClick={() => {
              const oldSelected = [...selectedDepartments];
              if (oldSelected.indexOf(department.departmentId) !== -1) {
                oldSelected.splice(
                  oldSelected.indexOf(department.departmentId),
                  1
                );
              } else {
                oldSelected.push(department.departmentId);
              }
              setSelectedDepartments(oldSelected);
            }}
            selected={selectedDepartments.includes(department.departmentId)}>
            <CheckCircle
              selected={selectedDepartments.includes(department.departmentId)}
            />
            {department.displayName}
          </DepartmentChecker>
        ))}
      </FilterContainer>
    </>
  );
};

export default DepartmentsFilter;
