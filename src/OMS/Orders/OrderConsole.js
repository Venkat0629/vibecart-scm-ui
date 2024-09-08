
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../ReduxToolkit/OrderSlice';
import axios from 'axios';
import { Container, Row, Col, Table, InputGroup, FormControl, Button, Modal } from 'react-bootstrap';

const OrderConsole = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orderData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(orderData);
  }, [orderData]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => {
    const filtered = orderData.filter((item) =>
      item.orderId.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleShowDetails = async (orderId) => {
    try {
      // Fetch order details from the API
      const response = await axios.get(`http://localhost:8090/vibe-cart/orders/getOrderById/${orderId}`);
      const orderDetails = response.data.data; // Assuming API response contains order details in data property
      setSelectedOrder(orderDetails);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className='content-section'>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col md={4}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by Order ID"
                aria-label="Search by Order ID"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border-dark rounded-0"
              />
              <Button variant="dark" onClick={handleSearch} className="rounded-0">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Table bordered hover responsive className="text-center border-dark">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Order ID</th>
                  {/* <th>SKU ID</th> */}
                  <th>Order Total</th>
                  {/* <th>Payment Method</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.orderId} onClick={() => handleShowDetails(item.orderId)} style={{ cursor: 'pointer' }}>
                      <td className="text-primary">{item.orderId}</td>
                      {/* <td>{item.skuId}</td> */}
                      <td>${item.totalPrice.toFixed(2)}</td>
                      {/* <td>{item.paymentMethod}</td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted">No orders found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Modal for Order Details */}
      {selectedOrder && (
        
      
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
  <Modal.Header closeButton className="border-0 pb-0">
    <Modal.Title className="text-dark">Order Details - {selectedOrder.orderId}</Modal.Title>
  </Modal.Header>
  <Modal.Body className="bg-light" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
    <Container>
      {/* Order and Customer Information */}
      <Row className="mb-3">
      <Col md={4}>
          <h5 className="font-weight-bold" style={{ textAlign: 'left', fontSize: '14px', color: '#dd1e25', marginBottom: '1rem' }}>
            Customer Information
          </h5>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Name:</strong> {selectedOrder.customer.customerName}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Email:</strong> {selectedOrder.customer.email}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Phone Number:</strong> {selectedOrder.customer.phoneNumber}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Address:</strong> {selectedOrder.customer.customerAddress}</p>
        </Col>
        <Col md={4}>
          <h5 className="font-weight-bold" style={{ textAlign: 'left', fontSize: '14px', color: '#dd1e25', marginBottom: '1rem' }}>
            Order Information
          </h5>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Delivery Date:</strong> {new Date(selectedOrder.estimated_delivery_date).toLocaleDateString()}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
        </Col>
        
        <Col md={4}>
          <h5 className="font-weight-bold" style={{ textAlign: 'left', fontSize: '14px', color: '#dd1e25', marginBottom: '1rem' }}>
            Payment Information
          </h5>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Sub Amount:</strong> ${selectedOrder.subTotal.toFixed(2)}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Offer ID:</strong> {selectedOrder.offerId}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Discount Price:</strong> ${selectedOrder.discountPrice.toFixed(2)}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>          
          
        </Col>
      </Row>

      {/* Shipping, Billing, and Payment Information */}
      <Row className="mb-3">
        <Col md={4}>
          <h5 className="font-weight-bold" style={{ textAlign: 'left', fontSize: '14px', color: '#dd1e25', marginBottom: '1rem' }}>
            Shipping Address
          </h5>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Name:</strong> {selectedOrder.shippingAddress.name}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Email:</strong> {selectedOrder.shippingAddress.email}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Phone:</strong> {selectedOrder.shippingAddress.phoneNumber}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Address:</strong> {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}, {selectedOrder.shippingAddress.zipcode}</p>
        </Col>
        <Col md={4}>
          <h5 className="font-weight-bold" style={{ textAlign: 'left', fontSize: '14px', color: '#dd1e25', marginBottom: '1rem' }}>
            Billing Address
          </h5>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Name:</strong> {selectedOrder.billingAddress.name}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Email:</strong> {selectedOrder.billingAddress.email}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Phone:</strong> {selectedOrder.billingAddress.phoneNumber}</p>
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}><strong>Address:</strong> {selectedOrder.billingAddress.address}, {selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.state}, {selectedOrder.billingAddress.zipcode}</p>
        </Col>
       
      </Row>

      {/* Order Items Table */}
      <Row className="mb-3">
        <Col>
          <h5 className="font-weight-bold" style={{ textAlign: 'left', fontSize: '14px', color: '#dd1e25', marginBottom: '1rem' }}>
            Ordered Items
          </h5>
          <Table bordered hover size="sm" className="text-center">
            <thead className="bg-light">
              <tr>
                <th>SKU ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '14px' }}>
              {selectedOrder.orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.skuId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  </Modal.Body>
  <Modal.Footer className="bg-light border-0">
    <Button variant="dark" onClick={handleCloseModal} style={{ padding: '0.5rem 1rem' }}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

      )}
    </div>
  );
};

export default OrderConsole;
