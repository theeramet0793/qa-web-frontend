
import { Row } from 'react-bootstrap';
import './loading.scss'

export interface LoadingProps{

}

const Loading:React.FC<LoadingProps> = () =>{

  return(
    <div className='welcome-container '>
      <div className='welcome-child-container'>
        <Row>
          <Row className='d-flex justify-content-center align-items-center'><div className="lds-facebook"><div></div><div></div><div></div></div></Row>
          <Row><div className='loading-text-container text-color'>loading...</div></Row>
        </Row>
      </div>
    </div>
  )
}

export default Loading;