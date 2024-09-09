import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Button, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import API_URLS from '../config';
import './Styling/inv_console.css'; // Ensure this path is correct

const InventoryConsole = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageRange, setPageRange] = useState([1, 2, 3]); // State for dynamic page numbers

  // Fetch data from API using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.getAllInventories);
        const result = response.data;

        if (result.success) {
          const transformedData = result.data.map(item => ({
            skuId: item.skuId,
            availableQty: item.availableQuantity,
            reservedQty: item.reservedQuantity,
            totalQty: item.totalQuantity,
          }));
          setData(transformedData);
        } else {
          console.error('Failed to fetch data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Columns definition
  const columns = useMemo(
    () => [
      { Header: 'SKU ID', accessor: 'skuId' },
      { Header: 'Available Quantity', accessor: 'availableQty' },
      { Header: 'Reserved Quantity', accessor: 'reservedQty' },
      { Header: 'Total Quantity', accessor: 'totalQty' },
    ],
    []
  );

  // Filter data based on search term
  const filteredData = useMemo(
    () =>
      data.filter(item =>
        item.skuId.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 11 }, // Show 11 rows per page
    },
    useSortBy,
    usePagination
  );

  // Update page numbers dynamically
  const handlePageChange = (action) => {
    if (action === 'next' && canNextPage) {
      nextPage();
      setPageRange((prevRange) => {
        const newStart = Math.min(prevRange[0] + 1, pageOptions.length - 2);
        return [newStart, newStart + 1, newStart + 2];
      });
    } else if (action === 'previous' && canPreviousPage) {
      previousPage();
      setPageRange((prevRange) => {
        const newStart = Math.max(prevRange[0] - 1, 1);
        return [newStart, newStart + 1, newStart + 2];
      });
    }
  };

  return (
    <div fluid className="p-4" style={{ marginBottom: '150px' }}> {/* Adjust height above footer */}
      <Row className="mb-4">
        <Col md={4} className="custom-input-group">
          <InputGroup style={{ border: "0px solid #dedede", borderRadius: "9px 9px" }}>
            <FormControl
              placeholder="Search by SKU ID"
              aria-label="Search by SKU ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="custom-input"
            />
            <Button className='bg-secondary text-white btn btn-light' onClick={() => console.log('Search term:', searchTerm)}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
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

      {/* Updated Pagination Controls */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
            <button
              className="page-link"
              style={{ color: '#dd1e25' }}
              onClick={() => handlePageChange('previous')}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
          </li>
          {pageRange.map((num) => (
            <li key={num} className={`page-item ${pageIndex + 1 === num ? 'active' : ''}`}>
              <button
                className={`page-link ${pageIndex + 1 === num ? 'active-page' : ''}`}
                onClick={() => gotoPage(num - 1)}
              >
                {num}
              </button>
            </li>
          ))}
          <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
            <button
              className="page-link"
              style={{ color: '#dd1e25' }}
              onClick={() => handlePageChange('next')}
              disabled={!canNextPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default InventoryConsole;
