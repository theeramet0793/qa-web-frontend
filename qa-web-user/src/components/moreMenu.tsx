
import { ReactSVG } from 'react-svg';
import './moreMenu.scss'
import ThreeDot from '../assets/svg/three-dots.svg'
import { useState } from 'react';
import { IOption } from '../data/interface/IOption';
import { Col, Row } from 'react-bootstrap';
import TrashIcon from '../assets/svg/trash.svg';
import PencilIcon from '../assets/svg/pencil-fill.svg';
import FlagIcon from '../assets/svg/flag.svg';

export interface MoreMenuProps{
  menuOptions: IOption[];
  onSelectOption: (onSelectOption: IOption) => void; 
}

const MoreMenu: React.FC<MoreMenuProps> = ({menuOptions, onSelectOption}) =>{

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const delayedCloseMenu = () => {
    setTimeout(()=>setIsShowMenu(false), 100);
  }

  const addIcon = (label:string) =>{
    var icon:string = '';
    if(label.includes('ลบ')) icon = TrashIcon;
    else if(label.includes('แก้ไข')) icon = PencilIcon;
    else if(label.includes('รายงาน')) icon = FlagIcon;
    return(
      <Row>
        <Col sm='auto' className='more-menu-option pe-0'>
          <ReactSVG src={icon}/>
        </Col>
        <Col>
          {label}
        </Col>
      </Row>
    )
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
                  {addIcon(option.label)}
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