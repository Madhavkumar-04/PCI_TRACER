import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const Form3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      shipingDetails: {
        ...prevData.shipingDetails,
        [e.target.name]: e.target.value
      }
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.shipingDetails.shippingMethod) newErrors.shippingMethod = 'Shipping Method is required';
    if (!formData.shipingDetails.trackingNumber) newErrors.trackingNumber = 'Tracking Number is required';
    if (!formData.shipingDetails.shippingAddress) newErrors.shippingAddress = 'Shipping Address is required';
    if (!formData.shipingDetails.shippingPhone) newErrors.shippingPhone = 'Phone Number is required';
    return newErrors;
  };

  const handlePrevious = () => {
    navigate('/form2');
  };

  const handleNext = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      navigate('/form4');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <FormContainer>
      <h2>Shipping Details</h2>
      <InputRow>
        <Label>
          Shipping Method:
          <Input 
            type="text" 
            name="shippingMethod" 
            value={formData.shipingDetails.shippingMethod || ''} 
            onChange={handleChange} 
            required 
          />
          {errors.shippingMethod && <ErrorMessage>{errors.shippingMethod}</ErrorMessage>}
        </Label>
        <Label>
          Tracking Number:
          <Input 
            type="text" 
            name="trackingNumber" 
            value={formData.shipingDetails.trackingNumber || ''} 
            onChange={handleChange} 
            required 
          />
          {errors.trackingNumber && <ErrorMessage>{errors.trackingNumber}</ErrorMessage>}
        </Label>
      </InputRow>
      <InputRow>
        <Label>
          Shipping Address:
          <Input 
            type="text" 
            name="shippingAddress" 
            value={formData.shipingDetails.shippingAddress || ''} 
            onChange={handleChange} 
            required 
          />
          {errors.shippingAddress && <ErrorMessage>{errors.shippingAddress}</ErrorMessage>}
        </Label>
        <Label>
          Phone Number:
          <Input 
            type="tel" 
            name="shippingPhone" 
            value={formData.shipingDetails.shippingPhone || ''} 
            onChange={handleChange} 
            required 
          />
          {errors.shippingPhone && <ErrorMessage>{errors.shippingPhone}</ErrorMessage>}
        </Label>
      </InputRow>
      <Button onClick={handlePrevious}>Previous</Button>
      <Button onClick={handleNext}>Next</Button>
    </FormContainer>
  );
};

export default Form3;
