import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './post.scss'
import RoundButton from './roundButton';
import ProfileIcon from '../assets/svg/person-fill.svg'
import SendIcon from '../assets/svg/send.svg';
import ShiftIcon from '../assets/svg/shift.svg'
import CommentIcon from '../assets/svg/chat-text.svg'
import BookmarkIcon from '../assets/svg/bookmark-frame.svg'
import MoreMenu from './moreMenu';
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
import { nowDate, nowTime } from '../utils/dateAndTime';
import FeedComment from './feedComment';
import { ICommentsFeed, ICountComment } from '../data/interface/IComment';
import OwnerNewComment from './ownerNewComment';
import Tag from './tag';
import { convertTagsToOptions } from '../utils/convert';
import { ICountUpvote, IUpvote } from '../data/interface/IUpvote';
import FollowButton from './followButton';
import { ICountFollow, IFollow } from '../data/interface/IFollow';
import FoundMovieButton from './foundMovieButton';
import FoundMovieModal from './modal/foundMovieModal';
import { IMovie } from '../data/interface/IMovie';
import FoundMovieLabel from './foundMovieLabel';
import Reccommendation from './reccommendation';
import ReccommendationModal from './modal/reccommendationModal';

export interface PostProps{
  postId: number;
}

const Post: React.FC<PostProps> = ({postId}) => {

  const { t } = useTranslation();
  const [ userProfile ] = useState<IUser|undefined>(GetUserData());
  const [ isShowEditPostModal, setIsShowEditPostModal ] = useState<boolean>(false);
  const [ isShowRecMovieModal, setIsShowRecMovieModal ] = useState<boolean>(false);
  const [ isShowFoundMovieModal, setIsShowFoundMovieModal ] = useState<boolean>(false);
  const [ posts, setPosts ] = useState<IPost|undefined>(undefined);
  const [ isDataUpdate, setIsDataUpdate] = useState<boolean>(false);
  const [ posterProfileUrl, setPosterProfileUrl ] = useState<IProfileImage|undefined>(undefined);
  const [ isDeletedPost, setIsDeletedPost ] = useState<boolean>(false);
  const [ isShowDeletePostModal, setIsShowDeletePostModal] = useState<boolean>(false);
  const [ isFadeOutFinish, setIsFadeOutFinish] = useState<boolean>(false);
  const [ comment, setComment] = useState<string>('');
  const [ returnCommentId, setReturnCommentId] = useState<number|undefined>(undefined);
  const [ countComment, setCountComment] = useState<number>(0);
  const [ countUpvote, setCountUpvote] = useState<number>(0);
  const [ countFollow, setCountFollow] = useState<number>(0);
  const [ enableUpvote, setEnableUpvote] = useState<boolean>(false);
  const [ enableFollow, setEnableFollow] = useState<boolean>(false);
  const [ isUpvote, setIsUpvote] = useState<boolean>(false);
  const [ isFollow, setIsFollow] = useState<boolean>(false);
  const [ foundMovie, setFoundMovie] = useState<IMovie|undefined>(undefined);

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
    // have same logic as this  2 function  please edit both
    if(posts)
    Client.get<IMovie>('/getmovie/'+posts.postId)
    .then((res)=>{
      (res.data.movieId)? setFoundMovie(res.data):setFoundMovie(undefined);
    }).catch((err)=>{
      console.log(err);
    })
  },[posts])

  useEffect(()=>{
    Client.get<IUpvote>('/getUpvote/', {
      params:{ 
        postId: postId, 
        userId: userProfile?.userId
      }
    }).then((res)=>{
      if(res.data.isUpvote)
      setIsUpvote(res.data.isUpvote);
    }).catch((err)=>{
      console.log(err);
    })
  },[postId, userProfile?.userId])

  useEffect(()=>{
    if(userProfile?.userId)
    Client.get<IFollow>('/getfollow/'+postId+'/'+userProfile?.userId)
    .then((res)=>{
      //console.log(res.data);
      
      if(res.data.isFollow !== undefined)
      setIsFollow(res.data.isFollow);
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
    if(posts){
      refreshCountComment();
      refreshCountUpvote();
      refreshCountFollow();
    } 
    // eslint-disable-next-line 
  },[posts])

  useEffect(()=>{
    if(enableUpvote) updateUpvote();
    // eslint-disable-next-line 
  },[isUpvote])

  useEffect(()=>{
    if(enableFollow) updateFollow();
    // eslint-disable-next-line 
  },[isFollow])
  
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

  const refreshCountUpvote = () =>{
    if(posts){
      Client.get<ICountUpvote>('/countupvote/'+posts.postId)
      .then((res)=>{
        setCountUpvote(res.data.upvotes);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }

  const refreshCountFollow = () =>{
    if(posts){
      Client.get<ICountFollow>('/countfollow/'+posts.postId)
      .then((res)=>{
        setCountFollow(res.data.follows);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }

  // const refreshMovie = () =>{
  //   // have same logic as this  2 function  please edit both
  //   if(posts)
  //   Client.get<IMovie>('/getmovie/'+posts.postId)
  //   .then((res)=>{
  //     (res.data.movieId)? setFoundMovie(res.data):setFoundMovie(undefined);
  //   }).catch((err)=>{
  //     console.log(err);
  //   })
  // }

  const renderTime = () =>{
    if(posts?.createdDate === posts?.lastUpdateDate && posts?.createdTime === posts?.lastUpdateTime){
      return (posts?.createdDate+' เวลา '+posts?.createdTime);
    }
    return ('แก้ไขล่าสุดเมื่อ '+posts?.lastUpdateDate+' เวลา '+posts?.lastUpdateTime)
  }

  const renderShowtags = (selectedTags:IOption[]) =>{
    return selectedTags.length > 0? (
      <Row className="pb-4 row-cols-auto">
        {
          selectedTags.map((tag)=>{
            return(
            <Col sm='auto' key={tag.value}>
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
      refreshCountUpvote();
    }).catch( (err) => {
      console.log(err.response);
    })
  }

  const updateFollow = () =>{
    Client.post<string>('/follow',{
      postId: posts?.postId,
      userId: userProfile?.userId,
      isFollow: isFollow,
    }).then( (res) =>{
      refreshCountFollow();
    }).catch( (err) => {
      console.log(err.response);
    })
  }

  const isNotMyPost = () =>{
    return (userProfile?.userId !== posts?.userId)
  }


  if(isFadeOutFinish){
    return(
      <LabelAfterDeletePost/>
    )
  }

  return(
    <div className={classNames("post-card", isDeletedPost? 'fade-out-post':'')} >
      <Row>
        <Col xs='auto'>
          <div className='profile-container'>
            <RoundButton>
              { posterProfileUrl && <img src={posterProfileUrl.urlPath} alt='profile'/>}
              { !posterProfileUrl && <ReactSVG src={ProfileIcon}/>}
            </RoundButton>
          </div>
        </Col>
        <Col xs='auto' className='d-flex flex-column justify-content-center mx-2'>
          <Row className='text-normal-bold text-color'>
            {posts?.username}
          </Row>
          <Row className='text-small text-color'>
            { renderTime() }
          </Row>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Row>
            { ( !posts?.movieId ) &&
              <Col>
                <div className='rec-in-post-container'>
                  <Reccommendation
                    onclick={()=>{setIsShowRecMovieModal(true)}}
                    isReccommending={posts?.isReccommend}
                  />
                </div>
              </Col>
            }
            <Col>
              <MoreMenu menuOptions={handleMenuOption()} onSelectOption={handleSelectOption}/>
            </Col>
          </Row>
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
      {
          foundMovie?
          <Row className='d-flex justify-content-center align-items-center'>
            <div className='found-movie-container-ddf d-flex justify-content-center align-items-center'> 
              <FoundMovieLabel movieName={foundMovie.movieName}/>
            </div>
          </Row>:<></>  
      }
      <Row>
        <div className='info-container'>
          <Row>
            <Col>
              <div className='upvote-label-container'>
                <Row className='d-flex align-items-center justify-content-center'>
                    <Col xs='auto' className='px-0 d-flex align-items-center justify-content-center'>
                      <ReactSVG src={ShiftIcon}/>
                    </Col>
                    <Col  className='text-normal text-color'>
                      {countUpvote+' คะแนนโหวต'}
                    </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <div className='comment-button-container'>
                <Row className='d-flex align-items-center justify-content-center'>
                    <Col xs='auto' className='px-0 d-flex align-items-center justify-content-center'>
                      <ReactSVG src={CommentIcon}/>
                    </Col>
                    <Col className='text-normal text-color'>
                      {countComment+' ความคิดเห็น'}
                    </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <div className='follow-label-container'>
                <Row className='d-flex align-items-center justify-content-center'>
                    <Col xs='auto' className='px-0 d-flex align-items-center justify-content-center'>
                      <ReactSVG src={BookmarkIcon}/>
                    </Col>
                    <Col className='text-normal text-color'>
                      {countFollow+' ผู้ติดตาม'}
                    </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row>
        <div className='option-container'>
          <Row>
            <Col xs='auto'>
              <Row xs='auto' className='d-flex justify-content-start align-items-center'>
                <Col>
                  <div className='upvote-button-container'>
                    <RoundButton onClick={()=>{setEnableUpvote(true); setIsUpvote(!isUpvote)}} isActive={isUpvote} disable={userProfile? false:true}>
                      <ReactSVG src={ShiftIcon}/>
                      <div className='px-2 text-normal text-color'>{'โหวตขึ้น'}</div>
                    </RoundButton>
                  </div>
                </Col>
              </Row>
            </Col>
            { isNotMyPost()?
              <Col className='d-flex justify-content-end'>
                <div className='follow-button-container '>
                  <FollowButton onClick={()=>{setEnableFollow(true);setIsFollow(!isFollow);}} isActive={isFollow} disable={userProfile? false:true}/>
                </div>
              </Col>:
              <Col className='d-flex justify-content-end'>
                <div className='found-movie-container'> 
                  <FoundMovieButton onClick={()=>{setIsShowFoundMovieModal(true);}} text={foundMovie? 'แก้ไขชื่อภาพยนตร์':'เจอแล้วจ้า'}/>
                </div>
              </Col>
            }
          </Row>
        </div>
      </Row>
      <Row>
      { userProfile && 
        <div className='comments-section-container'>
          <Row>
            <div className='comment-row'>
                <Row>
                  <Col xs='auto' className='px-1'>
                    <div className='commenter-profile'>
                      <RoundLabel >
                        <Profile enableDropdown={false} disableClick={true}/>
                      </RoundLabel>
                    </div>
                  </Col>
                  <Col className='px-1 d-flex justify-content-center align-items-center'>
                    <div className='comment-input'>
                      <TextareaAutosize className='comment-box text-normal' placeholder={t('TYPE_ANSWER')} value={comment} onChange={(e)=>{setComment(e.currentTarget.value)}}/>
                    </div>
                  </Col>
                </Row>
              { comment &&
                  <Row xs='auto' className='d-flex justify-content-center align-items-center pt-2'>
                    <div className='send-button' onClick={()=>{sendComment();}}>
                      <Row>
                        <Col xs='auto' className='pe-0'><ReactSVG src={SendIcon}/></Col>
                        <Col className='pe-2 text-normal'>{'แสดงความคิดเห็น'}</Col>
                      </Row>
                    </div> 
                  </Row>
              }
            </div>
          </Row>
        </div>
      }
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
      {
        <FoundMovieModal 
          postId={posts?.postId} 
          show={isShowFoundMovieModal} 
          onClose={()=>{setIsShowFoundMovieModal(false)}}
          defaultMovieName={foundMovie?.movieName}
          onSaveSuccess={()=>{setIsDataUpdate(!isDataUpdate);}}
        />
      }
      { isShowRecMovieModal &&
        <ReccommendationModal
          postId={posts?.postId}
          postOwnerId={posts?.userId}
          show={isShowRecMovieModal}
          onclose={()=>{setIsShowRecMovieModal(false)}}
          refreshPost={()=>{setIsDataUpdate(!isDataUpdate);}}
        />
      }
    </div>
  )
}

export default Post;