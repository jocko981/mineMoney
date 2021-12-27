import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        // sign in User
        try {
            // on this response we gonna get a User, and that User is payload
            const response = await projectAuth.signInWithEmailAndPassword(email, password);

            // dispatch login action
            dispatch({ type: "LOGIN", payload: response.user });

            // update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (err) {
            // update state
            if (!isCancelled) {
                console.log("err message", err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    // clean up function
    useEffect(() => {

        return () => {
            setIsCancelled(true);
        }
    }, [])

    return { login, error, isPending }
}