
import './data/mainStyle/mainStyle.scss'
import { useTranslation } from "react-i18next";
import Test from './components/test';

const App = () => {
  
  const { t } = useTranslation();
  return (
    <div className="App">
      {t('welcome')}
      <Test/>
    </div>
  );
}

export default App;
