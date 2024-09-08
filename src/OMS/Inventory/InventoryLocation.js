import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Button, Table, InputGroup, FormControl, Pagination, Alert } from 'react-bootstrap';
import './Styling/inv_location.css';
import ClipLoader from 'react-spinners/ClipLoader'; // Loader
import API_URLS from "../config"
const InventoryLocation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(11); // Show 11 rows per page
    const [loading, setLoading] = useState(true); // Loader state true initially
    const [inventoryData, setInventoryData] = useState([]);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'skuId', direction: 'asc' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URLS.getAllWarehouses);
                const result = await response.json();
                if (result.success) {
                    setInventoryData(result.data);
                } else {
                    setError('Failed to fetch data');
                }
            } catch (err) {
                setError('Error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    const sortedData = useMemo(() => {
        let sortableItems = [...inventoryData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [inventoryData, sortConfig]);

    // Filter data based on search term
    const filteredData = useMemo(
        () => sortedData.filter(item =>
            item.skuId.toString().includes(searchTerm.toLowerCase()) ||
            item.warehouseId.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [searchTerm, sortedData]
    );

    // Calculate pagination data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <Container fluid className="p-4 h-100">
            <Row className="h-100">
                <Col md={12} className="d-flex flex-column h-100">
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
                        <Row className="justify-content-center align-items-center flex-grow-1" style={{ height: '100%' }}>
                            <Col className="text-center">
                                <ClipLoader color="#007bff" size={50} />
                                <div className="mt-2">Loading data...</div>
                            </Col>
                        </Row>
                    ) : error ? (
                        <Row className="justify-content-center align-items-center flex-grow-1" style={{ height: '100%' }}>
                            <Col className="text-center">
                                <Alert variant="danger">{error}</Alert>
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <div className="table-wrapper flex-grow-1">
                                <Row>
                                    <Col>
                                        <div className='table-responsive'>
                                            <Table striped bordered hover className='table'>
                                                <thead>
                                                    <tr>
                                                        <th onClick={() => handleSort('skuId')}>SKU ID {sortConfig.key === 'skuId' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : null}</th>
                                                        <th onClick={() => handleSort('warehouseId')}>Warehouse ID {sortConfig.key === 'warehouseId' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : null}</th>
                                                        <th onClick={() => handleSort('availableQuantity')}>Available Quantity {sortConfig.key === 'availableQuantity' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : null}</th>
                                                        <th onClick={() => handleSort('reservedQuantity')}>Reserved Quantity {sortConfig.key === 'reservedQuantity' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : null}</th>
                                                        <th onClick={() => handleSort('totalQuantity')}>Total Quantity {sortConfig.key === 'totalQuantity' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : null}</th>
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
                                        <div className="pagination-controls">
                                            <Button
                                                onClick={() => setCurrentPage(1)}
                                                disabled={currentPage === 1}
                                                variant="danger"
                                            >
                                                {'<<'}
                                            </Button>
                                            <Button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                variant="danger"
                                            >
                                                {'<'}
                                            </Button>
                                            <Button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                variant="danger"
                                            >
                                                {'>'}
                                            </Button>
                                            <Button
                                                onClick={() => setCurrentPage(totalPages)}
                                                disabled={currentPage === totalPages}
                                                variant="danger"
                                            >
                                                {'>>'}
                                            </Button>
                                            <span>
                                                Page <strong>{currentPage} of {totalPages}</strong>
                                            </span>
                                            <span>
                                                | Go to page:
                                                <input
                                                    type="number"
                                                    defaultValue={currentPage}
                                                    onChange={(e) => {
                                                        const page = e.target.value ? Number(e.target.value) : 1;
                                                        setCurrentPage(page);
                                                    }}
                                                    style={{ width: '100px' }}
                                                />
                                            </span>
                                            <select
                                                value={itemsPerPage}
                                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                            >
                                                {[5, 7, 10, 11].map((size) => (
                                                    <option key={size} value={size}>
                                                        Show {size}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default InventoryLocation;


