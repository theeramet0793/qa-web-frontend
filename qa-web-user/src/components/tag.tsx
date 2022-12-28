import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './tag.scss'
import XIcon from '../assets/svg/x.svg'

export interface TagProps{
 tagName: string;
 tagId: string;
 removable: boolean;
 onRemoveTag?: (tagId:string)=>void;
}

const Tag:React.FC<TagProps> = ({tagName, tagId, onRemoveTag, removable}) =>{

  return(
    <div className="tag-container text-normal">
      <Row>
        <Col sm='auto'>{tagName}</Col>
        { removable &&
          <Col sm='auto'>
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