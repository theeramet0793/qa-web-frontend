import { ReactSVG } from 'react-svg';
import './oblongSelect.scss'
import ChevronDownIcon from '../assets/svg/chevron-down.svg'
import { IOption } from '../data/interface/IOption';


export interface OblongDropdownProps {
options: IOption[] | undefined;
}

const OblongSelect: React.FC<OblongDropdownProps> = ({options}) => {

  const renderOption = () => {
    return <></>;
  }

  const renderMenu = () => {
    return <></>
  }

  return(
    <div className='dropdown'>
      
    </div>
  )
}

export default OblongSelect;