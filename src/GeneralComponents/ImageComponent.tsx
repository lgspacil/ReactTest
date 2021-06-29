import React, { useState } from 'react';
import rockImage from '../Images/rock.jpeg';

const ImageComponent: React.FunctionComponent = () => {

    const [value, setValue] = useState('');

    const onhandleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        console.log('hello ', event.target.value);
        setValue(event.target.value as string);
    }

    return (
        <div>

            <p>hello</p>

            <div>
                <input onChange={onhandleChange}></input>
            </div>


         
         <img src={rockImage} alt="BigCo Inc. logo"/>


        </div>
      );

}

export default ImageComponent;

