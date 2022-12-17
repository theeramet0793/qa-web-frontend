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
import { useEffect, useState } from 'react';
import { IUser } from '../data/interface/IUser';
import Client from '../lib/axios/axios';
import { IOption } from '../data/interface/IOption';
import EditPostModal from './modal/editPostModal';
import { IProfileImage } from '../data/interface/IProfileImage';
import Profile from './profile';
import DeletePostModal from './modal/deletePostModal';
import LabelAfterDeletePost from './labelAfterDeletePost';

export interface PostProps{
  postId: number;
}

const Post: React.FC<PostProps> = ({postId}) => {

  const { t } = useTranslation();
  const [ userProfile ] = useState<IUser|undefined>(GetUserData());
  const [ isShowEditPostModal, setIsShowEditPostModal ] = useState<boolean>(false);
  const [ posts, setPosts ] = useState<IPost|undefined>(undefined);
  const [ isDataUpdate, setIsDataUpdate] = useState<boolean>(false);
  const [ posterProfileUrl, setPosterProfileUrl ] = useState<IProfileImage|undefined>(undefined);
  const [ isDeletedPost, setIsDeletedPost ] = useState<boolean>(false);
  const [ isShowDeletePostModal, setIsShowDeletePostModal] = useState<boolean>(false);

  useEffect(()=>{
    Client.get<IPost>('/post/'+postId,
    ).then((res)=>{
      setPosts(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[postId,isDataUpdate])

  useEffect(()=>{
    if(posts)
    Client.get<IProfileImage>('/profileUrl/'+posts.userId)
    .then((res)=>{
      setPosterProfileUrl(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[posts])
  
  const ownerUserOptions = [
    {label:'แก้ไขโพสต์', value:'editPost'},
    {label:'ลบโพสต์', value:'deletePost'},
  ]
  const otherUserOptions = [
    {label:'รายงานโพสต์', value:'report'},
  ]

  const handleMenuOption = () =>{
    return (userProfile?.userId === posts?.userId)? ownerUserOptions:otherUserOptions;
  }

  const handleSelectOption = (selectedOpt:IOption) =>{
    if(selectedOpt.value === 'deletePost'){
      //deletePost();
      setIsShowDeletePostModal(true);
    }else if(selectedOpt.value === 'editPost'){
      setIsShowEditPostModal(true);
    }
  }

  const deletePost = () =>{
    var now = new Date();
    Client.patch('/deletepost',{
      deletedBy: userProfile?.userId,
      postId: posts?.postId,
      deletedDate: now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate(),
      deletedTime: now.getHours()+':'+now.getMinutes(),
    }).then( (res) =>{
      setIsDeletedPost(true);
    }).catch( (err) => {
      console.log(err.response);
    }
    )
  }

  if(isDeletedPost){
    return(
      <LabelAfterDeletePost/>
    )
  }

  return(
    <div className="post-card">
      <Row>
        <Col sm='auto'>
          <div className='profile-container'>
            <RoundButton boxShadowSize='large'>
              { posterProfileUrl && <img src={posterProfileUrl.urlPath} alt='profile'/>}
              { !posterProfileUrl && <ReactSVG src={ProfileIcon}/>}
            </RoundButton>
          </div>
        </Col>
        <Col className='d-flex flex-column justify-content-center mx-2'>
          <Row className='text-normal-bold text-color'>
            {posts?.username}
          </Row>
          <Row className='text-normal text-color'>
            { posts?.lastUpdateDate? ('แก้ไขล่าสุดเมื่อ '+posts.lastUpdateDate+' เวลา '+posts?.lastUpdateTime)
              : (posts?.createdDate+' เวลา '+posts?.createdTime) }
          </Row>
        </Col>
        <Col className='d-flex justify-content-end'>
          <MoreMenu menuOptions={handleMenuOption()} onSelectOption={handleSelectOption}/>
        </Col>
      </Row>
      <Row>
        <div className='post-content-container'>
          <div className='text-box text-normal'>
            <TextareaAutosize disabled={true} className='post-detail' value={posts?.postDetail} />
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
                      <Profile enableDropdown={false} disableClick={true}/>
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
      {posts &&<EditPostModal 
        show={isShowEditPostModal} 
        onClose={()=>{setIsShowEditPostModal(false)}} 
        postId={posts?.postId} 
        originalPostDetail={posts?.postDetail}
        onDataUpdate={(updateData)=>{setIsDataUpdate(!isDataUpdate)}}
      />}
      {<DeletePostModal 
        onClose={()=>{setIsShowDeletePostModal(false)}}
        show={isShowDeletePostModal}
        onConfirm={()=>{deletePost();}}
      />}
    </div>
  )
}

export default Post;