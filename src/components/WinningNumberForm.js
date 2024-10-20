import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Table } from 'react-bootstrap';
import axios from 'axios';
import api from '../services/api';

const WinningNumberForm = () => {
  const [gameId, setGameId] = useState('');
  const [betType, setBetType] = useState('');
  const [winningNumber1, setWinningNumber1] = useState(''); // First winning number
  const [winningNumber2, setWinningNumber2] = useState(''); // Second winning number for Half and Full Sangam
  const [bets, setBets] = useState([]);
  const [gameNames, setGameNames] = useState([]);
  const [betTypes, setBetTypes] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [error, setError] = useState(null);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchGameNames = async () => {
      try {
        const response = await api.get('/admin/games');
        setGameNames(response.data);
      } catch (error) {
        console.error('Failed to fetch game names:', error);
      }
    };

    fetchGameNames();
  }, []);

  useEffect(() => {
    const fetchBetTypes = async () => {
      try {
        const response = await api.get('/admin/games/betTypes');
        setBetTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch bet types:', error);
      }
    };

    fetchBetTypes();
  }, []);

  // useEffect(() => {
  //   const fetchWinners = async () => {
  //     try {
  //       const response = await api.get('/winRoutes/All-winners', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });
  //       setWinners(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch winners:', error);
  //     }
  //   };

  //   fetchWinners();
  // }, []);

  const handleDeclareWinningNumber = async (e) => {
    e.preventDefault();

    try {
      const data = {
        gameId: gameId,
        // Use the appropriate winning numbers based on bet type
        winningNumber: betType === 'HalfSangam' || betType === 'FullSangam' 
                        ? { winningNumber1, winningNumber2 } 
                        : winningNumber1, // Assume winningNumber1 is used for others
      };

      const apiEndpoint = `/admin/games/${betType}/declare`;
      const response = await api.post(apiEndpoint, data);
      console.log('Winning number declared:', response.data);

      setUsernames(response.data.usernames || []);
      setBets(response.data.bets || []);
      setGameId('');
      setBetType('');
      setWinningNumber1('');
      setWinningNumber2(''); // Reset the second winning number
      setError(null);
    } catch (error) {
      console.error('Failed to declare winning number:', error);
      setError('Failed to declare winning number. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="mt-5">
            <Card.Header>
              <h2>Declare Winning Number</h2>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleDeclareWinningNumber}>
                <Form.Group controlId="formGameName">
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    as="select"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    required
                  >
                    <option value="">Select Game</option>
                    {gameNames.map((game) => (
                      <option key={game._id} value={game._id}>{game.name} - {game.type}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBetType">
                  <Form.Label>Bet Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={betType}
                    onChange={(e) => setBetType(e.target.value)}
                    required
                  >
                    <option value="">Select Bet Type</option>
                    {betTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {/* Conditional Rendering for Winning Numbers */}
                <Form.Group controlId="formWinningNumber1">
                  <Form.Label>Winning Number 1</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Winning Number 1"
                    value={winningNumber1}
                    onChange={(e) => setWinningNumber1(e.target.value)}
                    required
                  />
                </Form.Group>
                {betType === 'HalfSangam' && (
                  <Form.Group controlId="formWinningNumber2">
                    <Form.Label>Winning Number 2 (Close Panna)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Winning Number 2"
                      value={winningNumber2}
                      onChange={(e) => setWinningNumber2(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}
                {betType === 'FullSangam' && (
                  <Form.Group controlId="formWinningNumber2">
                    <Form.Label>Winning Number 2 (Close Panna)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Winning Number 2"
                      value={winningNumber2}
                      onChange={(e) => setWinningNumber2(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}

                <Button variant="primary" type="submit" className="mt-3">
                  Declare Winning Number
                </Button>
              </Form>

              {/* Display fetched usernames */}
              {usernames.length > 0 && (
                <div className="mt-4">
                  <h4>Users who placed winning bets:</h4>
                  <ul>
                    {usernames.map((username, index) => (
                      <li key={index}>{username}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Display fetched bets if needed */}
              {bets.length > 0 && (
                <div className="mt-4">
                  <h4>Bets for Game {gameId} with Winning Number {winningNumber1}</h4>
                  <ul>
                    {bets.map((bet, index) => (
                      <li key={index}>{`User ${bet.username} bet ${bet.amount} on ${bet.number}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Display all winners */}
      {/* <Row className="mt-5">
        <Col md={12}>
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
                        <td>{winner.gameId._id }</td> 
                        <td>{winner.userId._id }</td> 
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
        </Col>
      </Row> */}
    </Container>
  );
};

export default WinningNumberForm;
