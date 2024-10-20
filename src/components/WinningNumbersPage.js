import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';

const WinningNumbersPage = () => {
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinningNumbers = async () => {
      try {
        const response = await api.get('/winRoutes/all-winning-numbers'); // Adjust API endpoint as necessary
        setWinningNumbers(response.data);
      } catch (error) {
        console.error('Error fetching winning numbers:', error);
        setError('Could not fetch winning numbers');
      } finally {
        setLoading(false);
      }
    };

    fetchWinningNumbers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Winning Numbers for All Games</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Single Digit</th>
            <th>Jodi Digit</th>
            <th>Single Panna</th>
            <th>Jodi Panna</th>
            <th>Triple Panna</th>
            <th>Half Sangam</th>
            <th>Full Sangam</th>
          </tr>
        </thead>
        <tbody>
          {winningNumbers.map((game, index) => (
            <tr key={index}>
              <td>{game.name}</td>
              <td>{game.singleDigit}</td>
              <td>{game.jodiDigit}</td>
              <td>{game.singlePanna}</td>
              <td>{game.jodiPanna}</td>
              <td>{game.triplePanna}</td>
              <td>{`${game.halfSangam.number1}, ${game.halfSangam.number2}`}</td>
              <td>{`${game.fullSangam.number1}, ${game.fullSangam.number2}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WinningNumbersPage;
