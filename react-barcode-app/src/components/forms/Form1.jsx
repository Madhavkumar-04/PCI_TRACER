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
  // margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const Form1 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      senderDetails: {
        ...prevData.senderDetails,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.senderDetails.name) newErrors.name = 'Name is required';
    if (!formData.senderDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.senderDetails.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.senderDetails.address) newErrors.address = 'Address is required';
    if (!formData.senderDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.senderDetails.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      navigate('/form2');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <FormContainer>
      <h2>Sender Address</h2>
      <InputRow>
        <Label>
          Name:
          <Input type="text" name="name" value={formData.senderDetails.name || ''} onChange={handleChange} required />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </Label>
        <Label>
          Email:
          <Input type="email" name="email" value={formData.senderDetails.email || ''} onChange={handleChange} required />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Label>
      </InputRow>
      <InputRow>
        <Label>
          Address:
          <Input type="text" name="address" value={formData.senderDetails.address || ''} onChange={handleChange} required />
          {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
        </Label>
        <Label>
          Phone Number:
          <Input type="tel" name="phone" value={formData.senderDetails.phone || ''} onChange={handleChange} required />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </Label>
      </InputRow>
      <Button onClick={handleNext}>Next</Button>
    </FormContainer>
  );
};

export default Form1;
