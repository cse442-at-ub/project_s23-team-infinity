import { useState } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import './css/Home.css'
import CreateEvent from './CreateEvent';
 
const Home =()=> {
  const [date, setDate] = useState(new Date());
 
  return (
    <div className='app'>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
        <p className='text-center'>{date.toDateString()}</p>
      </div>
      <CreateEvent/>
    </div>
  );
}
 
export default Home;