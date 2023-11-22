// RequestList.js
import React from 'react';

const RequestList = ({ requests, onSelectRequest }) => {
  return (
    <div>
      <h2>Список заявок</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id} onClick={() => onSelectRequest(request.id)}>
            {request.id}
            {request.title}
            {request.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;