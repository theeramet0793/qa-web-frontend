
import './profile.scss'
import { useEffect, useState } from 'react';
import { IUser } from '../data/interface/IUser';
import { useTranslation } from 'react-i18next';
import Client from '../lib/axios/axios';
import { IProfileImage } from '../data/interface/IProfileImage';
import classNames from 'classnames'
import { GetUserData } from './userData/userData';
import DefaultProfile from '../assets/images/default-profile.jpg'


export interface ProfileProps{
  onSignOut?: ()=> void;
  onProfile?: ()=>void;
  enableDropdown: boolean;
  disableClick?: boolean;
  newProfileUrl?: string;
}

const Profile: React.FC<ProfileProps> = ({onSignOut, enableDropdown, onProfile, disableClick, newProfileUrl}) =>{

  const { t } = useTranslation();
  const [userProfile] = useState<IUser|undefined>(GetUserData());
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [testOptions,setTestOptions] = useState<{label:string|undefined,value:string}[]>();
  const [profileUrl, setProfileUrl] = useState<string|undefined>(undefined);

  useEffect(()=>{
    setTestOptions(
      [
        {label:userProfile?.username, value:'1'},
        {label:userProfile?.email, value:'2'},
        {label:t('EDIT_PROFILE'), value:'editProfile'},
        {label:t('SIGN_OUT'), value:'signOut'},
      ]
    )
  },[userProfile,t])

  useEffect(()=>{
    if(userProfile)
    Client.get<IProfileImage>('/profileUrl/'+userProfile?.userId)
    .then((res)=>{
      setProfileUrl(res.data.urlPath);
    }).catch((err)=>{
      console.log(err);
    })
},[userProfile])

  useEffect(()=>{
    setProfileUrl(newProfileUrl);
  },[newProfileUrl])

  const delayedCloseMenu = () => {
    setTimeout(()=>setIsShowDropdown(false), 200);
  }

  const handleOnClickOption = (option:string) => {
    if(option==='signOut'){
      onSignOut && onSignOut();
    }else if(option==='editProfile'){
      onProfile && onProfile();
    }
  }

  return(
    <div className='user-profile-main-container'>
      <button 
        className={classNames(disableClick? 'disable':'user-profile-container')} 
        onClick={()=>{setIsShowDropdown(!isShowDropdown)}} 
        onBlur={()=>{delayedCloseMenu()}}
      >
        <img src={profileUrl? profileUrl:DefaultProfile} alt='profile'/>
      </button>
      {isShowDropdown && enableDropdown &&
        <div className='expand-profile-menu'>  
          { 
            testOptions?.map((option, index)=>{
              return (
                <div key={index} className='option-row text-normal' onClick={()=>{handleOnClickOption(option.value); setIsShowDropdown(false)}}>
                  {option.label}
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default Profile;