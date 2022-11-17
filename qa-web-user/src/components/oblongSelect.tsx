import { ReactSVG } from 'react-svg';
import './oblongSelect.scss'
import ChevronDownIcon from '../assets/svg/chevron-down.svg'
import { IOption } from '../data/interface/IOption';


export interface OblongDropdownProps {
options: IOption[] | undefined;
}

const OblongSelect: React.FC<OblongDropdownProps> = ({options}) => {

  const renderOption = () =>{
    if(options!==undefined && options.length > 0){
      return(
        options.map((option)=>{
          return <option value={option.value}>{option.label}</option>
        })
      )
    }
  }

  return(
    <div className='dropdown text-normal'>
      <select name="selection" className="dropdown-button">
        {renderOption()}
      </select>
    </div>
  )
}

export default OblongSelect;