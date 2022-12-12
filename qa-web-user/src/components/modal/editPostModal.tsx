import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import XIcon from '../../assets/svg/x.svg'
import { IUser } from "../../data/interface/IUser";
import Profile from "../profile";
import './createPostModal.scss'
import SearchBar from "../searchBar";
import Client from "../../lib/axios/axios";
import { useTranslation } from "react-i18next";
import TextareaAutosize from 'react-textarea-autosize';
import { GetUserData } from "../userData/userData";

export interface EditPostModalProps{
  show: boolean;
  onClose: () => void;
  originalPostDetail: string;
}

const EditPostModal: React.FC<EditPostModalProps> = ({show, onClose, originalPostDetail}) =>{

  const { t } = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [postDetail, setPostdetail] = useState<string>('');
  const [ userProfile ] = useState<IUser|undefined>(GetUserData());

  useEffect(()=>{
    setIsShow(show)
  },[show])

  const handleSubmit = () =>{
    var now = new Date();
    Client.patch<IUser>('/updatepost',{
      userId: userProfile?.userId,
      postDetail: postDetail,
      date: now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate(),
      time: now.getHours()+':'+now.getMinutes(), 
    }).then( (res) =>{
      console.log(res);
      onClose();
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
              {t('EDIT_POST')}
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
                  <Profile enableDropdown={true}/> 
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
                  defaultValue={originalPostDetail}
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
                บันทึกโพสต์
              </div>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default EditPostModal;