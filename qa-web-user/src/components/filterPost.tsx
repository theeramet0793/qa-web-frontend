
import RectangleCard from "./rectangleCard";
import './filterPost.scss'
import SearchBar from "./searchBar";
import Checkbox from "./checkbox";
import OblongSelect from "./oblongSelect";

export interface FilterPostProps{
  
}

const FilterPost: React.FC<FilterPostProps> = () => {


  const testOptions = [
    {value:'1',label:'one'},
    {value:'2',label:'two'},
    {value:'3',label:'three'},
  ]

  return(
    <div className="filter-post d-flex justify-content-center align-items-center">
      <div className="filter-container">
          <RectangleCard>
            <div className="search-bar-container">
              <SearchBar/>
            </div>
            <div className="checkboxes-container">
              <div className="checkbox-container">
                <Checkbox defaultCheck={undefined} onChange={()=>{}}/>
              </div>
              <div className="checkbox-container">
                <Checkbox defaultCheck={true} onChange={()=>{}}/>
              </div>
            </div>
            <div className="dropdown-container">
              <OblongSelect options={testOptions}/>
            </div>
          </RectangleCard>  
      </div>

    </div>
  )
}

export default FilterPost;