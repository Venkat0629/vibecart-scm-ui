import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
import './Styling/inv_location.css';

const AdjustInventory = () => {
  const [inventoryData, setInventoryData] = useState([
    { skuId: '34567', productId: '23', productName: 'Sporty Runner', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'L', color: 'Blue', quantity: '50', price: '$60', warehouse: 'Hyderabad' },
    { skuId: '12345', productId: '45', productName: 'Cool Sneakers', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'M', color: 'Red', quantity: '30', price: '$40', warehouse: 'Bangalore' },
    { skuId: '67890', productId: '67', productName: 'Formal Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'S', color: 'Black', quantity: '40', price: '$150', warehouse: 'Chennai' },
    { skuId: '23456', productId: '89', productName: 'Running Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'XL', color: 'Silver', quantity: '20', price: '$1000', warehouse: 'Guntur' },
    { skuId: '78901', productId: '10', productName: 'Casual Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'XXL', color: 'Green', quantity: '25', price: '$80', warehouse: 'Vijayawada' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [editingSkuId, setEditingSkuId] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => console.log('Search term:', searchTerm);

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setInventoryData((prevData) =>
      prevData.map((item) => ({ ...item, selected: isChecked }))
    );
  };

  const handleCheckboxChange = (skuId) => {
    setInventoryData((prevData) =>
      prevData.map((item) =>
        item.skuId === skuId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleEdit = (skuId) => {
    setEditingSkuId(skuId);
    const itemToEdit = inventoryData.find((item) => item.skuId === skuId);
    setEditableFields({ ...itemToEdit });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleUpdate = () => {
    setInventoryData((prevData) =>
      prevData.map((item) =>
        item.skuId === editingSkuId ? { ...editableFields } : item
      )
    );
    setEditingSkuId(null);
    setEditableFields({});
  };

  const handleUpdateSelected = () => {
    const selectedItems = inventoryData.filter((item) => item.selected);
    console.log('Selected items for bulk update:', selectedItems);
  };

  const filteredData = inventoryData.filter(
    (item) =>
      item.skuId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={12}>
          <Row className="mb-4">
            <Col md={4}>
              <InputGroup>
                <FormControl
                  placeholder="Search by SKU"
                  aria-label="Search by SKU"
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
              <Button variant="outline-secondary" className="ms-3" onClick={handleUpdateSelected}>
                Update Selected
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table bordered hover responsive className="w-100">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>SKU ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Warehouse</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item.skuId}>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.selected || false}
                            onChange={() => handleCheckboxChange(item.skuId)}
                          />
                        </td>
                        <td>{item.skuId}</td>
                        <td>{item.productId}</td>
                        <td>
                          {editingSkuId === item.skuId ? (
                            <input
                              type="text"
                              name="productName"
                              value={editableFields.productName}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            item.productName
                          )}
                        </td>
                        <td>
                          {editingSkuId === item.skuId ? (
                            <input
                              type="text"
                              name="category"
                              value={editableFields.category}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            item.category
                          )}
                        </td>
                        <td>
                          {editingSkuId === item.skuId ? (
                            <input
                              type="text"
                              name="description"
                              value={editableFields.description}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            item.description
                          )}
                        </td>
                        <td>
                          {editingSkuId === item.skuId ? (
                            <input
                              type="text"
                              name="size"
                              value={editableFields.size}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            item.size
                          )}
                        </td>
                        <td>
                          {editingSkuId === item.skuId ? (
                            <input
                              type="text"
                              name="color"
                              value={editableFields.color}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            item.color
                          )}
                        </td>
                        <td>
                          {editingSkuId === item.skuId ? (
                            <input
                              type="number"
                              name="quantity"
                              value={editableFields.quantity}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            item.quantity
                          )}
                        </td>
                        <td>
                          {editingSkuId === item.skuId ? (
                            <input
                              type="text"
                              name="price"
                              value={editableFields.price}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            item.price
                          )}
                        </td>
                        <td>
                          {editingSkuId === item.skuId ? (
                            <input
                              type="text"
                              name="warehouse"
                              value={editableFields.warehouse}
                              onChange={handleInputChange}
                              className="form-control"
                            />
                          ) : (
                            item.warehouse
                          )}
                        </td>
                        <td>
                          <div className="d-flex">
                            <Button
                              variant="outline-secondary"
                              onClick={() => handleEdit(item.skuId)}
                              disabled={editingSkuId === item.skuId}
                              className="me-2"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-secondary"
                              onClick={handleUpdate}
                              disabled={editingSkuId !== item.skuId}
                              className="me-2"
                            >
                              Update
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center">
                        No data found
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

export default AdjustInventory;
