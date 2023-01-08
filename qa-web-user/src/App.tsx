
import './data/mainStyle/mainStyle.scss'
import HomePage from './pages/homePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from './pages/welcomPage';


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>\
        <Route path='/loading' element={<WelcomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
