
import './profile.scss'
import { useEffect, useState } from 'react';
import { IUser } from '../data/interface/IUser';
import { useTranslation } from 'react-i18next';
import Client from '../lib/axios/axios';
import { IProfileImage } from '../data/interface/IProfileImage';
import classNames from 'classnames'
import { GetUserData } from './userData/userData';
import DefaultProfile from '../assets/images/default-profile.jpg'
import PersonIcon from '../assets/svg/person-fill-2.svg'
import PostIcon from '../assets/svg/credit-card-2-front-fill.svg'
import GearIcon from '../assets/svg/gear-fill.svg'
import SignOutIcon from '../assets/svg/box-arrow-left.svg'
import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom';

export interface ProfileProps{
  onSignOut?: ()=> void;
  onProfile?: ()=>void;
  onMyPost?: ()=>void;
  enableDropdown: boolean;
  disableClick?: boolean;
  newProfileUrl?: string;
}

const Profile: React.FC<ProfileProps> = ({onSignOut, enableDropdown, onProfile, disableClick, newProfileUrl, onMyPost}) =>{

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userProfile] = useState<IUser|undefined>(GetUserData());
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [testOptions,setTestOptions] = useState<{label:string|undefined,value:string}[]>();
  const [profileUrl, setProfileUrl] = useState<string|undefined>(undefined);

  useEffect(()=>{
    setTestOptions(
      [
        {label:userProfile?.username, value:'editProfile'},
        {label:'โพสต์ของคุณ', value:'myPost'},
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
    }else if(option==='myPost'){
      navigate('/searching/?keyword='+userProfile?.username+"?type=USER", {replace: true})
    }
  }

  const getIcon = (index:number) =>{
    if(index===0) return PersonIcon;
    if(index===1) return PostIcon;
    if(index===2) return GearIcon;
    else return SignOutIcon;
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
                  <Row>
                      <Col xs='auto'><ReactSVG src={getIcon(index)}/></Col>
                      <Col>{option.label}</Col>
                  </Row>
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