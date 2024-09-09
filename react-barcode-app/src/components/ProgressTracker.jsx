import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  padding: 1rem;
  background: #2c2c2c; /* Keep the background dark for contrast */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: auto; /* Center align by default */
  display: flex;
  flex-direction: column; /* Default to column layout */
  align-items: center;
  height: auto; /* Default height auto */

  @media (max-width: 1400px) {
    flex-direction: row; /* Change to row layout on medium screens */
    overflow-x: auto; /* Allow horizontal scrolling if necessary */
    white-space: nowrap; /* Prevent wrapping of items */
    align-items: center; /* Center align items vertically on medium screens */
    justify-content: center; /* Center align items horizontally on medium screens */
  }

  @media (min-width: 1400px) {
    margin: auto; /* Center align on large screens */
    align-items: flex-end; /* Align items to the right on large screens */
  }
`;

const ProgressList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 1400px) {
    flex-direction: row; /* Arrange items in a row on medium screens */
    width: auto; /* Adjust width for row layout */
  }
`;

const ProgressItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;

  /* Dot style */
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    width: 1rem;
    height: 1rem;
    background: ${({ active }) => (active ? '#28a745' : '#ccc')}; /* Green when active, gray otherwise */
    border-radius: 50%;
    border: 2px solid ${({ active }) => (active ? '#28a745' : '#ccc')}; /* Green border when active, gray otherwise */
    transform: translateX(-50%);
    transition: background 0.3s ease, border 0.3s ease;
  }

  /* Line connecting dots */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 2px;
    height: 3rem;
    background: ${({ active }) => (active ? '#28a745' : '#ccc')}; /* Green line when active, gray otherwise */
    top: 100%;
    transform: translateX(-50%);
    transition: background 0.3s ease;
  }

  @media (max-width: 1400px) {
    margin-bottom: 0;
    margin-right: 2rem; /* Space between items on medium screens */
    &:not(:last-child)::after {
      display: none; /* Hide lines connecting dots in row layout */
    }
  }
`;

const ProgressLink = styled(Link)`
  text-decoration: none;
  color: ${({ active }) => (active ? '#fff' : '#fff')}; /* White text when active, white otherwise */
  padding: 0.5rem 1rem;
  background: ${({ active }) => (active ? '#28a745' : 'transparent')}; /* Green background when active, transparent otherwise */
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1400px) {
    font-size: 0.75rem; /* Smaller font size on medium screens */
    padding: 0.4rem 0.8rem;
    display: inline-block; /* Ensure proper spacing on small screens */
  }
`;

const ProgressTracker = ({ formData }) => {
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1400);
  const location = useLocation();
  const currentPath = location.pathname;

  const forms = [
    { path: '/form1', name: 'Sender Details', filled: !!formData.form1 && Object.keys(formData.form1).length > 0 },
    { path: '/form2', name: 'Receiver Details', filled: !!formData.form2 && Object.keys(formData.form2).length > 0 },
    { path: '/form3', name: 'Shipping Details', filled: !!formData.form3 && Object.keys(formData.form3).length > 0 },
    { path: '/form4', name: 'Price Info', filled: !!formData.form4 && Object.keys(formData.form4).length > 0 },
  ];

  const currentIndex = forms.findIndex(form => form.path === currentPath);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth <= 1400);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ProgressContainer>
      <ProgressList>
        {forms.map((form, index) => (
          <ProgressItem
            key={index}
            active={index <= currentIndex}
          >
            <ProgressLink active={index <= currentIndex} to={form.path}>
              {!isTablet && form.name} {/* Hide names on small screens */}
            </ProgressLink>
          </ProgressItem>
        ))}
      </ProgressList>
    </ProgressContainer>
  );
};

export default ProgressTracker;
