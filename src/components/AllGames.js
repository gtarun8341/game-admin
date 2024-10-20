import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import api from '../services/api'; // Adjust the path as needed

const AllGames = () => {
  const [games, setGames] = useState([]);

  // Fetch current games from the API
  const fetchGames = async () => {
    try {
      const response = await api.get('/admin/games'); // Adjust the endpoint as needed
      setGames(response.data); // Set the games state with fetched data
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  useEffect(() => {
    fetchGames(); // Fetch games when the component mounts
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">All Games</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Game Name</th>
                    <th>Date</th>
                    <th>Timing</th>
                    <th>Single Digit</th>
                    <th>Jodi Digit</th>
                    <th>Single Panna</th>
                    <th>Jodi Panna</th>
                    <th>Triple Panna</th>
                    <th>Full Sangam</th>
                    <th>Half Sangam</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr key={game._id}>
                      <td>{game.name}</td>
                      <td>{new Date(game.date).toLocaleDateString()}</td>
                      <td>{game.timing}</td>
                      <td>{game.singleDigit?.winningNumber1 || '-'}</td>
                      <td>{game.jodiDigit?.winningNumber1 || '-'}</td>
                      <td>{game.singlePanna?.winningNumber1 || '-'}</td>
                      <td>{game.jodiPanna?.winningNumber1 || '-'}</td>
                      <td>{game.triplePanna?.winningNumber1 || '-'}</td>
                      <td>{game.fullSangam?.winningNumber1 || '-'}</td>
                      <td>{game.halfSangam?.winningNumber1 || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AllGames;
