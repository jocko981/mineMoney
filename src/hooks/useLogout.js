import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        // sign out User
        try {
            await projectAuth.signOut();

            // dispatch logout action
            dispatch({ type: "LOGOUT" });

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

    return { logout, error, isPending }
}