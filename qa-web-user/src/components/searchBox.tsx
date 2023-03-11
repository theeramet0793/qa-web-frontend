
import './searchBox.scss'
import { ReactSVG } from 'react-svg';
import SearchIcon from '../assets/svg/search.svg'
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export interface SearchBoxProps{
  placeholder?: string;
  onInputChange: (text:string) => void;
  defaultSearch?: string|undefined;
}

const SearchBox: React.FC<SearchBoxProps> = ({placeholder, onInputChange, defaultSearch}) =>{

  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');

  useEffect(()=>{
    if(defaultSearch) setValue(defaultSearch);
  },[defaultSearch])

  return(
    <div className='search-box-container'>
      <ReactSVG src={SearchIcon} className='search-icon'/>
      <input 
        type='text' 
        onChange={(e)=>{setValue(e.currentTarget.value); onInputChange(e.currentTarget.value)}} 
        value={value}
        className={classNames(`search-box`, value ? `text-normal-responsive`:'text-placeholder')} 
        placeholder={placeholder? placeholder:t('SEARCH_POST')}
      />
    </div>
  )
}

export default SearchBox;