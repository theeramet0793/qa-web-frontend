
import { ReactSVG } from 'react-svg';
import './moreMenu.scss'
import ThreeDot from '../assets/svg/three-dots.svg'
import { useState } from 'react';

export interface MoreMenuProps{

}

const MoreMenu: React.FC<MoreMenuProps> = () =>{

  const testOptions = [
    {label:'ตัวอย่าง', value:'1'},
    {label:'เขียนยาวๆๆวววว', value:'2'},
    {label:'รายงานรายงาน', value:'3'},
  ]

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)

  return (
    <div className='more-menu-component-container'>
      <button 
      className='more-menu-button'
      onClick={()=> setIsShowMenu(!isShowMenu)}
      onBlur={()=>setIsShowMenu(false)}
      >
        <ReactSVG src={ThreeDot}/>
      </button>
      {isShowMenu &&
        <div className='expand-menu'>  
          { 
            testOptions.map((option, index)=>{
              return (
                <div key={index} className='option-row text-normal'>
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