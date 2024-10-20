import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import GameForm from './components/GameForm';
import WinningNumberForm from './components/WinningNumberForm';
import UserManagement from './components/UserManagement';
import Layout from './components/Layout'; // Adjust the path as needed
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialMediaForm from './components/SocialMediaForm'; // Import the new component
import WinningNumbersPage from './components/WinningNumbersPage'; // Adjust path as needed
import WinnersPage from './components/WinnersPage';
import AllGames from './components/AllGames';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/create-game" element={<GameForm />} />
          <Route path="/declare-winning-number" element={<WinningNumberForm />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/social-media" element={<SocialMediaForm />} /> {/* New Route */}
          <Route path="/winning-numbers" element={<WinningNumbersPage />} /> {/* New Route */}
          <Route path="/winners" element={<WinnersPage />} /> {/* New Route */}
          <Route path="/all-games" element={<AllGames />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
