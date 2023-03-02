import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './reccommendationModal.scss'
import XIcon from '../../assets/svg/x.svg'
import Client from '../../lib/axios/axios';
import { IReccommendMovie } from '../../data/interface/IMovie';
import { IUser } from '../../data/interface/IUser';
import { GetUserData } from '../userData/userData';
import { nowDate, nowTime } from '../../utils/dateAndTime';

export interface ReccommendationModalProps{
  show: boolean;
  onclose: ()=>void;
  postId:number|undefined;
  postOwnerId: number|undefined;
  refreshPost: ()=>void;
}

const ReccommendationModal:React.FC<ReccommendationModalProps> = ({show, onclose, postId, postOwnerId, refreshPost}) =>{

  const [isShow, setIsShow] = useState<boolean>(false);
  const [recMovie, setRecMovie] = useState<IReccommendMovie|undefined>(undefined);
  const [userProfile] = useState<IUser|undefined>(GetUserData());

  useEffect(()=>{
    setIsShow(show)
  },[show])

  useEffect(()=>{
    if(postId){
      Client.get<IReccommendMovie>('/getrecmovielist', {
        params:{
          postId: postId,
        }
      }).then( (res) =>{
        setRecMovie(res.data);
      }).catch( (err) => {
        console.log(err.response);
      })
    }
  },[postId])

  const handleSubmit = (movieId:number, movieName:string) =>{
    Client.patch('/updatemovie',{
      postId: postId,
      movieId: movieId.toString(),
      movieName: movieName,
      userId: userProfile?.userId,
      date: nowDate(),
      time: nowTime(),
    }).then( (res) =>{
      refreshPost();
    }).catch( (err) => {
      console.log(err.response);
    })
  }

  const rejectAllReccommendMovie = () =>{
    Client.post('/rejectallreccommendmovie',{
      postId: postId,
    }).then( (res) =>{
      refreshRecMovie();
    }).catch( (err) => {
      console.log(err.response);
    })
  }

  const refreshRecMovie = () =>{
    if(postId){
      Client.get<IReccommendMovie>('/getrecmovielist', {
        params:{
          postId: postId,
        }
      }).then( (res) =>{
        setRecMovie(res.data);
        refreshPost();
      }).catch( (err) => {
        console.log(err.response);
      })
    }
  }
  
  
  return(
    <Modal centered show={isShow} onHide={()=>{onclose();}} className='rec-movie-modal' >
      <Modal.Body>
      <div className='content-container'>
        <div className='header-container'>
          <div className='text-large-bold   header-label'>
            รายชื่อภาพยนตร์ที่ระบบแนะนำ
          </div>
          <div className='x-button-container'>
            <div className='x-icon' onClick={()=>{onclose();}}>
              <ReactSVG src={XIcon}/>
            </div>
          </div>
        </div>
        <div className='body-container'>
            { recMovie && recMovie.movielist.length > 0 ?
              <>
                <div className='rec-movie-list-container'>
                  {
                    recMovie.movielist.map((movie, index)=>{
                      return(
                        <Row key={index}>
                          <Col>                      
                            <div className='movie-name text-color tetx-normal'>
                            {index+1} . {movie.movieName}
                            </div>
                          </Col>
                          { (postOwnerId && userProfile?.userId === postOwnerId) &&
                            <Col>
                              <div 
                                className='btn-confirm text-normal text-color' 
                                onClick={()=>{ handleSubmit(movie.movieId, movie.movieName); onclose();}}>
                                ใช่แล้ว! นี่คือเรื่องที่ฉันตามหา
                              </div>
                            </Col>
                          }
                        </Row>
                      )
                    })
                  }
                </div>
                {(postOwnerId && userProfile?.userId === postOwnerId) &&
                  <Row className='d-flex justify-content-end align-items-center pt-3'>
                    <div className='btn-cancel-all text-normal text-color' onClick={()=>{rejectAllReccommendMovie();}}>
                      ไม่ใช่ทั้งหมด
                    </div>
                  </Row>
                }
              </>:
              <div className='text-color text-normal'>
                ระบบกำลังประมวลผลเพื่อหาภาพยนตร์ที่คุณกำลังตามหา
              </div>
            }
        </div>
      </div>
      </Modal.Body>
    </Modal>
  )
}

export default ReccommendationModal;