import styled from 'styled-components';

export const FormContainer = styled.div`
  background: #1e1e1e; /* Dark background */
  border: 1px solid #333; /* Border to create a box effect */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Shadow effect */
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const FormHeader = styled.h2`
  color: #f0f0f0;
  margin-bottom: 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  color: #ccc;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  background: #2c2c2c;
  color: #f0f0f0;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #0056b3;
  }
`;
