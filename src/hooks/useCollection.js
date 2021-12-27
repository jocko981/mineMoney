import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // if we don't use a ref --> _query is reavaluating on component over and over 
    // because it is different array even if its items values remain the same
    // and we will have infinite loop in useEffect
    // _query is an array and is "different" on every function call
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;
    // these consts are not seen as Changed,
    // only: _query and _orderBy are seen as changed
    // soo no infinite-loop cuz the dependency is query and orderBy

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        if (query) {
            ref = ref.where(...query);
        }
        if (orderBy) {
            ref = ref.orderBy(...orderBy);
        }

        const unsub = ref.onSnapshot((snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            });

            // update state
            setDocuments(results);
            setError(null);
        }, (err) => {
            console.log(err);
            setError('Could not fetch docs');
        });

        // unsubscribe on unmount
        return () => unsub();

    }, [collection, query, orderBy])

    return { documents, error }
}