import { ReactSVG } from 'react-svg';
import './profile.scss'
import ProfileIcon from '../assets/svg/person-fill.svg'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { IUser } from '../data/interface/IUser';
import { useTranslation } from 'react-i18next';
import Client from '../lib/axios/axios';
import { IProfileImage } from '../data/interface/IProfileImage';
import classNames from 'classnames'


export interface ProfileProps{
  onSignOut?: ()=> void;
  onChangeProfile?: ()=> void;
  enableDropdown: boolean;
  disableClick?: boolean;
}

const Profile: React.FC<ProfileProps> = ({onSignOut, enableDropdown, onChangeProfile, disableClick}) =>{

  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState<IUser|undefined>(undefined);
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [testOptions,setTetsOptions] = useState<{label:string|undefined,value:string}[]>();
  const [profileUrl, setProfileUrl] = useState<IProfileImage|undefined>(undefined);

  useEffect(()=>{
    const accessToken = localStorage.getItem('qa_access_token');
    if(accessToken){
      setUserProfile( jwt_decode<IUser>(accessToken))
    }
  },[])

  useEffect(()=>{
    setTetsOptions(
      [
        {label:userProfile?.username, value:'1'},
        {label:userProfile?.email, value:'2'},
        {label:t('CHANGE_PROFILE'), value:'changeProfile'},
        {label:t('SIGN_OUT'), value:'signOut'},
      ]
    )
  },[userProfile,t])

  useEffect(()=>{
    if(userProfile)
    Client.get<IProfileImage>('/profileUrl/'+userProfile?.userId)
    .then((res)=>{
      setProfileUrl(res.data);
    }).catch((err)=>{
      console.log(err);
    })
},[userProfile])

  const delayedCloseMenu = () => {
    setTimeout(()=>setIsShowDropdown(false), 1000);
  }

  const handleOnClickOption = (option:string) => {
    if(option==='signOut'){
      onSignOut && onSignOut();
    }else if(option==='changeProfile'){
      onChangeProfile && onChangeProfile();
    }
  }

  return(
    <div className='user-profile-main-container'>
      <button 
        className={classNames(disableClick? 'disable':'user-profile-container')} 
        onClick={()=>{setIsShowDropdown(!isShowDropdown)}} 
        onBlur={()=>{delayedCloseMenu()}}
      >
        {profileUrl && <img src={profileUrl.urlPath} alt='profile'/>}
        {!profileUrl && <ReactSVG src={ProfileIcon}/>}
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