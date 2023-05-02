import React from 'react';
import EventTimeline from './EventTimeline';
import styled from 'styled-components';

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  overflow-x: auto;
  width: 100%;
`;


function WeekTimeline({ selectedWeek, events, onDelete }) {
  return (
    <WeekContainer>
      {selectedWeek.map((day, index) => (
        <EventTimeline
          key={index}
          date={day}
          events={events[day.toDateString()] || []}
          onDelete={onDelete}
        />
      ))}
    </WeekContainer>
  );
}

export default WeekTimeline;
