import React from 'react';
import Header from './header/Header';
import ToolRouter from './router';
import MiniDrawer from './MiniDrawer';


const App: React.FunctionComponent<{}> = () => {
  return (
    <>
      <MiniDrawer /> 
      <ToolRouter />
    </>
  )
}

export default App;