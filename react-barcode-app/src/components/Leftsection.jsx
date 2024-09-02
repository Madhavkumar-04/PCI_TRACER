import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LeftSectionContainer = styled.aside`
  grid-area: left;
  background: #2c2c2c; /* Dark background */
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #333; /* Border to create a box effect */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Shadow effect */
  display: flex;
  flex-direction: column;
`;

const Option = styled.div`
  background: #2c2c2c; /* Slightly lighter than the section background */
  color: #f0f0f0;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #3a3a3a; /* Darker shade on hover */
  }
`;

const LeftSection = () => {
  const navigate = useNavigate();

  const handleOptionClick = (path) => {
    navigate(path);
  };

  return (
    <LeftSectionContainer>
      <Option onClick={() => handleOptionClick('/')}>Home</Option>
      <Option onClick={() => handleOptionClick('/orders')}>Orders</Option>
      <Option onClick={() => handleOptionClick('/orders')}>Option 3</Option>
      <Option onClick={() => handleOptionClick('/orders')}>Option 4</Option>
      <Option onClick={() => handleOptionClick('/orders')}>Option 5</Option>
      <Option onClick={() => handleOptionClick('/orders')}>Option 6</Option>
    </LeftSectionContainer>
  );
};

export default LeftSection;
