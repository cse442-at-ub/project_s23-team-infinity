import React from 'react';
import styled from 'styled-components';


// EventDetail Window

const EventDetailsModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
`;




const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const EventDetailsModal = ({ event, onClose, onDelete }) => {
  return (
    <EventDetailsModalContainer>
      <h3>{event.title}</h3>
	<p>Start Time: {event.time}</p>
	<p>Location: {event.Location}</p>
      <p>
        <strong>Time:</strong> {event.time} - {event.endTime}
      </p>
      <p>Details: {event.details}</p>
      <CloseButton onClick={onClose}>Close</CloseButton>
      <RemoveButton onClick={() => onDelete(event)}>Remove</RemoveButton>
    </EventDetailsModalContainer>
  );
};

export default EventDetailsModal;