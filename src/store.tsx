// src/store.js
import React, { useState } from 'react';
import shortid from "shortid"
import { Container, createContainer } from 'unstated-next'
import { Feature, FeatureCollection } from '@turf/turf';
import useLocalStorageState from 'use-local-storage-state' // another persisted option

interface IList {
    id: string;
    name: string;
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
    const list: IList[] = [
        { id: '1', name: 'Write code' },
        { id: '2', name: 'Buy milk' }
    ]
    const [input, setValue] = useLocalStorageState("input", "");
    const [name, setName] = useLocalStorageState("name", "James");
    const [item, setTodo] = useLocalStorageState("item", "");
    const [featureCollection, setFeatureCollection] = useLocalStorageState<FeatureCollection | null>("featureCollection", null);
    const [user, setUser] = useLocalStorageState("user", false);
    const [number, setNum] = useLocalStorageState('number', 1);
    const [todos, addTodo] = useLocalStorageState('todos', list)



    const handleLogin = async () => {
        await delay(1000);
        setUser(true);
    }

    const handleLogout = async () => {
        await delay(1000);
        clearLocalStorage()
        setUser(false);
    }

    const clearLocalStorage = () => {
        setValue.reset();
        setName.reset();
        setTodo.reset();
        setFeatureCollection.reset();
        setUser.reset();
        setNum.reset();
        addTodo.reset();
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
            name: item
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