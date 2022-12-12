import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './post.scss'
import RoundButton from './roundButton';
import ProfileIcon from '../assets/svg/person-fill.svg'
import MoreMenu from './moreMenu';
import LikeIcon from '../assets/svg/hand-thumbs-up.svg'
import CommentIcon from '../assets/svg/chat-text.svg'
import FollowIcon from '../assets/svg/bookmark-frame.svg'
import { useTranslation } from 'react-i18next';
import RoundLabel from './roundLabel';
import { IPost } from '../data/interface/IPost';
import TextareaAutosize from 'react-textarea-autosize';
import { GetUserData } from './userData/userData';
import { useState } from 'react';
import { IUser } from '../data/interface/IUser';
import Client from '../lib/axios/axios';
import { IOption } from '../data/interface/IOption';
import EditPostModal from './modal/editPostModal';

export interface PostProps{
  post: IPost;
}

const Post: React.FC<PostProps> = ({post}) => {

  const { t } = useTranslation();
  const [ userProfile ] = useState<IUser|undefined>(GetUserData());
  const [isShowEditPostModal, setIsShowEditPostModal] = useState<boolean>(false);
  
  const ownerUserOptions = [
    {label:'แก้ไขโพสต์', value:'editPost'},
    {label:'ลบโพสต์', value:'deletePost'},
  ]
  const otherUserOptions = [
    {label:'รายงานโพสต์', value:'report'},
  ]

  const handleMenuOption = () =>{
    return (userProfile?.userId === post.userId)? ownerUserOptions:otherUserOptions;
  }

  const handleSelectOption = (selectedOpt:IOption) =>{
    if(selectedOpt.value === 'deletePost'){
      deletePost();
    }else if(selectedOpt.value === 'editPost'){
      setIsShowEditPostModal(true);
    }
  }

  const deletePost = () =>{
    var now = new Date();
    Client.patch('/deletepost',{
      deletedBy: userProfile?.userId,
      postId: post.postId,
      deletedDate: now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate(),
      deletedTime: now.getHours()+':'+now.getMinutes(),
    }).then( (res) =>{
      console.log(res);
    }).catch( (err) => {
      console.log(err.response);
    }
    )
  }

  return(
    <div className="post-card">
      <Row>
        <Col sm='auto'>
          <div className='profile-container'>
            <RoundButton boxShadowSize='large'>
              <ReactSVG src={ProfileIcon}/>
            </RoundButton>
          </div>
        </Col>
        <Col className='d-flex flex-column justify-content-center mx-2'>
          <Row className='text-normal-bold'>
            {post.username}
          </Row>
          <Row className='text-normal'>
            {post.createdDate+' เวลา '+post.createdTime}
          </Row>
        </Col>
        <Col className='d-flex justify-content-end'>
          <MoreMenu menuOptions={handleMenuOption()} onSelectOption={handleSelectOption}/>
        </Col>
      </Row>
      <Row>
        <div className='post-content-container'>
          <div className='text-box text-normal'>
            <TextareaAutosize disabled={true} className='post-detail' value={post.postDetail}/>
          </div>
        </div>

      </Row>
      <Row>
        <div className='option-container'>
          <Row>
            <Col sm='auto'>
              <div className='like-button-container'>
                <RoundButton boxShadowSize='small'>
                  <ReactSVG src={LikeIcon}/>
                </RoundButton>
              </div>
            </Col>
            <Col>
              <div className='comment-button-container'>
                <RoundButton boxShadowSize='small'>
                  <ReactSVG src={CommentIcon}/>
                </RoundButton>
              </div>
            </Col>
            <Col className='d-flex justify-content-end'>
              <div className='follow-button-container text-normal'>
                <RoundButton boxShadowSize='large'>
                  <>                  
                  <ReactSVG src={FollowIcon} className='pe-2'/>
                  {t('FOLLOW')}
                  </>
                </RoundButton>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row>
        <div className='comments-section-container'>
          <Row>
            <div className='comment-row'>
              <Row>
                <Col sm='auto'>
                  <div className='commenter-profile'>
                    <RoundLabel >
                      <ReactSVG src={ProfileIcon}/>
                    </RoundLabel>
                  </div>
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                  <div className='comment-input'>
                    <input type={'text'} className='comment-box text-normal' placeholder={t('TYPE_ANSWER')}/>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      </Row>
      {<EditPostModal show={isShowEditPostModal} onClose={()=>{setIsShowEditPostModal(false)}} originalPostDetail={post.postDetail}/>}
    </div>
  )
}

export default Post;