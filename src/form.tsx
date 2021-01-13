import React, {useEffect, useState} from "react";
import { StoreContainer} from "./store";

const FormComponent: React.FunctionComponent = () => {
  const form = StoreContainer.useContainer();

  const [message, setMessage] = useState('');

  // Will be called every time the input value has changed
  useEffect(() => {
    if(form.input.length > 1 && form.input.length < 4){
      setMessage('Minimum length is 4 characters')
    }else{
      setMessage('')
    }
  }, [form.input])

  return (
    <div>
      <p>Hello! {form.name}</p>
      <div>
        <input type="text" value={form.input} onChange={form.handleInput} />
        <button onClick={form.updateName}>Change Name</button>
      </div>

      <p style={{color: 'red'}}>{message}</p>
    </div>
  );
};
export default FormComponent;