import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, InputGroup, FormControl, Form } from 'react-bootstrap';
import '../Orders/updateorder.css';

const OrderUpdate = () => {
  const [orderData, setOrderData] = useState([
    { orderId: '34567', skuId: '23345362', productName: 'Sporty Runner', category: 'Shoes', size: 'L', color: 'Blue', quantity: 2, unitPrice: 60, totalPrice: 120, couponUsed: 'JUNBON345', discountedPrice: 10, paymentMethod: 'Cash', payablePrice: 110, name: 'John Doe', email: 'johndoe@gmail.com', phone: '(957) 987-8797', address: 'Jannapriya Homes, Chintalaktuna', city: 'Hyderabad', state: 'Telangana', pincode: '500070', orderStatus: 'Order Confirmed' },
    { orderId: '34566', skuId: '23345363', productName: 'Sporty Runner', category: 'Shoes', size: 'L', color: 'Blue', quantity: 2, unitPrice: 60, totalPrice: 120, couponUsed: 'JUNBON345', discountedPrice: 10, paymentMethod: 'Cash', payablePrice: 110, name: 'John Doe', email: 'johndoe@gmail.com', phone: '(957) 987-8797', address: 'Jannapriya Homes, Chintalaktuna', city: 'Hyderabad', state: 'Telangana', pincode: '500070', orderStatus: 'Order Confirmed' },
    { orderId: '34568', skuId: '23345364', productName: 'Sporty Runner', category: 'Shoes', size: 'L', color: 'Blue', quantity: 2, unitPrice: 60, totalPrice: 120, couponUsed: 'JUNBON345', discountedPrice: 10, paymentMethod: 'Cash', payablePrice: 110, name: 'John Doe', email: 'johndoe@gmail.com', phone: '(957) 987-8797', address: 'Jannapriya Homes, Chintalaktuna', city: 'Hyderabad', state: 'Telangana', pincode: '500070', orderStatus: 'Order Confirmed' },
    { orderId: '34569', skuId: '23345365', productName: 'Sporty Runner', category: 'Shoes', size: 'L', color: 'Blue', quantity: 2, unitPrice: 60, totalPrice: 120, couponUsed: 'JUNBON345', discountedPrice: 10, paymentMethod: 'Cash', payablePrice: 110, name: 'John Doe', email: 'johndoe@gmail.com', phone: '(957) 987-8797', address: 'Jannapriya Homes, Chintalaktuna', city: 'Hyderabad', state: 'Telangana', pincode: '500070', orderStatus: 'Order Confirmed' },
    
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editableFields, setEditableFields] = useState({ orderStatus: '' });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => console.log('Search term:', searchTerm);

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setOrderData((prevData) =>
      prevData.map((item) => ({ ...item, selected: isChecked }))
    );
  };

  const handleCheckboxChange = (orderId) => {
    setOrderData((prevData) =>
      prevData.map((item) =>
        item.orderId === orderId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleEdit = (orderId) => {
    setEditingOrderId(orderId);
    const itemToEdit = orderData.find((item) => item.orderId === orderId);
    setEditableFields({ orderStatus: itemToEdit.orderStatus });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleUpdate = () => {
    setOrderData((prevData) =>
      prevData.map((item) =>
        item.orderId === editingOrderId
          ? { ...item, orderStatus: editableFields.orderStatus }
          : item
      )
    );
    setEditingOrderId(null);
    setEditableFields({ orderStatus: '' });
  };

  const handleUpdateSelected = () => {
    const selectedItems = orderData.filter((item) => item.selected);
    console.log('Selected items for bulk update:', selectedItems);
  };

  const filteredData = orderData.filter(
    (item) =>
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={12}>
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup>
                <FormControl
                  placeholder="Search by Order ID"
                  aria-label="Search by Order ID"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="custom-input"
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
              <Table striped bordered hover responsive className="w-100">
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
                              className="form-control"
                            >
                              <option value="Order Created">Order Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
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
