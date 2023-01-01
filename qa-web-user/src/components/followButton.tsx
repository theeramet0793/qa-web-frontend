import { ReactSVG } from 'react-svg';
import './followButton.scss'
import FollowIcon from '../assets/svg/bookmark-frame.svg'
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';

export interface FollowButtonprops{
  isActive: boolean;
  onClick: () => void;
}

const FollowButton:React.FC<FollowButtonprops> = ({isActive, onClick}) =>{

  const { t } = useTranslation();
  
  return(
    <div className={classNames( isActive? 'follow-active':'','follow-button text-normal text-color')} onClick={()=>{onClick()}}>
      <Row>
        <Col sm='auto' className='d-flex justify-content-center align-items-center pe-0'>
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