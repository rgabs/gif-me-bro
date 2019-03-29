let localCache = {};

export const isCachePresent = (key) => localCache.searchStringsMap && localCache.searchStringsMap.hasOwnProperty(key);

export const updateCache = (input, newGifs) => {
    localCache.allGifs = { // contains all gifs data in format:: {[gifID]: {<gif url>}}
        ...localCache.allGifs,
        ...newGifs.reduce((acc, curr) => acc[curr.id] ? acc : { ...acc, [curr.id]: curr }, {})
    };
    localCache.searchStringsMap = { // contains which search string corresponds to which repo ids
        ...localCache.searchStringsMap,
        [input.toLowerCase()]: newGifs.map((repo) => repo.id)
    };
    return newGifs;
}

export const getCachedGifsForInput = (input) => {
    return localCache
            .searchStringsMap[input.toLowerCase()]
            .map((repoID) => localCache.allGifs[repoID]);
};

export const storeCacheToLocalStorage = () => {
    localStorage.setItem('cache', JSON.stringify(localCache));
}

export const setCacheFromLocalStorage = () => {
    try {
        const storedCache = JSON.parse(localStorage.getItem('cache'));
        // TODO: store cache to local
    }
    catch(e) {
        // Cache doesn't exist;
    }    
}

export const processGifs = (gifs) => {
    return gifs.data.map(({ id, images, title}) => ({
        id,
        title,
        url: images.downsized_medium.url
    }));
}