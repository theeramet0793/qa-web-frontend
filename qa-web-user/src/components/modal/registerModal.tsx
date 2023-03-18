
import { Col, Modal, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './registerModal.scss'
import XIcon from '../../assets/svg/x.svg'
import { useEffect, useState } from 'react';
import Client from '../../lib/axios/axios';
import { IUser } from '../../data/interface/IUser';
import { useTranslation } from "react-i18next";
import classNames from 'classnames';
import XFillIcon from '../../assets/svg/exclamation-circle-fill.svg'
import CorrectIcon from '../../assets/svg/check-circle-fill.svg'
import EyeSlashIcon from '../../assets/svg/eye-slash-fill.svg'
import EyeIcon from '../../assets/svg/eye-fill.svg'

export interface RegisterModalProps{
  show: boolean;
  onClose: () => void;
  onAutoToLogin?: ()=>void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({show, onClose, onAutoToLogin}) => {

  const {t} = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const [isDuplicateEmail, setIsDuplicateEmail] = useState<boolean>(false);
  const [isTooLongUsername, setIsTooLongUsername] = useState<boolean>(false);
  const [isDuplicateUsername, setIsDuplicateUsername] = useState<boolean>(false);
  const [isTooLongPassword, setIsTooLongPassword] = useState<boolean>(false);
  const [isTooShortPassword, setIsTooShortPassword] = useState<boolean>(false);
  const [isTooLongEmail, setIsTooLongEmail] = useState<boolean>(false);
  const [isEmptyUserName, setIsEmptyUserName] = useState<boolean>(false);
  const [isEmptyEmail, setIsEmptyEmail] = useState<boolean>(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(3);

  useEffect(()=>{
    setIsShow(show)
  },[show])

  useEffect(()=>{
    if(userName && userName.length > 0) setIsEmptyUserName(false);
    (userName && userName.length > 20)? setIsTooLongUsername(true):setIsTooLongUsername(false);
  }, [userName])

  useEffect(()=>{
    if(email && email.length > 0) setIsEmptyEmail(false);
    (email && email.length > 30)? setIsTooLongEmail(true):setIsTooLongEmail(false);
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    (email && email.length > 0 && !expression.test(email))? setIsInvalidEmail(true):setIsInvalidEmail(false);
  }, [email])

  useEffect(()=>{
    if(password && password.length > 0) setIsEmptyPassword(false);
    (password && password.length > 20)? setIsTooLongPassword(true):setIsTooLongPassword(false);
    (password && password.length < 8)? setIsTooShortPassword(true):setIsTooShortPassword(false);
  }, [password])

  useEffect(()=>{
    if(isSuccess){
      let countDownTime = 3;
      const countDownFn = () => {
        countDownTime--;
        setCountDown(countDownTime);
        if (countDownTime === 0) {
          clearInterval(countDownInterval);
        }
      };
      const countDownInterval = setInterval(countDownFn, 1000);
    }
    // eslint-disable-next-line
  },[isSuccess])

  useEffect(()=>{
    if(countDown===0){
      closeModal();
      onAutoToLogin && onAutoToLogin();
    }
      // eslint-disable-next-line
  },[countDown])

  const handleSubmit = () =>{
    if((userName !== '' && email !== '' && password !== '')&&(userName.length !== 0 && email.length !== 0 && password.length !== 0 && password.length >= 8)){
      Client.post<IUser>('/signup',{
        userName: userName,
        email: email,
        password: password
      }).then( (res) =>{
        //console.log(res);
        resetInvalid();
        setIsSuccess(true);
      }).catch( (err) => {
        if(err.response.status === 409){
          (err.response.data === 'Duplicate_username')? setIsDuplicateUsername(true):setIsDuplicateUsername(false);
          (err.response.data === 'Duplicate_email')? setIsDuplicateEmail(true):setIsDuplicateEmail(false);
        }
        console.log(err.response);
      }
      )
    }
  }

  const emptyCheck = () =>{
    (userName === '' || userName.length === 0)? setIsEmptyUserName(true):setIsEmptyUserName(false);
    (email === '' || email.length === 0)? setIsEmptyEmail(true):setIsEmptyEmail(false);
    (password === '' || password.length === 0)? setIsEmptyPassword(true):setIsEmptyPassword(false);
  }

  const renderTooLongEmail = () => {
    return(
      <div className={classNames('invalid-message')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>อีเมลต้องไม่ยาวเกิน 30 ตัวอักษร</Col>
        </Row>
      </div>
    )
  }

  const renderTooLongPassword = () => {
    return(
      <div className={classNames('invalid-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>รหัสผ่านต้องไม่ยาวเกิน 20 ตัวอักษร</Col>
        </Row>
      </div>
    )
  }

  const renderTooShortPassword = () => {
    return(
      <div className={classNames('invalid-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>รหัสผ่านต้องยาวกว่า 8 ตัวอักษร</Col>
        </Row>
      </div>
    )
  }

  const renderInvalidEmail = () => {
    return(
      <div className={classNames('invalid-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>รูปแบบอีเมลไม่ถูกต้อง</Col>
        </Row>
      </div>
    )
  }

  const renderDuplicateEmail = () => {
    return(
      <div className={classNames('invalid-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>อีเมลนี้มีบัญชีแล้ว</Col>
        </Row>
      </div>
    )
  }

  const renderTooLongUserName = () => {
    return(
      <div className={classNames('invalid-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>ชื่อผู้ใช้งานไม่สามารถยาวเกิน 20 ตัวอักษร</Col>
        </Row>
      </div>
    )
  }

  const renderDuplicateUserName = () => {
    return(
      <div className={classNames('invalid-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>ชื่อผู้ใช้งานนี้มีคนใช้แล้ว</Col>
        </Row>        
      </div>
    )
  }

  const renderSuccess = (count:number) =>{
    return (
      <div className={classNames('success-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={CorrectIcon}/></Col>
          <Col>{t("CREATE_ACCOUNT_SUCCESS")+"กำลังไปหน้าล็อกอินใน "+count}</Col>
        </Row>   
      </div>
    )
  }

  const renderEmptyUsername = () =>{
    return(
      <div className={classNames('invalid-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>กรุณากรอกชื่อผู้ใช้งาน</Col>
        </Row>   
      </div>
    )
  }

  const renderEmptyEmail = () =>{
    return(
      <div className={classNames('invalid-message text-normal-responsive')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>กรุณากรอกอีเมล</Col>
        </Row>         
      </div>
    )
  }

  const renderEmptyPassword = () =>{
    return(
      <div className={classNames('invalid-message')}>
        <Row>
          <Col xs='auto'><ReactSVG src={XFillIcon}/></Col>
          <Col>กรุณาตั้งรหัสผ่าน</Col>
        </Row>          
      </div>
    )
  }

  const renderInvalidMessage = () => {
    if (isEmptyUserName) return renderEmptyUsername();
    else if (isTooLongUsername) return renderTooLongUserName();
    else if (isDuplicateUsername) return renderDuplicateUserName();
    else if (isEmptyEmail) return renderEmptyEmail();
    else if (isInvalidEmail) return renderInvalidEmail();
    else if (isTooLongEmail) return renderTooLongEmail();
    else if (isDuplicateEmail) return renderDuplicateEmail();
    else if (isEmptyPassword) return renderEmptyPassword();
    else if (isTooLongPassword) return renderTooLongPassword();
    else if (isTooShortPassword) return renderTooShortPassword();
    else return undefined
  }

  const resetInvalid = () =>{
    setIsSuccess(false); 
    setIsDuplicateUsername(false); 
    setIsDuplicateEmail(false); 
    setIsTooLongUsername(false);
    setIsTooLongEmail(false);
    setIsTooLongPassword(false);
    setIsEmptyUserName(false);
    setIsEmptyEmail(false);
    setIsEmptyPassword(false);
  }

  const resetInput = () => {
    setUserName('');
    setEmail('');
    setPassword('');
  }

  const closeModal = () =>{
    onClose(); 
    resetInvalid(); 
    resetInput(); 
    setCountDown(3);
    setIsShowPassword(false);
  }

  return(
    <Modal show={isShow} centered className='reg-modal'  onHide={()=>{closeModal();}}>
      <Modal.Body>
        <div className='content-container'>
          <div className='header-container'>
            <div className='text-large-bold   header-label'>
              สมัครสมาชิก
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{closeModal();}}>
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className='body-container'>
            <Row>
              <input 
                type={'text'} 
                className={classNames('input-user-name text-box text-normal', (isTooLongUsername || isDuplicateUsername || isEmptyUserName)? 'invalid':'')}
                placeholder='ชื่อผู้ใช้งาน'
                maxLength={20}
                onChange={(e)=>{setUserName(e.currentTarget.value)}}
              />
            </Row>
            <Row>
              <input 
                type={'email'} 
                className={classNames('input-email text-box text-normal', (isTooLongEmail || isDuplicateEmail || isEmptyEmail || isInvalidEmail)? 'invalid':'')}
                placeholder='example@gmail.com'
                onChange={(e)=>{setEmail(e.currentTarget.value)}}
              />
            </Row>
            <Row className='input-password-container'>
              <input 
                type={isShowPassword? 'text':'password'} 
                className={classNames('input-password text-box text-normal', (isTooLongPassword || isTooShortPassword || isEmptyPassword)? 'invalid':'')}
                placeholder='รหัสผ่าน 8 - 20 ตัวอักษร'
                onChange={(e)=>{setPassword(e.currentTarget.value)}}
              />
              <div className='eye-password-container'>
                <ReactSVG src={isShowPassword? EyeIcon:EyeSlashIcon} onClick={()=>{ setIsShowPassword(!isShowPassword); }}/>
              </div>
            </Row>
            {renderInvalidMessage()}
            {isSuccess && renderSuccess(countDown)}
            <Row>
              <div className={classNames('button-create text-normal-bold')} onClick={()=>{emptyCheck();handleSubmit()}}>
                สร้างบัญชี
              </div>
            </Row>

          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal;