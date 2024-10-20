import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { Table, Form, Pagination, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.mobilenumber.toString().includes(searchQuery) ||
    user.wallet.toString().includes(searchQuery)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="my-4 text-center">User Management</h2>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by username, mobile number, or wallet balance"
          value={searchQuery}
          onChange={handleSearch}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Mobile Number</th>
            <th>Wallet Balance</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.mobilenumber}</td>
              <td>{user.wallet}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationComponent
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const PaginationComponent = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="justify-content-center">
      {pageNumbers.map((number) => (
        <Pagination.Item key={number} active={currentPage === number} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default UserManagement;
