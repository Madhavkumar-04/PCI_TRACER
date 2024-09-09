import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LeftSectionContainer = styled.aside`
  grid-area: left;
  background: #2c2c2c; /* Dark background */
  padding: 1rem;
  border: 1px solid #333; /* Border to create a box effect */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Shadow effect */
  display: flex;
  flex-direction: column;
  position: fixed; /* Keep it fixed on the side */
  top: 8rem; /* Space for top bar */
  left: 0;
  height: calc(100vh - 4rem); /* Full height minus top bar */
  width: 250px; /* Adjusted width */
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  z-index: 1000; /* Ensure it overlays other elements */
  
  @media (min-width: 769px) {
    display: flex;
    transform: translateX(0); /* Always visible on large screens */
    position: relative; /* Change positioning on large screens */
    height: auto; /* Adjust height */
    top: 0rem; /* Reset top position */
    padding:2rem;
  }
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

const LeftSection = ({ isOpen }) => {
  return (
    <LeftSectionContainer isOpen={isOpen}>
      <Option as={Link} to="/">Home</Option>
      <Option as={Link} to="/orders">Orders</Option>
      <Option as={Link} to="/form1">Fill form</Option>
      <Option as={Link} to="/orders">Option 4</Option>
      <Option as={Link} to="/orders">Option 5</Option>
      <Option as={Link} to="/orders">Option 6</Option>
    </LeftSectionContainer>
  );
};

export default LeftSection;
