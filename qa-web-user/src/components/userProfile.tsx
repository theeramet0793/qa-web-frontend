import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
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
          <Row>
            <Row className='d-flex justify-content-end align-item-center'>
              <div onClick={()=>onClose()} className='btn-return text-color text-normal'>
                <ReactSVG src={ArrowLeftIcon}/>
              </div>
            </Row>
            <Row className='d-flex justify-content-center align-item-center'>
              <div className='profile-container text-color'>
                 <img src={profileUrl? profileUrl:DefaultProfile} alt='profile'/>
              </div>
            </Row>
            <Row className='d-flex justify-content-center align-item-center'>
              <div className='edit-picture-container text-color text-normal'>
                <div className='btn-edit-picture' onClick={()=>{setIsShowChangeProfileModal(true)}}>
                  <Row>
                    <Col sm='auto' className='pe-0'><ReactSVG src={PencilIcon}/></Col>
                    <Col>เปลี่ยนรูปโปรไฟล์</Col>
                  </Row> 
                </div>
              </div>
            </Row>
            <Row className='pt-3 d-flex justify-content-center align-items-center'>
              <Row className='py-2 d-flex justify-content-center align-items-center'>
                <Row className='info-container d-flex justify-content-center align-items-center'>
                  <Col className='text-color text-normal'>Username: {userProfile?.username}</Col>
                  <Col sm='auto' className='text-color'>
                    <div><ReactSVG src={PencilIcon}/></div>
                  </Col>
                </Row>
              </Row>
              <Row className='py-2 d-flex justify-content-center align-items-center'>
                <Row className='info-container d-flex justify-content-center align-items-center'>
                  <Col className='text-color tetx-normal'>Email: {userProfile?.email}</Col>
                  <Col sm='auto' className='text-color'>
                    <div><ReactSVG src={PencilIcon}/></div>
                  </Col>
                </Row>
              </Row>
              <Row className='py-2 d-flex justify-content-center align-items-center'>
                <Row className='info-container d-flex justify-content-center align-items-center'>
                  <Col className='text-color text-normal'>Password</Col>
                  <Col sm='auto' className='text-color'>
                    <div><ReactSVG src={PencilIcon}/></div>
                  </Col>
                </Row>
              </Row>
            </Row>
          </Row>
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