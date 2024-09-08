import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, FormControl, InputGroup, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './Styling/inv_console.css'; // Ensure this path is correct
import "../config"
import API_URLS from '../config';
const AdjustInventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: null, order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7); // Default to 10 rows per page

  // Modal state
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  // Fetch Inventory Data
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch(API_URLS.getAllWarehouses);
        const result = await response.json();
        if (result.success) {
          setInventoryData(result.data);
        } else {
          console.error('Failed to fetch inventory data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchInventoryData();
  }, []);

  // Search Functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filtered data by Warehouse ID
  const filteredData = inventoryData.filter(
    (item) =>
      item.warehouseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting Functionality
  const handleSort = (field) => {
    const order = sortOrder.field === field && sortOrder.order === 'asc' ? 'desc' : 'asc';
    setSortOrder({ field, order });
    const sortedData = [...inventoryData].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setInventoryData(sortedData);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle modal
  const handleAddQuantity = (row) => {
    setSelectedRow(row);
    setQuantityToAdd('');
    setValidationMessage('');
    setShowModal(true);
  };

  const handleSaveQuantity = async () => {
    if (quantityToAdd <= 0) {
      setValidationMessage('Quantity must be greater than 0');
      return;
    }

    try {
      const response = await fetch(API_URLS.updateSingleInventory, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sku: selectedRow.skuId,
          quantityToAdd: parseInt(quantityToAdd),
          warehouseId: selectedRow.warehouseId,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setInventoryData((prevData) =>
          prevData.map((item) =>
            item.skuId === selectedRow.skuId
              ? { ...item, availableQuantity: item.availableQuantity + parseInt(quantityToAdd) }
              : item
          )
        );
        setShowModal(false);
        Swal.fire('Success', 'Quantity updated successfully!', 'success');
      } else {
        Swal.fire('Error', result.message, 'error');
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
      Swal.fire('Error', 'Failed to update inventory.', 'error');
    }
  };

  return (
    <Container fluid className="p-4">
      <h3 className="mt-3 mb-3">Inventory Management</h3>
      <Row className="mb-4">
        <Col md={4} className="search-col">
          <InputGroup>
            <FormControl
              placeholder="Search by Warehouse ID"
              value={searchTerm}
              onChange={handleSearchChange}
              className="custom-input"
            />
            <Button variant="outline-secondary" onClick={() => console.log('Search term:', searchTerm)}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered hover className="inventory-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('skuId')} className="sortable">
              SKU ID {sortOrder.field === 'skuId' && (sortOrder.order === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('warehouseId')} className="sortable">
              Warehouse ID {sortOrder.field === 'warehouseId' && (sortOrder.order === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('availableQuantity')} className="sortable">
              Available Quantity {sortOrder.field === 'availableQuantity' && (sortOrder.order === 'asc' ? '🔼' : '🔽')}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="inventory-row">
              <td>{item.skuId}</td>
              <td>{item.warehouseId}</td>
              <td>{item.availableQuantity}</td>
              <td>
                <Button variant="success" onClick={() => handleAddQuantity(item)}>
                  Add Quantity
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          {'<<'}
        </button>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          {'<'}
        </button>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          {'>'}
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          {'>>'}
        </button>
        <span>
          Page <strong>{currentPage} of {totalPages}</strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            style={{ width: '100px' }}
            min="1"
            max={totalPages}
          />
        </span>
      </div>

      {/* Modal for adding quantity */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>SKU ID: {selectedRow?.skuId}</p>
          <p>Warehouse ID: {selectedRow?.warehouseId}</p>
          <p>Available Quantity: {selectedRow?.availableQuantity}</p>
          <InputGroup className="mb-3">
            <FormControl
              type="number"
              placeholder="Enter quantity to add"
              value={quantityToAdd}
              onChange={(e) => {
                setQuantityToAdd(e.target.value);
                setValidationMessage(''); // Clear validation message on input change
              }}
            />
          </InputGroup>
          {validationMessage && (
            <Alert variant="danger">
              {validationMessage}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveQuantity}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdjustInventory;





