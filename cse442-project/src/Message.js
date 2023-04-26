import './css/Message.css';
import { BsEmojiSunglasses, BsFire } from 'react-icons/bs';
import { FaThumbsUp } from 'react-icons/fa';
import { GiConqueror} from 'react-icons/gi';

const Message = ({count}) => {
    let message;
    let icon;
    if (count === 0){
        message = "Time to get creative and explore something new!"
        icon = <BsEmojiSunglasses className='emoji'/>
    } else if(count >= 1 && count <= 3){
        message = "A few upcoming events. Get pumped and tackle them with enthusiasm!";
        icon = <FaThumbsUp className='emoji'/>
    } else if(count >= 4 && count <= 7){
        message = "Chill, everything is under control. We got this."
        icon = <GiConqueror className='emoji'/>
    } else{
        message = 'Damn, I can feel your keyboard is on fire. Let\'s make it ! ! !'
        icon = <BsFire className='emoji'/>
    }

    return(
        <div className='message'>
        <div className='event_count'>Upcoming events/tasks: {count}</div>
        <div className='fun_messages'>{icon}{message}</div>
        </div>
    )
};

export default Message;