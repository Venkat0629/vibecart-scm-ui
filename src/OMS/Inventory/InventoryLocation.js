// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
// import './Styling/inv_location.css';
// import Sidebar from './sidebar';

// const InventoryLocation = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredData, setFilteredData] = useState([]);
//     const[inventoryData, setInventoryData]=useState([]);

//     useEffect(() => {
//         const fetchInventoryData = async () => {
//           try {
//             const response = await fetch('http://localhost:9015/vibe-cart/inventory/get-all-inventories');
//             const data = await response.json();
//             setInventoryData(data);
//           } catch (error) {
//             console.error('Error fetching inventory data:', error);
//           }
//         };
    
//         fetchInventoryData();
//       }, []);

//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         const result = inventoryData.filter(item =>
//             item.skuId.toLowerCase().includes(value.toLowerCase())
//         );
//         setFilteredData(result);
//     };
//     const handleSearch = () => console.log('Search term:', searchTerm);

//     return (
//         <Container fluid className="p-4">
//             <Row>
//                 <Col md={12}>
//                     <Row className="mb-4">
//                         <Col md={4}>
//                             <InputGroup>
//                                 <FormControl
//                                     placeholder="Search by SKU"
//                                     aria-label="Search by SKU"
//                                     value={searchTerm}
//                                     onChange={handleSearchChange}
//                                     className="custom-input"
//                                 />
//                                 <Button variant="outline-secondary" onClick={handleSearch}>
//                                     Search
//                                 </Button>
//                             </InputGroup>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col>
//                             <div className='table-responsive'>
//                                 <Table striped bordered hover className='table'>
//                                     <thead>
//                                         <tr>
//                                             <th>SKU ID</th>
//                                             <th>Product ID</th>
//                                             <th>Product Name</th>
//                                             <th>Category</th>
//                                             <th>Description</th>
//                                             <th>Size</th>
//                                             <th>Color</th>
//                                             <th>Quantity</th>
//                                             <th>Price</th>
//                                             <th>Warehouse</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {(filteredData.length > 0 ? filteredData : inventoryData).map((item, index) => (
//                                             <tr key={index}>
//                                                 <td>{item.skuId}</td>
//                                                 <td>{item.productId}</td>
//                                                 <td>{item.productName}</td>
//                                                 <td>{item.category}</td>
//                                                 <td>{item.description}</td>
//                                                 <td>{item.size}</td>
//                                                 <td>{item.color}</td>
//                                                 <td>{item.quantity}</td>
//                                                 <td>{item.price}</td>
//                                                 <td>{item.warehouse}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default InventoryLocation;
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';
// import './Styling/inv_location.css';
// import ClipLoader from 'react-spinners/ClipLoader'; // Loader

// const InventoryLocation = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredData, setFilteredData] = useState([]);
//     const [inventoryData, setInventoryData] = useState([]);
//     const [loading, setLoading] = useState(true); // Loader state
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 3;

//     useEffect(() => {
//         const fetchInventoryData = async () => {
//             try {
//                 const response = await fetch('http://localhost:9015/vibe-cart/inventory/get-all-inventories');
//                 const data = await response.json();
//                 setInventoryData(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching inventory data:', error);
//                 setLoading(false);
//             }
//         };

//         fetchInventoryData();
//     }, []);

//     const handleSearchChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);

//         const result = inventoryData.filter(item =>
//             item.skuId.toString().includes(value)
//         );
//         setFilteredData(result);
//         setCurrentPage(1); // Reset to first page on search
//     };
//     const truncateDescription = (description) => {
//         const words = description.split(' ');
//         return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : description;
//       };

//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedData = (filteredData.length > 0 ? filteredData : inventoryData).slice(startIndex, endIndex);

//     const totalPages = Math.ceil((filteredData.length > 0 ? filteredData : inventoryData).length / itemsPerPage);
//     const maxButtons = 4; // Number of page buttons to show at a time

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber < 1 || pageNumber > totalPages) return;
//         setCurrentPage(pageNumber);
//     };

//     // Calculate page numbers to show
//     const calculatePageNumbers = () => {
//         let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
//         let end = Math.min(totalPages, start + maxButtons - 1);

//         if (end - start + 1 < maxButtons) {
//             start = Math.max(1, end - maxButtons + 1);
//         }

//         const pages = [];
//         for (let i = start; i <= end; i++) {
//             pages.push(i);
//         }
//         return pages;
//     };

//     const pageNumbers = calculatePageNumbers();

//     return (
//         <Container fluid className="p-4">
//             <Row>
//                 <Col md={12}>
//                     <Row className="mb-4">
//                         <Col md={4} className="custom-input-group">
//                             <InputGroup>
//                                 <FormControl
//                                     placeholder="Search by SKU"
//                                     aria-label="Search by SKU"
//                                     value={searchTerm}
//                                     onChange={handleSearchChange}
//                                     className="custom-input"
//                                 />
//                                 <Button variant="outline-secondary" onClick={() => console.log('Search term:', searchTerm)}>
//                                     Search
//                                 </Button>
//                             </InputGroup>
//                         </Col>
//                     </Row>
//                     {loading ? (
//                         <Row className="justify-content-center align-items-center" style={{ height: '60vh' }}>
//                             <Col className="text-center">
//                                 <ClipLoader color="#007bff" size={50} />
//                                 <div className="mt-2">Loading data...</div>
//                             </Col>
//                         </Row>
//                     ) : (
//                         <>
//                             <Row>
//                                 <Col>
//                                     <div className='table-responsive'>
//                                         <Table striped bordered hover className='table'>
//                                             <thead>
//                                                 <tr>
//                                                     <th>SKU ID</th>
//                                                     <th>Product ID</th>
//                                                     <th>Product Name</th>
//                                                     <th>Category</th>
//                                                     <th>Description</th>
//                                                     <th>Size</th>
//                                                     <th>Color</th>
//                                                     <th>Quantity</th>
//                                                     <th>Price</th>
//                                                     <th>Warehouse</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {paginatedData.length > 0 ? (
//                                                     paginatedData.map((item, index) => (
//                                                         <tr key={index}>
//                                                             <td>{item.skuId}</td>
//                                                             <td>{item.productId}</td>
//                                                             <td>{item.productName}</td>
//                                                             <td>{item.category}</td>
//                                                             <td title={item.description}>{truncateDescription(item.description)}</td>
//                                                             <td>{item.size}</td>
//                                                             <td>{item.color}</td>
//                                                             <td>{item.quantity}</td>
//                                                             <td>{item.price}</td>
//                                                             <td>{item.warehouse}</td>
//                                                         </tr>
//                                                     ))
//                                                 ) : (
//                                                     <tr>
//                                                         <td colSpan="10" className="text-center">
//                                                             No data found
//                                                         </td>
//                                                     </tr>
//                                                 )}
//                                             </tbody>
//                                         </Table>
//                                     </div>
//                                 </Col>
//                             </Row>
//                             <Row className="mt-4">
//                                 <Col className="d-flex justify-content-center">
//                                     <Pagination>
//                                         <Pagination.Prev
//                                             onClick={() => handlePageChange(currentPage - 1)}
//                                             disabled={currentPage === 1}
//                                         />
//                                         {pageNumbers.map((number) => (
//                                             <Pagination.Item
//                                                 key={number}
//                                                 active={number === currentPage}
//                                                 onClick={() => handlePageChange(number)}
//                                             >
//                                                 {number}
//                                             </Pagination.Item>
//                                         ))}
//                                         <Pagination.Next
//                                             onClick={() => handlePageChange(currentPage + 1)}
//                                             disabled={currentPage === totalPages}
//                                         />
//                                     </Pagination>
//                                 </Col>
//                             </Row>
//                         </>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default InventoryLocation;

import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button, Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';
import './Styling/inv_location.css';
import ClipLoader from 'react-spinners/ClipLoader'; // Loader

const InventoryLocation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [loading, setLoading] = useState(false); // Loader state is false because no API fetch

    // Static inventory data with SKU ID, Warehouse ID, Available Quantity, Reserved Quantity, Total Quantity
    const inventoryData = [
        { warehouseId: 'INV7493', skuId: 6783587, availableQuantity: 50, reservedQuantity: 20, totalQuantity: 70 },
        { warehouseId: 'INV7394', skuId: 9643589, availableQuantity: 30, reservedQuantity: 10, totalQuantity: 40 },
        { warehouseId: 'INV5429', skuId: 8643369, availableQuantity: 60, reservedQuantity: 5, totalQuantity: 65 },
        { warehouseId: 'INV3568', skuId: 8655444, availableQuantity: 15, reservedQuantity: 3, totalQuantity: 18 },
        { warehouseId: 'INV6789', skuId: 8765433, availableQuantity: 80, reservedQuantity: 10, totalQuantity: 90 },
        { warehouseId: 'INV3467', skuId: 9633468, availableQuantity: 50, reservedQuantity: 20, totalQuantity: 70 },
        { warehouseId: 'INV0875', skuId: 6421498, availableQuantity: 30, reservedQuantity: 10, totalQuantity: 40 },
        { warehouseId: 'INV6789', skuId: 2346797, availableQuantity: 60, reservedQuantity: 5, totalQuantity: 65 },
        { warehouseId: 'INV6896', skuId: 5643890, availableQuantity: 15, reservedQuantity: 3, totalQuantity: 18 },
        { warehouseId: 'INV4679', skuId: 3578439, availableQuantity: 80, reservedQuantity: 10, totalQuantity: 90 }
    ];

    // Filter data based on search term
    const filteredData = useMemo(
        () =>
            inventoryData.filter(item =>
                item.skuId.toString().includes(searchTerm.toLowerCase()) ||
                item.warehouseId.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [searchTerm, inventoryData]
    );

    // Calculate pagination data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <Container fluid className="p-4">
            <Row>
                <Col md={12}>
                    <Row className="mb-4">
                        <Col md={4} className="custom-input-group">
                            <InputGroup>
                                <FormControl
                                    placeholder="Search by SKU or Warehouse ID"
                                    aria-label="Search by SKU or Warehouse ID"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="custom-input"
                                />
                                <Button variant="outline-secondary" onClick={() => console.log('Search term:', searchTerm)}>
                                    Search
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    {loading ? (
                        <Row className="justify-content-center align-items-center" style={{ height: '60vh' }}>
                            <Col className="text-center">
                                <ClipLoader color="#007bff" size={50} />
                                <div className="mt-2">Loading data...</div>
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <Table striped bordered hover className='table'>
                                            <thead>
                                                <tr>
                                                    <th>SKU ID</th>
                                                    <th>Warehouse ID</th>
                                                    <th>Available Quantity</th>
                                                    <th>Reserved Quantity</th>
                                                    <th>Total Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.length > 0 ? (
                                                    paginatedData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.skuId}</td>
                                                            <td>{item.warehouseId}</td>
                                                            <td>{item.availableQuantity}</td>
                                                            <td>{item.reservedQuantity}</td>
                                                            <td>{item.totalQuantity}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
                                                            No data found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-4">
                                <Col md={12}>
                                    <Pagination className="justify-content-center">
                                        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                                        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                                        {[...Array(totalPages).keys()].map(page => (
                                            <Pagination.Item
                                                key={page + 1}
                                                active={page + 1 === currentPage}
                                                onClick={() => setCurrentPage(page + 1)}
                                            >
                                                {page + 1}
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                                        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                                    </Pagination>
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default InventoryLocation;
