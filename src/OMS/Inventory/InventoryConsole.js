import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import './Styling/inv_console.css';

const InventoryConsole = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const inventoryData = [
    { skuId: '34567', productId: '23', productName: 'Sporty Runner', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'L', color: 'Blue', quantity: 50, price: '$60' },
    { skuId: '12345', productId: '45', productName: 'Cool Sneakers', category: 'Shoes', description: 'Lorem ipsum dolor', size: 'M', color: 'Red', quantity: 30, price: '$80' },
    { skuId: '67890', productId: '67', productName: 'Formal Shoes', category: 'Shoes', description: 'Lorem ipsum', size: 'S', color: 'Black', quantity: 40, price: '$100' },
    { skuId: '23456', productId: '89', productName: 'Running Shoes', category: 'Shoes', description: 'Lorem', size: 'XL', color: 'White', quantity: 20, price: '$90' },
    { skuId: '78901', productId: '10', productName: 'Casual Shoes', category: 'Shoes', description: 'Lorem Ipsum', size: 'XXL', color: 'Green', quantity: 25, price: '$70' },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);  
    const result = inventoryData.filter(item =>
      item.skuId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(result);
  };
  const handleSearch = () => console.log('Search term:', searchTerm);

  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <Row className="mb-4">
            <Col md={4} sm={12}>
              <InputGroup>
                <FormControl
                  placeholder="Search by SKU"
                  aria-label="Search by SKU"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-secondary" onClick={handleSearch}>
                  Search
                </Button>
              </InputGroup>
            </Col>   
          </Row>
          <Row>
            <Col>
              <div className="table-responsive">
                <Table bordered hover className="w-100">
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
                    {(filteredData.length > 0 ? filteredData : inventoryData).map((item, index) => (
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
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default InventoryConsole;
