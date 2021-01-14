import React from 'react';
import TodoComponent from "./todo";
import FormComponent from "./form";
import StarWars from "./starWarsExample/StarWars";
import MainGrid from "./MaterialUI/MainGrid";
import { StoreContainer } from "./store"

const App: React.FunctionComponent<{}> = () => (
  <div className="App" style={{padding: 20}}>
    <StoreContainer.Provider>
      <FormComponent />
      <TodoComponent />
      <div style={{marginTop: 100}}/>
      <StarWars />
    </StoreContainer.Provider>
  </div>
)

export default App;