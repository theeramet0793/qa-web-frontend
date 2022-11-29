import { Col, Row } from 'react-bootstrap';
import './topNav.scss'
import { useTranslation } from "react-i18next";
import Logo from '../assets/svg/logo.svg'
import { ReactSVG } from 'react-svg';

export interface TopNavProps{
  onClickReg: () => void;
  onClickSign: () => void;
}

const TopNav: React.FC <TopNavProps> = ({onClickReg, onClickSign}) => {

  const { t } = useTranslation();
  return(
    <div className='top-nav'>
      <Row>
        <Col>
          <div className='logo-container'>
            <div className='logo-oblong'>
              <div className='logo d-flex align-items-center justify-content-center'>
                <ReactSVG src={Logo}/>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <Row className='register-row'>
            <Col className='d-flex align-items-center justify-content-end'>
              <div className='register-btn-container'> 
                <div className='btn-reg '>
                  <div className='text-medium-bold' onClick={onClickReg}>
                    {t('REGISTER')}
                  </div>
                </div>
              </div> 
            </Col>
            <Col className='d-flex align-items-center justify-content-start'>
              <div className='sign-btn-container'> 
                <div className='btn-sign '>
                  <div className='text-medium-bold' onClick={onClickSign}>
                    {t('SIGNIN')}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default TopNav;