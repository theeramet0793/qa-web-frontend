import { ReactSVG } from 'react-svg';
import './notification.scss'
import NotificationIcon from '../assets/svg/bell-fill.svg'
import { useEffect, useState } from 'react';
import { INotification } from '../data/interface/INotification';
import Client from '../lib/axios/axios';
import { GetUserData } from './userData/userData';
import { IUser } from '../data/interface/IUser';
import { Col, Row } from 'react-bootstrap';
import CircleIcon from '../assets/svg/circle-fill.svg'
import { nowDate, nowTime } from '../utils/dateAndTime';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export interface NotificationProps{

}

const Notification: React.FC<NotificationProps> = ( ) =>{

  const navigate = useNavigate();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [menuNoti, setMenuNoti] = useState<INotification[]|undefined>(undefined);
  const [userProfile] = useState<IUser|undefined>(GetUserData());
  //const [hasUnread, setHasUnread] = useState<boolean>(false);

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

  // useEffect(()=>{
  //   let result = menuNoti?.find((noti)=>{ return noti.isRead = false })
  //   if(result !== undefined){
  //     setHasUnread(true);
  //   }
  // },[menuNoti])

  const renderNotiAction = (notiType:string) =>{
    if(notiType==="Add"){
      return "เพิ่มชื่อภาพยนตร์สำหรับโพสต์"
    }else if(notiType==="Edit"){
      return "แก้ไขชื่อภาพยนตร์สำหรับโพสต์"
    }else if(notiType==="Remove"){
      return "ลบชื่อภาพยนตร์สำหรับโพสต์"
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
      {/* {hasUnread && <div className='dot-icon-qw'><ReactSVG src={CircleIcon}/></div>} */}
      <button onClick={()=>setIsShowMenu(!isShowMenu)} className='btn-noti'>
        <ReactSVG src={NotificationIcon} className={classNames('bell-icon')}/>
        { isShowMenu &&
          <div className='expand-menu'>
            {(menuNoti?.length === 0) &&
              <div className='no-noti text-normal text-color'>ยังไม่มีการแจ้งเตือน</div>
            }
            { (menuNoti?.length !== 0) && 
              menuNoti?.map((noti,index)=>{
                return(
                  <div key={index} className='option-row text-normal' onClick={()=>{markAsRead(noti.postId); navigate("showonepost/?postId="+noti.postId)}}>
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
                          <Col >
                            <div className='noti-post-detail text-small'>{noti.postDetail}</div>
                          </Col>
                          <Col xs='auto' className='text-small'>{noti.createdDate}{" "}{noti.createdTime}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
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