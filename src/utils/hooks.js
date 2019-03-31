import { useState, useEffect } from 'react';
import {isCachePresent, getCachedGifsForInput, processGifs, updateCache} from './cache';

const fetchGifs = (searchText, offset, limit = 5) => {
    const API_KEY = 'kVHHyZckoyzVBz92p2sdzGIOE50ewYm4';
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchText}&limit=${limit}&offset=${offset}`)
        .then(res => res.json())
        .then(processGifs)
}

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

const useScroll = (offset = 500) => {
    const [isBottom, setIsBottom] = useState(false);
    useEffect(() => {
        window.onscroll = function () {
            var d = document.documentElement;
            var scrolled = d.scrollTop + window.innerHeight;
            var height = d.offsetHeight;    
            setIsBottom(height - scrolled < offset);
        };

        return () => window.onscroll = null;
    }, [isBottom]);

    return isBottom;
};

sessionStorage.clear();

const useGifs = (input) => {
    const [gifs, setGifs] = useState([]);
    const [loadState, setLoadState] = useState(false);
    const [totalResults, setTotalResults] = useState();

    const isBottom = useScroll(500);
    const searchText = useDebounce(input, 500);

    useEffect(() => {
        if(!isBottom) return;
        if (totalResults === gifs.length) return;
        console.log('calling api');
        setLoadState(true);
        fetchGifs(searchText, gifs.length)
            .then(({ newGifs, total }) => {
                const updatedGifs = [...gifs, ...newGifs];
                setGifs(updatedGifs);
                return updatedGifs;
            })
            .then(gifs => updateCache(searchText, gifs))
            .finally(() => setLoadState(false));
    }, [isBottom]);

    useEffect(() => {
        if (!searchText) return setGifs([]);
        if (isCachePresent(searchText)) {
            return setGifs(getCachedGifsForInput(searchText));
        }
        setLoadState(true);
        setGifs([]);
        fetchGifs(searchText, gifs.length)
            .then(({ newGifs, total }) => {
                setGifs(newGifs);
                setTotalResults(total);
                return newGifs;
            })
            .then(gifs => updateCache(searchText, gifs))
            .finally(() => setLoadState(false));
    }, [searchText]);

    return { gifs, loadState };
}

export default useGifs