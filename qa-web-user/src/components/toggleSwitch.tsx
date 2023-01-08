import { useState } from 'react';
import'./toggleSwitch.scss'

export interface ToggleSwitchProps {
  defaultValue: boolean;
  onChange: (result:boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({defaultValue, onChange}) => {

  const[value, setValue] = useState<boolean>(defaultValue);

  return(
    <label className="switch">
      <input type="checkbox" checked={value} onChange={(e)=>{setValue(e.currentTarget.checked); onChange(e.currentTarget.checked)}}/>
      <span className="slider round"></span>
    </label>
  )
}

export default ToggleSwitch;