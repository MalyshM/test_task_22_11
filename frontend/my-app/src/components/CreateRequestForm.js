import React, { useState, useEffect } from 'react';

const CreateRequestForm = ({ onCreateRequest }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    console.log(storedUser)
    if (storedUser) {
      setCurrentUser(storedUser);
    } else {
      alert('Please login first');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return; // Prevent form submission if current user is undefined
    }

    const newRequest = {
      title:title,
      status:status,
      user_id:currentUser
    };

    try {
      const response = await fetch('http://localhost:8090/api/create_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });

      if (response.ok) {
        const data = await response.json();
        onCreateRequest(data);
        setTitle('');
        setStatus('');
      } else {
        console.log('Request creation failed');
      }
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <div>
      <h2>Create Request</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <button type="submit">Create Request</button>
      </form>
    </div>
  );
};

export default CreateRequestForm;