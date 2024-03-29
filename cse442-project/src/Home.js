import React from 'react';
import ReactCalendar from 'react-calendar';
import EventModal from './EventModal';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import EventTimeline from './EventTimeline';
import CreateEvent from './CreateEvent';
import Message from './Message';
import axios from 'axios';
import alarmSound from './alarm1.m4a';
import { useLocation, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import WeekTimeline from './WeekTimeline';
import { useEffect, useState } from 'react';



// Home page for Calendar Web
function Calendar() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedWeek, setSelectedWeek] = React.useState([]);
  const [events, setEvents] = React.useState({});
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [showCreateEvent, setShowCreateEvent] = React.useState(false);
//Sound states
  const [alarmAudio] = React.useState(new Audio(alarmSound));
//User token
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const [userEvents, setUserEvents] = React.useState([]);
  const [eventnumber,setEventNumber] = useState(0);
  const [username, setUserName] = useState('')
  const navigate = useNavigate();

  const [popupShown, setPopupShown] = React.useState(false);

  const openPopupWindow = () => {
    const popupWindow = window.open('', '_blank', 'width=400,height=200');
    popupWindow.document.write('<h2>Event coming up in 1 hour</h2>');
  };

    
const checkEventTimes = () => {
  const currentTime = new Date();
  const currentDateString = currentTime.toDateString();
  const currentEvents = events[currentDateString];

  if (currentEvents) {
    currentEvents.forEach((event) => {
      const eventTime = new Date(currentDateString + ' ' + event.time);
      const timeDifference = Math.abs(eventTime - currentTime);

      // Check if the time difference is within 5 minutes (300000 milliseconds)
      // Check if the time difference is within 1 hour (3600000 milliseconds)
      if ( timeDifference <= 1800000 && !popupShown) {
        openPopupWindow();
        setPopupShown(true);
          sendEventReminderEmail(token);
	        alarmAudio.play();
      }
    });
  }
};

//Send email to users
    async function sendEventReminderEmail(token) {
	let Data  = new FormData();
	const url = '/CSE442-542/2023-Spring/cse-442ad/PHP/emailnotif.php'
	Data.append('usertoken',token)
	axios.post(url, Data).then(response=>{
            const resp = response.data
	    })
	
}

    
React.useEffect(() => {
  const timer = setInterval(() => {
    checkEventTimes();
  }, 600000); // Check every one min

  return () => {
    clearInterval(timer);
  };
}, [events, alarmAudio, popupShown, token]);


    
  const handleCreateEventButtonClick = () => {
    setShowCreateEvent(true);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setShowEventModal(false);
    setShowCreateEvent(false);
  };
    
    // Delete event functionality
 async function handleDeleteEvent(date, eventToDelete) {
     const dateString = date.toDateString();
     let Data = new FormData();
     Data.append('eventTitle',eventToDelete.title)
     Data.append('token',token)
     
     const url = '/CSE442-542/2023-Spring/cse-442ad/PHP/deleteevent.php'

     axios.post(url,Data).then(response=>{
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
	  alert(response.data)
    }
			      )
     
    }




useEffect(()=>{
    const _url = '/CSE442-542/2023-Spring/cse-442ad/PHP/check.php'
    let Token = new FormData();
    Token.append('usertoken', token)
    axios.post(_url, Token).then(response=>{
      const in_not_in = response.data
      if (in_not_in.length > 1){
        setUserName(in_not_in[1])
      }else{
        navigate("/CSE442-542/2023-Spring/cse-442ad/")
      }
    })

    const url = '/CSE442-542/2023-Spring/cse-442ad/PHP/sqlresults.php'
    let Data = new FormData();
    Data.append('usertoken', token);
    axios.post(url, Data).then(response=>{
      const eventdata = response.data
      setEventNumber(eventdata.length)
      eventdata.forEach((event)=>{
        const _date = new Date(event.date)
        handleSaveEvent(_date, event.title, event.location, event.timeStart, event.timeEnd, event.notes);
      })
    })
  },[])

    
    
  const handleSaveEvent = (date, title, Location, time, endTime, details) => {
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
	[dateString]: [...prevDateEvents, { ...newEvent, time: formattedTime, endTime: formattedEndTime, duration}],
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


const getWeekDates = (date) => {
  const weekStart = date.getDate() - ((date.getDay() + 6) % 7);
  const weekDates = Array.from({ length: 7 }, (_, i) => new Date(date.getFullYear(), date.getMonth(), weekStart + i));
  return weekDates;
};


  const handleDayClick = (date) => {
    setSelectedDate(date);
    const weekDates = getWeekDates(date);
    setSelectedWeek(weekDates);
  };

  React.useEffect(() => {
    handleDayClick(selectedDate);
  }, []);

return (
  <AppContainer>
    <Navbar
    usertoken={token}
    name={username}/>
    <CalendarContainer>
      <h1>Infinity Calendar</h1>
      <StyledReactCalendar value={selectedDate} onClickDay={handleDayClick} />
      <Button onClick={handleCreateEventButtonClick}>Create Event</Button>
    </CalendarContainer>
    <WeekTimelines>
      {selectedWeek.map((day, index) => (
        <EventTimeline
          key={index}
          date={day}
          events={events[day.toDateString()] || []}
          onDelete={handleDeleteEvent}
        />
      ))}
    </WeekTimelines>
    <EventModal
      date={selectedDate}
      token={token}
      events={events[selectedDate.toDateString()] || []}
      onClose={handleCloseModal}
      onSave={handleSaveEvent}
      onDelete={handleDeleteEvent}
      isOpen={showEventModal && showCreateEvent}
    />
    <Message
    count={eventnumber}/>
  </AppContainer>
);

}
const WeekTimelines = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin-top:25px;
  max-height: 100vh;
  overflow-y: auto;
`;


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
    font-size: 32px; // Increase the font size
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // Add a subtle text shadow for depth
    color: black; // Change the text color
    margin-top: 50px; // Add more margin below the text
    margin-left: 50px;
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
 margin-left: -5%;


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
