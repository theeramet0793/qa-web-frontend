
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';
import { IOption } from '../data/interface/IOption';
import './searchBar.scss';
import SearchIcon from '../assets/svg/search.svg';
import classNames from 'classnames';

export interface SearchBarProps{
  menuOptions: IOption[];
  onSelectOption: (onSelectOption: IOption) => void; 
  placeholder?: string;
  onInputchange: (input: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({menuOptions, onSelectOption, placeholder, onInputchange}) =>{
  
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');
  const [thisMenuOptions, setThisMenuOptions] = useState<IOption[]>(menuOptions);

  useEffect(()=>{
    setThisMenuOptions(menuOptions);
  },[menuOptions])
  
  return(
    <div className='search-bar-container'>
      <div className='search-box-container'>
        <div className='search-box-container'>
        <ReactSVG src={SearchIcon} className='search-icon'/>
        <input 
          type='text' 
          onChange={(e)=>{setValue(e.currentTarget.value);  onInputchange(e.currentTarget.value);}} 
          value={value}
          className={classNames(`search-box`, value ? `text-normal`:`text-placeholder`)} 
          placeholder={placeholder? placeholder:t('SEARCH_POST')}
        />
      </div>
      </div>
      {(thisMenuOptions.length!==0) &&
        <div className='menu-list'>
          { 
            thisMenuOptions.map((option, index)=>{
              return (
                <div 
                  key={index} 
                  className='option-row text-normal' 
                  onClick={()=>{onSelectOption(option); setValue(''); setThisMenuOptions([]); onInputchange(''); }}
                >
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

export default SearchBar;