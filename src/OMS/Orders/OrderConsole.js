import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../ReduxToolkit/OrderSlice';
import { Container, Row, Col, Table, InputGroup, FormControl, Button } from 'react-bootstrap';

const OrderConsole = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orderData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(orderData);
  }, [orderData]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => {
    const filtered = orderData.filter((item) =>
      String(item.orderId).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
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
          <Table striped bordered hover responsive className="w-100">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>SKU ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Size</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Coupon Used</th>
                <th>Discounted Price</th>
                <th>Payment Method</th>
                <th>Payable Price</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.orderId}>
                    <td>{item.orderId}</td>
                    <td>{item.skuId}</td>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.size}</td>
                    <td>{item.color}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.couponUsed}</td>
                    <td>{item.discountedPrice}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.payablePrice}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.pincode}</td>
                    <td>{item.orderStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConsole;
