import { ReactSVG } from 'react-svg';
import './notification.scss'
import NotificationIcon from '../assets/svg/bell-fill.svg'
import { useEffect, useState } from 'react';
import { INotification } from '../data/interface/INotification';
import Client from '../lib/axios/axios';
import { GetUserData } from './userData/userData';
import { IUser } from '../data/interface/IUser';
import { Col, Container, Row } from 'react-bootstrap';
import CircleIcon from '../assets/svg/circle-fill.svg'
import { nowDate, nowTime } from '../utils/dateAndTime';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import CountNoti from './countNoti';

export interface NotificationProps{

}

const Notification: React.FC<NotificationProps> = ( ) =>{

  const navigate = useNavigate();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [menuNoti, setMenuNoti] = useState<INotification[]|undefined>(undefined);
  const [userProfile] = useState<IUser|undefined>(GetUserData());
  const [countUnread, setCountUnread] = useState<number>(0);

  useEffect(()=>{
    Client.get<INotification[]>('/getnoti',{
      params:{
        userId:userProfile?.userId,
      }})
    .then( (res) =>{
      if(res.data)
      setMenuNoti(res.data);
    }).catch( (err) => {
      console.log(err.response);
    })
  },[userProfile])

  useEffect(()=>{
    let result = menuNoti?.filter(x => !x.isRead).length
    if(result !== undefined && result !== 0){
      setCountUnread(result);
    }
  },[menuNoti])

  const renderNotiAction = (notiType:string) =>{
    if(notiType==="Add"){
      return <Row><Col xs='auto' className='action-type-container pe-0'>{"เพิ่ม"}</Col><Col xs='auto' className='ps-0'>{" ชื่อภาพยนตร์"}</Col></Row>
    }else if(notiType==="Edit"){
      return <Row><Col xs='auto' className='action-type-container pe-0'>{"แก้ไข"}</Col><Col xs='auto' className='ps-0'>{" ชื่อภาพยนตร์"}</Col></Row>
    }else if(notiType==="Remove"){
      return <Row><Col xs='auto' className='action-type-container pe-0'>{"ลบ"}</Col><Col xs='auto' className='ps-0'>{" ชื่อภาพยนตร์"}</Col></Row>
    }else{
      return "-"
    }
  }

  const markAsRead = (postID:number) =>{
    if(postID){
      console.log("postId = ",postID)
      Client.post('/marknotiasread',{},{
        params:{
          userId:userProfile?.userId,
          postId:postID,
          date:nowDate(),
          time:nowTime()
        }})
      .then( (res) =>{

      }).catch( (err) => {
        console.log(err.response);
      })
    }
  }

  return(
    <div className='user-notification-container'>
      {countUnread ? 
        <div className='count-unread-noti'>
          <CountNoti notiUnreadAmount={countUnread}/>
        </div>:<></>
      }
      <button onClick={()=>setIsShowMenu(!isShowMenu)} className='btn-noti'>
        <ReactSVG src={NotificationIcon} className={classNames('bell-icon')}/>
        { isShowMenu &&
          <div className='expand-menu'>
            {(menuNoti?.length === 0) &&
              <div className='no-noti text-normal-responsive'>ยังไม่มีการแจ้งเตือน</div>
            }
            { (menuNoti?.length !== 0) && 
              menuNoti?.map((noti,index)=>{
                return(
                  <Container key={index} className='option-row text-normal-responsive' onClick={()=>{markAsRead(noti.postId); navigate("/showonepost/?postId="+noti.postId,{ replace: true })}}>
                    <Row>
                      <Col xs='auto'>
                        {!noti.isRead &&
                          <div className='dot-icon'><ReactSVG src={CircleIcon}/></div>
                        }
                      </Col>
                      <Col>
                        <Row>
                          <Col xs='auto' className='text-normal-bold'>{noti.username}</Col>
                          <Col className='d-flex justify-content-start align-item-center'>{renderNotiAction(noti.notiType)}</Col>
                        </Row>
                        <Row>
                          <Col xs={12} sm='auto'>
                            <div className='noti-post-detail text-small'>{noti.postDetail}</div>
                          </Col>
                          <Col xs={12} sm='auto' className='time-container text-small d-flex justify-content-start'>{noti.createdDate+" เวลา "+noti.createdTime}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                )
              })
            }
          </div>
        }
      </button>
    </div>
  )
}
 export default Notification;