import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import '../Inventory/Styling/dashboard.css';
import API_URLS from '../config';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [processedOrders, setProcessedOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [cancelledOrdersCount, setCancelledOrdersCount] = useState(0);
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const response = await fetch(API_URLS.getAllOrders, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success) {
                    const orderData = result.data;
                    setOrders(orderData);

                    const total = orderData.length;

                    // Filtering and counting
                    const processed = orderData.filter(order => order.orderStatus !== 'COMPLETED' && order.orderStatus !== 'CANCELLED').length;
                    const completed = orderData.filter(order => order.orderStatus.toUpperCase() === 'COMPLETED').length;
                    const cancelled = orderData.filter(order => order.orderStatus.toUpperCase() === 'CANCELLED').length;

                    setTotalOrders(total);
                    setProcessedOrders(processed);
                    setCompletedOrders(completed);
                    setCancelledOrdersCount(cancelled);

                    createPieChart('orderPieChart', processed, completed, cancelled);
                } else {
                    throw new Error('Unexpected response structure');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchInventoryData = async () => {
            try {
                const response = await fetch(API_URLS.getInventoryReport, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success && Array.isArray(result.data)) {
                    const inventory = result.data;

                    // Update state with the inventory data
                    setInventoryData(inventory);
                } else {
                    throw new Error('Unexpected response format: Expected an array inside "data"');
                }
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchOrdersData();
        fetchInventoryData();
    }, []);

    const createPieChart = (elementId, processed, completed, cancelled) => {
        let root = am5.Root.new(elementId);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Remove amCharts watermark
        root._logo.dispose();

        let colors = am5.ColorSet.new(root, {
            colors: [
                am5.color("#dd1e25"),
                am5.color("#fbb3b5"),
                am5.color("#c1121f"),
                am5.color("#f08080")
            ],
            reuse: true
        });

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout,
                radius: am5.percent(40)
            })
        );

        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "value",
                categoryField: "category"
            })
        );

        series.set("colors", colors);

        let data = [
            { category: "Processed", value: processed },
            { category: "Completed", value: completed },
            { category: "Cancelled", value: cancelled }
        ];

        series.data.setAll(data);

        series.appear(1000, 100);
        chart.appear(1000, 100);
    };

    return (
        <div className='content-section'>
            <Container>
                <Row>
                    <Col md={6} className="d-flex flex-column">
                        <Card className='text-center mb-4 card-report'>
                            <Card.Header>
                                <Card.Title>Orders Report</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <h2>{totalOrders}</h2>
                                        <p>Total Orders</p>
                                    </div>
                                    <div>
                                        <h2>{processedOrders}</h2>
                                        <p>Orders in Process</p>
                                    </div>
                                    <div>
                                        <h2>{completedOrders}</h2>
                                        <p>Completed Orders</p>
                                    </div>
                                    <div>
                                        <h2>{cancelledOrdersCount}</h2>
                                        <p>Cancelled Orders</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className='text-center flex-grow-1 card-pie'>
                            <Card.Header>
                                <Card.Title>Order Status Distribution</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div id="orderPieChart" style={{ width: "100%", height: "100%" }}></div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="d-flex flex-column">
                        <Card className='text-center mb-4 card-report'>
                            <Card.Header>
                                <Card.Title>Inventory Report</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <h2>{inventoryData.length}</h2>
                                        <p>Total Warehouses</p>
                                    </div>
                                    <div>
                                        <h2>{inventoryData.reduce((acc, item) => acc + item.availableQuantity, 0)}</h2>
                                        <p>Available Quantity</p>
                                    </div>
                                    <div>
                                        <h2>{inventoryData.reduce((acc, item) => acc + item.reservedQuantity, 0)}</h2>
                                        <p>Reserved Quantity</p>
                                    </div>
                                    <div>
                                        <h2>{inventoryData.reduce((acc, item) => acc + (item.availableQuantity + item.reservedQuantity), 0)}</h2>
                                        <p>Total Quantity</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className='text-center flex-grow-1 card-table'>
                            <Card.Header>
                                <Card.Title>Inventory Details</Card.Title>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column">
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Warehouse ID</th>
                                            <th>Available Quantity</th>
                                            <th>Reserved Quantity</th>
                                            <th>Total Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.warehouseId}</td>
                                                <td>{item.availableQuantity}</td>
                                                <td>{item.reservedQuantity}</td>
                                                <td>{item.availableQuantity + item.reservedQuantity}</td>
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
    );
};

export default Dashboard;
