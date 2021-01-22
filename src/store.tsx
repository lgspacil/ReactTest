// src/store.js
import React, { useState } from 'react';
import shortid from "shortid"
import { Container, createContainer } from 'unstated-next'
import { Feature, FeatureCollection } from '@turf/turf';
import * as turf from '@turf/turf';
import createPersistedState from 'use-persisted-state';

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
    updateFeatureCollection: (fc: FeatureCollection) => void;
    featureCollection: FeatureCollection | null;
    user: boolean,
    handleLogout: (cb: any) => void;
    handleLogin: (cb: any) => void;
    clearFeatureCollection: () => void;
    add: () => void;
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

    const handleLogin = (cb: any) => {
        setUser(true);

        cb();
    }

    const handleLogout = (cb: any) => {
        setUser(false);

        cb();
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

    const updateFeatureCollection = (fc: FeatureCollection) => {
        setFeatureCollection(fc)
    }

    const clearFeatureCollection = () => {
        setFeatureCollection(null);
    }

    const add = () => {
        setNum(number + 1);
    }

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