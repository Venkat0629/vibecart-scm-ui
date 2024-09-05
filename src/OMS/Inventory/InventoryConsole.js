// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap';
// import './Styling/inv_console.css';

// const InventoryConsole = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState([]);

//   const inventoryData = [
//     { skuId: '34567', productId: '23', productName: 'Sporty Runner', category: 'Shoes', description: 'Lorem ipsum Lorem ipsum', size: 'L', color: 'Blue', quantity: 50, price: '$60' },
//     { skuId: '12345', productId: '45', productName: 'Cool Sneakers', category: 'Shoes', description: 'Lorem ipsum dolor', size: 'M', color: 'Red', quantity: 30, price: '$80' },
//     { skuId: '67890', productId: '67', productName: 'Formal Shoes', category: 'Shoes', description: 'Lorem ipsum', size: 'S', color: 'Black', quantity: 40, price: '$100' },
//     { skuId: '23456', productId: '89', productName: 'Running Shoes', category: 'Shoes', description: 'Lorem', size: 'XL', color: 'White', quantity: 20, price: '$90' },
//     { skuId: '78901', productId: '10', productName: 'Casual Shoes', category: 'Shoes', description: 'Lorem Ipsum', size: 'XXL', color: 'Green', quantity: 25, price: '$70' },
//   ];

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);  
//     const result = inventoryData.filter(item =>
//       item.skuId.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(result);
//   };
//   const handleSearch = () => console.log('Search term:', searchTerm);

//   return (
//     <Container fluid className="p-4">
//       <Row>
//         <Col>
//           <Row className="mb-4">
//             <Col md={4} sm={12}>
//               <InputGroup>
//                 <FormControl
//                   placeholder="Search by SKU"
//                   aria-label="Search by SKU"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//                 <Button variant="outline-secondary" onClick={handleSearch}>
//                   Search
//                 </Button>
//               </InputGroup>
//             </Col>   
//           </Row>
//           <Row>
//             <Col>
//               <div className="table-responsive">
//                 <Table bordered hover className="w-100">
//                   <thead>
//                     <tr>
//                       <th>SKU ID</th>
//                       <th>Product ID</th>
//                       <th>Product Name</th>
//                       <th>Category</th>
//                       <th>Description</th>
//                       <th>Size</th>
//                       <th>Color</th>
//                       <th>Quantity</th>
//                       <th>Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(filteredData.length > 0 ? filteredData : inventoryData).map((item, index) => (
//                       <tr key={index}>
//                         <td>{item.skuId}</td>
//                         <td>{item.productId}</td>
//                         <td>{item.productName}</td>
//                         <td>{item.category}</td>
//                         <td>{item.description}</td>
//                         <td>{item.size}</td>
//                         <td>{item.color}</td>
//                         <td>{item.quantity}</td>
//                         <td>{item.price}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default InventoryConsole;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, InputGroup, FormControl, Spinner, Pagination } from 'react-bootstrap';
import './Styling/inv_console.css';

const InventoryConsole = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Show 4 items per page

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch('http://localhost:9015/vibe-cart/inventory/get-all-inventories');
        const data = await response.json();
        setInventoryData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchInventoryData();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const result = inventoryData.filter(item =>
      item.skuId.toString().toLowerCase().includes(value.toLowerCase()) ||
      item.productName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSearch = () => console.log('Search term:', searchTerm);

  // Limit description to 20 words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : description;
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get limited number of pages for pagination (e.g. Prev, 1, 2, 3, 4, Next)
  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage && i < currentPage + 4)) {
        pages.push(i);
      } else if (i === currentPage + 4 && totalPages > 5) {
        pages.push('...');
        break;
      }
    }
    return pages;
  };

  return (
    <Container fluid className="p-4 " style={{ fontSize: "14px" }}>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col md={4} sm={12}>
              <InputGroup>
                <FormControl
                  className='FormControl'
                  placeholder="Search by SKU or Product Name"
                  aria-label="Search by SKU or Product Name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleSearch}
                  style={{ borderColor: '#007bff', color: '#007bff' }}
                >
                  Search
                </Button>
              </InputGroup>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Loading data...</p>
            </div>
          ) : (
            <>
              <Row>
                <Col>
                  <div className="table-responsive">
                    <Table bordered hover className="w-100">
                      <thead>
                        <tr>
                          <th className="text-center">SKU ID</th>
                          <th className="text-center">Product ID</th>
                          <th className="text-center">Product Name</th>
                          <th className="text-center">Category</th>
                          <th className="text-center">Description</th>
                          <th className="text-center">Size</th>
                          <th className="text-center">Color</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-center">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((item, index) => (
                            <tr key={index}>
                              <td className="text-center">{item.skuId}</td>
                              <td className="text-center">{item.productId}</td>
                              <td className="text-center">{item.productName}</td>
                              <td className="text-center">{item.category}</td>
                              <td className="text-center" title={item.description}>{truncateDescription(item.description)}</td>
                              <td className="text-center">{item.size}</td>
                              <td className="text-center">{item.color}</td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-center">${item.price.toFixed(2)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              No data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {/* Pagination placed after table */}
                  <div className="d-flex justify-content-center">
                    <Pagination>
                      <Pagination.Prev
                        onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                        disabled={currentPage === 1}
                      />
                      {getPageNumbers().map((number, index) =>
                        number === '...' ? (
                          <Pagination.Ellipsis key={index} />
                        ) : (
                          <Pagination.Item
                            key={index}
                            active={currentPage === number}
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </Pagination.Item>
                        )
                      )}
                      <Pagination.Next
                        onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default InventoryConsole;
