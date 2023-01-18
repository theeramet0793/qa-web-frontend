import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './dropdownArea.scss'
import ChevronDownIcon from '../assets/svg/chevron-down.svg'
import Checkbox from './checkbox';
import { PostType } from '../data/enum/filterEnum';

export interface DropDownAreaprops{
 onChange: (result:PostType)=>void;
}

const DropdownArea:React.FC<DropDownAreaprops> = ({onChange}) =>{

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [check1Value, setCheck1Value] = useState<boolean>(false);
  const [check2Value, setCheck2Value] = useState<boolean>(false);
  const delayedCloseMenu = () => {
    setTimeout(()=>setIsShowMenu(false), 100);
  }
  const SOLVED = "พบชื่อภาพยนตร์แล้ว";
  const UNSOLVED = "ยังไม่พบชื่อภาพยนตร์";
  const ALL = "ทั้งหมด";

  useEffect(()=>{
    ((check1Value && check2Value)||(!check1Value && !check2Value))? onChange(PostType.All): check1Value? onChange(PostType.Solved):onChange(PostType.Unsolved);
    // eslint-disable-next-line 
  },[check1Value, check2Value])

  const renderPostType = () =>{
    return ((check1Value && check2Value)||(!check1Value && !check2Value))? ALL:(check1Value)? SOLVED:UNSOLVED;
  }

  return(
    <div className='dropdown-area-container'>
      <button 
        className='dropdown-area-button'
        onClick={()=> setIsShowMenu(!isShowMenu)}
      >
        <Container className='content-container'>
          <Row  className='py-1 text-normal text-color d-flex justify-content-center align-items-center'>
            <div>{'โพสต์'+renderPostType()}</div>
          </Row>
          <Row  className='d-flex align-items-center justify-content-center'> 
            <ReactSVG src={ChevronDownIcon}/>
          </Row>
        </Container>
      </button>
      {isShowMenu &&
        <button className='expand-menu text-color text-normal' onBlur={()=>{delayedCloseMenu()}}>  
          <Row className='ps-3'>
            <Row className='py-1'>
              <Col xs='auto' className='ps-0'>
                <div className='checkbox-container'>
                  <Checkbox defaultCheck={check1Value} onChange={(isCheck)=>{setCheck1Value(isCheck)}}/>
                </div>
              </Col>
              <Col className='px-0 d-flex justify-content-start align-items-center text-small'>            
                {SOLVED}
              </Col>
            </Row>
            <Row className='py-1'>
              <Col xs='auto' className='ps-0'>
                <div className='checkbox-container'>
                  <Checkbox defaultCheck={check2Value} onChange={(isCheck)=>{setCheck2Value(isCheck)}}/>
                </div>
              </Col>
              <Col className='px-0 d-flex justify-content-start align-items-center text-small'>            
                {UNSOLVED}
              </Col>
            </Row>
          </Row>
        </button>
      }
    </div>
  )
}

export default DropdownArea;