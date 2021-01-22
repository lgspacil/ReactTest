import React, {useState} from "react";
import { Square } from "./square";
import { StoreContainer } from "../store";
import {useLocation} from 'react-router';

const TodoComponent: React.FunctionComponent = () => {
  const todo = StoreContainer.useContainer();

  // const location = useLocation();
  // console.log('the location information', location);
  

  const [active, setActive] = useState(false);

  const toggleSquare = () => {
    setActive(!active);
  }

  return (
    <div style={{padding: 90}}>
      <p>Add Todos</p>
      <input type="text" value={todo.item} onChange={todo.handleTodo} />
      <button onClick={todo.handleSubmit}>Add</button>
      <div>
        <p>Dear {todo.name}, here are your current tasks;</p>
        {todo.todos ? todo.todos.map((item) => {
          return (
            <ul key={item.id}>
              <li>{item.title}</li>
            </ul>
          );
        }) : null}
      </div>

      <button onClick={todo.clearItems}>Clear List</button>

      <button onClick={toggleSquare}>{active ? 'Hide' : 'Show'} Square</button>

      {active ? <Square/> : null}
    </div>
  );
};
export default TodoComponent;