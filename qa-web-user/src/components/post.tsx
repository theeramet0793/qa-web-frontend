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

export interface PostProps{

}

const Post: React.FC<PostProps> = () => {

  const { t } = useTranslation();

  return(
    <div className="post-card large-card border-radius-50px">
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
            Theeramet Metha
          </Row>
          <Row className='text-normal'>
            23 กันยายน 2565 เวลา 20.20 น.
          </Row>
        </Col>
        <Col className='d-flex justify-content-end'>
          <MoreMenu/>
        </Col>
      </Row>
      <Row>
        <div className='post-content-container'>
          <div className='text-box text-normal'>
          หาหนังที่ผู้หญิงกำลังจะกลายเป็นซอมบี้หรืออะไรสักอย่างนางกำลังคลานมาแล้วก็ลูบหน้าผู้ชายตอนแรกผู้ชายก็กลัวแต่มานึกได้ว่าเป็นแฟนตัวเองเพราะทั้งสองคนเคยหยอกกันแบบนั้นพอดีเลื่อนreelsแล้วเจอคนตัดมาใส่เพลงประกอบซึ้งๆอะค่ะ แต่เค้าปิดเม้น
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
    </div>
  )
}

export default Post;