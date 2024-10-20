import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaGamepad, FaCheckCircle, FaUsers, FaShareAlt, FaHistory, FaAward, FaClipboardList } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Import custom styles

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white vh-100 p-3">
      <Nav className="flex-column">
        <Nav.Link className="text-white">
          Admin Panel
        </Nav.Link>
        <Nav.Link as={Link} to="/create-game" className="text-white">
          <FaGamepad className="me-2" />
          Create Game
        </Nav.Link>
        <Nav.Link as={Link} to="/declare-winning-number" className="text-white">
          <FaCheckCircle className="me-2" />
          Declare Winning Number
        </Nav.Link>
        <Nav.Link as={Link} to="/user-management" className="text-white">
          <FaUsers className="me-2" />
          User Management
        </Nav.Link>
        <Nav.Link as={Link} to="/social-media" className="text-white">
          <FaShareAlt className="me-2" />
          Social Media
        </Nav.Link>
        <Nav.Link as={Link} to="/winning-numbers" className="text-white">
          <FaHistory className="me-2" />
          Winning Numbers
        </Nav.Link>
        <Nav.Link as={Link} to="/winners" className="text-white">
          <FaAward className="me-2" />
          Winners
        </Nav.Link>
        <Nav.Link as={Link} to="/all-games" className="text-white">
          <FaClipboardList className="me-2" />
          All Games
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
