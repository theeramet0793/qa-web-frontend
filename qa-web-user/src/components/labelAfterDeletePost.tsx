
import { Col, Row } from 'react-bootstrap';
import './labelAfterDeletePost.scss'
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import TrashIcon from '../assets/svg/trash.svg'
import { ReactSVG } from 'react-svg';

export interface LabelAfterDeletePostProps{

}

const LabelAfterDeletePost: React.FC<LabelAfterDeletePostProps> = () =>{

  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDeleted(true);
    }, 1500);
  })

  if(isDeleted){
    return(
      <></>
    )
  }

  return(
    <div className={classNames('label-after-delete-post-container')} >
      <Row className='w-100'>
        <Col className='w-100'>
          <hr/>
        </Col>
        <Col sm='auto'>
          <Row className='text-normal'>
            <Col sm='auto' className='trash-icon-container pe-0'><ReactSVG src={TrashIcon}/></Col>
            <Col>ลบโพสต์สำเร็จแล้ว</Col>
          </Row>
        </Col>
        <Col>
          <hr/>
        </Col>
      </Row>
    </div>
  )
}

export default LabelAfterDeletePost;