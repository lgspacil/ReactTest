// src/store.js
import React from 'react';
import shortid from "shortid"
import { Container, createContainer } from 'unstated-next'
import { Feature, FeatureCollection } from '@turf/turf';
import createPersistedState from 'use-persisted-state';

const useInputState = createPersistedState('input');
const useNameState = createPersistedState('name');
const useTodosState = createPersistedState('todos');
const useItemState = createPersistedState('item');
const useZoneState = createPersistedState('zone');
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
    addZone: (feature: Feature) => void;
    zones: Feature[] | null;
    user: boolean,
    handleLogout: (cb: any) => void;
    handleLogin: (cb: any) => void;
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
    const [zones, setZones] = useZoneState<Feature[] | null>(null)
    const [user, setUser] = useUserState(false);

    const handleLogin = (cb: any) => {
        setUser(true);

        cb();
        // navigate to a route
        // history.push('/about');
    }

    const handleLogout = (cb: any) => {
        setUser(false);

        cb();
        // history.push('/signin');
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

    const addZone = (feature: Feature) => {
        setZones([feature])
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
        addZone,
        zones,
        user,
        handleLogin,
        handleLogout
    };
}
export const StoreContainer: Container<IStore, void> = createContainer(useStore);