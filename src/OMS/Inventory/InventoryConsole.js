import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Button, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';  // Import axios
import API_URLS from '../config';  // Import API URLs from config
import './Styling/inv_console.css'; // Ensure this path is correct

const InventoryConsole = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from API using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.getAllInventories);  // Using axios and API_URLS
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
      initialState: { pageIndex: 0, pageSize: 11 }, // Show 11 rows per page
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container">
      <h3 className="mt-3 mb-3">Inventory Console</h3>
      <Row className="mb-4">
        <Col md={4} className="custom-input-group">
          <InputGroup>
            <FormControl
              placeholder="Search by SKU ID"
              aria-label="Search by SKU ID"
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

      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
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
