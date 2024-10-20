import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import api from '../services/api'; // Adjust the path as needed

const GameForm = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [games, setGames] = useState([]); // State to hold games

  // Fetch current games from the API
  // const fetchGames = async () => {
  //   try {
  //     const response = await api.get('/admin/games'); // Adjust the endpoint as needed
  //     setGames(response.data); // Set the games state with fetched data
  //   } catch (error) {
  //     console.error('Failed to fetch games:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchGames(); // Fetch games when the component mounts
  // }, []);

  const handleAddGame = async (e) => {
    e.preventDefault();

    const newGame = {
      name,
      timing: `${startTime}-${endTime}`,
    };

    try {
      const response = await api.post('/admin/games', newGame);
      console.log('Game added:', response.data);
      // Refresh the games list after adding a new game
      // fetchGames(); 
      setName('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Failed to add game:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Add New Game</Card.Title>
              <Form onSubmit={handleAddGame}>
                <Form.Group controlId="formGameName" className="mb-3">
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter game name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formStartTime" className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEndTime" className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Add Game
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Display current games */}
          {/* <Card className="mt-4">
            <Card.Body>
              <Card.Title className="text-center">Current Games</Card.Title>
              <ListGroup>
                {games.map((game) => (
                  <ListGroup.Item key={game._id}>
                    {game.name} - {game.timing}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
};

export default GameForm;
