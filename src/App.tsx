import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ToolRouter from './routes/router';
import MiniDrawer from './SideDrawer/MiniDrawer';

// ---------------------- hello????? (1) -------------

// new commit comming from branch 1

// Router wrapping both the Drawer and the routes since we want access to use history in the drawer component

const App: React.FunctionComponent<{}> = () => {

  return (
    <Router>
      {/* <MiniDrawer />  */}
      <ToolRouter />
    </Router>
  )
}

export default App;