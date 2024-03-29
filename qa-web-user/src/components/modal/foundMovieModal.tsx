import { useEffect, useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './foundMovieModal.scss'
import XIcon from '../../assets/svg/x.svg'
import classNames from 'classnames';
import { IOption } from '../../data/interface/IOption';
import debounce from 'lodash.debounce';
import Client from '../../lib/axios/axios';
import { ISearchMovieTMDB } from '../../data/interface/IMovie';
import { convertMoviesToOptions } from '../../utils/convert';
import { GetUserData } from '../userData/userData';
import { IUser } from '../../data/interface/IUser';
import { nowDate, nowTime } from '../../utils/dateAndTime';
import SearchBar from '../searchBar';

export interface FoundMovieModalProps{
  postId: number | undefined;
  show: boolean;
  onClose: () => void;
  defaultMovieName: string|undefined;
  onSaveSuccess: () => void;
  refreshMovie: ()=> void;
}

const FoundMovieModal:React.FC<FoundMovieModalProps> = ({postId, show, onClose, defaultMovieName, onSaveSuccess, refreshMovie}) =>{

  const [isShow, setIsShow] = useState<boolean>(false);
  const [movieOptions, setMovieOptions] = useState<IOption[]>([]);
  const [movieName, setMovieName] = useState<string>('');
  const [movieId, setMovieId] = useState<string>('');
  const [moviePosterPath, setMoviePosterPath] = useState<string>('');
  const [userProfile] = useState<IUser|undefined>(GetUserData());
  const [movieMenuList, setMovieMenuList] = useState<ISearchMovieTMDB|undefined>(undefined)
  
  useEffect(()=>{
    setIsShow(show)
  },[show])

  useEffect(()=>{
    if(defaultMovieName)
      setMovieName(defaultMovieName);
    else
      setMovieName('');
    //console.log('default ',defaultMovieName);
  },[defaultMovieName, isShow])

  const searchMovie = debounce((searchStr: string) =>{
    if(searchStr){
      Client.get<ISearchMovieTMDB>('/searchmovies/'+searchStr)
      .then( (res) =>{
        setMovieOptions(convertMoviesToOptions(res.data.results).slice(0,11));
        setMovieMenuList(res.data);
      }).catch( (err) => {
        console.log(err.response);
      })
    }else{
      setMovieOptions([]);
    }
  },700)

  const handleSubmit = () =>{

      Client.patch('/updatemovie',{
        postId: postId,
        movieId: movieId,
        movieName: movieName,
        posterPath: moviePosterPath,
        userId: userProfile?.userId,
        date: nowDate(),
        time: nowTime(),
      }).then( (res) =>{
        onClose();
        setMovieOptions([]);
        onSaveSuccess();
        refreshMovie();
      }).catch( (err) => {
        console.log(err.response);
      })
  }

  const setSelectedMoviePosterPath = (movieId:string) =>{
    let selectedMovie = movieMenuList?.results.find(x => x.id === parseInt(movieId) )
    if(selectedMovie){
      setMoviePosterPath(selectedMovie.poster_path);
    }
  }

  const closeModal = () =>{
    onClose(); 
    setMovieOptions([]); 
    setMovieMenuList(undefined);
  }

  return(
    <Modal show={isShow} centered className='found-movie-modal'  onHide={()=>{closeModal()}}>
      <Modal.Body>
        <div className='content-container'>
          <div className='header-container'>
            <div className='text-large-bold   header-label'>
              {movieName? 'แก้ไขชื่อภาพยนตร์ของโพสต์':'เพิ่มชื่อภาพยนตร์ของโพสต์'}
            </div>
            <div className='x-button-container'>
              <div className='x-icon' onClick={()=>{closeModal()}}>
                <ReactSVG src={XIcon}/>
              </div>
            </div>
          </div>
          <div className='body-container'>
            { 
              movieName && 
              <Row>
                <div className='current-movie-container'>
                    <div className='movie-name text-color text-normal'>
                      <div className='delete-movie-button' onClick={()=>{setMovieId(''); setMovieName(''); setMoviePosterPath('');}}>
                        <ReactSVG src={XIcon}/>
                      </div>
                      {"ชื่อภาพยนตร์ : "}{movieName}
                    </div>
                </div>
              </Row>
            }
            <Row>
              <div className='add-movie-name-container-vvbi'>
                <SearchBar 
                  placeholder="ค้นหาชื่อภาพยนตร์..." 
                  onInputchange={searchMovie} 
                  menuOptions={movieOptions} 
                  onSelectOption={(option)=>{setMovieId(option.value); setMovieName(option.label); setSelectedMoviePosterPath(option.value)}}
                />
              </div> 
            </Row>
            <Row>
              <div className='button-save-container'>
                <div className={classNames('button-save text-normal-bold')} onClick={()=>{handleSubmit()}}>
                  บันทึก
                </div>
              </div>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default FoundMovieModal;