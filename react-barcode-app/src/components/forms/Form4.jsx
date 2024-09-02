import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../Modal'; // Ensure the correct path for Modal import

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #2c2c2c;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  background: #121212;
  color: #fff;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const Form4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      priceInfo: {
        ...prevData.priceInfo,
        [e.target.name]: e.target.value
      }
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.priceInfo.price) newErrors.price = 'Price is required';
    if (!formData.priceInfo.currency) newErrors.currency = 'Currency is required';
    return newErrors;
  };

  const handlePrevious = () => {
    navigate('/form3');
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setIsModalOpen(true);
    } else {
      setErrors(newErrors);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <FormContainer>
      <h2>Price</h2>
      <InputRow>
        <Label>
          Price:
          <Input 
            type="number" 
            name="price" 
            value={formData.priceInfo.price || ''} 
            onChange={handleChange} 
            required 
          />
          {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
        </Label>
        <Label>
          Currency:
          <Input 
            type="text" 
            name="currency" 
            value={formData.priceInfo.currency || ''} 
            onChange={handleChange} 
            required 
          />
          {errors.currency && <ErrorMessage>{errors.currency}</ErrorMessage>}
        </Label>
      </InputRow>
      <Button onClick={handlePrevious}>Previous</Button>
      <Button onClick={handleSave}>Save</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
      />
    </FormContainer>
  );
};

export default Form4;
