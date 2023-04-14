import React from 'react';
import styled from 'styled-components';
import EventDetailsModal from './EventDetailsModal';


//This generate random color of cards
const stringToNumber = (str) => {
  let number = 0;
  for (let i = 0; i < str.length; i++) {
    number = str.charCodeAt(i) + ((number << 5) - number);
  }
  return number;
};

const generateHSLColor = (seed) => {
  const hue = stringToNumber(seed) % 360;
  const saturation = 80; 
  const lightness = 60; 

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const uniqueRandomColor = (seed, parallelEvents) => {
  const usedColors = new Set(parallelEvents.map((event) => event.color));
  let newColor = generateHSLColor(seed);

  while (usedColors.has(newColor)) {
    newColor = generateHSLColor(newColor + seed);
  }

  return newColor;
};




//This is the schedule rendering and functionality, including Event Card Clicking, Delete and Parallel Event Check.
const EventTimeline = ({ date, events,existingEvents, onClose, onDelete }) => {
  const [showEventDetails, setShowEventDetails] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

const handleEventDelete = (eventToDelete) => {
  onDelete(date, eventToDelete);
  setShowEventDetails(false);
};


  const handleEventDetailsClose = () => {
    setShowEventDetails(false);
  };

const getMaxParallelEvents = (events, hour) => {
  let maxParallel = 0;
  const currentHour = parseInt(hour.split(':')[0], 10);

  events.forEach((eventA) => {
    const eventAStartHour = parseInt(eventA.time.split(':')[0], 10);
    const eventAEndHour = parseInt(eventA.endTime.split(':')[0], 10);

    if (eventAStartHour <= currentHour && eventAEndHour > currentHour) {
      let currentParallel = 1;

      events.forEach((eventB) => {
        if (eventA === eventB) return;

        const eventBStartHour = parseInt(eventB.time.split(':')[0], 10);
        const eventBEndHour = parseInt(eventB.endTime.split(':')[0], 10);

        if (
          (eventBStartHour >= eventAStartHour && eventBStartHour < eventAEndHour) ||
          (eventBEndHour > eventAStartHour && eventBEndHour <= eventAEndHour) ||
          (eventBStartHour <= eventAStartHour && eventBEndHour >= eventAEndHour)
        ) {
          currentParallel++;
        }
      });

      maxParallel = Math.max(maxParallel, currentParallel);
    }
  });

  return maxParallel;
};


const renderTimeline = () => {
  const timelineRows = [];

  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0') + ':00';
    const nextHour = (i + 1).toString().padStart(2, '0') + ':00';

    const hourEvents = events.filter((event) => {
      return event.time >= hour && event.time < nextHour;
    });

    const maxParallelEvents = getMaxParallelEvents(events, hour);

    timelineRows.push(
      <TimelineRow key={hour}>
        <TimelineHour>{hour}</TimelineHour>
        <TimelineEvents>
          {hourEvents.map((event, index) => {
            const eventStart = event.time.split(':');
            const eventEnd = event.endTime.split(':');
            const startPosition = (parseInt(eventStart[0], 10) * 60 + parseInt(eventStart[1], 10)) * 40 / 60 - i * 40;
            const duration = (parseInt(eventEnd[0], 10) * 60 + parseInt(eventEnd[1], 10) - (parseInt(eventStart[0], 10) * 60 + parseInt(eventStart[1], 10))) * 40 / 60;
            const left = (100 / maxParallelEvents) * index;
            const width = 100 / maxParallelEvents - 2; // Subtract 2 to add some spacing between cards

            const parallelEvents = events.filter((parallelEvent) => {
              if (parallelEvent === event) return false;

              const eventStartHour = parseInt(event.time.split(':')[0], 10);
              const eventEndHour = parseInt(event.endTime.split(':')[0], 10);
              const parallelEventStartHour = parseInt(parallelEvent.time.split(':')[0], 10);
              const parallelEventEndHour = parseInt(parallelEvent.endTime.split(':')[0], 10);

              return (
                (parallelEventStartHour >= eventStartHour && parallelEventStartHour < eventEndHour) ||
                (parallelEventEndHour > eventStartHour && parallelEventEndHour <= eventEndHour) ||
                (parallelEventStartHour <= eventStartHour && parallelEventEndHour >= eventEndHour)
              );
            });

            const backgroundColor = uniqueRandomColor(event.title, parallelEvents);

            return (
              <EventCard
                key={index}
                top={startPosition}
                left={left}
                duration={duration}
                width={width}
                backgroundColor={backgroundColor}
                onClick={() => handleEventClick(event)}
              >
               {event.title} - {event.Location}
              </EventCard>
            );
          })}
        </TimelineEvents>
      </TimelineRow>
    );
  }

  return timelineRows;
};






return (
  <EventModalContainer>
    <h2>{date.toDateString()}</h2>
    {renderTimeline()}
    {showEventDetails && (
      <>
        <Backdrop onClick={handleEventDetailsClose} />
        <EventDetailsModal
          event={selectedEvent}
          onClose={handleEventDetailsClose}
          onDelete={(eventToDelete) => handleEventDelete(eventToDelete)}
        />
      </>
    )}
  </EventModalContainer>
);

};


const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;



//Adjuct the timeline grid
const EventModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 65%; 
  height: 100%;
  background-color: white;
  border-left: 1px solid #ccc;
  padding: 20px;
  z-index: 100;
  overflow-y: scroll; 
`;

const Timeline = styled.div`
  margin-top: 0px;
  border-top: 0px solid #ccc;
`;

const TimelineRow = styled.div`
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid #ccc;
  min-height: 40px;
`;

const TimelineHour = styled.div`
  width: 80px;
  padding: 5px 0;
  text-align: right;
  font-weight: bold;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const TimelineEvents = styled.div`
  flex: 1;
  padding: 5px 10px;
  min-height: 40px;
  position: relative;
`;

const EventCard = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}%;
  height: ${({ duration }) => duration}px;
  width: ${({ width }) => width}%;
`;
export default EventTimeline;