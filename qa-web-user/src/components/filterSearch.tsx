import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { SearchType } from "../data/enum/filterEnum";
import './filterSearch.scss'
import classNames from 'classnames';
import { useLocation } from "react-router-dom";
import { convertPathQueryStringToMainOption } from "../utils/convert";


export interface FilterSearchProps{
  defaultSearchType: SearchType|undefined;
  onSelectButton: (selected:SearchType) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({defaultSearchType, onSelectButton}) =>{

  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState<SearchType>(SearchType.Post);

  useEffect(()=>{
    let selectedSearch = (convertPathQueryStringToMainOption(decodeURI(location.search)));
    if(selectedSearch.type==="POST"){
      setSelectedButton(SearchType.Post)
    }else if(selectedSearch.type==="TAG"){
      setSelectedButton(SearchType.Tag)
    }else{
      setSelectedButton(SearchType.User)
    }
  }, [location.search])

  useEffect(()=>{
    onSelectButton(selectedButton);
    //eslint-disable-next-line
  },[selectedButton])

  useEffect(()=>{
    if(defaultSearchType) setSelectedButton(defaultSearchType);
  },[defaultSearchType])
  
  return(
    <div className="filter-search">
      <div className="filter-search-container text-color text-normal">
        <Row>
          <Col>
            <div 
              className={classNames("radio-filter-button", selectedButton === SearchType.Tag? 'active':'')}
              onClick={()=>{setSelectedButton(SearchType.Tag)}}
            >
              แท็ก
            </div>
          </Col>
          <Col>
            <div 
              className={classNames("radio-filter-button", selectedButton === SearchType.Post? 'active':'')}
              onClick={()=>{setSelectedButton(SearchType.Post)}}
            >
              โพสต์
            </div>
          </Col>
          <Col>
            <div 
              className={classNames("radio-filter-button", selectedButton === SearchType.User? 'active':'')}
              onClick={()=>{setSelectedButton(SearchType.User)}}
            >
              ชื่อผู้ใช้งาน
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FilterSearch;