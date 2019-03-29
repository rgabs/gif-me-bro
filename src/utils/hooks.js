import { useState, useEffect } from 'react';
import {isCachePresent, getCachedGifsForInput, processGifs, updateCache} from './cache';

const useDebounce = (input, delay) => {
    const [debouncedVal, setDebouncedVal] = useState(input);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedVal(input);
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [input]);
    return debouncedVal;
}

const useGifs = (input) => {
    const [gifs, setGifs] = useState([]);
    const [loadState, setLoadState] = useState(false);

    const searchText = useDebounce(input, 500)
    const API_KEY = 'kVHHyZckoyzVBz92p2sdzGIOE50ewYm4';

    useEffect(() => {
        if (!searchText) return;
        if (isCachePresent(searchText)) {
            return setGifs(getCachedGifsForInput(searchText));
        }
        setLoadState(true);
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchText}&limit=5`)
            .then(res => res.json())
            .then(processGifs)
            .then(gifs => updateCache(searchText, gifs))
            .then(setGifs)
            .finally(() => setLoadState(false));
    }, [searchText]);

    return { gifs, loadState };
}

export default useGifs