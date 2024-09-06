import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import CanvasJSReact from '@canvasjs/react-charts'; // Assuming CanvasJSReact is installed
import "./Styling/Omsdashboard.css"
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Omsdashboard = () => {
    const [inventoryData, setInventoryData] = useState({
        totalInventories: 200,
        availableProducts: 120,
        reservedProducts: 80,
    });

    const [warehouseData, setWarehouseData] = useState([
        { warehouseId: 'INV7864', availableQty: 100, reservedQty: 50, totalQty: 150 },
        { warehouseId: 'INV9754', availableQty: 80, reservedQty: 30, totalQty: 110 },
        { warehouseId: 'INV7654', availableQty: 50, reservedQty: 20, totalQty: 70 },
        { warehouseId: 'INV9632', availableQty: 100, reservedQty: 50, totalQty: 150 },
        { warehouseId: 'INV6732', availableQty: 80, reservedQty: 30, totalQty: 110 },
        { warehouseId: 'INV9632', availableQty: 50, reservedQty: 20, totalQty: 70 }
    ]);

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const inventoryResponse = await fetch('http://localhost:9015/vibe-cart/inventory');
                const data = await inventoryResponse.json();
                setInventoryData({
                    totalInventories: data.totalInventories || 200,
                    availableProducts: data.availableProducts || 120,
                    reservedProducts: data.reservedProducts || 80,
                });
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventoryData();
    }, []);

    // CanvasJS Pie Chart Options for Inventory Data
    const inventoryChartOptions = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // Highly styled theme
        title: { text: "Inventory Distribution", fontColor: "#ffffff", fontWeight: "bold" },
        data: [{
            type: "pie",
            startAngle: 60,
            toolTipContent: "<b>{label}</b>: {y}",
            indexLabelFontSize: 16,
            indexLabelFontColor: "#ffffff",
            indexLabel: "{label} : {y}",
            dataPoints: [
                { label: "Available Products", y: inventoryData.availableProducts },
                { label: "Reserved Products", y: inventoryData.reservedProducts }
            ]
        }]
    };

    // Function for animated number increment
    const animateNumber = (element, value) => {
        let startValue = 0;
        const duration = 2000; // 2 seconds for animation
        const increment = Math.ceil(value / (duration / 30)); // Increment value for every 30ms

        const interval = setInterval(() => {
            startValue += increment;
            if (startValue >= value) {
                clearInterval(interval);
                startValue = value;
            }
            document.getElementById(element).innerText = startValue;
        }, 30);
    };

    useEffect(() => {
        animateNumber('totalInventories', inventoryData.totalInventories);
        animateNumber('availableProducts', inventoryData.availableProducts);
        animateNumber('reservedProducts', inventoryData.reservedProducts);
    }, [inventoryData]);

    return (
        <div>
            <div className='dashboard'>
                <Container fluid className="p-4">
                    <Row>
                        {/* Inventory Report */}
                        <Col md={6}>
                            <Card className='text-center mb-4'>
                                <Card.Header>
                                    <Card.Title>Inventory Report</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <div className="animated-number">
                                            <h2 id="totalInventories" className="falling-number"></h2>
                                            <p>Total Inventories</p>
                                        </div>
                                        <div className="animated-number">
                                            <h2 id="availableProducts" className="falling-number"></h2>
                                            <p>Available Products</p>
                                        </div>
                                        <div className="animated-number">
                                            <h2 id="reservedProducts" className="falling-number"></h2>
                                            <p>Reserved Products</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className='text-center'>
                                <Card.Header>
                                    <Card.Title>Inventory Status Distribution</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <CanvasJSChart options={inventoryChartOptions} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Warehouse Data Table */}
                    <Row style={{paddingTop:"2rem"}}>
                        <Col className='col-6'>
                            <Card className='text-center'>
                                <Card.Header>
                                    <Card.Title>Warehouse Inventory</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Warehouse ID</th>
                                                <th>Available Quantity</th>
                                                <th>Reserved Quantity</th>
                                                <th>Total Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {warehouseData.map((warehouse, index) => (
                                                <tr key={index}>
                                                    <td>{warehouse.warehouseId}</td>
                                                    <td>{warehouse.availableQty}</td>
                                                    <td>{warehouse.reservedQty}</td>
                                                    <td>{warehouse.totalQty}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Omsdashboard;
