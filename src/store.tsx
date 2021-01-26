// src/store.js
import React, { useState } from 'react';
import shortid from "shortid"
import { Container, createContainer } from 'unstated-next'
import { Feature, FeatureCollection } from '@turf/turf';
import createPersistedState from 'use-persisted-state';

// Create a unique key that will persist this data across tabs and windows.
const useInputState = createPersistedState('input');
const useNameState = createPersistedState('name');
const useTodosState = createPersistedState('todos');
const useItemState = createPersistedState('item');
const useFeatureCollection = createPersistedState('fc');
const useUserState = createPersistedState('user');

interface IList {
    id: string;
    title: string;
}

interface IStore {
    input: string;
    name: string;
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updateName: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    todos: IList[];
    item: string;
    handleTodo: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    clearItems: () => void;
    updateFeatureCollection: (fc: FeatureCollection | null) => void;
    featureCollection: FeatureCollection | null;
    user: boolean,
    handleLogout: () => void;
    handleLogin: () => void;
    clearFeatureCollection: () => void;
    add: () => void;
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export const useStore = () => {
    // Construct a list that contains two default tasks
    const list: IList[] = [
        { id: '1', title: 'Write code' },
        { id: '2', title: 'Buy milk' }
    ]
    const [input, setValue] = useInputState("");
    const [name, setName] = useNameState("James");
    const [todos, addTodo] = useTodosState(list);
    const [item, setTodo] = useItemState("");
    const [featureCollection, setFeatureCollection] = useFeatureCollection<FeatureCollection | null>(null);
    const [user, setUser] = useUserState(false);
    const [number, setNum] = useState(1);

    const handleLogin = async () => {
        await delay(1000);
        setUser(true);
    }

    const handleLogout = async () => {
        await delay(1000);
        setUser(false);
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const updateName = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setName(input);
        setValue("");
    };

    const handleTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const value = {
            id: shortid.generate(),
            title: item
        }
        addTodo(todos.concat(value));
        setTodo("");
    };

    const clearItems = () => {
        addTodo([]);
    }

    const updateFeatureCollection = (fc: FeatureCollection | null) => {
        setFeatureCollection(fc)
    }

    const clearFeatureCollection = () => {
        setFeatureCollection(null);
    }

    const add = () => {
        setNum(number + 1);
    }

    // the store container is exporting both methods and values to be accessed after
    return {
        input,
        name,
        handleInput,
        updateName,
        todos,
        item,
        handleTodo,
        handleSubmit,
        clearItems,
        updateFeatureCollection,
        featureCollection,
        user,
        handleLogin,
        handleLogout,
        clearFeatureCollection,
        add, // delete after test
    };
}
export const StoreContainer: Container<IStore, void> = createContainer(useStore);