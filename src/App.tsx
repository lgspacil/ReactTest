import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ToolRouter from './routes/router';
import MiniDrawer from './MiniDrawer';


const App: React.FunctionComponent<{}> = () => {
  return (
    <Router>
      <MiniDrawer /> 
      <ToolRouter />
    </Router>
  )
}

export default App;