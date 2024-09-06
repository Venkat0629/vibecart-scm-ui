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

// import React, { useState } from 'react';
// import { Container, Row, Col, Button, Table, InputGroup, FormControl, Pagination } from 'react-bootstrap';
// import './Styling/inv_console.css';

// const InventoryConsole = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);

//   // Sample inventory data
//   const sampleData = [
//     { skuId: 'SKU001', availableQty: 120, reservedQty: 30, totalQty: 150 },
//     { skuId: 'SKU002', availableQty: 80, reservedQty: 20, totalQty: 100 },
//     { skuId: 'SKU003', availableQty: 200, reservedQty: 50, totalQty: 250 },
//     { skuId: 'SKU004', availableQty: 300, reservedQty: 40, totalQty: 340 },
//     { skuId: 'SKU005', availableQty: 150, reservedQty: 50, totalQty: 200 },
//     { skuId: 'SKU006', availableQty: 400, reservedQty: 100, totalQty: 500 },
//     { skuId: 'SKU007', availableQty: 220, reservedQty: 70, totalQty: 290 },
//     { skuId: 'SKU008', availableQty: 130, reservedQty: 30, totalQty: 160 }
//   ];

//   const [filteredData, setFilteredData] = useState(sampleData);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     const result = sampleData.filter(item =>
//       item.skuId.toString().toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredData(result);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   // Pagination logic
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

//   return (
//     <Container fluid className="p-4 " style={{ fontSize: "14px" }}>
//       <Row>
//         <Col>
//           <Row className="mb-4">
//             <Col md={4} sm={12}>
//               <InputGroup>
//                 <FormControl
//                   className='FormControl'
//                   placeholder="Search by SKU ID"
//                   aria-label="Search by SKU ID"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//                 <Button
//                   variant="outline-secondary"
//                   style={{ borderColor: '#007bff', color: '#007bff' }}
//                 >
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
//                       <th className="text-center">SKU ID</th>
//                       <th className="text-center">Available Quantity</th>
//                       <th className="text-center">Reserved Quantity</th>
//                       <th className="text-center">Total Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.length > 0 ? (
//                       currentItems.map((item, index) => (
//                         <tr key={index}>
//                           <td className="text-center">{item.skuId}</td>
//                           <td className="text-center">{item.availableQty}</td>
//                           <td className="text-center">{item.reservedQty}</td>
//                           <td className="text-center">{item.totalQty}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center">
//                           No data found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </div>
//               {/* Pagination placed after table */}
//               <div className="d-flex justify-content-center">
//                 <Pagination>
//                   <Pagination.Prev
//                     onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
//                     disabled={currentPage === 1}
//                   />
//                   {getPageNumbers().map((number, index) =>
//                     number === '...' ? (
//                       <Pagination.Ellipsis key={index} />
//                     ) : (
//                       <Pagination.Item
//                         key={index}
//                         active={currentPage === number}
//                         onClick={() => paginate(number)}
//                       >
//                         {number}
//                       </Pagination.Item>
//                     )
//                   )}
//                   <Pagination.Next
//                     onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                   />
//                 </Pagination>
//               </div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default InventoryConsole;

import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import './Styling/inv_console.css'; // Ensure this path is correct

const InventoryConsole = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample inventory data
  const data = useMemo(
    () => [
      { skuId: '7879880', availableQty: 120, reservedQty: 30, totalQty: 150 },
      { skuId: '4689090', availableQty: 80, reservedQty: 20, totalQty: 100 },
      { skuId: '2345676', availableQty: 200, reservedQty: 50, totalQty: 250 },
      { skuId: '8097655', availableQty: 300, reservedQty: 40, totalQty: 340 },
      { skuId: '9085764', availableQty: 150, reservedQty: 50, totalQty: 200 },
      { skuId: '8789786', availableQty: 400, reservedQty: 100, totalQty: 500 },
      { skuId: '9879656', availableQty: 220, reservedQty: 70, totalQty: 290 },
      { skuId: '2649899', availableQty: 130, reservedQty: 30, totalQty: 160 },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'SKU ID',
        accessor: 'skuId',
      },
      {
        Header: 'Available Quantity',
        accessor: 'availableQty',
      },
      {
        Header: 'Reserved Quantity',
        accessor: 'reservedQty',
      },
      {
        Header: 'Total Quantity',
        accessor: 'totalQty',
      },
    ],
    []
  );

  // Filter data based on search term
  const filteredData = useMemo(
    () =>
      data.filter(item =>
        item.skuId.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [data, searchTerm]
  );

  // Table setup using react-table hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 4 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container">
      <h3 className="mt-3 mb-3">Inventory Console</h3>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by SKU ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InventoryConsole;
