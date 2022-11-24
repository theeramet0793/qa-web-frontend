import { Col, Row } from 'react-bootstrap';
import LogoOblong from './logoOblong';
import './topNav.scss'
import { useTranslation } from "react-i18next";
import Logo from '../assets/svg/logo.svg'
import { ReactSVG } from 'react-svg';
import OblongButton from './oblongButton';

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
            <LogoOblong>
              <div className='logo d-flex align-items-center justify-content-center'>
                <ReactSVG src={Logo}/>
              </div>
            </LogoOblong>
          </div>
        </Col>
        <Col>
          <Row className='register-row'>
            <Col className='d-flex align-items-center justify-content-end'>
              <div className='register-btn-container'> 
                <OblongButton>
                  <div className='text-button' onClick={onClickReg}>
                    {t('REGISTER')}
                  </div>
                </OblongButton>
              </div> 
            </Col>
            <Col className='d-flex align-items-center justify-content-center'>
              <div className='register-btn-container'> 
                <OblongButton>
                  <div className='text-button' onClick={onClickSign}>
                    {t('SIGNIN')}
                  </div>
                </OblongButton>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default TopNav;