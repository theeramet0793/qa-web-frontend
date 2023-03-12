import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IProfileImage } from '../data/interface/IProfileImage';
import { IUser } from '../data/interface/IUser';
import Client from '../lib/axios/axios';
import ChangeProfileModal from './modal/changeProfileModal';
import { GetUserData } from './userData/userData';
import './userProfile.scss'
import PencilIcon from '../assets/svg/pencil-fill.svg'
import ArrowLeftIcon from '../assets/svg/arrow-left.svg'
import DefaultProfile from '../assets/images/default-profile.jpg'
import { ReactSVG } from 'react-svg';
import classNames from 'classnames'

export interface UserProfileProps{
  onClose: () => void;
  onChangeProfile: (newProfileUrl:string) => void;
}

const UserProfile:React.FC<UserProfileProps> = ({onClose, onChangeProfile}) =>{

  const [profileUrl, setProfileUrl] = useState<string|undefined>(undefined);
  const [userProfile] = useState<IUser|undefined>(GetUserData());
  const [isShowChangeProfileModal, setIsShowChangeProfileModal] = useState<boolean>(false);

  useEffect(()=>{
    if(userProfile)
    Client.get<IProfileImage>('/profileUrl/'+userProfile?.userId)
    .then((res)=>{
      if(res.data.urlPath)
      setProfileUrl(res.data.urlPath);
    }).catch((err)=>{
      console.log(err);
    })
},[userProfile])

  return(
    <>
      <div className='user-profile-container-ghjk'>
        <div className='user-profile-child-container'>
          <Container>
            <Row className='d-flex justify-content-start align-item-center px-2'>
              <div onClick={()=>onClose()} className='btn-return text-normal'>
                <ReactSVG src={ArrowLeftIcon}/>
              </div>
            </Row>
            <Row className='d-flex justify-content-center align-item-center'>
              <div className='profile-container '>
                 <img src={profileUrl? profileUrl:DefaultProfile} alt='profile'/>
              </div>
            </Row>
            <Row className='d-flex justify-content-center align-item-center'>
              <div className='edit-picture-container text-normal'>
                <div className='btn-edit-picture' onClick={()=>{setIsShowChangeProfileModal(true)}}>
                  <Row>
                    <Col xs='auto' className='pe-0'><ReactSVG src={PencilIcon}/></Col>
                    <Col>เปลี่ยนรูปโปรไฟล์</Col>
                  </Row> 
                </div>
              </div>
            </Row>
            <Row className='pt-3 d-flex justify-content-center align-items-center'>
              <Row className='py-2 d-flex justify-content-center align-items-center'>
                <Row className='info-container d-flex justify-content-center align-items-center'>
                  <Col className=' text-normal'>
                    <div>Username: {userProfile?.username}</div>
                  </Col>
                  <Col xs='auto' className={classNames('edit-icon-container-disable')}>
                    <div><ReactSVG src={PencilIcon}/></div>
                  </Col>
                </Row>
              </Row>
              <Row className='py-2 d-flex justify-content-center align-items-center'>
                <Row className='info-container d-flex justify-content-center align-items-center'>
                  <Col className=' text-normal'>Email: {userProfile?.email}</Col>
                  <Col xs='auto' className='edit-icon-container-disable'>
                    <div><ReactSVG src={PencilIcon}/></div>
                  </Col>
                </Row>
              </Row>
              <Row className='py-2 d-flex justify-content-center align-items-center'>
                <Row className='info-container d-flex justify-content-center align-items-center'>
                  <Col className=' text-normal'>Password</Col>
                  <Col xs='auto' className='edit-icon-container-disable'>
                    <div><ReactSVG src={PencilIcon}/></div>
                  </Col>
                </Row>
              </Row>
            </Row>
          </Container>
        </div>
      </div>
      <ChangeProfileModal 
        show={isShowChangeProfileModal} 
        onClose={()=>{setIsShowChangeProfileModal(false)}} 
        hasNewURLPath={(newUrl)=>{setProfileUrl(newUrl);onChangeProfile(newUrl)}}
      />
    </>
  )
}

export default UserProfile;