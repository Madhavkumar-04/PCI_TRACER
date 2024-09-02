import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: 1rem;
  background: #2c2c2c;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const Label = styled.h3`
  margin-bottom: 0.5rem;
  color: #f0f0f0;
`;

const Data = styled.div`
  margin-bottom: 1rem;
  color: #f0f0f0;
`;

const EditButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

const SaveButton = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  &:hover {
    background: #218838;
  }
`;

const NestedData = styled.div`
  margin-left: 1rem;
  border-left: 1px solid #444;
  padding-left: 1rem;
`;

const renderData = (data) => {
  if (typeof data === 'object' && data !== null) {
    return Object.entries(data).map(([key, value]) => (
      <div key={key}>
        <strong>{key}:</strong>
        <NestedData>{renderData(value)}</NestedData>
      </div>
    ));
  }
  return <span>{data}</span>;
};

const DataSection = ({ formData, onEdit, onSave,onClose }) => {
  return (
    <>
      <Section>
        <Label>Sender Address</Label>
        <Data>{renderData(formData.form1)}</Data>
        <EditButton onClick={() => onEdit('form1')}>Edit</EditButton>
      </Section>
      <Section>
        <Label>Receiver Address</Label>
        <Data>{renderData(formData.form2)}</Data>
        <EditButton onClick={() => onEdit('form2')}>Edit</EditButton>
      </Section>
      <Section>
        <Label>Shipping Details</Label>
        <Data>{renderData(formData.form3)}</Data>
        <EditButton onClick={() => onEdit('form3')}>Edit</EditButton>
      </Section>
      <Section>
        <Label>Price</Label>
        <Data>{renderData(formData.form4)}</Data>
        <EditButton onClick={() => onClose()}>Edit</EditButton>
      </Section>
      <SaveButton onClick={() => onSave(formData)}>Save</SaveButton>
    </>
  );
};

export default DataSection;
