import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../Modal';
// import Modal from '../Modal'; // Import the Modal component

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

const Form4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const handleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      priceInfo: {
        ...prevData.priceInfo,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handlePrevious = () => {
    navigate('/form3');
  };

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (formName) => {
    navigate(`/${formName}`);
    setEditForm(formName);
  };

  return (
    <FormContainer>
      <h2>Price</h2>
      <InputRow>
        <Label>
          Price:
          <Input type="number" name="price" value={formData.priceInfo.price || ''} onChange={handleChange} required />
        </Label>
        <Label>
          Currency:
          <Input type="text" name="currency" value={formData.priceInfo.currency || ''} onChange={handleChange} required />
        </Label>
      </InputRow>
      <Button onClick={handlePrevious}>Previous</Button>
      <Button onClick={handleSave}>Save</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        onEdit={handleEdit}
      />
    </FormContainer>
  );
};

export default Form4;
