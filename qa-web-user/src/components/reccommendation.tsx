
import './reccommendation.scss'
import { useEffect, useState } from 'react';
import { Col, Collapse, Row } from 'react-bootstrap';
import { IReccommendMovie } from '../data/interface/IMovie';
import Client from '../lib/axios/axios';
import { nowDate, nowTime } from '../utils/dateAndTime';
import { GetUserData } from './userData/userData';
import { IUser } from '../data/interface/IUser';
import { ReactSVG } from 'react-svg';
import CaretDownIcon from '../assets/svg/caret-down-fill.svg'

export interface ReccomendationProps{
 isOnFinding: boolean|undefined;
 postId:number|undefined;
 refreshPost: ()=>void;
 postOwnerId: number|undefined;
}

const Reccommendation: React.FC<ReccomendationProps> = ({ isOnFinding, postId, refreshPost, postOwnerId}) =>{
  
  const [open, setOpen] = useState<boolean>(false);
  const [recMovie, setRecMovie] = useState<IReccommendMovie|undefined>(undefined);
  const [userProfile] = useState<IUser|undefined>(GetUserData());

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
      posterPath:'',
      movieName: movieName,
      userId: userProfile?.userId,
      date: nowDate(),
      time: nowTime(),
    }).then( (res) =>{
      refreshPost && refreshPost();
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
        refreshPost && refreshPost();
      }).catch( (err) => {
        console.log(err.response);
      })
    }
  }

  const refreshFinding = () =>{
    Client.patch('/refreshFindingMovie',{
      postId: postId,
    }).then( (res) =>{
      refreshPost()
    }).catch( (err) => {
      console.log(err.response);
    }
    )
  }
  
  const isMine = () =>{
    return (postOwnerId !== undefined && userProfile?.userId === postOwnerId);
  }

  const generateKey = (movieId:number, index:number) =>{
    let id = postId? postId:'0'
    return id+movieId.toString()+index.toString()
  }

  return(
    <div className='rec-container' >
      <div 
        className='btn-rec text-normal-responsive' 
        onClick={()=>{setOpen(!open)}}         
      >
          <Row className='d-flex justify-content-end align-items-center'>
            <Col xs='auto' className='pe-0'>ภาพยนตร์ที่แนะนำโดยระบบ</Col>
            <Col xs='auto'><ReactSVG src={CaretDownIcon}/></Col>
          </Row>
      </div>    
      <Collapse in={open}>
        { recMovie && recMovie.movielist.length > 0 ?
            <div className='expand-movie-list-container'>
              {recMovie.movielist.map((movie, index)=>{
                  return(
                    <Row key={generateKey(movie.movieId, index)} className='one-row'>
                      <Col className='rec-movie-name text-normal-responsive'>
                        {movie.movieName}
                      </Col>
                      { isMine() ?
                        <Col xs={2} className='pe-0'>
                          <div className='btn-confirm text-normal-responsive' onClick={()=>{ handleSubmit(movie.movieId, movie.movieName);}}>
                            ใช่
                          </div>
                        </Col>
                        :<></>
                      }
                    </Row>
                  )
                })
              }
              {isMine() ? 
                <Row className='d-flex justify-content-center align-items-center pt-1'>
                  <div className='btn-cancel-all text-normal-responsive text-color' onClick={()=>{rejectAllReccommendMovie();}}>
                    ไม่ใช่ทั้งหมด
                  </div>
                </Row>
                :<></>
              }
            </div>:
            <div className='no-rec-movie-container text-normal-responsive'>
              {isOnFinding? 
                <div>{'ระบบกำลังประมวลผลเพื่อหาชื่อภาพยนตร์ให้คุณ'}</div>
                :
                <Row>
                  <Col className='d-flex justify-content-start align-items-center'>{'ยังไม่มีรายชื่อภาพยนตร์ที่แนะนำ'}</Col>
                  {isMine() ? 
                    <Col xs='auto' className='d-flex justify-content-end align-items-center'>
                      <div className='refresh-button' onClick={()=>{refreshFinding()}}>
                        ค้นหาอีกครั้ง
                      </div>
                    </Col>:<></>
                  }
                </Row>}
            </div>
        }
      </Collapse>
    </div>
  )
}

export default Reccommendation;