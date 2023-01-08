import './foundMovieLabel.scss'

export interface FoundMovieLabelProp{
 movieName: string;
}

const FoundMovieLabel:React.FC<FoundMovieLabelProp> = ({movieName}) =>{

  return(
    <div className='found-movie-label-container text-normal'>
      {movieName}
    </div>
  )
}

export default FoundMovieLabel;