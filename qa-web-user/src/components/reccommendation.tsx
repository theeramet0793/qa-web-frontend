
import { ReactSVG } from 'react-svg';
import LightBulbIcon from '../assets/svg/lightbulb-fill.svg'
import './reccommendation.scss'
import classNames from 'classnames'

export interface ReccomendationProps{
 onclick: ()=>void;
 isReccommending: boolean|undefined;
}


const Reccommendation: React.FC<ReccomendationProps> = ({onclick, isReccommending}) =>{
  return(
    <div className='rec-container' onClick={()=>{onclick();}}>
      <ReactSVG 
        src={LightBulbIcon} 
        className={classNames('bulb-icon-container', isReccommending? 'reccommending':'')} 
        onClick={()=>{}}
      />
    </div>
  )
}

export default Reccommendation;