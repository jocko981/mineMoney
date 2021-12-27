import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    // there are predefined additional properties that can be stored in Firebase:
    // displayName, photoURL...
    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            // signup user
            const response = await projectAuth.createUserWithEmailAndPassword(email, password);

            if (!response) {
                throw new Error("Signup could not complete");
            }

            // add displayName to user (additionaly update user profile properties)
            await response.user.updateProfile({ displayName: displayName });

            // dispatch LOGIN action
            dispatch({ type: 'LOGIN', payload: response.user });

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

    return { error, isPending, signup }
}