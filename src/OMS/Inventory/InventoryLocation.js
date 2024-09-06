import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import './Styling/inv_location.css';
import Sidebar from './sidebar';

const InventoryLocation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const inventoryData = [
        { skuId: '34567', productId: '23', productName: 'Sporty Runner', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'L', color: 'Blue', quantity: '50', price: '$60', warehouse: 'Hyderabad' },
        { skuId: '12345', productId: '45', productName: 'Cool Sneakers', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'M', color: 'Red', quantity: '30', price: '$40', warehouse: 'Bangalore' },
        { skuId: '67890', productId: '67', productName: 'Formal Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'S', color: 'Black', quantity: '40', price: '$150', warehouse: 'Chennai' },
        { skuId: '23456', productId: '89', productName: 'Running Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'XL', color: 'Silver', quantity: '20', price: '$1000', warehouse: 'Guntur' },
        { skuId: '78901', productId: '10', productName: 'Casual Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'XXL', color: 'Green', quantity: '25', price: '$80', warehouse: 'Vijayawada' },
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
        <div className='content-section'>
        <Container fluid className="p-4">
            <Row>
                <Col md={12}>
                    <Row className="mb-4">
                        <Col md={4}>
                            <InputGroup style={{ border: '1px solid black',borderRadius: '7px', overflow: 'hidden' }}>
                                <FormControl
                                    placeholder="Search by SKU"
                                    aria-label="Search by SKU"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="custom-input"
                                />
                                <Button variant="outline-secondary" onClick={handleSearch}>
                                    Search
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='table-responsive'>
                                <Table bordered hover className='table data-table'>
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
                                            <th>Warehouse</th>
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
                                                <td>{item.warehouse}</td>
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
        </div>
    );
};

export default InventoryLocation;
