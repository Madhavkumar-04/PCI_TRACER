import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Form1 from './components/forms/Form1';
import Form2 from './components/forms/Form2';
import Form3 from './components/forms/Form3';
import Form4 from './components/forms/Form4';
import Modal from './components/Modal'; // Import the Modal component
import Orders from './components/Orders'; // Import the Orders component
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    senderDetails: {},
    receiverDetails: {},
    shipingDetails: {},
    priceInfo: {},
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  return (
    <Router>
      <Layout formData={formData}>
        <Routes>
          <Route path="/" element={<Form1 formData={formData} setFormData={setFormData} />} />
          <Route path="/form2" element={<Form2 formData={formData} setFormData={setFormData} />} />
          <Route path="/form3" element={<Form3 formData={formData} setFormData={setFormData} />} />
          <Route path="/form4" element={<Form4 formData={formData} setFormData={setFormData} handleSave={() => setIsModalOpen(true)} />} />
          <Route path="/orders" element={<Orders />} /> {/* Define the /orders route */}
        </Routes>
      </Layout>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onEdit={(formName) => {
          setEditForm(formName);
          setIsModalOpen(false);
        }}
      />
    </Router>
  );
}

export default App;
