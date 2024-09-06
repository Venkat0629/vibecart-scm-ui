// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
// import './Styling/inv_location.css';

// const AdjustInventory = () => {
//   const [inventoryData, setInventoryData] = useState([
//     { skuId: '34567', productId: '23', productName: 'Sporty Runner', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'L', color: 'Blue', quantity: '50', price: '$60', warehouse: 'Hyderabad' },
//     { skuId: '12345', productId: '45', productName: 'Cool Sneakers', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'M', color: 'Red', quantity: '30', price: '$40', warehouse: 'Bangalore' },
//     { skuId: '67890', productId: '67', productName: 'Formal Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'S', color: 'Black', quantity: '40', price: '$150', warehouse: 'Chennai' },
//     { skuId: '23456', productId: '89', productName: 'Running Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'XL', color: 'Silver', quantity: '20', price: '$1000', warehouse: 'Guntur' },
//     { skuId: '78901', productId: '10', productName: 'Casual Shoes', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'XXL', color: 'Green', quantity: '25', price: '$80', warehouse: 'Vijayawada' },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectAll, setSelectAll] = useState(false);
//   const [editingSkuId, setEditingSkuId] = useState(null);
//   const [editableFields, setEditableFields] = useState({});

//   const handleSearchChange = (e) => setSearchTerm(e.target.value);

//   const handleSearch = () => console.log('Search term:', searchTerm);

//   const handleSelectAllChange = (e) => {
//     const isChecked = e.target.checked;
//     setSelectAll(isChecked);
//     setInventoryData((prevData) =>
//       prevData.map((item) => ({ ...item, selected: isChecked }))
//     );
//   };

//   const handleCheckboxChange = (skuId) => {
//     setInventoryData((prevData) =>
//       prevData.map((item) =>
//         item.skuId === skuId ? { ...item, selected: !item.selected } : item
//       )
//     );
//   };

//   const handleEdit = (skuId) => {
//     setEditingSkuId(skuId);
//     const itemToEdit = inventoryData.find((item) => item.skuId === skuId);
//     setEditableFields({ ...itemToEdit });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditableFields((prevFields) => ({ ...prevFields, [name]: value }));
//   };

//   const handleUpdate = () => {
//     setInventoryData((prevData) =>
//       prevData.map((item) =>
//         item.skuId === editingSkuId ? { ...editableFields } : item
//       )
//     );
//     setEditingSkuId(null);
//     setEditableFields({});
//   };

//   const handleUpdateSelected = () => {
//     const selectedItems = inventoryData.filter((item) => item.selected);
//     console.log('Selected items for bulk update:', selectedItems);
//   };

//   const filteredData = inventoryData.filter(
//     (item) =>
//       item.skuId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container fluid className="p-4">
//       <Row>
//         <Col md={12}>
//           <Row className="mb-4">
//             <Col md={4}>
//               <InputGroup>
//                 <FormControl
//                   placeholder="Search by SKU"
//                   aria-label="Search by SKU"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   className="custom-input"
//                 />
//                 <Button variant="outline-secondary" onClick={handleSearch}>
//                   Search
//                 </Button>
//               </InputGroup>
//             </Col>
//           </Row>
//           <Row className="mb-3">
//             <Col className="d-flex justify-content-end align-items-center">
//               <input
//                 type="checkbox"
//                 id="selectAll"
//                 checked={selectAll}
//                 onChange={handleSelectAllChange}
//               />
//               <label htmlFor="selectAll" className="ms-2">Select All</label>
//               <Button variant="outline-secondary" className="ms-3" onClick={handleUpdateSelected}>
//                 Update Selected
//               </Button>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Table bordered hover responsive className="w-100">
//                 <thead>
//                   <tr>
//                     <th>Select</th>
//                     <th>SKU ID</th>
//                     <th>Product ID</th>
//                     <th>Product Name</th>
//                     <th>Category</th>
//                     <th>Description</th>
//                     <th>Size</th>
//                     <th>Color</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Warehouse</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.length > 0 ? (
//                     filteredData.map((item) => (
//                       <tr key={item.skuId}>
//                         <td>
//                           <input
//                             type="checkbox"
//                             checked={item.selected || false}
//                             onChange={() => handleCheckboxChange(item.skuId)}
//                           />
//                         </td>
//                         <td>{item.skuId}</td>
//                         <td>{item.productId}</td>
//                         <td>
//                           {editingSkuId === item.skuId ? (
//                             <input
//                               type="text"
//                               name="productName"
//                               value={editableFields.productName}
//                               onChange={handleInputChange}
//                               className="form-control"
//                             />
//                           ) : (
//                             item.productName
//                           )}
//                         </td>
//                         <td>
//                           {editingSkuId === item.skuId ? (
//                             <input
//                               type="text"
//                               name="category"
//                               value={editableFields.category}
//                               onChange={handleInputChange}
//                               className="form-control"
//                             />
//                           ) : (
//                             item.category
//                           )}
//                         </td>
//                         <td>
//                           {editingSkuId === item.skuId ? (
//                             <input
//                               type="text"
//                               name="description"
//                               value={editableFields.description}
//                               onChange={handleInputChange}
//                               className="form-control"
//                             />
//                           ) : (
//                             item.description
//                           )}
//                         </td>
//                         <td>
//                           {editingSkuId === item.skuId ? (
//                             <input
//                               type="text"
//                               name="size"
//                               value={editableFields.size}
//                               onChange={handleInputChange}
//                               className="form-control"
//                             />
//                           ) : (
//                             item.size
//                           )}
//                         </td>
//                         <td>
//                           {editingSkuId === item.skuId ? (
//                             <input
//                               type="text"
//                               name="color"
//                               value={editableFields.color}
//                               onChange={handleInputChange}
//                               className="form-control"
//                             />
//                           ) : (
//                             item.color
//                           )}
//                         </td>
//                         <td>
//                           {editingSkuId === item.skuId ? (
//                             <input
//                               type="number"
//                               name="quantity"
//                               value={editableFields.quantity}
//                               onChange={handleInputChange}
//                               className="form-control"
//                             />
//                           ) : (
//                             item.quantity
//                           )}
//                         </td>
//                         <td>
//                           {editingSkuId === item.skuId ? (
//                             <input
//                               type="text"
//                               name="price"
//                               value={editableFields.price}
//                               onChange={handleInputChange}
//                               className="form-control"
//                             />
//                           ) : (
//                             item.price
//                           )}
//                         </td>
//                         <td>
//                           {editingSkuId === item.skuId ? (
//                             <input
//                               type="text"
//                               name="warehouse"
//                               value={editableFields.warehouse}
//                               onChange={handleInputChange}
//                               className="form-control"
//                             />
//                           ) : (
//                             item.warehouse
//                           )}
//                         </td>
//                         <td>
//                           <div className="d-flex">
//                             <Button
//                               variant="outline-secondary"
//                               onClick={() => handleEdit(item.skuId)}
//                               disabled={editingSkuId === item.skuId}
//                               className="me-2"
//                             >
//                               Edit
//                             </Button>
//                             <Button
//                               variant="outline-secondary"
//                               onClick={handleUpdate}
//                               disabled={editingSkuId !== item.skuId}
//                               className="me-2"
//                             >
//                               Update
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="12" className="text-center">
//                         No data found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdjustInventory;
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import './Styling/inv_location.css';
// import { ClipLoader } from 'react-spinners';

// const AdjustInventory = () => {
//   const [inventoryData, setInventoryData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectAll, setSelectAll] = useState(false);
//   const [editingRows, setEditingRows] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3);

//   // Fetch inventory data from the API
//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         const response = await fetch('http://localhost:9015/vibe-cart/inventory/get-all-inventories');
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         setInventoryData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching inventory data:', error);
//         setLoading(false);
//       }
//     };
//     fetchInventoryData();
//   }, []);

//   const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
//   const handleSelectAllChange = (e) => {
//     const isChecked = e.target.checked;
//     setSelectAll(isChecked);
//     setInventoryData((prevData) =>
//       prevData.map((item) => ({ ...item, selected: isChecked }))
//     );
//   };

//   const handleCheckboxChange = (skuId) => {
//     setInventoryData((prevData) =>
//       prevData.map((item) =>
//         item.skuId === skuId ? { ...item, selected: !item.selected } : item
//       )
//     );
//   };

//   const handleEdit = (skuId) => setEditingRows((prevRows) => ({ ...prevRows, [skuId]: true }));

//   const handleInputChange = (e, skuId) => {
//     const { name, value } = e.target;
//     if (name === 'quantity' && (value < 0 || isNaN(value))) return;
//     setInventoryData((prevData) =>
//       prevData.map((item) => (item.skuId === skuId ? { ...item, [name]: value } : item))
//     );
//   };

//   const handleUpdate = (skuId) => {
//     const itemToUpdate = inventoryData.find((item) => item.skuId === skuId);
//     fetch('http://localhost:9015/vibe-cart/inventory/update-single-inventory', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         sku: itemToUpdate.skuId,
//         quantityToUpdate: itemToUpdate.quantity,
//         warehouseLocation: itemToUpdate.warehouse,
//       }),
//     })
//       .then((response) => response.text())
//       .then(() => {
//         Swal.fire({ icon: 'success', title: 'Updated', text: 'Quantity updated successfully!' });
//         setEditingRows((prevRows) => ({ ...prevRows, [skuId]: false }));
//         setSelectAll(false);
//       })
//       .catch((error) => {
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update inventory!' });
//         console.error('Error updating inventory:', error);
//       });
//   };

//   const handleUpdateSelected = () => {
//     const selectedItems = inventoryData.filter((item) => item.selected);
//     const requestBody = selectedItems.map((item) => ({
//       sku: item.skuId,
//       quantityToUpdate: item.quantity,
//       warehouseLocation: item.warehouse,
//     }));
//     fetch('http://localhost:9015/vibe-cart/inventory/update-multiple-inventories', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => response.text())
//       .then(() => {
//         Swal.fire({ icon: 'success', title: 'Updated', text: 'Quantity updated successfully in inventories!' });
//         setSelectAll(false);
//       })
//       .catch((error) => {
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update the quantity in inventories!' });
//         console.error('Error updating inventory:', error);
//       });
//   };
//   const truncateDescription = (description) => {
//     const words = description.split(' ');
//     return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : description;
//   };
//   // Pagination Logic
//   const filteredData = inventoryData.filter((item) =>
//     String(item.skuId).toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Get limited number of pages for pagination (e.g. Prev, 1, 2, 3, 4, Next)
//   const getPageNumbers = () => {
//     let pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       if (i === 1 || i === totalPages || (i >= currentPage && i < currentPage + 4)) {
//         pages.push(i);
//       } else if (i === currentPage + 4 && totalPages > 5) {
//         pages.push('...');
//         break;
//       }
//     }
//     return pages;
//   };
//   if (loading) {
//     return (
//       <Container fluid className="p-4">
//         <Row className="justify-content-center align-items-center" style={{ height: '60vh' }}>
//           <Col className="text-center">
//             <ClipLoader color="#007bff" size={50} />
//             <div className="mt-2">Loading data...</div>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="p-4">
//       {/* <Row>
        
//           </Row> */}
//           <Row className="mb-3">
//           <Col md={12}>
//           <Row className="mb-4">
//             <Col md={4}>
//               <InputGroup>
//                 <FormControl
//                   placeholder="Search by SKU"
//                   aria-label="Search by SKU"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//                 <Button variant="primary">Search</Button>
//               </InputGroup>
//             </Col>
//             <Col className="d-flex justify-content-end align-items-center">
//               <input type="checkbox" id="selectAll" checked={selectAll} onChange={handleSelectAllChange} />
//               <label htmlFor="selectAll" className="ms-2">Select All</label>
//               <Button variant="success" className="ms-3" onClick={handleUpdateSelected}>Update Selected</Button>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Table bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Select</th>
//                     <th>SKU ID</th>
//                     <th>Product Name</th>
//                     <th>Category</th>
//                     <th>Description</th>
//                     <th>Size</th>
//                     <th>Color</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Warehouse</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.length > 0 ? (
//                     currentItems.map((item) => (
//                       <tr key={item.skuId}>
//                         <td><input type="checkbox" checked={item.selected || false} onChange={() => handleCheckboxChange(item.skuId)} /></td>
//                         <td>{item.skuId}</td>
//                         <td>{item.productName}</td>
//                         <td>{item.category}</td>
//                         <td  title={item.description}>{truncateDescription(item.description)}</td>
//                         <td>{item.size}</td>
//                         <td>{item.color}</td>
//                         <td>
//                           {editingRows[item.skuId] ? (
//                             <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleInputChange(e, item.skuId)} />
//                           ) : item.quantity}
//                         </td>
//                         <td>{item.price}</td>
//                         <td>{item.warehouse}</td>
//                         <td>
//                           {editingRows[item.skuId] ? (
//                             <Button variant="primary" onClick={() => handleUpdate(item.skuId)}>Save</Button>
//                           ) : (
//                             <Button variant="secondary" onClick={() => handleEdit(item.skuId)}>Edit</Button>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="11" className="text-center">No data found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>

//                <div className="d-flex justify-content-center">
//                     <Pagination>
//                       <Pagination.Prev
//                         onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
//                         disabled={currentPage === 1}
//                       />
//                       {getPageNumbers().map((number, index) =>
//                         number === '...' ? (
//                           <Pagination.Ellipsis key={index} />
//                         ) : (
//                           <Pagination.Item
//                             key={index}
//                             active={currentPage === number}
//                             onClick={() => paginate(number)}
//                           >
//                             {number}
//                           </Pagination.Item>
//                         )
//                       )}
//                       <Pagination.Next
//                         onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                       />
//                     </Pagination>
//                   </div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdjustInventory;
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Pagination,
  Alert,
} from 'react-bootstrap';
import Swal from 'sweetalert2';
 
const AdjustInventory = () => {
  const [inventoryData, setInventoryData] = useState([
    { skuId: 73920866, warehouseId: 'INV0975', availableQuantity: 78 },
    { skuId: 97368659, warehouseId: 'INV6794', availableQuantity: 45 },
    { skuId: 34876532, warehouseId: 'INV1346', availableQuantity: 98 },
    { skuId: 43783827, warehouseId: 'INV4273', availableQuantity: 56 },
    { skuId: 84724253, warehouseId: 'INV8575', availableQuantity: 12 },
    { skuId: 26478484, warehouseId: 'INV8498', availableQuantity: 89 }
  ]);
 
  const [sortOrder, setSortOrder] = useState({ field: null, order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
 
  // Modal state
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
 
 
 
  // Search Functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
 
  // ** Filtered data by Warehouse ID **
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
  const currentItems = inventoryData
    .filter(
      (item) =>
        item.skuId.toString().includes(searchTerm) ||
        item.warehouseId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);
 
  const totalPages = Math.ceil(
    inventoryData.filter(
      (item) =>
        item.skuId.toString().includes(searchTerm) ||
        item.warehouseId.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / itemsPerPage
  );
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  // Handle modal
  const handleAddQuantity = (row) => {
    setSelectedRow(row);
    setQuantityToAdd('');
    setValidationMessage('');
    setShowModal(true);
  };
 
  const handleSaveQuantity = () => {
    if (quantityToAdd <= 0) {
      setValidationMessage('Quantity must be greater than 0');
      return;
    }
    setInventoryData((prevData) =>
      prevData.map((item) =>
        item.skuId === selectedRow.skuId
          ? { ...item, availableQuantity: parseInt(item.availableQuantity) + parseInt(quantityToAdd) }
          : item
      )
    );
    setShowModal(false);
    Swal.fire('Success', 'Quantity updated successfully!', 'success');
  };
 
  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <h4 className="mb-4">Inventory Management</h4>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search by SKU ID or Warehouse ID"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
 
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th onClick={() => handleSort('skuId')} className="sortable">
                  SKU ID {sortOrder.field === 'skuId' && (sortOrder.order === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('warehouseId')} className="sortable">
                  Warehouse ID {sortOrder.field === 'warehouseId' && (sortOrder.order === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('availableQuantity')} className="sortable">
                  Available Quantity {sortOrder.field === 'availableQuantity' && (sortOrder.order === 'asc' ? '↑' : '↓')}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
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
 
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-center">
              <Pagination.Prev
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
        </Col>
      </Row>
 
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
 
export default AdjustInventory;
 
 

 