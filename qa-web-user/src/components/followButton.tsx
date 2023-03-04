import { ReactSVG } from 'react-svg';
import './followButton.scss'
import FollowIcon from '../assets/svg/bookmark-heart-fill.svg'
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';

export interface FollowButtonprops{
  isActive: boolean;
  onClick: () => void;
  disable: boolean;
}

const FollowButton:React.FC<FollowButtonprops> = ({isActive, onClick, disable}) =>{

  const { t } = useTranslation();
  
  return(
    <div className={classNames( isActive? 'follow-button-active':'follow-button', disable? 'follow-button-disable':'' ,' text-normal ')} onClick={()=>{!disable && onClick()}}>
      <Row>
        <Col xs='auto' className='d-flex justify-content-center align-items-center pe-0'>
          <ReactSVG src={FollowIcon} className=''/>
        </Col>
        <Col className='d-flex justify-content-start align-items-center'>
          <div>{isActive? 'ติดตามแล้ว':t('FOLLOW')}</div>
        </Col>
      </Row>
    </div>
  )
}

export default FollowButton;