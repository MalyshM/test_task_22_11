import React, { useState } from 'react';

const RequestDetails = ({ request, currentUser }) => {
  const [responseText, setResponseText] = useState('');

  const handleRespond = async () => {
    if (!currentUser) {
      alert('Please login first');
      return;
    }

    if (currentUser === request.user_id) {
      alert('You cannot respond to your own request');
      return;
    }

    try {
      const response = await fetch('http://localhost:8090/api/create_respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request_id: request.id,
          response_text: responseText,
          user_id: currentUser,
        }),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Response sent successfully');
        setResponseText('');
      } else {
        console.log('Failed to send response');
      }
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  return (
    <div>
      <h2>Детали заявки</h2>
      <p>id: {request.id}</p>
      <p>Название: {request.title}</p>
      <p>Описание: {request.status}</p>
      <p>Описание: {request.user_id}</p>
      {/* Additional request details */}
      <textarea
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
      ></textarea>
      <button onClick={handleRespond}>Respond</button>
    </div>
  );
};

export default RequestDetails;