import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: "AUTH_IS_READY", payload: user });
            unsub();
            // like this is will be called only once
        });
    }, [])

    console.log("AuthContext state:", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {/* children is everythingthat this component(AuthContextProvider) wraps */}
            {children}
        </AuthContext.Provider>
    );
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case "AUTH_IS_READY":
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state;
    }
}