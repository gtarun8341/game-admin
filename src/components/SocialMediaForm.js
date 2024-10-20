import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import api from '../services/api'; // Adjust the path as needed

const SocialMediaForm = () => {
  const [links, setLinks] = useState([]); // Stores all social media links
  const [selectedLink, setSelectedLink] = useState(null); // Stores the link being edited
  const [platform, setPlatform] = useState(''); // Platform input
  const [link, setLink] = useState(''); // Link input
  const [message, setMessage] = useState(''); // Message for success or error
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing

  // Fetch social media links on component mount
  useEffect(() => {
    fetchLinks();
  }, []);

  // Function to fetch links from the server
  const fetchLinks = async () => {
    try {
      const response = await api.get('/socialmedia/social-media');
      setLinks(response.data); // Set the links
    } catch (error) {
      setMessage('Error fetching social media links.');
    }
  };

  // When a link is selected for editing
  const handleEditClick = (linkToEdit) => {
    setSelectedLink(linkToEdit);
    setPlatform(linkToEdit.platform);
    setLink(linkToEdit.link);
    setIsEditing(true);
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!platform || !link) {
      setMessage('Both platform and link are required.');
      return;
    }

    // Check if the platform already exists when adding a new link
    if (!isEditing && links.some((existingLink) => existingLink.platform === platform)) {
      setMessage(`A link for ${platform} already exists. Please edit or delete the existing link.`);
      return;
    }

    try {
      if (isEditing) {
        // Update existing link
        await api.put(`/socialmedia/social-media/${selectedLink._id}`, {
          platform,
          link,
        });
        setMessage('Link updated successfully.');
      } else {
        // Add new link
        await api.post('/socialmedia/social-media', { platform, link });
        setMessage('Link added successfully.');
      }

      // Clear form and refresh links
      setPlatform('');
      setLink('');
      setIsEditing(false);
      setSelectedLink(null);
      fetchLinks();
    } catch (error) {
      setMessage('Error occurred while submitting.');
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await api.delete(`/socialmedia/social-media/${id}`);
      setMessage('Link deleted successfully.');
      fetchLinks(); // Refresh the list after deletion
    } catch (error) {
      setMessage('Error deleting link.');
    }
  };

  // Determine the input type and placeholder based on the selected platform
  const getInputTypeAndPlaceholder = () => {
    switch (platform) {
      case 'WhatsApp Number':
      case 'Phone Number':
        return { type: 'tel', placeholder: 'Enter phone number' };
      case 'WhatsApp Link':
      case 'Telegram Link':
        return { type: 'url', placeholder: 'Enter link' };
      case 'Telegram Username':
        return { type: 'text', placeholder: 'Enter Telegram username' }; // Changed to text
      default:
        return { type: 'text', placeholder: 'Enter link or number' };
    }
  };

  const { type, placeholder } = getInputTypeAndPlaceholder();

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Edit Social Media Link' : 'Add Social Media Link'}</h2>
      {message && <Alert variant="info">{message}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="platform">
          <Form.Label>Platform</Form.Label>
          <Form.Control
            as="select"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
          >
            <option value="">Select platform</option>
            <option value="WhatsApp Number">WhatsApp Number</option>
            <option value="WhatsApp Link">WhatsApp Link</option>
            <option value="Telegram Username">Telegram Username</option>
            <option value="Telegram Link">Telegram Link</option>
            <option value="Phone Number">Phone Number</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="link" className="mt-3">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type={type}
            placeholder={placeholder}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {isEditing ? 'Update ' : 'Add '}
        </Button>
      </Form>

      <h2 className="mt-5">Existing Social Media Links</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((item) => (
            <tr key={item._id}>
              <td>{item.platform}</td>
              <td>{item.link}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(item)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SocialMediaForm;
