
import './data/mainStyle/mainStyle.scss'
import HomePage from './pages/homePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingPage from './pages/loadingPage';
import ProfilePage from './pages/profilePage';
import SearchingPage from './pages/SearchingPage';
import ShowOnePostPage from './pages/showOnePostPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/loading' element={<LoadingPage/>}/>
        <Route path='/searching' element={<SearchingPage/>}/>
        <Route path='/showonepost/' element={<ShowOnePostPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
