import React from 'react';
import ReactCalendar from 'react-calendar';
import EventModal from './EventModal';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import EventTimeline from './EventTimeline';
import axios from 'axios';


// Home page for Calendar Web
function Calendar() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [events, setEvents] = React.useState({});
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [showCreateEvent, setShowCreateEvent] = React.useState(false);


  const handleCreateEventButtonClick = () => {
    setShowCreateEvent(true);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setShowCreateEvent(false);
  };




    //Fetch events from backend;
async function fetchUserEvents() {
  try {
    const response = await axios.get('php_server');

    if (response.status === 200) {// Check the status
      const userEvents = response.data;

      userEvents.forEach(event => {//Update all the events in backend
        const date = new Date(event.date);
        const title = event.title;
        const Location = event.Location;
        const time = event.time;
        const endTime = event.endTime;
        const details = event.details;
	

        handleSaveEvent(date, title, Location, time, endTime, details);
      });
    } else {
      alert('Error: ' + response.status + ' ' + response.statusText);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

    
React.useEffect(() => {
  fetchUserEvents();
}, []);


    // Delete event functionality
 async function handleDeleteEvent(date, eventToDelete) {
  const dateString = date.toDateString();

  try {
    const response = await axios.post('php_server', eventToDelete);

    if (response.status === 200) {
      setEvents((prevEvents) => {
        const prevDateEvents = prevEvents[dateString] || [];
        const updatedEvents = prevDateEvents.filter(
          (event) =>
            event.title !== eventToDelete.title ||
            event.time !== eventToDelete.time ||
            event.details !== eventToDelete.details
        );

        return {
          ...prevEvents,
          [dateString]: updatedEvents,
        };
      });
    } else {
      alert('Error: ' + response.status + ' ' + response.statusText);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
    }





    
    
    const handleSaveEvent = (date, title, Location,time, endTime, details) => {
  const dateString = date.toDateString();
  const newEvent = { title, time, Location, details };
  const duration = calculateDuration(time, endTime);

// This Helps to Check the Length of Event Card.
  const timeParts = time.split(':');
  const hour = parseInt(timeParts[0], 10);
  const minute = parseInt(timeParts[1], 10);
  const formattedTime = hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0');

  const endTimeParts = endTime.split(':');
  const endHour = parseInt(endTimeParts[0], 10);
  const endMinute = parseInt(endTimeParts[1], 10);
  const formattedEndTime = endHour.toString().padStart(2, '0') + ':' + endMinute.toString().padStart(2, '0');

  setEvents((prevEvents) => {
    const prevDateEvents = prevEvents[dateString] || [];
    return {
      ...prevEvents,
      [dateString]: [...prevDateEvents, { ...newEvent, time: formattedTime, endTime: formattedEndTime, duration }],
    };
  });
};


// Event Time Duration
function calculateDuration(startTime, endTime) {
  const start = new Date(0, 0, 0, ...startTime.split(':').map(Number));
  const end = new Date(0, 0, 0, ...endTime.split(':').map(Number));
  const diff = end - start;
  const minutes = Math.floor(diff / (1000 * 60));
  return minutes;
};
    


  const renderTileContent = (date) => {
    const dateString = date.toDateString();
    const dayEvents = events[dateString];

    if (dayEvents && dayEvents.length > 0) {
      return (
        <div>
          {dayEvents.map((event, index) => (
            <div key={index}>{event.title}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AppContainer>
      <CalendarContainer>
        <h1>Infinity Calendar</h1>
        <StyledReactCalendar value={selectedDate} onClickDay={setSelectedDate} />
        <Button onClick={handleCreateEventButtonClick}>Create Event</Button>
      </CalendarContainer>
      <EventModal
        date={selectedDate}
        events={events[selectedDate.toDateString()] || []}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        isOpen={showEventModal && showCreateEvent}
      />
      <EventTimeline
        date={selectedDate}
        events={events[selectedDate.toDateString()] || []}
        onDelete={handleDeleteEvent}
      />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-image: linear-gradient(180deg, rgba(135, 206, 235, 0.5) 0%, rgba(30, 144, 255, 0.5) 100%); // Gradient faded blue background
`;



const EventFormWrapper = styled.div`
  margin-top: 20px;
`;

const CalendarContainer = styled.div`
  flex: 1;
  border-right: 1px solid #ccc;
  margin-left: 40px;

  h1 {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 48px; // Increase the font size
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // Add a subtle text shadow for depth
    color: black; // Change the text color
    margin-bottom: 20px; // Add more margin below the text
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px; // Increased border-radius for a rounder shape
  cursor: pointer;
  margin-top: 20px;
  width: 300px;
  margin-left: 20px;
  font-weight: bold; // Make the text bolder
  font-size: 18px; // Increase font size
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Add a subtle shadow for depth
  transition: all 0.3s ease; // Add a transition for smooth animation

  &:hover {
    background-color: #43a047; // Change background color on hover
    transform: scale(1.05); // Slightly enlarge button on hover
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); // Increase shadow on hover
  }

  &:active {
    transform: scale(0.95); // Slightly reduce button size when pressed
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); // Decrease shadow when pressed
  }
`;

const StyledReactCalendar = styled(ReactCalendar)`
 border-radius: 5px;
 box-shadow: 0 4px 8px rgba(0, 1, 1, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);


  .react-calendar__tile {
    background-color: #ffffff;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .react-calendar__tile--active {
    background-color:  #f9a825;
    color: white;
  }

  .react-calendar__tile--now {
    background-color: #f9a825;
    color: white;
    border-radius: 50%;
  }

  .react-calendar__tile:hover {
    background-color: #e0e0e0;
  }

  .react-calendar__tile--active:hover {
    background-color: #43a047;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(0, 0, 0, 0.6);
  }

  .react-calendar__navigation {
    background-color: #ffffff;
    border-radius: 5px;
  }

  .react-calendar__navigation__arrow {
    background-color: white;
    color: black;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .react-calendar__navigation__arrow:hover {
    background-color: #43a047;
    transform: scale(1.1);
  }

  .react-calendar__navigation__label__labelText {
    font-weight: bold;
    font-size: 18px;
  }
`;


export default Calendar;
