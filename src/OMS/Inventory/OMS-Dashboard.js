import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import '../Inventory/Styling/dashboard.css';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [processedOrders, setProcessedOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [inventoryData, setInventoryData] = useState({
        totalProducts: 0,
        jackets: 0,
        shoes: 0
    });

    useEffect(() => {
        const fetchOrdersData = async () => {
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
                } else {
                    throw new Error('Unexpected response structure');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchInventoryData = async () => {
            try {
                const response = await fetch('http://localhost:8090/vibe-cart/inventory/get-all-inventories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Directly parse the array from the response
                const inventoryArray = await response.json();
                console.log('API Response:', inventoryArray); // Log the complete response
    
                if (Array.isArray(inventoryArray)) {
                    // Calculate the counts for each category
                    const jacketsCount = inventoryArray.filter(item => item.category === 'Jackets').reduce((total, item) => total + item.quantity, 0);
                    const shoesCount = inventoryArray.filter(item => item.category === 'Shoes').reduce((total, item) => total + item.quantity, 0);
                    const totalProductsCount = inventoryArray.reduce((total, item) => total + item.quantity, 0);
    
                    // Update state with the calculated data
                    setInventoryData({
                        totalProducts: totalProductsCount,
                        jackets: jacketsCount,
                        shoes: shoesCount,
                    });
    
                    // Update the pie chart with the new data
                    createInventoryChart('inventoryPieChart', {
                        totalProducts: totalProductsCount,
                        jackets: jacketsCount,
                        shoes: shoesCount,
                    });
                } else {
                    throw new Error('Unexpected response format: Expected an array');
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

    const createInventoryChart = (elementId, data) => {
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
        <div className='content-section'>
            <Container fluid className="p-4">
                <Row>                        
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
                                        <p>Orders in Process</p>
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
                                <div id="orderPieChart" data-testid="orderPieChart" style={{ width: "100%", height: "400px" }}></div>
                            </Card.Body>
                        </Card>
                    </Col>
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
                                <div id="inventoryPieChart" data-testid="inventoryPieChart" style={{ width: "100%", height: "400px" }}></div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
