
import { ReactSVG } from 'react-svg';
import './moreMenu.scss'
import ThreeDot from '../assets/svg/three-dots.svg'
import { useState } from 'react';
import { IOption } from '../data/interface/IOption';

export interface MoreMenuProps{
  menuOptions: IOption[];
  onSelectOption: (onSelectOption: IOption) => void; 
}

const MoreMenu: React.FC<MoreMenuProps> = ({menuOptions, onSelectOption}) =>{

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const delayedCloseMenu = () => {
    setTimeout(()=>setIsShowMenu(false), 100);
  }

  return (
    <div className='more-menu-component-container'>
      <button 
        className='more-menu-button'
        onClick={()=> setIsShowMenu(!isShowMenu)}
        onBlur={()=>{delayedCloseMenu()}}
      >
        <ReactSVG src={ThreeDot}/>
      </button>
      {isShowMenu &&
        <div className='expand-menu'>  
          { 
            menuOptions.map((option, index)=>{
              return (
                <div key={index} className='option-row text-normal' onClick={()=>{onSelectOption(option);}}>
                  {option.label}
                </div>
              )
            })
          }
        </div>
      }
    </div>
  );
}

export default MoreMenu;