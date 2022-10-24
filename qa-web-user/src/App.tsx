import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation } from "react-i18next";

const App = () => {
  
  const { t } = useTranslation();
  return (
    <div className="App">
      {t('welcome')}
    </div>
  );
}

export default App;
