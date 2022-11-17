
import './searchBar.scss'
import { ReactSVG } from 'react-svg';
import SearchIcon from '../assets/svg/search.svg'
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useState } from 'react';

export interface SearchBarProps{

}

const SearchBar: React.FC<SearchBarProps> = () =>{

  const { t } = useTranslation();
  const [inputCount, setInputCount] = useState<number>(0)

  const handleOnChange = (text: string) =>{
    setInputCount(text.length);
  }

  return(
    <div className='search-bar'>
      <ReactSVG src={SearchIcon} className='search-icon'/>
      <input type='text' onChange={(e)=>handleOnChange(e.currentTarget.value)} className={classNames(`search-box`, inputCount>0 ? `text-normal`:`text-placeholder`)} placeholder={t('SEARCH_POST')}/>
    </div>
  )
}

export default SearchBar;