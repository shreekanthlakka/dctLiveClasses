import { useEffect, useState } from "react";

const useLocalStorageState = (initialState, key) => {
    const [value, setValue] = useState(() => {
        const localData = localStorage.getItem(key);
        return localData ? JSON.parse(localData) : initialState;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

export { useLocalStorageState };
