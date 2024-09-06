import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, cancelOrder } from '../ReduxToolkit/OrderSlice'; 
import { Container, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';

const OrderUpdate = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orderData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [disabledOrders, setDisabledOrders] = useState([]); 
  const [cancelAllDisabled, setCancelAllDisabled] = useState(false);

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

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setFilteredData((prevData) =>
      prevData.map((item) => ({ ...item, selected: !selectAll }))
    );
  };

  const handleCheckboxChange = (orderId) => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.orderId === orderId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleCancelOrder = (orderId, orderStatus) => {
    if (orderStatus === 'CONFIRMED' || orderStatus === 'DISPATCHED') {
      dispatch(cancelOrder(orderId))
        .then(() => {
          setDisabledOrders((prev) => [...prev, orderId]); 
          alert('Order has been canceled successfully');
          dispatch(fetchOrders()); 
        })
        .catch((error) => console.error('Error canceling order:', error));
    } else {
      alert(`Unable to cancel order because it is already ${orderStatus.replace(/_/g, ' ').toLowerCase()}.`);
    }
  };

  const handleCancelAll = () => {
    const selectedOrders = filteredData.filter((item) => item.selected);
    if (selectedOrders.length > 0) {
      Promise.all(
        selectedOrders.map((item) => {
          if (item.orderStatus === 'CONFIRMED' || item.orderStatus === 'DISPATCHED') {
            return dispatch(cancelOrder(item.orderId))
              .then(() => item.orderId)
              .catch((error) => console.error('Error canceling order:', error));
          } else {
            alert(`Unable to cancel order ID ${item.orderId} because it is already ${item.orderStatus.replace(/_/g, ' ').toLowerCase()}.`);
            return Promise.reject();
          }
        })
      )
        .then((canceledOrderIds) => {
          setDisabledOrders((prev) => [...prev, ...canceledOrderIds]); 
          setCancelAllDisabled(true); 
          alert('Selected orders have been canceled successfully');
          dispatch(fetchOrders()); 
        })
        .catch(() => {
          alert('Error canceling some orders');
        });
    } else {
      alert('No orders selected for cancellation');
    }
  };

  return (
    <div className='content-section'>
      <Container fluid className="p-4">
        <Row>
          <Col md={12}>
            <Row className="mb-4">
              <Col md={4}>
                <InputGroup style={{ border: '1px solid black', borderRadius: '7px', overflow: 'hidden' }}>
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
              <Col className="d-flex justify-content-end align-items-center">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                <label htmlFor="selectAll" className="ms-2">Select All</label>
                <Button
                  variant="outline-secondary"
                  className="ms-3"
                  onClick={handleCancelAll}
                  disabled={cancelAllDisabled}
                  style={{ backgroundColor: '#dd1e25', color: '#fff', border: 'none' }}
                >
                  Cancel ALL
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table bordered hover responsive className="w-100 data-table">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Order ID</th>
                      <th>Order Total</th>
                      <th>Payment Method</th>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Pincode</th>
                      <th>Order Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.orderId}>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.selected || false}
                              onChange={() => handleCheckboxChange(item.orderId)}
                            />
                          </td>
                          <td>{item.orderId}</td>
                          <td>{item.totalPrice}</td>
                          <td>{item.paymentMethod}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>{item.city}</td>
                          <td>{item.state}</td>
                          <td>{item.pincode}</td>
                          <td>{item.orderStatus}</td>
                          <td>
                            <Button
                              variant='outline-danger' 
                              onClick={() => handleCancelOrder(item.orderId, item.orderStatus)}
                              disabled={disabledOrders.includes(item.orderId) || item.orderStatus === 'CANCELLED'}
                              style={{ backgroundColor: '#dd1e25', color: '#fff', border: 'none' }}
                            >
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12" className="text-center">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderUpdate;
