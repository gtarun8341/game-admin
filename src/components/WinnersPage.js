// WinnersPage.js
import React, { useEffect, useState } from 'react';
import { Card, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import api from '../services/api'; // Adjust the path as needed

const WinnersPage = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await api.get('/winRoutes/All-winners', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setWinners(response.data);
      } catch (error) {
        console.error('Failed to fetch winners:', error);
      }
    };

    fetchWinners();
  }, []);

  return (
    <div>
      <Card>
        <Card.Header>
          <h2>All Winners</h2>
        </Card.Header>
        <Card.Body>
          {winners.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Game ID</th>
                  <th>User ID</th>
                  <th>Mini Game</th>
                  <th>Winning Number 1</th>
                  <th>Winning Number 2</th>
                  <th>Amount Won</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {winners.map((winner) => (
                  <tr key={winner._id}>
                    <td>{winner.gameId._id}</td>
                    <td>{winner.userId._id}</td>
                    <td>{winner.miniGame}</td>
                    <td>{winner.winningNumber.winningNumber1}</td>
                    <td>{winner.winningNumber.winningNumber2}</td>
                    <td>{winner.amountWon}</td>
                    <td>{new Date(winner.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">No winners found.</Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default WinnersPage;
