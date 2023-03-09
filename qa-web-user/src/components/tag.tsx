import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './tag.scss'
import XIcon from '../assets/svg/x.svg'
import classNames from 'classnames'

export interface TagProps{
 tagName: string;
 tagId: string;
 removable: boolean;
 onRemoveTag?: (tagId:string)=>void;
}

const Tag:React.FC<TagProps> = ({tagName, tagId, onRemoveTag, removable}) =>{

  const tagColor = (tagId:string) =>{
    let tagIdNum = parseInt(tagId)
    let result = tagIdNum%3;
    if(result===0){
      return 'tag-theme-purple';
    }else if(result===1){
      return 'tag-theme-pink';
    }else if(result===2){
      return 'tag-theme-blue';
    }else {
      return 'tag-theme-orange';
    }
  }

  return(
    <div className={classNames("tag-container text-small", tagColor(tagId))}>
      <Row>
        <Col xs='auto' className={classNames('d-flex justify-content-center align-items-center')}>{tagName}</Col>
        { removable &&
          <Col xs='auto'>
            <div className="x-icon-container" onClick={()=>{onRemoveTag && onRemoveTag(tagId)}}>
              <ReactSVG src={XIcon}/>
            </div> 
          </Col>
        }
      </Row>
    </div>
  )
}

export default Tag;