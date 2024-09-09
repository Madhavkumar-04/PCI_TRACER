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
  margin: auto;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
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
  margin-bottom: 0.5rem;
`;

const Form2 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      receiverDetails: {
        ...prevData.receiverDetails,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.receiverDetails.name) newErrors.name = 'Name is required';
    if (!formData.receiverDetails.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.receiverDetails.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.receiverDetails.address) newErrors.address = 'Address is required';
    if (!formData.receiverDetails.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.receiverDetails.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    return newErrors;
  };

  const handlePrevious = () => {
    navigate('/form1');
  };

  const handleNext = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      navigate('/form3');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <FormContainer>
      <h2>Receiver Address</h2>
      <InputRow>
        <Label>
          Name:
          <Input type="text" name="name" value={formData.receiverDetails.name || ''} onChange={handleChange} required />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </Label>
        <Label>
          Email:
          <Input type="email" name="email" value={formData.receiverDetails.email || ''} onChange={handleChange} required />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Label>
      </InputRow>
      <InputRow>
        <Label>
          Address:
          <Input type="text" name="address" value={formData.receiverDetails.address || ''} onChange={handleChange} required />
          {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
        </Label>
        <Label>
          Phone Number:
          <Input type="tel" name="phone" value={formData.receiverDetails.phone || ''} onChange={handleChange} required />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </Label>
      </InputRow>
      <Button onClick={handlePrevious}>Previous</Button>
      <Button onClick={handleNext}>Next</Button>
    </FormContainer>
  );
};

export default Form2;
