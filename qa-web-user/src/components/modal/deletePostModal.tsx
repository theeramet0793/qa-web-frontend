
import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import './deletePostModal.scss'
import XIcon from '../../assets/svg/x.svg'
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';
import TrashIcon from '../../assets/svg/trash.svg'

export interface deletePostModalProps{
  onClose: () => void;
  show: boolean;
  onConfirm: () => void;
}

const DeletePostModal: React.FC<deletePostModalProps> = ({onClose, onConfirm, show}) =>{

  const { t } = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(()=>{
    setIsShow(show)
  },[show])

  return(
    <Modal  show={isShow} centered className="delete-post-modal" onHide={()=>{onClose()}}>
      <Modal.Body>
        <div className='content-container'>
          <div className='header-container'>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{onClose();}} >
                <ReactSVG src={XIcon}/>
              </div>
            </div>
            <div className='text-large-bold   header-label'>
              {t('DELETE_POST')}
            </div>
            <div className='trash-image-container'>
              <ReactSVG src={TrashIcon}/>
            </div>
          </div>
          <div className='body-container-delete-post-modal'>
            <Row>
              <div className='d-flex justify-content-center align-items-center text-normal pt-2 text-color'>
                คุณแน่ใจหรือไม่ที่จะลบโพสต์นี้ ?
              </div>
            </Row>
            <Row>
              <Col>
                <div className='button-cancel text-normal-bold' onClick={()=>{onClose()}}>
                  ยกเลิก
                </div>
              </Col>
              <Col>
                <div className='button-confirm text-normal-bold' onClick={()=>{onConfirm(); onClose();}}>
                  ยืนยัน
                </div>
              </Col>
            </Row>
          </div>
        </div>

      </Modal.Body>
    </Modal>
  )
}

export default DeletePostModal;