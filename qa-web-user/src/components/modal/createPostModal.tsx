import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import XIcon from '../../assets/svg/x.svg'
import { IUser } from "../../data/interface/IUser";
import Profile from "../profile";
import './createPostModal.scss'
import jwt_decode from "jwt-decode";
import SearchBar from "../searchBar";
import Client from "../../lib/axios/axios";
import { useTranslation } from "react-i18next";
import TextareaAutosize from 'react-textarea-autosize';
import { nowDate, nowTime } from "../../utils/dateAndTime";

export interface CreatePostModalProps{
  show: boolean;
  onClose: () => void;
  onCreateNewPostSuccess: (postId:number) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({show, onClose, onCreateNewPostSuccess}) =>{

  const { t } = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<IUser|undefined>(undefined);
  const [postDetail, setPostdetail] = useState<string>('');

  //should get user from one location
  useEffect(()=>{
    const accToken = localStorage.getItem('qa_access_token');
    if(accToken){
      setUserProfile( jwt_decode(accToken));
    }
  },[show])

  useEffect(()=>{
    setIsShow(show)
  },[show])

  const handleSubmit = () =>{
    Client.post<{postId:number}>('/post',{
      userId: userProfile?.userId,
      postDetail: postDetail,
      date: nowDate(),
      time: nowTime(), 
    }).then( (res) =>{
      console.log('++',res.data.postId);
      onClose();
      onCreateNewPostSuccess && onCreateNewPostSuccess(res.data.postId);
    }).catch( (err) => {
      console.log(err.response);
    }
    )
  }
  
  return(
    <Modal show={isShow} centered className="create-post-modal" onHide={()=>{onClose()}}>
      <Modal.Body>
        <div className="content-container">
          <div className='header-container'>
            <div className='text-large-bold flat-label header-label'>
              {t('CREATE_POST')}
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{onClose();}} >
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className='body-container'>
            <Row>
              <Col sm='auto'>
                <div className='create-post-profile-container'>
                  <Profile enableDropdown={false}/> 
                </div>
              </Col>
              <Col>
                <Row className="text-medium-bold text-color ps-4">{userProfile?.username}</Row>
                <Row className="ps-4 text-normal">เพิ่มอะไรสักอย่างตรงนี้</Row>
              </Col>
            </Row>
            <Row>
              <div className="post-detail-container">              
                <TextareaAutosize
                  className='post-detail-input text-box text-normal'
                  placeholder='อธิบายภาพยนตร์ที่คุณกำลังตามหา...'
                  onChange={(e)=>{setPostdetail(e.currentTarget.value)}}
                />
              </div>
            </Row>
            <Row>
              <div className="search-bar-container">
                <SearchBar placeholder="เพิ่มแท็ก..."/>
              </div>
            </Row>
            <Row>
              <div className='button-create-post text-normal-bold' onClick={handleSubmit}>
                โพสต์
              </div>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePostModal;