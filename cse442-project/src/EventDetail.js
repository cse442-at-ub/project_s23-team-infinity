import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useState} from 'react'
import axios from 'axios';
import Dropdown from "./Dropdown";

const overlay_styles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};

const EventDetail = ({ open, onClose}) => {
  const [title, setTitle] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [location, setLocation] = useState(null)
  const [notes, setNotes] = useState(null)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [startap, setStartap] = useState(null)
  const [endap, setEndap] = useState(null)

  const times = [
    "00:00","00:15","00:30","00:45","01:00","01:15","01:30","01:45","02:00",
    "02:15","02:30","02:45","03:00","03:15","03:30","03:45","04:00","04:15",
    "04:30","04:45","05:00","05:15","05:30","05:45","06:00","06:15","06:30",
    "06:45","07:00","07:15","07:30","07:45","08:00","08:15","08:30","08:45",
    "09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00",
    "11:15","11:30","11:45"
    ]
  const time =["Am","Pm"]
  
  const Starttime = (newdata) => {
    setStart(newdata)
  }
  const Startap = (newdata) => {
    setStartap(newdata)
  }
  const Endtime = (newdata) => {
    setEnd(newdata)
  }
  const Endap = (newdata) => {
    setEndap(newdata)
  }
  const handleSubmit = () => {
    if (title === null){
        alert("please enter a title")
    }else if(selectedDate === null){
        alert("please pick a date")
    }else{
      const url = "/CSE442-542/2023-Spring/cse-442ad/PHP/home.php" //change the path here to the php file location
      let Data = new FormData();
      Data.append('Title', title)
      Data.append('Date', selectedDate)
      Data.append('Start', start + " " + startap)
      Data.append('End', end + " " + endap)
      Data.append('Location', location)
      Data.append('Notes', notes)
      axios.post(url, Data)
      .then(response=>alert(response.data))
      .catch(error=> alert(error));
    }
  }
  if (!open) return null;
  return (
    <div style={overlay_styles}>
      <div className="event_detail">
        <AiOutlineCloseCircle
          className="close"
          onClick={() => {
            onClose();
          }}
        />   
        <header className="new_event_header">New Event</header>   
        <input className="event_title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <div className="Date_title">Date</div>
        <DatePicker 
        className="datepicker"
        placeholderText="Choose Date"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dataFormat="dd/MM/YY"
        minDate={new Date()}
        />
        <div className="Date_title">Time</div>
        <div className="start_time">
            <Dropdown placeHolder="Start Time"  options={times} result={Starttime}/>
            <Dropdown placeHolder="Select AM/PM"  options={time} result={Startap}/>
        </div>
        <div className="end_time">
            <Dropdown placeHolder="End Time"  options={times} result={Endtime}/>
            <Dropdown placeHolder="Select AM/PM"  options={time} result={Endap}/>
        </div>
        <div className="Note_title">Location</div>
        <input className="event_location" type="text" placeholder="Location(option)" value={location} onChange={(e) => setLocation(e.target.value)}/>
        <div className="Note_title">Notes</div>
        <textarea className="event_notes" type="text" placeholder="Add Notes" value={notes} onChange={(e) => setNotes(e.target.value)}/>

        <div className="confirm">
            <button 
            className="confirm_create" 
            onClick={() => {
            onClose();handleSubmit();
            }}>Create</button>
            <button 
            className="confirm_cancel"
            onClick={() => {
            onClose();
            }}>Cancel</button>
        </div>   
      </div>
    </div>
  );
};

export default EventDetail;