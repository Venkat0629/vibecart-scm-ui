import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, updateOrderOnServer } from '../ReduxToolkit/OrderSlice';
import { Container, Row, Col, Button, Table, InputGroup, FormControl, Form } from 'react-bootstrap';

const OrderUpdate = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orderData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editableFields, setEditableFields] = useState({ orderStatus: '' });
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

  const handleUpdateSelected = () => {
    const selectedOrders = filteredData.filter((item) => item.selected);
    selectedOrders.forEach((order) => {
      dispatch(updateOrderOnServer(order))
        .then(() => {
          dispatch(fetchOrders());
        })
        .catch((error) => console.error('Error updating order:', error));
    });
  };

  const handleCheckboxChange = (orderId) => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.orderId === orderId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleEdit = (orderId) => {
    setEditingOrderId(orderId);
    const itemToEdit = filteredData.find((item) => item.orderId === orderId);
    setEditableFields({ orderStatus: itemToEdit.orderStatus });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleUpdate = () => {
    const updatedOrder = {
      orderId: editingOrderId,
      orderStatus: editableFields.orderStatus,
    };

    dispatch(updateOrderOnServer(updatedOrder))
      .then(() => {
        dispatch(fetchOrders());
        setEditingOrderId(null);
        setEditableFields({ orderStatus: '' });
        alert('Order status updated successfully');
      })
      .catch((error) => console.error('Error updating order:', error));
  };

  return (
    <Container fluid className="p-4">
      <Row >
        <Col md={12}>
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
          <Row className="mb-3">
            <Col className="d-flex justify-content-end align-items-center">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
              <label htmlFor="selectAll" className="ms-2">Select All</label>
              <Button variant="warning" className="ms-3" onClick={handleUpdateSelected}>
                Update Selected
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table  bordered hover responsive className="w-100">
                <thead>
                  <tr>
                    <th>Select</th>
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
                        <td>
                          {editingOrderId === item.orderId ? (
                            <Form.Control
                              as="select"
                              name="orderStatus"
                              value={editableFields.orderStatus}
                              onChange={handleInputChange}
                            >
                              <option value="DISPATCHED">DISPATCHED</option>
                              <option value="PENDING">PENDING</option>
                              <option value="ON_THE_WAY">ON_THE_WAY</option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                              <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                              <option value="PICKUP_COURIER">PICKUP_COURIER</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                            </Form.Control>
                          ) : (
                            item.orderStatus
                          )}
                        </td>
                        <td>
                          {editingOrderId === item.orderId ? (
                            <Button variant="success" onClick={handleUpdate}>
                              Update
                            </Button>
                          ) : (
                            <Button variant="info" onClick={() => handleEdit(item.orderId)}>
                              Edit
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="24" className="text-center">
                        No matching records found.
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
  );
};

export default OrderUpdate;
