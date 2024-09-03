import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [processedOrders, setProcessedOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [inventoryData, setInventoryData] = useState({
        totalProducts: 100,
        jackets: 49,
        shoes: 51
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8090/vibe-cart/orders/getAllOrders', {
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
                    setOrders(result.data);

                    const total = result.data.length;
                    const processed = result.data.filter(order => order.orderStatus !== 'CANCELLED').length;
                    const completed = result.data.filter(order => order.orderStatus === 'DELIVERED').length;

                    setTotalOrders(total);
                    setProcessedOrders(processed);
                    setCompletedOrders(completed);

                    createPieChart('orderPieChart', processed, completed, total - processed - completed);
                    createInventoryChart('inventoryPieChart', inventoryData);
                } else {
                    throw new Error('Unexpected response structure');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, [inventoryData]);

    const createPieChart = (elementId, processed, completed, cancelled) => {
        let root = am5.Root.new(elementId);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Custom color set with variations of #dd1e25
        let colors = am5.ColorSet.new(root, {
            colors: [
                am5.color("#dd1e25"), // Base color
                am5.color("#fbb3b5"), // Slightly lighter
                am5.color("#c1121f"), // Slightly darker
                am5.color("#f08080")  // Lighter variation
            ],
            reuse: true
        });

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            })
        );

        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "value",
                categoryField: "category"
            })
        );

        series.set("colors", colors); // Apply the custom color set

        let data = [
            { category: "Processed", value: processed },
            { category: "Completed", value: completed },
            { category: "Cancelled", value: cancelled }
        ];

        series.data.setAll(data);

        series.appear(1000, 100);
        chart.appear(1000, 100);
    };

    const createInventoryChart = (elementId, data) => {
        let root = am5.Root.new(elementId);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Custom color set for inventory chart
        let colors = am5.ColorSet.new(root, {
            colors: [
                am5.color("#dd1e25"), // Base color
                am5.color("#fbb3b5"), // Slightly lighter
                am5.color("#c1121f"), // Slightly darker
                am5.color("#f08080")  // Lighter variation
            ],
            reuse: true
        });

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            })
        );

        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "value",
                categoryField: "category"
            })
        );

        series.set("colors", colors); // Apply the custom color set

        let chartData = [
            { category: "Total Products", value: data.totalProducts },
            { category: "Jackets", value: data.jackets },
            { category: "Shoes", value: data.shoes }
        ];

        series.data.setAll(chartData);

        series.appear(1000, 100);
        chart.appear(1000, 100);
    };

    return (
        <div>
            <div className='dashboard'>
                <Container fluid className="p-4">
                    <Row>
                        {/* Orders Report and Pie Chart */}
                        <Col md={6}>
                            <Card className='text-center mb-4'>
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
                                            <p>Processed Orders</p>
                                        </div>
                                        <div>
                                            <h2>{completedOrders}</h2>
                                            <p>Orders Completed</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className='text-center'>
                                <Card.Header>
                                    <Card.Title>Order Status Distribution</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div id="orderPieChart" style={{ width: "100%", height: "400px" }}></div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Inventory Section with Chart */}
                        <Col md={6}>
                            <Card className='text-center mb-4'>
                                <Card.Header>
                                    <Card.Title>Inventory Report</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-flex justify-content-around">
                                        <div>
                                            <h2>{inventoryData.totalProducts}</h2>
                                            <p>Total Products</p>
                                        </div>
                                        <div>
                                            <h2>{inventoryData.jackets}</h2>
                                            <p>Total Jackets</p>
                                        </div>
                                        <div>
                                            <h2>{inventoryData.shoes}</h2>
                                            <p>Total Shoes</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className='text-center'>
                                <Card.Header>
                                    <Card.Title>Inventory Status Distribution</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div id="inventoryPieChart" style={{ width: "100%", height: "400px" }}></div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
