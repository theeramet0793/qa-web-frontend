
import { Modal, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './registerModal.scss'
import XIcon from '../../assets/svg/x.svg'
import { useEffect, useState } from 'react';
import Client from '../../lib/axios/axios';
import { IUser } from '../../data/interface/IUser';
import { useTranslation } from "react-i18next";
import classNames from 'classnames';

export interface RegisterModalProps{
  show: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({show, onClose}) => {

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
  const [isTooLongEmail, setIsTooLongEmail] = useState<boolean>(false);
  const [isEmptyUserName, setIsEmptyUserName] = useState<boolean>(false);
  const [isEmptyEmail, setIsEmptyEmail] = useState<boolean>(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState<boolean>(false);

  useEffect(()=>{
    setIsShow(show)
  },[show])

  useEffect(()=>{
    if(userName && userName.length > 0) setIsEmptyUserName(false);
    (userName && userName.length > 30)? setIsTooLongUsername(true):setIsTooLongUsername(false);
  }, [userName])

  useEffect(()=>{
    if(email && email.length > 0) setIsEmptyEmail(false);
    (email && email.length > 30)? setIsTooLongEmail(true):setIsTooLongEmail(false);
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    (email && email.length > 0 && !expression.test(email))? setIsInvalidEmail(true):setIsInvalidEmail(false);
  }, [email])

  useEffect(()=>{
    if(password && password.length > 0) setIsEmptyPassword(false);
    (password && password.length > 30)? setIsTooLongPassword(true):setIsTooLongPassword(false);
  }, [password])

  const handleSubmit = () =>{
    if((userName !== '' && email !== '' && password !== '')&&(userName.length !== 0 && email.length !== 0 && password.length !== 0)){
      Client.post<IUser>('/signup',{
        userName: userName,
        email: email,
        password: password
      }).then( (res) =>{
        console.log(res);
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
        อีเมลต้องไม่ยาวเกิน 30 ตัวอักษร
      </div>
    )
  }

  const renderTooLongPassword = () => {
    return(
      <div className={classNames('invalid-message')}>
        รหัสผ่านต้องไม่ยาวเกิน 30 ตัวอักษร
      </div>
    )
  }

  const renderInvalidEmail = () => {
    return(
      <div className={classNames('invalid-message')}>
        อีเมลรูปแบบไม่ถูกต้อง
      </div>
    )
  }

  const renderDuplicateEmail = () => {
    return(
      <div className={classNames('invalid-message')}>
        อีเมลนี้มีบัญชีแล้ว
      </div>
    )
  }

  const renderTooLongUserName = () => {
    return(
      <div className={classNames('invalid-message')}>
        ชื่อผู้ใช้งานไม่สามารถยาวเกิน 30 ตัวอักษร
      </div>
    )
  }

  const renderDuplicateUserName = () => {
    return(
      <div className={classNames('invalid-message')}>
        ชื่อผู้ใช้งานนี้มีคนใช้แล้ว
      </div>
    )
  }

  const renderSuccess = () =>{
    return (
      <div className={classNames('success-message')}>
        {t("CREATE_ACCOUNT_SUCCESS")}
      </div>
    )
  }

  const renderEmptyUsername = () =>{
    return(
      <div className={classNames('invalid-message')}>
        กรุณากรอกชื่อผู้ใช้งาน
      </div>
    )
  }

  const renderEmptyEmail = () =>{
    return(
      <div className={classNames('invalid-message')}>
        กรุณากรอกอีเมล
      </div>
    )
  }

  const renderEmptyPassword = () =>{
    return(
      <div className={classNames('invalid-message')}>
        กรุณาตั้งรหัสผ่าน
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

  return(
    <Modal show={isShow} centered className='reg-modal'  onHide={()=>{onClose(); resetInvalid(); resetInput()}}>
      <Modal.Body>
        <div className='content-container'>
          <div className='header-container'>
            <div className='text-large-bold   header-label'>
              สมัครสมาชิก
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{onClose(); resetInvalid(); resetInput()}}>
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
                onChange={(e)=>{setUserName(e.currentTarget.value)}}
              />
            </Row>
            <Row>
              <input 
                type={'email'} 
                className={classNames('input-user-name text-box text-normal', (isTooLongEmail || isDuplicateEmail || isEmptyEmail || isInvalidEmail)? 'invalid':'')}
                placeholder='example@gmail.com'
                onChange={(e)=>{setEmail(e.currentTarget.value)}}
              />
            </Row>
            <Row>
              <input 
                type={'password'} 
                className={classNames('input-user-name text-box text-normal', (isTooLongPassword || isEmptyPassword)? 'invalid':'')}
                placeholder='รหัสผ่าน'
                onChange={(e)=>{setPassword(e.currentTarget.value)}}
              />
            </Row>
            {renderInvalidMessage()}
            {isSuccess && renderSuccess()}
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