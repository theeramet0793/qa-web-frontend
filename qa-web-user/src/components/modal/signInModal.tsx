
import { useEffect, useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './signInModal.scss'
import XIcon from '../../assets/svg/x.svg'
import Client from '../../lib/axios/axios';
import { IUser } from '../../data/interface/IUser';

export interface SignInModalProps{
  show: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({show, onClose}) => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(()=>{
    setIsShow(show)
  },[show])

  const handleSubmit = () => {
    Client.post<IUser>('/signin', {
        email: email,
        password: password
    }).then((res)=>{
      console.log(res);
      setIsSuccess(true)
    }).catch((err)=>{
      console.log(err);
    })
  }

  const renderSuccess = () =>{
    return(
      <Row>
        ลงชื่อเข้าใช้สำเร็จ
      </Row>
    )
  }

  return(
    <Modal show={isShow} centered className='sign-modal'>
      <Modal.Body>
        <div className='content-container'>
          <div className='header-container'>
            <div className='text-large-bold flat-label header-label'>
              ลงชื่อเข้าใช้
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{onClose(); setIsSuccess(false)}} >
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className='body-container'>
            <Row>
              <input 
                type={'text'} 
                className='input-user-name text-box text-normal'
                placeholder='example@gmail.com'
                onChange={(e)=>setEmail(e.currentTarget.value)}
              />
            </Row>
            <Row>
              <input 
                type={'password'} 
                className='input-user-name text-box text-normal'
                placeholder='รหัสผ่าน'
                onChange={(e)=>setPassword(e.currentTarget.value)}
              />
            </Row>
            <Row>
              <div className='button-create text-normal-bold' onClick={handleSubmit}>
                ลงชื่อเข้าใช้
              </div>
            </Row>
            {isSuccess && renderSuccess()}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SignInModal;