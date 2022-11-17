
import RectangleCard from "./rectangleCard";
import './filterPost.scss'
import SearchBar from "./searchBar";
import Checkbox from "./checkbox";
import OblongSelect from "./oblongSelect";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "./toggleSwitch";

export interface FilterPostProps{
  
}

const FilterPost: React.FC<FilterPostProps> = () => {


  const { t } = useTranslation();
  const testOptions = [
    {value:'1',label:'โพสต์ไลก์มากที่สุด'},
    {value:'2',label:'โพสต์ล่าสุด'},
    {value:'3',label:'คอมเมนต์ล่าสุด'},
  ]

  return(
    <div className="filter-post d-flex justify-content-center align-items-center">
      <div className="filter-container">
          <div className="large-card border-radius-50px">
            <div className="search-bar-container">
              <SearchBar/>
            </div>
            <Row>
              <Col sm='auto'>
                <div className="checkboxes-container">
                    <Row className="checkbox-row">
                      <Col sm='auto'>
                        <div className="checkbox-container ">
                          <Checkbox defaultCheck={undefined} onChange={()=>{}}/>
                        </div>
                      </Col>
                      <Col>
                        <div className="text-normal">
                          {t('ALL')}
                        </div>
                      </Col>
                    </Row>                 
                  <div className="sub-check">
                    <Row className="checkbox-row">
                      <Col sm='auto'>
                        <div className="checkbox-container">
                          <Checkbox defaultCheck={undefined} onChange={()=>{}}/>
                        </div>
                      </Col>
                      <Col>
                        <div className="text-normal">
                          {t('SOLVED_POST')}
                        </div>
                      </Col>
                    </Row>
                    <Row className="checkbox-row">
                      <Col sm='auto'>
                        <div className="checkbox-container">
                          <Checkbox defaultCheck={true} onChange={()=>{}}/>
                        </div>
                      </Col>
                      <Col>
                        <div className="text-normal">
                          {t('UNSOLVED_POST')}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="something-container medium-card border-radius-30px">

                </div>
              </Col>
              <Col>
                <div className="dropdown-container">
                  <OblongSelect options={testOptions}/>
                </div>
                <div className="switch-container text-normal small-card border-radius-30px">
                  <Row className="d-flex justify-content-center ">{t('ONLY_FOLLOWING_POST')}</Row>
                  <Row className="d-flex justify-content-center ">
                    <ToggleSwitch/>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>  
      </div>

    </div>
  )
}

export default FilterPost;