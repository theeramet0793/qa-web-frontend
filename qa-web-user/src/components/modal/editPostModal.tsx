import { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import XIcon from '../../assets/svg/x.svg'
import { IUser } from "../../data/interface/IUser";
import Profile from "../profile";
import './editPostModal.scss'
import Client from "../../lib/axios/axios";
import { useTranslation } from "react-i18next";
import TextareaAutosize from 'react-textarea-autosize';
import { GetUserData } from "../userData/userData";
import { IPost } from "../../data/interface/IPost";
import { nowDate, nowTime } from "../../utils/dateAndTime";
import { IOption } from "../../data/interface/IOption";
import { ITag } from "../../data/interface/ITag";
import { convertTagsToOptions } from "../../utils/convert";
import Tag from "../tag";
import SearchBar from "../searchBar";
import debounce from "lodash.debounce";

export interface EditPostModalProps{
  show: boolean;
  onClose: () => void;
  originalPostDetail: string;
  originalTags: ITag[];
  postId: number;
  onDataUpdate?: ()=>void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({show, onClose, originalPostDetail, originalTags, postId, onDataUpdate}) =>{

  const { t } = useTranslation();
  const [ isShow, setIsShow ] = useState<boolean>(false);
  const [ postDetail, setPostdetail ] = useState<string>(originalPostDetail);
  const [ userProfile ] = useState<IUser|undefined>(GetUserData());
  const [tagOptions, setTagOptions] = useState<IOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<IOption[]>(convertTagsToOptions(originalTags));

  useEffect(()=>{
    setIsShow(show)
  },[show])

  const handleSubmit = () =>{
    Client.patch<IPost>('/updatepost',{
      postId: postId,
      postDetail: postDetail,
      date: nowDate(),
      time: nowTime(),
      tagList: getTagList(), 
    }).then( (res) =>{
      if(res && res.data){
        onDataUpdate && onDataUpdate()
      } 
      onClose();
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
      <Row className="pt-3">
        {
          selectedTags.map((tag)=>{
            return(
            <Col sm='auto' key={tag.value}>
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
    <Modal show={isShow} centered className="edit-post-modal" onHide={()=>{onClose()}}>
      <Modal.Body>
        <div className="content-container">
          <div className='header-container'>
            <div className='text-large-bold   header-label'>
              {t('EDIT_POST')}
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{onClose();}} >
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className='body-container'>
            <Row>
              <Col sm='auto'>
                <div className='create-post-profile-container'>
                  <Profile enableDropdown={true}/> 
                </div>
              </Col>
              <Col>
                <Row className="text-medium-bold text-color ps-4">{userProfile?.username}</Row>
                <Row className="ps-4 text-normal text-color">เพิ่มอะไรสักอย่างตรงนี้</Row>
              </Col>
            </Row>
            <Row>
              <div className="post-detail-container">              
                <TextareaAutosize
                  className='post-detail-input text-box text-normal text-color'
                  placeholder='อธิบายภาพยนตร์ที่คุณกำลังตามหา...'
                  defaultValue={originalPostDetail}
                  onChange={(e)=>{setPostdetail(e.currentTarget.value)}}
                />
              </div>
            </Row>
            <Row>
              <div className="search-bar-container">
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
              <div className='button-create-post text-normal-bold' onClick={handleSubmit}>
                บันทึกโพสต์
              </div>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default EditPostModal;