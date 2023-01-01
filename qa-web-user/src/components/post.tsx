import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './post.scss'
import RoundButton from './roundButton';
import ProfileIcon from '../assets/svg/person-fill.svg'
import MoreMenu from './moreMenu';
import ShiftIcon from '../assets/svg/shift.svg'
import CommentIcon from '../assets/svg/chat-text.svg'
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
import classNames from 'classnames';
import SendIcon from '../assets/svg/send.svg';
import { nowDate, nowTime } from '../utils/dateAndTime';
import FeedComment from './feedComment';
import { ICommentsFeed, ICountComment } from '../data/interface/IComment';
import OwnerNewComment from './ownerNewComment';
import Tag from './tag';
import { convertTagsToOptions } from '../utils/convert';
import { IUpvote } from '../data/interface/IUpvote';
import FollowButton from './followButton';

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
  const [ isFadeOutFinish, setIsFadeOutFinish] = useState<boolean>(false);
  const [ comment, setComment] = useState<string>('');
  const [ returnCommentId, setReturnCommentId] = useState<number|undefined>(undefined);
  const [ countComment, setCountComment] = useState<number>(0);
  const [ isUpvote, setIsUpvote] = useState<boolean>(false);
  const [ enableUpvote, setEnableUpvote] = useState<boolean>(false);
  const [ isFollow, setIsFollow] = useState<boolean>(false);

  useEffect(()=>{
    Client.get<IPost>('/post/'+postId,
    ).then((res)=>{
      setPosts(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[postId, isDataUpdate])

  useEffect(()=>{
    if(posts)
    Client.get<IProfileImage>('/profileUrl/'+posts.userId)
    .then((res)=>{
      setPosterProfileUrl(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[posts])

  useEffect(()=>{
    Client.get<IUpvote>('/getUpvote/'+postId+'/'+userProfile?.userId)
    .then((res)=>{
      setIsUpvote(res.data.isUpvote);
    }).catch((err)=>{
      console.log(err);
    })
  },[postId, userProfile?.userId])

  useEffect(()=>{
    if(isDeletedPost){
      setTimeout(() => {
        setIsFadeOutFinish(true);
      }, 1500);
    }
  },[isDeletedPost])

  useEffect(()=>{
    if(posts) refreshCountComment();
    // eslint-disable-next-line 
  },[posts])

  useEffect(()=>{
    if(enableUpvote) updateUpvote();
    // eslint-disable-next-line 
  },[isUpvote])
  
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
      setIsShowDeletePostModal(true);
    }else if(selectedOpt.value === 'editPost'){
      setIsShowEditPostModal(true);
    }
  }

  const deletePost = () =>{
    Client.patch('/deletepost',{
      deletedBy: userProfile?.userId,
      postId: posts?.postId,
      deletedDate: nowDate(),
      deletedTime: nowTime(),
    }).then( (res) =>{
      setIsDeletedPost(true);
    }).catch( (err) => {
      console.log(err.response);
    }
    )
  }

  const sendComment = () =>{
    Client.post<ICommentsFeed>('/comment',{
      postId: posts?.postId,
      userId: userProfile?.userId,
      commentDetail: comment,
      date: nowDate(),
      time: nowTime(),
    }).then( (res) =>{
      setReturnCommentId(res.data.commentId);
      setComment('');
      refreshCountComment();
    }).catch( (err) => {
      console.log(err.response);
    })
  }

  const refreshCountComment = () =>{
    if(posts){
      Client.get<ICountComment>('/countcomment/'+posts.postId)
      .then((res)=>{
        setCountComment(res.data.comments);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }

  const renderTime = () =>{
    if(posts?.createdDate === posts?.lastUpdateDate && posts?.createdTime === posts?.lastUpdateTime){
      return (posts?.createdDate+' เวลา '+posts?.createdTime);
    }
    return ('แก้ไขล่าสุดเมื่อ '+posts?.lastUpdateDate+' เวลา '+posts?.lastUpdateTime)
  }

  const renderShowtags = (selectedTags:IOption[]) =>{
    return selectedTags.length > 0? (
      <Row className="pb-4">
        {
          selectedTags.map((tag)=>{
            return(
            <Col sm='auto'>
              <Tag tagName={tag.label} tagId={tag.value} removable={false} />
            </Col>)
          })
        }
      </Row>
    ): <></>
  }

  const updateUpvote = () =>{
    Client.post<string>('/upvote',{
      postId: posts?.postId,
      userId: userProfile?.userId,
      isUpvote: isUpvote,
    }).then( (res) =>{

    }).catch( (err) => {
      console.log(err.response);
    })
  }


  if(isFadeOutFinish){
    return(
      <LabelAfterDeletePost/>
    )
  }

  return(
    <div className={classNames("post-card", isDeletedPost? 'fade-out-post':'')} >
      <Row>
        <Col sm='auto'>
          <div className='profile-container'>
            <RoundButton>
              { posterProfileUrl && <img src={posterProfileUrl.urlPath} alt='profile'/>}
              { !posterProfileUrl && <ReactSVG src={ProfileIcon}/>}
            </RoundButton>
          </div>
        </Col>
        <Col className='d-flex flex-column justify-content-center mx-2'>
          <Row className='text-normal-bold text-color'>
            {posts?.username}
          </Row>
          <Row className='text-small text-color'>
            { renderTime() }
          </Row>
        </Col>
        <Col className='d-flex justify-content-end'>
          <MoreMenu menuOptions={handleMenuOption()} onSelectOption={handleSelectOption}/>
        </Col>
      </Row>
      <Row>
        <div className='post-content-container'>
          <div className='text-normal'>
            <TextareaAutosize disabled={true} className='post-detail' value={posts?.postDetail} />
          </div>
        </div>
      </Row>
      {posts?.tagList && renderShowtags(convertTagsToOptions(posts?.tagList))}
      <Row>
        <div className='option-container'>
          <Row>
            <Col sm='auto'>
              <div className='upvote-button-container'>
                <RoundButton onClick={()=>{setEnableUpvote(true); setIsUpvote(!isUpvote)}} isActive={isUpvote}>
                  <ReactSVG src={ShiftIcon}/>
                </RoundButton>
              </div>
            </Col>
            <Col>
              <div className='comment-button-container d-flex justify-content-center align-items-center'>
                <Row>
                  <Col sm='auto' className='pe-0'>
                    <ReactSVG src={CommentIcon}/>
                  </Col>
                  <Col sm='auto' className='text-normal text-color'>
                    {countComment+' ความคิดเห็น'}
                  </Col>
                </Row>
                  
              </div>
            </Col>
            <Col className='d-flex justify-content-end'>
              <div className='follow-button-container '>
                <FollowButton onClick={()=>{setIsFollow(!isFollow)}} isActive={isFollow}/>
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
                    <TextareaAutosize className='comment-box text-normal' placeholder={t('TYPE_ANSWER')} value={comment} onChange={(e)=>{setComment(e.currentTarget.value)}}/>
                  </div>
                </Col>
              </Row>
              { comment &&
                  <Row sm='auto' className='d-flex justify-content-center align-items-center pt-2'>
                    <div className='send-button' onClick={()=>{sendComment();}}>
                      <Row>
                        <Col sm='auto' className='pe-0'><ReactSVG src={SendIcon}/></Col>
                        <Col className='pe-2 text-normal'>{'แสดงความคิดเห็น'}</Col>
                      </Row>
                    </div> 
                  </Row>
              }
            </div>
          </Row>
        </div>
      </Row>
      <Row>
        <div className='feed-comments-container'>
          <OwnerNewComment newCommentId={returnCommentId} onCommentDeleted={()=>{refreshCountComment()}}/>
          { posts?.postId && <FeedComment postId={posts?.postId} onCommentDeleted={()=>{refreshCountComment()}}/> }
        </div>
      </Row>
      {posts &&<EditPostModal 
        show={isShowEditPostModal} 
        onClose={()=>{setIsShowEditPostModal(false)}} 
        postId={posts?.postId} 
        originalPostDetail={posts?.postDetail}
        originalTags={posts.tagList}
        onDataUpdate={()=>{setIsDataUpdate(!isDataUpdate)}}
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