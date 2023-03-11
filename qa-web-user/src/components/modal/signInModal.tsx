
import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './signInModal.scss'
import XIcon from '../../assets/svg/x.svg'
import Client from '../../lib/axios/axios';
import classNames from 'classnames';
import {IAccessToken} from '../../data/interface/IAccessToken'
import XFillIcon from '../../assets/svg/exclamation-circle-fill.svg'
import EyeSlashIcon from '../../assets/svg/eye-slash-fill.svg'
import EyeIcon from '../../assets/svg/eye-fill.svg'
import loginImage from '../../assets/images/SignIn.png'

export interface SignInModalProps{
  show: boolean;
  onClose: () => void;
  onSignInSuccess: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({show, onClose, onSignInSuccess}) => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailIncorrect, setIsEmailIncorrect] = useState<boolean>(false);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  useEffect(()=>{
    setIsShow(show)
  },[show])

  const save2LocalStorage = (token:string) => {
    localStorage.setItem('qa_access_token',token)
  }

  const handleSubmit = () => {
    Client.post<IAccessToken>('/signin', {
        email: email,
        password: password
    }).then((res)=>{
      onSignInSuccess();
      onClose();
      save2LocalStorage(res.data.token)
    }).catch((err)=>{
      console.log(err);
      (err.response.data === 'Unauthorized_email_incorrect')? setIsEmailIncorrect(true): setIsEmailIncorrect(false);
      (err.response.data === 'Unauthorized_password_incorrect')? setIsPasswordIncorrect(true): setIsPasswordIncorrect(false);
    })
  }

  const renderIncorrectEmail = () =>{
    return(
      <div className={classNames('message-login-fail')}>
        <Row className='my-0'>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>อีเมลไม่ถูกต้อง</Col>
        </Row>
      </div>
    )
  }

  const renderIncorrectPassword = () =>{
    return(
      <div className={classNames('message-login-fail')}>
        <Row className='my-0'>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>พาสเวิร์ดไม่ถูกต้อง</Col>
        </Row>
      </div>
    )
  }

  const resetIncorrectMessage = () =>{
    setIsEmailIncorrect(false);
    setIsPasswordIncorrect(false);
  }

  const renderSignInFail = () =>{
    if(isEmailIncorrect) return renderIncorrectEmail();
    else if(isPasswordIncorrect) return renderIncorrectPassword();
    else return undefined; 
  }

  const closeModal = () =>{
    onClose(); 
    resetIncorrectMessage();
    setIsShowPassword(false);
  }

  return(
    <Modal show={isShow} centered className='sign-modal' onHide={()=>{closeModal();}}>
      <Modal.Body>
        <div className='content-container'>
          <div className='header-container'>
            <div className='image-container'>
              <img src={loginImage} alt='login'/>
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{closeModal();}} >
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className='text-large-bold   header-label'>
              ลงชื่อเข้าใช้งาน
            </div>
          <div className='body-container'>
            {renderSignInFail()}
            <Row>
              <input 
                type={'text'} 
                className='input-user-name text-box text-normal'
                placeholder='example@gmail.com'
                onChange={(e)=>setEmail(e.currentTarget.value)}
              />
            </Row>
            <Row className='input-password-container'>
              <input 
                type={isShowPassword? 'text':'password'} 
                className='input-password  text-box text-normal'
                placeholder='รหัสผ่าน'
                onChange={(e)=>setPassword(e.currentTarget.value)}
              />
              <div className='eye-password-container'>
                <ReactSVG src={isShowPassword? EyeIcon:EyeSlashIcon} onClick={()=>{ setIsShowPassword(!isShowPassword); }}/>
              </div>
            </Row>
            <Row>
              <div className='button-create text-normal-bold' onClick={handleSubmit}>
                ลงชื่อเข้าใช้
              </div>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SignInModal;