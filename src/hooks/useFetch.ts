import { useEffect, useReducer } from "react";

type State<T> = {
    loading: boolean;
    data: T | null;
    error: string | null;
};

type Action<T> = 
| {type: 'LOADING'}
| {type: 'SUCCESS'; payload: T}
| {type: 'ERROR'; payload: string};

function reduce<T>(state: State<T>, action: Action<T>): State<T> {
    switch(action.type){
        case "LOADING":
            return {loading: true, data: null, error: null}
        case "ERROR":
            return {loading: false, data: null, error: action.payload}
        case "SUCCESS":
            return {loading: false, data: action.payload, error: null}
    }

    return state;
}

export function useFetch<T>(fetchFn: () => Promise<T>){
    const [state, dispatch] = useReducer(reduce<T>, {
        loading: true,
        data: null,
        error: null
    })

    useEffect(() => {
        dispatch({type: 'LOADING'})
        fetchFn()
            .then(data => dispatch({type: 'SUCCESS', payload: data}))
            .catch(() => dispatch({type: 'ERROR', payload: "Не удалось связаться с сервером, проверьте VPN"}))
    }, []);

    return state;

}