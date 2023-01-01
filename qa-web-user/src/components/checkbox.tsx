
import { useEffect, useState } from 'react';
import './checkbox.scss'
import classNames from 'classnames'
import { ReactSVG } from 'react-svg';
import CheckIcon from '../assets/svg/check.svg'

export interface CheckboxProps{
  defaultCheck: boolean | undefined;
  onChange: (isClick:boolean) => void | undefined;
}

const Checkbox: React.FC<CheckboxProps> = ({defaultCheck, onChange}) =>{

  const [isCheck, setIsCheck] = useState<boolean>(false);

  useEffect(()=>{
    if(defaultCheck) setIsCheck(defaultCheck);
  },[defaultCheck])

  useEffect(()=>{
    onChange(isCheck);
    // eslint-disable-next-line 
  },[isCheck])

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