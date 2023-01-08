import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IOption } from '../data/interface/IOption';
import './addMovieName.scss';
import classNames from 'classnames';

export interface AddMovieNameProps{
  menuOptions: IOption[];
  onSelectOption: (onSelectOption: IOption) => void; 
  placeholder?: string;
  onInputchange: (input: string) => void;
  defaultMovieName: string|undefined;
}

const AddMovieName:React.FC<AddMovieNameProps> = ({menuOptions, onSelectOption, placeholder, onInputchange, defaultMovieName}) =>{

  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');
  const [thisMenuOptions, setThisMenuOptions] = useState<IOption[]>([]);

  useEffect(()=>{
    setThisMenuOptions(menuOptions);
  },[menuOptions])

  useEffect(()=>{
    if(defaultMovieName)
    setValue(defaultMovieName);
  },[defaultMovieName])
  
  return(
    <div className='add-movie-name-container'>
      <div className='search-box-container'>
        <input 
          type='text' 
          onChange={(e)=>{setValue(e.currentTarget.value); onInputchange(e.currentTarget.value);}} 
          value={value}
          className={classNames(`search-box text-color`, value ? `text-normal`:`text-placeholder`)} 
          placeholder={placeholder? placeholder:t('MOVIE_NAME')}
        />
      </div>
      {(thisMenuOptions.length!==0) &&
        <div className='menu-list'>
          { 
            thisMenuOptions.map((option, index)=>{
              return (
                <div 
                  key={index} 
                  className='option-row text-normal' 
                  onClick={()=>{ setValue(option.label); setThisMenuOptions([]); onSelectOption(option); }}
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

export default AddMovieName;