import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import DataSection from './DataSection';
import BarcodeSection from './BarcodeSection';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  width: 70vw; /* 95% of viewport width */
  height: 90vh; /* 95% of viewport height */
  max-width: 95vw; /* Ensure it doesn’t exceed viewport width */
  max-height: 95vh; /* Ensure it doesn’t exceed viewport height */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  text-align: center;
  overflow: auto; /* Allow scrolling if content overflows */

  @media (max-width: 700px) {
    width: 95vw; /* 95% of viewport width */
  height: 95vh; /* 95% of viewport height */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

const Modal = ({ isOpen, onClose, formData, onEdit, setFormData }) => {
  const [showBarcode, setShowBarcode] = useState(false);
  const barcodeRef = useRef(null);
  const [trackno, setTrackno] = useState(null);
  const navigate = useNavigate();

  const handleSaveClick = async (details) => {
    const id = uuidv4();
    setTrackno(id);
    const data = { trackno: id, details };

    try {
      const response = await fetch('http://localhost:5000/api/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setShowBarcode(true);
      setFormData({
        senderDetails: {},
        receiverDetails: {},
        shippingDetails: {},
        priceInfo: {},
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleDownloadPng = () => {
    if (barcodeRef.current) {
      toPng(barcodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${trackno}.png`; // Use trackno directly
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Failed to download barcode:', err);
        });
    }
  };

  const handleDownloadPdf = () => {
    if (barcodeRef.current) {
      toPng(barcodeRef.current)
        .then((dataUrl) => {
          const pdf = new jsPDF();
          pdf.addImage(dataUrl, 'PNG', 0, 0);
          pdf.save(`${trackno}.pdf`); // Use trackno directly
        })
        .catch((err) => {
          console.error('Failed to download barcode:', err);
        });
    }
  };

  if (!isOpen) return null;

  const customOnClose = () => {
    if (showBarcode) {
      navigate('/');
    }
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent id="modal-content">
        <CloseButton onClick={customOnClose}>×</CloseButton>
        {!showBarcode ? (
          <DataSection
            formData={formData}
            onEdit={onEdit}
            onSave={handleSaveClick}
            onClose={onClose}
          />
        ) : (
          <BarcodeSection
            trackno={trackno}
            barcodeValue={formData}
            barcodeRef={barcodeRef}
            onDownloadPng={handleDownloadPng}
            onDownloadPdf={handleDownloadPdf}
          />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
