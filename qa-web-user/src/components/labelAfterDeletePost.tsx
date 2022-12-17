
import { Col, Row } from 'react-bootstrap';
import './labelAfterDeletePost.scss'

export interface LabelAfterDeletePostProps{

}

const LabelAfterDeletePost: React.FC<LabelAfterDeletePostProps> = () =>{

  return(
    <div className='label-after-delete-post-container'>
      <Row className='w-100'>
        <Col className='w-100'>
          <hr/>
        </Col>
        <Col sm='auto'>
          <div className='text-normal'>ลบโพสต์สำเร็จแล้ว</div>
        </Col>
        <Col>
          <hr/>
        </Col>
      </Row>
    </div>
  )
}

export default LabelAfterDeletePost;