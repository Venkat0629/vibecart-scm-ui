import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import Sidebar from '../Inventory/sidebar';
const UpdateOrder=()=>{
    return(
        
        <Container fluid className='p-4'>
            <Row>
                {/* <Col md={2}>
                    <Sidebar/>
                </Col> */}
                <Col md={10}>
                    <h2>Update Order page</h2>
                </Col>
            </Row>
        </Container>
    )
}
export default UpdateOrder