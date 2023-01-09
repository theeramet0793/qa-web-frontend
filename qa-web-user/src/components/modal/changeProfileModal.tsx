import { Modal } from "react-bootstrap"
import { ReactSVG } from "react-svg";
import './changeProfileModal.scss'
import XIcon from '../../assets/svg/x.svg'
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { firebaseStorage } from "../../services/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import Client from "../../lib/axios/axios";
import { IUser } from "../../data/interface/IUser";
import { GetUserData } from "../userData/userData";
import { nowDateTime } from "../../utils/dateAndTime";
import classNames from 'classnames';

export interface ChangeProfileModalProps{
  show: boolean;
  onClose: () => void;
  hasNewURLPath?: (newUrl:string) => void;
}

const ChangeProfileModal: React.FC<ChangeProfileModalProps> = ({show, onClose, hasNewURLPath}) => {

  const { t } = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [uploadProg, setUploadProg] = useState<number>(0);
  const [file, setFile] = useState<File|undefined|null>(undefined);
  const [userProfile ] = useState<IUser|undefined>(GetUserData());
  const [urlPath, setUrlPath] = useState<string|undefined>(undefined);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(()=>{
    setIsShow(show);
    setFile(undefined);
  },[show])

  useEffect(()=>{
    if(uploadProg>=100){
      setTimeout(() => {
        onClose();
        setUploadProg(0);
        setIsUploading(false);
      }, 2000);
    } 
    //eslint-disable-next-line
  },[uploadProg])

  useEffect(()=>{
    if(urlPath){
      var now = new Date();
      Client.post<string>('/profileUrl',{
      userId: userProfile?.userId,
      urlPath: urlPath,
      date: now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate(),
      time: now.getHours()+':'+now.getMinutes(), 
      }).then( (res) =>{

      }).catch( (err) => {

      })
    }
  },[urlPath, userProfile])

  const submitHandler = () =>{
    uploadFile(file);
  }

  const uploadFile = (file:any) =>{
    if(!file) {
      alert("Please choose a file first!");
      return;
    }
    const storageRef = ref(firebaseStorage,`/profileImage/${'user-'+userProfile?.username+'-'+userProfile?.userId+'-'+nowDateTime()}`)
    const uploadTask = uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed', (snapShot)=>{
      const prog = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
      setUploadProg(prog)
    }, (err)=>{
      console.log(err);
    }, ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((url)=>{
        setUrlPath(url);
        hasNewURLPath && hasNewURLPath(url);
      });
    })
  }

  const renderPercent = (percent:number) =>{
    return(    
    <div className="progress-bar-container">
      <div className={classNames(percent===100? 'progress':'inprogress'," text-normal text-color")} >
        {percent===100? 'อัพโหลดสำเร็จ':'กำลังอัพโหลด'}
      </div>
    </div>
    )
  }
  
  return(
    <Modal show={isShow} centered className="change-profile-modal">
      <Modal.Body>
        <div className="content-container">
          <div className='header-container'>
            <div className='text-large-bold header-label'>
              {t('CHANGE_PROFILE')}
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{onClose(); setUploadProg(0)}} >
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className="body-container">
            <div className="preview-picture-container">
              <div className="image-preview">
                {file && <img src={URL.createObjectURL(file)} alt='profile'/>}
              </div>
            </div>
            <div className="input-image-container">
                <input type={'file'} multiple={false} className='input-image-file text-color' onChange={(e)=>{setFile(e.currentTarget.files?.item(0))}}/>
            </div>
            <div className='button-upload-picture text-normal-bold' onClick={()=>{submitHandler(); setIsUploading(true)}}>
                อัพโหลด
            </div>
            <div className="d-flex justify-content-center align-items-center text-color">
              {/*Uploaded {uploadProg} %*/}
              {(isUploading) && renderPercent(uploadProg)}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ChangeProfileModal;