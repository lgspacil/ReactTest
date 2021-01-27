import {createContext} from 'react';

interface Shape {
    allowEdit: boolean;
    setAllowEdit: React.Dispatch<React.SetStateAction<boolean>>;
    shapeId: string;
    setShapeId: React.Dispatch<React.SetStateAction<string>>;
}

export const ShapeContext = createContext({} as Shape);

