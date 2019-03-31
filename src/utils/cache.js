let localCache = {};

export const isCachePresent = (key) => localCache.searchStringsMap && localCache.searchStringsMap.hasOwnProperty(key);

export const updateCache = (input, newGifs) => {
    /*
        # Cache Structure
        {
            allGifs: {
                3ofT5GIjZ04Y4OoDDi: {
                    id: "3ofT5GIjZ04Y4OoDDi",
                    title: "...",
                    url: "https://media0.giphy.com/media/3ofT5GIjZ04Y4OoDDi/giphy.gif"
                }
            },
            searchStringsMap: {
                rahul: ["Bp3hlZ1B4Rny8NKhqZ", "3ofT5GIjZ04Y4OoDDi"]
            }
        }
     */
    localCache.allGifs = { // contains all gifs data in format:: {[gifID]: {<gif url>}}
        ...localCache.allGifs,
        ...newGifs.reduce((acc, curr) => acc[curr.id] ? acc : { ...acc, [curr.id]: curr }, {})
    };
    localCache.searchStringsMap = { // contains which search string corresponds to which gif ids
        ...localCache.searchStringsMap,
        [input.toLowerCase()]: newGifs.map((repo) => repo.id)
    };
}

export const getCachedGifsForInput = (input) => {
    return localCache
            .searchStringsMap[input.toLowerCase()]
            .map((repoID) => localCache.allGifs[repoID]);
};

export const storeCacheToLocalStorage = () => {
    sessionStorage.setItem('cache', JSON.stringify(localCache));
}

export const setCacheFromLocalStorage = () => {
    try {
        const storedCache = JSON.parse(sessionStorage.getItem('cache'));
        if (typeof storedCache === 'object' && storedCache !== null) {
            localCache = storedCache;
        }
    }
    catch(e) {
        // Cache doesn't exist;
    }    
}

export const processGifs = (gifs) => {
    const newGifs = gifs.data.map(({ id, images, title}) => ({
        id,
        title,
        gifUrl: images.downsized_medium.url,
        stillUrl: images['480w_still'].url,
        aspectRatio: images.downsized_medium.width / images.downsized_medium.height
    }));

    return {newGifs, total: gifs.pagination.total_count}
}