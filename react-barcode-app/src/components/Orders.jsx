import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  padding: 20px;
`;

const OrderItem = styled.div`
  background: #2c2c2c;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const DetailsContainer = styled.div`
  background: #2c2c2c;
  padding: 10px;
  border-radius: 8px;
  overflow-x: auto;
`;

const JSONTree = styled.div`
  margin-left: 20px;
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
        <strong>{key}: </strong>
        {typeof value === 'object' && value !== null ? (
          renderObject(value)
        ) : (
          <span>{value !== undefined && value !== null ? value.toString() : 'null'}</span>
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
          <DetailsContainer>{renderObject(parseDetails(order.details))}</DetailsContainer>
        </OrderItem>
      ))}
    </OrdersContainer>
  );
};

export default Orders;
