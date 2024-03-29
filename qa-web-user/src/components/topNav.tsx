import { Col, Row } from 'react-bootstrap';
import './topNav.scss'
import { useTranslation } from "react-i18next";
import Logo from '../assets/svg/logo.svg'
import { ReactSVG } from 'react-svg';
import Profile from './profile';
import Notification from './notification';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { IUser } from '../data/interface/IUser';
import { useNavigate } from 'react-router-dom'
import SearchBox from './searchBox';
import MoreMenu from './moreMenu';
import { IMainSearchOption, IOption } from '../data/interface/IOption';
import debounce from 'lodash.debounce';
import Client from '../lib/axios/axios';
import { IMainSearch } from '../data/interface/IMainSearch';
import TagIcon from '../assets/svg/tag.svg'
import PersonIcon from '../assets/svg/person-fill.svg'
import SearchIcon from '../assets/svg/search.svg'
import { SearchType } from '../data/enum/filterEnum';
import { GetUserData } from './userData/userData';

export interface TopNavProps{
  onClickReg: () => void;
  onClickSign: () => void;
  isSignInSuccess: boolean;
  onSignOut: ()=> void;
  onSignInSuccess: ()=>void;
  onProfile: ()=>void;
  newProfileUrl?: string;
  defaultSearch?: string;
}

const TopNav: React.FC <TopNavProps> = ({onClickReg, onClickSign, isSignInSuccess, onSignOut, onSignInSuccess, onProfile, newProfileUrl, defaultSearch}) => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<IUser|undefined>(GetUserData());
  const [searchMenuOptions, setSearchMenuOptions] = useState<IMainSearchOption[]>([]);
  const [selectedOption , setSelectedOption] = useState<IMainSearchOption|undefined>(undefined);
  const [resultSearch, setResultSearch] = useState<IMainSearch|undefined>(undefined);
  const [searchString, setSearchString] = useState<string>('');
  const signAndRegOptions:IOption[] = [
    {label:'ลงชื่อเข้าใช้', value:'signin'},
    {label:'สมัครใช้งาน', value:'register'},
  ]

  useEffect(()=>{
    const accToken = localStorage.getItem('qa_access_token');
    if(accToken){
      setUserProfile( jwt_decode(accToken));
      onSignInSuccess();
    }
  },[isSignInSuccess, onSignInSuccess])

  useEffect(()=>{
    let temp:IMainSearchOption[] = [];
    if(resultSearch?.tags && resultSearch?.tags.length > 0){
      resultSearch.tags.forEach((tag)=>{
        temp.push({
          label:tag.tagName,
          value: tag.tagId.toString(),
          type:"TAG"
        })
      })
    }
    if(resultSearch?.users && resultSearch?.users.length > 0){
      resultSearch.users.forEach((user)=>{
        temp.push({
          label:user.username,
          value:user.userId.toString(),
          type:"USER"
        })
      })
    }
    setSearchMenuOptions(temp);
  },[resultSearch])

  const handleSelectMenu = (selected: IOption) =>{
    if(selected.value === 'signin') onClickSign();
    else if(selected.value === 'register') onClickReg();
  }

  const searchMain = debounce((searchStr: string) =>{
    if(searchStr){
      Client.get<IMainSearch>('/mainsearch',{params:{searchString:searchStr}})
      .then( (res) =>{
        setResultSearch(res.data);
      }).catch( (err) => {
        console.log(err.response);
      })
      setIsShowMenu(true);
      setSearchString(searchStr);
    }else{
      setResultSearch(undefined);
      setSearchString('');
    }
    setSelectedOption(undefined);
  },700)

  const handleClick = (option:IMainSearchOption) =>{
    navigate('/searching/?keyword='+option.label+"?type="+option.type)
  }
  
  return(
    <div className='top-nav'>
      <Row className='content-container'>
        <Col xs={3} sm={3} className=' d-flex justify-content-center align-items-center'>
          <div className='logo-container'>
            <div className='logo d-flex align-items-center justify-content-start' onClick={()=>{navigate('/');}}>
              <ReactSVG src={Logo}/>
            </div>
          </div>
        </Col>
        <Col xs={4} sm={6}  className='d-flex justify-content-center align-items-center'>
          <div className="search-box-container-qaz">
            <SearchBox onInputChange={searchMain} defaultSearch={selectedOption?.label? selectedOption?.label:defaultSearch}/>
            { isShowMenu && searchString &&
              <div className='menu-main-list'>
                {searchMenuOptions.length !==0 &&
                  <div className='menu-list'>
                    { 
                      searchMenuOptions.map((option, index)=>{
                        return (
                          <div 
                            key={index} 
                            className='option-row text-normal' 
                            onClick={()=>{
                              handleClick(option); 
                              setSearchMenuOptions([]); 
                              setIsShowMenu(false);
                              setSelectedOption(option);
                            }}
                          >
                            <Row>
                              <Col xs='auto' className='d-flex justify-content-center align-items-center'>
                                <Row className='row-tag-container'>
                                  <Col className='d-flex justify-content-end align-items-center'>
                                    <ReactSVG src={option.type === 'TAG'? TagIcon:PersonIcon}/>
                                  </Col>
                                  <Col className='text-small ps-0 d-flex justify-content-start align-items-center'>
                                    {option.type}
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <div>{option.label}</div>
                              </Col>
                            </Row>
                          </div>
                        )
                      })
                    }
                  </div>
                }
                <div className='menu-default-search-by-string-container'>
                  <div 
                    className='menu-default-search-by-string'
                    onClick={()=>{navigate('/searching/?keyword='+searchString+"?type="+SearchType.Post);setSearchMenuOptions([]); setIsShowMenu(false);}}
                  >
                    <Row>
                      <Col xs='auto'><ReactSVG src={SearchIcon}/></Col>
                      <Col className='text-normal ps-0'>{"ค้นหา \""+searchString+"\" "}</Col>
                    </Row>
                  </div>
                </div>
              </div>
            }
          </div>
        </Col>
        <Col xs={5} sm={3}  className='d-flex justify-content-center align-items-center '>
          {!userProfile ?
              <Row className='register-row'>
                <Col className='d-flex align-items-center justify-content-center'>
                  <div className='register-btn-container'> 
                    <div className='btn-reg '>
                      <div className='text-normal-bold' onClick={onClickReg}>
                        {t('REGISTER')}
                      </div>
                    </div>
                  </div> 
                </Col>
                <Col className='d-flex align-items-center justify-content-center'>
                  <div className='sign-btn-container'> 
                    <div className='btn-sign '>
                      <div className='text-normal-bold' onClick={onClickSign}>
                        {t('SIGNIN')}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>:<></>
          }
          {/*In case of small screen*/
          !userProfile ?
            <div className='navbar-more-menu-container'>
              <MoreMenu icon='list' menuOptions={signAndRegOptions} onSelectOption={(selected)=>{handleSelectMenu(selected)}}/>
            </div>:<></>
          }
          {userProfile ?
              <Row>
                <Col className='d-flex align-items-center justify-content-end'>
                  <div className='noti-container'>
                    <Notification/>
                  </div>
                </Col>
                <Col>
                  <div className='top-nav-profile-container'>
                    <Profile 
                      onSignOut={()=>onSignOut()} 
                      enableDropdown={true} 
                      onProfile={()=>{onProfile()}}
                      newProfileUrl={newProfileUrl}
                    /> 
                  </div>
                </Col>
              </Row>:<></>
          }
        </Col>
      </Row>
      <Row className='color-bar'></Row>
    </div>
  )
}

export default TopNav;