import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

const INITIAL_STATE = {
    document: null,
    isPending: false,
    error: null,
    sucess: null
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, INITIAL_STATE);
    const [isCancelled, setIsCancelled] = useState(false);
    const [isPending, setIsPending] = useState(false);

    // collection ref
    let ref = projectFirestore.collection(collection);

    // dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
            setIsPending(false);
        }
    }

    // add a document
    const addDocument = async (doc) => {
        setIsPending(true);
        dispatch({ type: "IS_PENDING" });

        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt: createdAt });
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
        }
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
            throw new Error("Error in adding document");
        }
    }

    // delete a document
    const deleteDocument = async (id) => {
        setIsPending(true);
        dispatch({ type: "IS_PENDING" });

        try {
            const deletedDocument = await ref.doc(id).delete();

            dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete." });
        }
    }

    useEffect(() => {

        return () => {
            setIsCancelled(true);
        }
    }, [])

    return { addDocument, deleteDocument, response, isPending }
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { ...state, isPending: true, document: null, success: false, error: null }
        case "ADDED_DOCUMENT":
            return { ...state, isPending: false, document: action.payload, success: true, error: null }
        case "DELETED_DOCUMENT":
            return { ...state, isPending: false, document: null, success: true, error: null }
        case "ERROR":
            return { ...state, isPending: false, document: null, success: false, error: action.payload }

        default:
            return state;
    }
}