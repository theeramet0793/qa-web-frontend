
import { Modal, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import RoundButton from '../roundButton';
import './registerModal.scss'
import XIcon from '../../assets/svg/x.svg'
import { useEffect, useState } from 'react';
import Client from '../../lib/axios/axios';
import { IUser } from '../../data/interface/IUser';

export interface RegisterModalProps{
  show: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({show, onClose}) => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(()=>{
    setIsShow(show)
  },[show])

  const handleSubmit = () =>{
    Client.post<IUser>('/signup',{
      userName: userName,
      email: email,
      password: password
    }).then( (res) =>{
      setIsSuccess(true);
      console.log(res);
    }).catch( (err) => {
      console.log(err);
    }
    )
  }

  const renderSuccess = () =>{
    return (
      <Row>
        สร้างบัญชีสำเร็จแล้ว
      </Row>
    )
  }

  return(
    <Modal show={isShow} centered className='reg-modal'>
      <Modal.Body>
        <div className='content-container'>
          <div className='header-container'>
            <div className='text-large-bold flat-label header-label'>
              สมัครสมาชิก
            </div>
            <div className='x-button-container'>
              <RoundButton boxShadowSize='small' onClick={()=>{onClose(); setIsSuccess(false)}}>
                <ReactSVG src={XIcon}/>
              </RoundButton>
            </div>
          </div>
          <div className='body-container'>
            <Row>
              <input 
                type={'text'} 
                className='input-user-name text-box text-normal'
                placeholder='ชื่อผู้ใช้งาน'
                onChange={(e)=>{setUserName(e.currentTarget.value)}}
              />
            </Row>
            <Row>
              <input 
                type={'email'} 
                className='input-user-name text-box text-normal'
                placeholder='example@gmail.com'
                onChange={(e)=>{setEmail(e.currentTarget.value)}}
              />
            </Row>
            <Row>
              <input 
                type={'password'} 
                className='input-user-name text-box text-normal'
                placeholder='รหัสผ่าน'
                onChange={(e)=>{setPassword(e.currentTarget.value)}}
              />
            </Row>
            <Row>
              <div className='button-create text-normal-bold' onClick={()=>handleSubmit()}>
                สร้างบัญชี
              </div>
            </Row>
            {isSuccess && renderSuccess()}

          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal;