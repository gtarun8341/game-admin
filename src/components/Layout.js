import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar'; // Adjust the path as needed
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
