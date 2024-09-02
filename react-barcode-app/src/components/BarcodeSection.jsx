import React, { useEffect, useRef } from 'react';
import Barcode from 'react-barcode';
import jsPDF from 'jspdf';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  background: ${({ color }) => color || '#007bff'};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ hoverColor }) => hoverColor || '#0056b3'};
    transform: translateY(-2px);
  }

  &:active {
    background: ${({ activeColor }) => activeColor || '#003d7a'};
    transform: translateY(0);
  }
`;

const BarcodeSection = ({ barcodeValue }) => {
  const barcodeRef = useRef();

  useEffect(() => {
    if (!barcodeValue) {
      console.error('No barcode value provided');
    }
  }, [barcodeValue]);

  const serializedBarcodeValue = JSON.stringify(barcodeValue);

  const handleDownloadPNG = () => {
    const svg = barcodeRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'barcode.png';
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleDownloadPDF = () => {
    const svg = barcodeRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(pngFile, 'PNG', 15, 40, 180, 160);
      pdf.save('barcode.pdf');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div ref={barcodeRef}>
      {serializedBarcodeValue ? (
        <Barcode
          value={serializedBarcodeValue}
          width={1}  // Increase the width of the barcode
          height={150}  // Increase the height of the barcode
          displayValue={false}  // Display the value below the barcode
          margin={10}  // Add margin to the barcode
          format="CODE128" // Ensure barcode format is correct
        />
      ) : (
        <p>No barcode data provided</p>
      )}
      <ButtonContainer>
        <Button color="#007bff" hoverColor="#0056b3" onClick={handleDownloadPNG}>Download PNG</Button>
        <Button color="#007bff" hoverColor="#0056b3" onClick={handleDownloadPDF}>Download PDF</Button>
      </ButtonContainer>
    </div>
  );
};

export default BarcodeSection;
