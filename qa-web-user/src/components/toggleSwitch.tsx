import { useState } from 'react';
import'./toggleSwitch.scss'

export interface ToggleSwitchProps {
  defaultValue: boolean;
  onChange: (result:boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({defaultValue, onChange}) => {

  const[value, setValue] = useState<boolean>(defaultValue);

  return(
    <div className='custom-toggle-switch'>
      <div className="form-check form-switch">
      <input 
        className="form-check-input" 
        type="checkbox" 
        id="flexSwitchCheckChecked" 
        checked={value} 
        onChange={(e)=>{setValue(e.currentTarget.checked); onChange(e.currentTarget.checked)}}
      />
      </div>
    </div>

  )
}

export default ToggleSwitch;