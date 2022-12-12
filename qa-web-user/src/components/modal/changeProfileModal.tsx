import { Modal } from "react-bootstrap"
import { ReactSVG } from "react-svg";
import './changeProfileModal.scss'
import XIcon from '../../assets/svg/x.svg'
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export interface ChangeProfileModalProps{
  show: boolean;
  onClose: () => void;
}

const ChangeProfileModal: React.FC<ChangeProfileModalProps> = ({show, onClose}) => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(()=>{
    setIsShow(show)
  },[show])

  const submitHandler = (e:any) =>{
    
  }
  
  return(
    <Modal show={isShow} centered className="change-profile-modal">
      <Modal.Body>
        <div className="content-container">
          <div className='header-container'>
            <div className='text-large-bold flat-label header-label'>
              {t('CHANGE_PROFILE')}
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{onClose();}} >
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className="body-container">
            <div className="preview-picture-container">
              <form onSubmit={submitHandler}>

              </form>
            </div>
            <div className='button-upload-picture text-normal-bold' onClick={()=>{}}>
                เลือกรูป
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ChangeProfileModal;