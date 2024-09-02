import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  position: relative;
  padding: 1rem;
  background: #2c2c2c; /* Keep the background dark for contrast */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ProgressList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
`;

const ProgressLink = styled(Link)`
  text-decoration: none;
  color: ${({ active }) => (active ? '#fff' : '#fff')}; /* White text when active, green otherwise */
  padding: 0.5rem 1rem;
  background: ${({ active }) => (active ? '#28a745' : 'transparent')}; /* Green background when active, transparent otherwise */
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProgressTracker = ({ formData }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const forms = [
    { path: '/', name: 'senderDetails', filled: !!formData.form1 && Object.keys(formData.form1).length > 0 },
    { path: '/form2', name: 'receiverDetails', filled: !!formData.form2 && Object.keys(formData.form2).length > 0 },
    { path: '/form3', name: 'shipingDetails', filled: !!formData.form3 && Object.keys(formData.form3).length > 0 },
    { path: '/form4', name: 'priceInfo', filled: !!formData.form4 && Object.keys(formData.form4).length > 0 },
  ];

  const currentIndex = forms.findIndex(form => form.path === currentPath);

  return (
    <ProgressContainer>
      <ProgressList>
        {forms.map((form, index) => (
          <ProgressItem
            key={index}
            active={index <= currentIndex}
          >
            <ProgressLink to={form.path} active={index <= currentIndex}>
              {form.name}
            </ProgressLink>
          </ProgressItem>
        ))}
      </ProgressList>
    </ProgressContainer>
  );
};

export default ProgressTracker;
