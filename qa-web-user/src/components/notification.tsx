import { ReactSVG } from 'react-svg';
import './notification.scss'
import NotificationIcon from '../assets/svg/bell-fill.svg'

export interface NotificationProps{

}

const Notification: React.FC<NotificationProps> = ( ) =>{

  return(
    <div className='user-notification-container'>
      <ReactSVG src={NotificationIcon}/>
    </div>
  )
}
 export default Notification;