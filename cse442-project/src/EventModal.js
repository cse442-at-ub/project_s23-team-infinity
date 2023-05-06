import React from 'react';
import styled from 'styled-components';
import EventDetailsModal from './EventDetailsModal';
import Modal from 'react-modal';
import axios from 'axios';
import Cookies from 'js-cookie';


// Create Event Window Set-up
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 101,
  },
};



// This is the Create Event functionality
const EventModal = ({ date, events, token, onClose, onSave, onDelete,isOpen }) => {
  const [eventTitle, setEventTitle] = React.useState('');
  const [eventTime, setEventTime] = React.useState('');
  const [eventDetails, setEventDetails] = React.useState('');
  const [showEventDetails, setShowEventDetails] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [eventEndTime, setEventEndTime] = React.useState('');
  const [eventLocation, setEventLocation] = React.useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(date, eventTitle, eventTime, eventEndTime,eventDetails,eventLocation);

    //PHP Server
      const url = "/CSE442-542/2023-Spring/cse-442ad/PHP/createevent.php" //change the path here to the php file location
      let Data = new FormData();
      
      Data.append('usertoken', token)
      console.log(token)
      //TEMPORARY TODO
      Data.append('title', eventTitle)
      Data.append('date', date)
      console.log(date)
      Data.append('timeStart', eventTime)
      Data.append('timeEnd', eventEndTime)
      Data.append('location', eventLocation)
      Data.append('notes', eventDetails)
      axios.post(url, Data)
      .then(alert('Event created'))
	  .catch(error=> alert(error));
      
    setEventTitle('');
    setEventTime('');
    setEventEndTime('');
    setEventDetails('');
    setEventLocation('');
    onClose();
    window.location.reload();
  };

  const handleGridClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

const handleEventDelete = () => {
  onDelete(selectedEvent);
  setShowEventDetails(false);
};


  const handleEventDetailsClose = () => {
    setShowEventDetails(false);
  };

    return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel="Create Event Modal">
    <EventModalContainer>
      <h2>{date.toDateString()}</h2>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <Label>
            Event Title:
            <Input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
          </Label>
          <Label>
            Event Time:
            <Input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
            />
          </Label>
	  <Label>
             Event End Time:
             <Input
             type="time"
             value={eventEndTime}
             onChange={(e) => setEventEndTime(e.target.value)}
            required
             />
          </Label>
<Label>
  Location:
  <Input
    type="text"
    value={eventLocation}
    onChange={(e) => setEventLocation(e.target.value)}
    required
  />
</Label>


          <Label>
              Event Details:
	  </Label>
            <TextArea
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              rows="3"
            />
          <Button type="submit">Save</Button>
        </FormContainer>
      </form>
    </EventModalContainer>
    </Modal>
  );
};




const EventModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px; 
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  height:200px;
  width:70%
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 200px;
`;

export default EventModal;