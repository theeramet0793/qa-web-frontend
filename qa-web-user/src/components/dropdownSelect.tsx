
import './dropdownSelect.scss'
import { IOption } from '../data/interface/IOption';
import { useState } from 'react';
import ChevronDownIcon from '../assets/svg/chevron-down.svg'
import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';


export interface DropdownSelectProps {
  menuOptions: IOption[];
  onSelectOption: (onSelectOption: IOption) => void; 
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({menuOptions, onSelectOption}) => {

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IOption>(menuOptions[0]);
  const delayedCloseMenu = () => {
    setTimeout(()=>setIsShowMenu(false), 100);
  }
  
  return(
    <div className='dropdown-select-container-qwe'>
      <button 
        className='dropdown-select-qwe-button'
        onClick={()=> setIsShowMenu(!isShowMenu)}
        onBlur={()=>{delayedCloseMenu()}}
      >
        <Row className='content-container'>
          <Col xs={12} sm={9} className='py-1 d-flex justify-content-start align-items-center'>
            {selectedOption.label}
          </Col>
          <Col xs={12} sm={3} className='d-flex align-items-center justify-content-center'> 
            <ReactSVG src={ChevronDownIcon}/>
          </Col>
        </Row>
      </button>
      {isShowMenu &&
        <div className='expand-menu'>  
          { 
            menuOptions.map((option, index)=>{
              return (
                <div key={index} className='option-row text-normal' onClick={()=>{setSelectedOption(option);onSelectOption(option);}}>
                  {option.label}
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default DropdownSelect;