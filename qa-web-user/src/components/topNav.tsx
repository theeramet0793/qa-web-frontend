import { Col, Row } from 'react-bootstrap';
import './topNav.scss'
import { useTranslation } from "react-i18next";
import Logo from '../assets/svg/logo.svg'
import { ReactSVG } from 'react-svg';
import Profile from './profile';
import Notification from './notification';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { IUser } from '../data/interface/IUser';
import { useNavigate } from 'react-router-dom'
import SearchBox from './searchBox';
import MoreMenu from './moreMenu';
import { IOption } from '../data/interface/IOption';

export interface TopNavProps{
  onClickReg: () => void;
  onClickSign: () => void;
  isSignInSuccess: boolean;
  onSignOut: ()=> void;
  onSignInSuccess: ()=>void;
  onProfile: ()=>void;
  newProfileUrl?: string;
}

const TopNav: React.FC <TopNavProps> = ({onClickReg, onClickSign, isSignInSuccess, onSignOut, onSignInSuccess, onProfile, newProfileUrl}) => {

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<IUser|undefined>(undefined);
  const signAndRegOptions:IOption[] = [
    {label:'ลงชื่อเข้าใช้', value:'signin'},
    {label:'สมัครใช้งาน', value:'register'},
  ]

  useEffect(()=>{
    const accToken = localStorage.getItem('qa_access_token');
    if(accToken){
      setUserProfile( jwt_decode(accToken));
      onSignInSuccess();
    }
  },[isSignInSuccess, onSignInSuccess])

  const handleSelectMenu = (selected: IOption) =>{
    if(selected.value === 'signin') onClickSign();
    else if(selected.value === 'register') onClickReg();
  }
  
  const { t } = useTranslation();
  return(
    <div className='top-nav'>
      <Row className='content-container'>
        <Col xs={3} sm={3} className=' d-flex justify-content-center align-items-center'>
          <div className='logo-container'>
            <div className='logo d-flex align-items-center justify-content-start' onClick={()=>{navigate('/');}}>
              <ReactSVG src={Logo}/>
            </div>
          </div>
        </Col>
        <Col xs={4} sm={6}  className='d-flex justify-content-center align-items-center'>
          <div className="search-box-container-qaz">
            <SearchBox onInputChange={()=>{}}/>
          </div>
        </Col>
        <Col xs={5} sm={3}  className='d-flex justify-content-center align-items-center '>
          {!userProfile &&
              <Row className='register-row'>
                <Col className='d-flex align-items-center justify-content-center'>
                  <div className='register-btn-container'> 
                    <div className='btn-reg '>
                      <div className='text-normal-bold' onClick={onClickReg}>
                        {t('REGISTER')}
                      </div>
                    </div>
                  </div> 
                </Col>
                <Col className='d-flex align-items-center justify-content-center'>
                  <div className='sign-btn-container'> 
                    <div className='btn-sign '>
                      <div className='text-normal-bold' onClick={onClickSign}>
                        {t('SIGNIN')}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
          }
          {/*In case of small screen*/
          !userProfile &&
            <div className='navbar-more-menu-container'>
              <MoreMenu icon='list' menuOptions={signAndRegOptions} onSelectOption={(selected)=>{handleSelectMenu(selected)}}/>
            </div>
          }
          {userProfile &&
              <Row>
                <Col className='d-flex align-items-center justify-content-end'>
                  <div className='noti-container'>
                    <Notification/>
                  </div>
                </Col>
                <Col>
                  <div className='top-nav-profile-container'>
                    <Profile 
                      onSignOut={()=>onSignOut()} 
                      enableDropdown={true} 
                      onProfile={()=>{onProfile()}}
                      newProfileUrl={newProfileUrl}
                    /> 
                  </div>
                </Col>
              </Row>
          }
        </Col>
      </Row>
    </div>
  )
}

export default TopNav;