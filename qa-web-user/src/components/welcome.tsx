
import { Row } from 'react-bootstrap';
import './welcome.scss'

export interface WelcomeProps{

}

const Welcome:React.FC<WelcomeProps> = () =>{

  return(
    <div className='welcome-container '>
      <div className='welcome-child-container'>
        <Row>
          <Row className='d-flex justify-content-center align-items-center'><div className="lds-facebook"><div></div><div></div><div></div></div></Row>
          <Row><div className='welcome-text-container'>Sign in success !</div></Row>
          <Row><div className='loading-text-container'>Your profile is loading...</div></Row>
        </Row>
      </div>
    </div>
  )
}

export default Welcome;