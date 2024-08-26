import React, { useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import './Styling/inv_location.css'; 
import Sidebar from './sidebar'; 

const InventoryLocation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const inventoryData = [
        { skuId: '34567', productId: '23', productName: 'Sporty Runner', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'L', color: 'Blue', quantity: '50', price: '$60', warehouse: 'Hyderabad' },
        { skuId: '12345', productId: '45', productName: 'Cool Sneakers', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'M', color: 'Red', quantity: '30', price: '$40', warehouse: 'Bangalore' },
        { skuId: '67890', productId: '67', productName: 'Formal Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'S', color: 'Black', quantity: '40', price: '$150', warehouse: 'Chennai' },
        { skuId: '23456', productId: '89', productName: 'Running Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'XL', color: 'Silver', quantity: '20', price: '$1000', warehouse: 'Guntur' },
        { skuId: '78901', productId: '10', productName: 'Casual Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'XXL', color: 'Green', quantity: '25', price: '$80', warehouse: 'Vijayawada' },
    ];

    const handleSearch = () => {
        const item = inventoryData.find(data => data.skuId === searchTerm);
        if (item) {
            setSelectedItem(item);
            setShowPopup(true);
        } else {
            alert('No item found with the given SKU ID');
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedItem(null);
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
                                className="form-control"
                                placeholder="Search by SKU"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                                        <th>Warehouse</th>
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
                                            <td>{item.warehouse}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    {showPopup && selectedItem && (
                        <div className="popup">
                            <div className="popup-content">
                                <span className="close" onClick={closePopup}>&times;</span>
                                <h3>Item Details</h3>
                                <ul>
                                    {Object.entries(selectedItem).map(([key, value], index) => (
                                        <li key={index}><strong>{key}:</strong> {value}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    
                </Col>
            </Row>
        </Container>
    );
};

export default InventoryLocation;

