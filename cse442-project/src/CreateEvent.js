import './css/Home.css';
import {BsCalendarPlus} from 'react-icons/bs';
import EventDetail from './EventDetail';
import {useState} from 'react';
const CreateEvent = () => {
    const [CreateisOpen, setCreateIsOpen] = useState(false);
    return(
        <div className='create_event'>
            <button className="create_event_button"
                onClick={()=>setCreateIsOpen(true)}
            ><BsCalendarPlus className='create_event_icon'/>
            Create New Event</button>     
            <EventDetail
                open={CreateisOpen}
                onClose={()=>setCreateIsOpen(false)}
            ></EventDetail>
        </div>
    )
};

export default CreateEvent;