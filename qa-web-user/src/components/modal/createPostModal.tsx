import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import XIcon from '../../assets/svg/x.svg'
import { IUser } from "../../data/interface/IUser";
import Profile from "../profile";
import './createPostModal.scss'
import Client from "../../lib/axios/axios";
import { useTranslation } from "react-i18next";
import TextareaAutosize from 'react-textarea-autosize';
import { nowDate, nowTime } from "../../utils/dateAndTime";
import { ITag } from "../../data/interface/ITag";
import { IOption } from "../../data/interface/IOption";
import { convertTagsToOptions } from "../../utils/convert";
import SearchBar from "../searchBar";
import Tag from "../tag";
import { GetUserData } from "../userData/userData";
import debounce from "lodash.debounce";
import GlobeIcon from '../../assets/svg/globe.svg'

export interface CreatePostModalProps{
  show: boolean;
  onClose: () => void;
  onCreateNewPostSuccess: (postId:number) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({show, onClose, onCreateNewPostSuccess}) =>{

  const { t } = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [userProfile] = useState<IUser|undefined>(GetUserData());
  const [postDetail, setPostdetail] = useState<string>('');
  const [tagOptions, setTagOptions] = useState<IOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<IOption[]>([]);

  useEffect(()=>{
    setIsShow(show);
  },[show])

  const handleSubmit = () =>{
    Client.post<{postId:number}>('/post',{
      userId: userProfile?.userId,
      postDetail: postDetail,
      date: nowDate(),
      time: nowTime(), 
      tagList: getTagList(),
    }).then( (res) =>{
      onClose();
      setSelectedTags([]);
      onCreateNewPostSuccess && onCreateNewPostSuccess(res.data.postId);
    }).catch( (err) => {
      console.log(err.response);
    }
    )
  }

  const searchTag = debounce((searchStr: string) =>{
    if(searchStr){
      Client.get<ITag[]>('/searchtags/'+searchStr)
      .then( (res) =>{
        setTagOptions(convertTagsToOptions(res.data));
      }).catch( (err) => {
        console.log(err.response);
      })
    }else{
      setTagOptions([]);
    }
  },700)


  const addTag4Post = (selectedOption: IOption) =>{
    if(selectedOption){
      if(selectedTags.find( element => element.value === selectedOption.value) === undefined){
        var temp = selectedTags.slice(0);
        temp.splice(selectedTags.length,0,selectedOption);
        setSelectedTags(temp);
      }
    }
  }

  const renderShowtags = () =>{
    return(
      <Row className="pt-3 tags-container">
        {
          selectedTags.map((tag)=>{
            return(
            <Col xs='auto'>
              <Tag tagName={tag.label} tagId={tag.value} removable={true} onRemoveTag={(tagId)=>{removeTagFromList(tagId)}}/>
            </Col>)
          })
        }
      </Row>
    )
  }

  const getTagList = () =>{
    var tagList: number[] = [];
    selectedTags.forEach((tag)=>{
      tagList.push(parseInt(tag.value))
    })
    return tagList;
  }

  const removeTagFromList = (tagId:string) =>{
    if(tagId){
      var temp = selectedTags.slice(0);
      temp = temp.filter( element => {return element.value !== tagId})
      setSelectedTags(temp);
    }
  }
  
  return(
    <Modal show={isShow} centered className="create-post-modal" onHide={()=>{onClose(); setSelectedTags([]); setTagOptions([]);}}>
      <Modal.Body>
        <div className="content-container">
          <div className='header-container'>
            <div className='text-large-bold header-label'>
              {t('CREATE_POST')}
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{onClose(); setSelectedTags([]); setTagOptions([]);}} >
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className='body-container'>
            <Row className="px-1">
              <Col xs='auto' className="d-flex justify-content-center align-items-center">
                <div className='create-post-profile-container'>
                  <Profile enableDropdown={false}/> 
                </div>
              </Col>
              <Col>
                <Row className="text-normal-bold  ">{userProfile?.username}</Row>
                <Row className="description-container text-normal">
                  <Col xs='auto' className="px-0"><ReactSVG src={GlobeIcon}/></Col>
                  <Col className="descript-text text-normal-responsive ">ทุกคนสามารถเห็นได้</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <div className="post-detail-container">              
                <TextareaAutosize
                  className='post-detail-input text-box text-normal-responsive'
                  placeholder='อธิบายภาพยนตร์ที่คุณกำลังตามหา...'
                  onChange={(e)=>{setPostdetail(e.currentTarget.value)}}
                />
              </div>
            </Row>
            <Row>
              <div className="search-bar-container-sdd">
                <SearchBar 
                  placeholder="เพิ่มแท็ก..." 
                  onInputchange={searchTag} 
                  menuOptions={tagOptions} 
                  onSelectOption={(selectedOption)=>{addTag4Post(selectedOption)}}
                />
              </div>
            </Row>
            { selectedTags && renderShowtags()}
            <Row>
              <div className="button-create-container">
                <div className='button-create-post text-normal-bold' onClick={handleSubmit}>
                  โพสต์
                </div>
              </div>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePostModal;