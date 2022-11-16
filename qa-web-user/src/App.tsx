
import './data/mainStyle/mainStyle.scss'
import HomePage from './pages/homePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
