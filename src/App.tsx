import React from 'react';
import Header from './header/Header';
import ToolRouter from './router';

const App: React.FunctionComponent<{}> = () => {
  return (
    <>
      <Header />
      <ToolRouter />
    </>
  )
}

export default App;