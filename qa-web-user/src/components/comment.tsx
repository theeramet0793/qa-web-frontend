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
import RoundButton from './roundButton';
import ProfileIcon from '../assets/svg/person-fill.svg'
import { ReactSVG } from 'react-svg';
import { IProfileImage } from '../data/interface/IProfileImage';

export interface CommentProps{
  commentId: number;
}

const Comment:React.FC<CommentProps> = ({commentId}) =>{

  const [comment, setComment] = useState<IComment|undefined>(undefined);
  const [ userProfile ] = useState<IUser|undefined>(GetUserData());
  const [ commenterProfileUrl, setCommenterProfileUrl ] = useState<IProfileImage|undefined>(undefined);
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
      //do sth
    }else if(selectedOpt.value === 'editComment'){
      //do sth
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
  },[commentId])

  useEffect(()=>{
    if(comment)
    Client.get<IProfileImage>('/profileUrl/'+comment.userId)
    .then((res)=>{
      setCommenterProfileUrl(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[comment])

  return(
    <div className='comment-main-container'>
      <Row>
        <Col sm='auto' className='px-3'>
          <div className='profile-commenter-container'>
            <RoundButton boxShadowSize='large'>
              { commenterProfileUrl && <img src={commenterProfileUrl.urlPath} alt='profile'/>}
              { !commenterProfileUrl && <ReactSVG src={ProfileIcon}/>}
            </RoundButton>
          </div>
        </Col>
        <Col>
          <div className='comment-content-container'>
            <div className='comment-card'>
              <Row className='px-0 py-0'>
                <Col className='d-flex justify-content-start align-items-center'>
                  <div className='text-small-bold text-color'>{comment?.username}</div>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                  <MoreMenu menuOptions={handleMenuOption()} onSelectOption={handleSelectOption}/>
                </Col>
              </Row>
              <Row className='pb-2'>
                <TextareaAutosize disabled={true} defaultValue={comment?.commentDetail} className='comment-detail text-normal'/>
              </Row>
            </div>
            <Row className='d-flex justify-content-end align-items-center pt-1 ps-2'>
              <Col sm='auto' className='text-small text-color'>{'ถูกใจ'}</Col>
              <Col className='text-small text-color'>{renderTime()}</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Comment;