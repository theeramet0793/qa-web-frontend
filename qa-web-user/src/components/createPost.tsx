
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './createPost.scss'
import Profile from './profile';

export interface CreatePostProps{
  onClickCreate: ()=>void;
}

const  CreatePost: React.FC<CreatePostProps> = ({onClickCreate}) =>{
  
  const { t } = useTranslation();
  return(
    <div className="create-post-container">
      <div className="create-post-card">
        <Row>
          <Col sm={'auto'}>
            <div className='profile-container'>
              <Profile enableDropdown={false}/>
            </div>
          </Col>
          <Col>
            <button className='btn-open-modal text-placeholder' onClick={()=>{onClickCreate()}}>
              {t('DESCRIBE_YOUR_MOVIE')}
            </button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CreatePost;