import './app.sass';

import { FC } from 'react';

import AppBarView from '../view/appBarView/appBarView';
import MainPage from '../page/main/mainPage';

const App: FC = () => {
  return (
    <>
      <AppBarView />
      <MainPage />
    </>
  );
};

export default App;
