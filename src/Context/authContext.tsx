import { createContext, useEffect, useReducer } from 'react';

/* interfaces */
import { ContextProviderChildren } from '../Interfaces/Interfaces';

/* Databse */
import { projectAuth } from '../DataBase/config';

export const AuthContext = createContext<any>(null);

const authContextReducer = (state: { user: null, authIsReady: boolean }, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true };
        default:
            return state;
    }
}

export const AuthContextProvider: React.FC<ContextProviderChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(authContextReducer, {
        user: null,
        authIsReady: false,
    })

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged(user => {
            dispatch({ type: 'AUTH_IS_READY', payload: user });
            unsub();
        })

    }, []);


    return (
        <AuthContext.Provider value={{ ...state, dispatch }} >
            {children}
        </AuthContext.Provider >
    )
}