
import './oblongSelect.scss'
import { IOption } from '../data/interface/IOption';


export interface OblongDropdownProps {
options: IOption[] | undefined;
}

const OblongSelect: React.FC<OblongDropdownProps> = ({options}) => {

  const renderOption = () =>{
    if(options!==undefined && options.length > 0){
      return(
        options.map((option, index)=>{
          return <option key={index} value={option.value}>{option.label}</option>
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