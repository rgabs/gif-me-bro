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

const useScroll = () => {
    const [isBottom, setIsBottom] = useState(false);
    useEffect(() => {
        window.onscroll = function () {
            var d = document.documentElement;
            var offset = d.scrollTop + window.innerHeight;
            var height = d.offsetHeight;
            setIsBottom(offset === height)
        };

        return () => window.onscroll = null;
    }, [isBottom]);

    return isBottom;
}
sessionStorage.clear();
const useGifs = (input) => {
    const [gifs, setGifs] = useState([]);
    const [loadState, setLoadState] = useState(false);
    const isBottom = useScroll();

    const searchText = useDebounce(input, 500)
    const API_KEY = 'kVHHyZckoyzVBz92p2sdzGIOE50ewYm4';

    useEffect(() => {
        if (!searchText) return setGifs([]);
        if (isCachePresent(searchText) && !isBottom) {
            return setGifs(getCachedGifsForInput(searchText));
        }
        setLoadState(true);
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchText}&limit=5&offset=${gifs.length}`)
            .then(res => res.json())
            .then(processGifs)
            .then(newGifs => {
                const updatedGifs = [...gifs, ...newGifs];
                setGifs(updatedGifs);
                return updatedGifs;
            })
            .then(gifs => updateCache(searchText, gifs))
            .finally(() => setLoadState(false));
    }, [searchText, isBottom]);

    return { gifs, loadState };
}

export default useGifs