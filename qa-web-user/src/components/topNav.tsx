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

export interface TopNavProps{
  onClickReg: () => void;
  onClickSign: () => void;
  isSignInSuccess: boolean;
  onSignOut: ()=> void;
  onSignInSuccess: ()=>void;
  onChangeProfile: ()=>void;
}

const TopNav: React.FC <TopNavProps> = ({onClickReg, onClickSign, isSignInSuccess, onSignOut, onSignInSuccess, onChangeProfile}) => {

  const [userProfile, setUserProfile] = useState<IUser|undefined>(undefined);

  useEffect(()=>{
    const accToken = localStorage.getItem('qa_access_token');
    if(accToken){
      setUserProfile( jwt_decode(accToken));
      onSignInSuccess();
    }
    
  },[isSignInSuccess, onSignInSuccess])
  
  const { t } = useTranslation();
  return(
    <div className='top-nav'>
      <Row>
        <Col>
          <div className='logo-container'>
            <div className='logo-oblong'>
              <div className='logo d-flex align-items-center justify-content-center'>
                <ReactSVG src={Logo}/>
              </div>
            </div>
          </div>
        </Col>
        {!userProfile &&
          <Col>
            <Row className='register-row'>
              <Col className='d-flex align-items-center justify-content-end'>
                <div className='register-btn-container'> 
                  <div className='btn-reg '>
                    <div className='text-medium-bold' onClick={onClickReg}>
                      {t('REGISTER')}
                    </div>
                  </div>
                </div> 
              </Col>
              <Col className='d-flex align-items-center justify-content-start'>
                <div className='sign-btn-container'> 
                  <div className='btn-sign '>
                    <div className='text-medium-bold' onClick={onClickSign}>
                      {t('SIGNIN')}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        }
        {userProfile &&
          <Col>
            <Row>
              <Col className='d-flex align-items-center justify-content-end'>
                <Notification/>
              </Col>
              <Col>
                <div className='top-nav-profile-container'>
                  <Profile onSignOut={()=>onSignOut()} enableDropdown={true} onChangeProfile={()=>onChangeProfile()}/> 
                </div>
              </Col>
            </Row>
          </Col>
        }

      </Row>
    </div>
  )
}

export default TopNav;