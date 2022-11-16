
import { useEffect, useState } from 'react';
import './checkbox.scss'
import classNames from 'classnames'
import { ReactSVG } from 'react-svg';
import CheckIcon from '../assets/svg/check.svg'

export interface CheckboxProps{
  defaultCheck: boolean | undefined;
  onChange: () => void | undefined;
}

const Checkbox: React.FC<CheckboxProps> = ({defaultCheck, onChange}) =>{

  const [isCheck, setIsCheck] = useState<boolean>(false);

  useEffect(()=>{
    if(defaultCheck) setIsCheck(defaultCheck);
  },[defaultCheck])

  const renderCheckIcon = () =>{
    return isCheck===true? <ReactSVG src={CheckIcon}/>: <></>
  }

  return(
    <div 
    className={classNames(`checkbox`,isCheck?`checked`:`unchecked`)} 
    onClick={()=>setIsCheck(!isCheck)}
    >
        {renderCheckIcon()}
    </div>
  )
}

export default Checkbox;