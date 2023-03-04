import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IComment } from '../data/interface/IComment';
import { IOption } from '../data/interface/IOption';
import { IUser } from '../data/interface/IUser';
import Client from '../lib/axios/axios';
import './comment.scss'
import MoreMenu from './moreMenu';
import { GetUserData } from './userData/userData';
import TextareaAutosize from 'react-textarea-autosize';
import ProfileIcon from '../assets/svg/person-fill.svg'
import { ReactSVG } from 'react-svg';
import { IProfileImage } from '../data/interface/IProfileImage';
import { nowDate, nowTime } from '../utils/dateAndTime';
import classNames from 'classnames';

export interface CommentProps{
  commentId: number;
  onCommentDeleted: () => void;
}

const Comment:React.FC<CommentProps> = ({commentId, onCommentDeleted}) =>{

  const [comment, setComment] = useState<IComment|undefined>(undefined);
  const [ userProfile ] = useState<IUser|undefined>(GetUserData());
  const [ commenterProfileUrl, setCommenterProfileUrl ] = useState<IProfileImage|undefined>(undefined);
  const [ isCommentDeleted, setIsCommentDeleted] = useState<boolean>(false);
  const [ isFadeOutFinish, setIsFadeOutFinish] = useState<boolean>(false);
  const [ disableTextArea, setDisableTextArea] = useState<boolean>(true);
  const [ editComment, setEditComment] = useState<string|undefined>(comment?.commentDetail);
  const [ triggerUpdateSuccess, setTriggerUpdateSuccess] = useState<boolean>(false);

  const ownerUserOptions = [
    {label:'แก้ไขความคิดเห็น', value:'editComment'},
    {label:'ลบความคิดเห็น', value:'deleteComment'},
  ]
  const otherUserOptions = [
    {label:'รายงานความคิดเห็น', value:'reportComment'},
  ]

  const handleMenuOption = () =>{
    return (userProfile?.userId === comment?.userId)? ownerUserOptions:otherUserOptions;
  }
  
  const handleSelectOption = (selectedOpt:IOption) =>{
    if(selectedOpt.value === 'deleteComment'){
      deletedComment();
    }else if(selectedOpt.value === 'editComment'){
      setDisableTextArea(false);
    }
  }

  const deletedComment = () =>{
    Client.patch<string>('/delete/comment',{
      deletedBy: userProfile?.userId,
      commentId: comment?.commentId,
      date: nowDate(),
      time: nowTime(),
    })
    .then((res)=>{
      setIsCommentDeleted(true);
      onCommentDeleted && onCommentDeleted();
    }).catch((err)=>{
      console.log(err);
    })
  }

  const updateComment = () =>{
    if(editComment){
      Client.patch<string>('/update/comment',{
        commentDetail: editComment,
        commentId: comment?.commentId,
        date: nowDate(),
        time: nowTime(),
      })
      .then((res)=>{
        setDisableTextArea(true);
        setTriggerUpdateSuccess(!triggerUpdateSuccess);
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      setDisableTextArea(true);
    }
  }

  const renderTime = () =>{
    if(comment?.createdDate === comment?.lastUpdateDate && comment?.createdTime === comment?.lastUpdateTime){
      return (comment?.createdDate+' เวลา '+comment?.createdTime);
    }
    return ('แก้ไขล่าสุดเมื่อ '+comment?.lastUpdateDate+' เวลา '+comment?.lastUpdateTime)
  }

  useEffect(()=>{
    if(commentId)
    Client.get<IComment>('/commentbyid/'+commentId)
    .then((res)=>{
      setComment(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[commentId,triggerUpdateSuccess])

  useEffect(()=>{
    if(comment)
    Client.get<IProfileImage>('/profileUrl/'+comment.userId)
    .then((res)=>{
      setCommenterProfileUrl(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[comment])

  useEffect(()=>{
    if(isCommentDeleted){
      setTimeout(() => {
        setIsFadeOutFinish(true);
      }, 1500);
    }
  },[isCommentDeleted])

  if(isFadeOutFinish){
    return(
      <></>
    )
  }

  return(
    <div className={classNames('comment-main-container', isCommentDeleted? 'fade-out-comment':'')}>
      <Row>
        <Col xs='auto' className='px-1'>
          <div className='profile-commenter-container'>
            <div className='round-btn'>
              { commenterProfileUrl && <img src={commenterProfileUrl.urlPath} alt='profile'/>}
              { !commenterProfileUrl && <ReactSVG src={ProfileIcon}/>}
            </div>
          </div>
        </Col>
        <Col className='px-1'>
          <div className='comment-content-container'>
            <div className='comment-card'>
              <Row className='px-0 py-0'>
                <Col className='d-flex justify-content-start align-items-center'>
                  <div className='text-small-bold commenter-user-name'>{comment?.username+"-"+renderTime()}</div>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                  <MoreMenu menuOptions={handleMenuOption()} onSelectOption={handleSelectOption}/>
                </Col>
              </Row>
              <Row className='pb-2'>
                <TextareaAutosize 
                  disabled={disableTextArea} 
                  defaultValue={comment?.commentDetail} 
                  value={editComment}
                  className={classNames('comment-detail text-normal', disableTextArea? '':'editable')}
                  onChange={(e)=>{setEditComment(e.currentTarget.value)}}
                />
              </Row>
            </div>
            {/* <Row className='d-flex justify-content-end align-items-center pt-1 ps-2'>
              <Col className='text-small text-color'>{renderTime()}</Col>
            </Row> */}
            { !disableTextArea &&
                <Row className='d-flex justify-content-center align-items-center'>
                  <div className='button-save-comment-container'>
                    <div className='button-save-comment text-normal' onClick={()=>{updateComment()}}>
                      บันทึก
                    </div>
                  </div>
                </Row>
            }
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Comment;