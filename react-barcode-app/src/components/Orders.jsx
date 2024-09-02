import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  padding: 20px;
  background: #1e1e1e;
  min-height: 100vh;
  color: #fff;
`;

const OrderItem = styled.div`
  background: #333;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #444;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const DetailsContainer = styled.div`
  background: #2a2a2a;
  padding: 10px;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 10px;
  border: 1px solid #444;
`;

const JSONTree = styled.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #444;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.5;
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
          <DetailsContainer>{renderObject(parseDetails(order.details))}</DetailsContainer>
        </OrderItem>
      ))}
    </OrdersContainer>
  );
};

export default Orders;
