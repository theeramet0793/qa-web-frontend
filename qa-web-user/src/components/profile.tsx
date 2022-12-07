import { ReactSVG } from 'react-svg';
import './profile.scss'
import ProfileIcon from '../assets/svg/person-fill.svg'

export interface ProfileProps{

}

const Profile: React.FC<ProfileProps> = () =>{

  return(
    <div className='user-profile-container'>
      <ReactSVG src={ProfileIcon}/>
    </div>
  )
}

export default Profile;