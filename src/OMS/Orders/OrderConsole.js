import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../ReduxToolkit/OrderSlice';
import { Container, Row, Col, Table, InputGroup, FormControl, Button, Modal } from 'react-bootstrap';

const OrderConsole = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orderData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Track the selected order for modal

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

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col md={4}>
          <InputGroup>
            <FormControl
              placeholder="Search by Order ID"
              aria-label="Search by Order ID"
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
          <Table bordered hover responsive className="w-100">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Delivery Date</th>
                <th>Shipping Address</th>
                <th>Actions</th> {/* Actions column for buttons */}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.orderId}>
                    <td>{item.orderId}</td>
                    <td>{item.name}</td>
                    <td>{item.orderDate}</td>
                    <td>{item.status}</td>
                    <td>{item.totalAmount}</td>
                    <td>{item.paymentStatus}</td>
                    <td>{item.deliveryDate}</td>
                    <td>{item.shippingAddress}</td>
                    <td>
                      <Button 
                        variant="info" 
                        size="sm" 
                        onClick={() => handleShowModal(item)}
                      >
                        See Order Details
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal for Order Details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
              <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Total Amount:</strong> {selectedOrder.totalAmount}</p>
              <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
              <p><strong>Delivery Date:</strong> {selectedOrder.deliveryDate}</p>
              <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
            </div>
          ) : (
            <p>No order selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderConsole;
