import React from 'react';
import { Container, Row, Col,  Card } from 'react-bootstrap';
import Sidebar from './sidebar'; 

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <Container fluid className="p-4">
                <Row>
                    {/* <Col md={2}>
                        <Sidebar /> 
                    </Col> */}
                    <Col md={10}>
                        <Row className="mb-4">
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Orders Report:</Card.Title>
                                        <div className="d-flex justify-content-around">
                                            <div>
                                                <h2>456</h2>
                                                <p>Total Orders</p>
                                            </div>
                                            <div>
                                                <h2>200</h2>
                                                <p>Processed Orders</p>
                                            </div>
                                            <div>
                                                <h2>156</h2>
                                                <p>Orders Completed</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Inventory Report:</Card.Title>
                                        <div className="d-flex justify-content-around">
                                            <div>
                                                <h2>100</h2>
                                                <p>Total Products</p>
                                            </div>
                                            <div>
                                                <h2>49</h2>
                                                <p>Total Jackets</p>
                                            </div>
                                            <div>
                                                <h2>51</h2>
                                                <p>Total Shoes</p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
