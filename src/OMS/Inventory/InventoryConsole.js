import React, { useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import './Styling/inv_console.css'; 
import Sidebar from './sidebar';

const InventoryConsole = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoverData, setHoverData] = useState(null);

  const inventoryData = [
    { skuId: '34567', productId: '23', productName: 'Sporty Runner', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'L', color: 'Blue', quantity: 50, price: '$60' },
    { skuId: '12345', productId: '45', productName: 'Cool Sneakers', category: 'Shoes', description: 'Lorem ipsum dolor', size: 'M', color: 'Red', quantity: 30, price: '$80' },
    { skuId: '67890', productId: '67', productName: 'Formal Shoes', category: 'Shoes', description: 'Lorem ipsum', size: 'S', color: 'Black', quantity: 40, price: '$100' },
    { skuId: '23456', productId: '89', productName: 'Running Shoes', category: 'Shoes', description: 'Lorem', size: 'XL', color: 'White', quantity: 20, price: '$90' },
    { skuId: '78901', productId: '10', productName: 'Casual Shoes', category: 'Shoes', description: 'Lorem Ipsum', size: 'XXL', color: 'Green', quantity: 25, price: '$70' },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const result = inventoryData.find(item => item.skuId === searchTerm);
    if (result) {
      setHoverData(result);
    }
  };

  const closePopup = () => {
    setHoverData(null);
  };

  return (
    <Container fluid className="p-4">
      <Row>
        {/* <Col md={2}>
          <Sidebar />
        </Col> */}
        <Col md={10}>
          <Row className="mb-4">
            <Col md={10}>
              <input
                type="text"
                className="custom-input"
                placeholder="Search by SKU"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={2}>
              <Button variant="outline-secondary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>SKU ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.skuId}</td>
                      <td>{item.productId}</td>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>{item.size}</td>
                      <td>{item.color}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
      {hoverData && (
        <div className="popup">
          <div className="popup-header">
            <span className="close-btn" onClick={closePopup}>&times;</span>
          </div>
          <div className="popup-content">
          <h3>Item Details</h3>
            {Object.entries(hoverData).map(([key, value], index) => (
              <div key={index}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default InventoryConsole;
