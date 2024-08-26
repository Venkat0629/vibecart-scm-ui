import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import Sidebar from '../Inventory/sidebar';
const OrderConsole=()=>{
    return(
        
        <Container fluid className='p-4'>
            <Row>
                {/* <Col md={2}>
                    <Sidebar/>
                </Col> */}
                <Col md={10}>
                    <h2>Order Console page</h2>
                </Col>
            </Row>
        </Container>
    )
}
export default OrderConsole