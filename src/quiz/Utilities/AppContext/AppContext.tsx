import produce from 'immer';
import * as React from 'react';
import { v4 as uuid } from 'uuid';

import type { AppContextStore } from './ContextValue';

const defaultQuizState = {
    quizzes: {},
    quizQuestions: {},
};

const context = React.createContext<AppContextStore>(defaultQuizState);

const Provider = context.Provider;
type ProviderProps = {
    children: React.ReactNode;
};

export let state: AppContextStore = defaultQuizState;

export let updateContext = (update: (value: AppContextStore) => void ) => {
    state = produce(state, update);
    Object.values(subscriptions).forEach((callback) => {
        callback(state);
    });
};

const subscriptions: {[uuid: string]: (value: AppContextStore) => void} = {};


export const AppContextProvider = ({children}: ProviderProps) => {
    const [value, setValue] = React.useState<AppContextStore>(state);
    
    React.useEffect(() => {
        const id = uuid();
        subscriptions[id] = (value) => {
            setValue(value);
        };
        return () => {
            delete subscriptions[id];
        }
    })

    return <Provider value={value}>
        {children}
    </Provider>;
};

export const useAppContext = () => {
    return React.useContext(context);
}
