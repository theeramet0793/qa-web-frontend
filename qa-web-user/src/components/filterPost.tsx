
import './filterPost.scss'
import DropdownSelect from "./dropdownSelect";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "./toggleSwitch";
import DropdownArea from './dropdownArea';
import { PostType, SortBy } from '../data/enum/filterEnum';

export interface FilterPostProps{
  onFilterSortByChange:(sortby:SortBy) => void;
  onFilterTypeChange:(postType:PostType) => void;
  onFilterOnlyFollowChange:(isOnlyFollow:boolean) => void;
  defaultOnlyFollow: boolean;
}

const FilterPost: React.FC<FilterPostProps> = ({onFilterOnlyFollowChange, onFilterSortByChange, onFilterTypeChange, defaultOnlyFollow}) => {


  const { t } = useTranslation();
  const sortOptions = [
    {value:SortBy.Date,label:'เรียงตามเวลา'},
    {value:SortBy.Upvote,label:'เรียงตามความนิยม'},
    {value:SortBy.Follow,label:'เรียงตามผู้ติดตาม'},
  ]

  return(
    <div className="filter-post d-flex justify-content-center align-items-center">
      <div className="filter-container">
          <div className="filter-card">
            <Row className='w-100 d-flex justify-content-center text-normal-responsive' >
              <Col className='d-flex justify-content-center'>
                <Row className="switch-container d-flex justify-content-center align-items-center">
                  <Col xs='auto' className="d-flex justify-content-center text-center">{t('ONLY_FOLLOWING_POST')}</Col>
                  <Col className="py-1 d-flex justify-content-center ">
                    <ToggleSwitch defaultValue={defaultOnlyFollow} onChange={(result)=>{onFilterOnlyFollowChange(result); }}/>
                  </Col>
                </Row>
              </Col>
              <Col >
                <div className='checkbox-group-container'>
                  <DropdownArea onChange={(result)=>{onFilterTypeChange(result)}}/>
                </div>
              </Col>
              <Col >                
                <div className="dropdown-container">
                  <DropdownSelect menuOptions={sortOptions} onSelectOption={(selectedOption)=>{onFilterSortByChange(selectedOption.value as SortBy)}}/>
                </div>
              </Col>
            </Row>
          </div>  
      </div>
    </div>
  )
}

export default FilterPost;