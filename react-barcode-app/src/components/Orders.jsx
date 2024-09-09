import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  padding: 20px;
  background: #1e1e1e;
  color: #fff;
  height: auto; /* Ensures the container adjusts to content height */
  width:auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    width: 90vw; /* Adjust width for very small screens */
  }
`;

const OrderItem = styled.div`
  background: #333;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #444;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  word-wrap: break-word; /* Ensures text wraps within the container */
  height: auto; /* Ensures the container adjusts to content height */

  @media (max-width: 768px) {
    padding: 15px;
    margin: 5px 0;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin: 3px 0;
  }
`;

const DetailsContainer = styled.div`
  background: #2a2a2a;
  padding: 10px;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 10px;
  border: 1px solid #444;
  height: auto; /* Ensures the container adjusts to content height */

  @media (max-width: 768px) {
    padding: 8px;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    margin-top: 5px;
  }
`;

const JSONTree = styled.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #444;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.5;

  @media (max-width: 768px) {
    margin-left: 15px;
    padding-left: 8px;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    margin-left: 10px;
    padding-left: 5px;
    font-size: 0.75rem;
  }
`;

const JSONKey = styled.span`
  color: #9cdcfe;
  font-weight: bold;
`;

const JSONValue = styled.span`
  color: ${({ type }) => (type === 'string' ? '#ce9178' : type === 'number' ? '#b5cea8' : '#dcdcaa')};
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tracks');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const renderObject = (obj) => {
    return Object.entries(obj).map(([key, value], index) => (
      <JSONTree key={index}>
        <JSONKey>{key}:</JSONKey>{' '}
        {typeof value === 'object' && value !== null ? (
          renderObject(value)
        ) : (
          <JSONValue type={typeof value}>{value !== undefined && value !== null ? value.toString() : 'null'}</JSONValue>
        )}
      </JSONTree>
    ));
  };

  const parseDetails = (details) => {
    try {
      return JSON.parse(details);
    } catch (error) {
      console.error('Error parsing details:', error);
      return null;
    }
  };

  return (
    <OrdersContainer>
      <h1>Orders</h1>
      {orders.map((order) => (
        <OrderItem key={order._id}>
          <p><strong>Track Number:</strong> {order.trackno}</p>
          <p><strong>Details:</strong></p>
          <DetailsContainer>{renderObject(parseDetails(order.details) || {})}</DetailsContainer>
        </OrderItem>
      ))}
    </OrdersContainer>
  );
};

export default Orders;
