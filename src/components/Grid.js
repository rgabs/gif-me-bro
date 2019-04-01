import React, { useState, useEffect, useRef } from 'react';
import useGifs from '../utils/hooks';
import Gif from './Gif';

const Grid = ({ searchText }) => {
    const [itemsPerRow, setItemsPerRow] = useState(1);
    const [containerWidth, setContainerWidth] = useState(0);
    const { gifs, loadState } = useGifs(searchText);
    const gifContainerRef = useRef(null);

    const gridOptions = [1, 2, 3, 4];

    useEffect(() => {
        if (!gifContainerRef.current) return;
        const handleResize = () => {
            setContainerWidth(gifContainerRef.current.offsetWidth);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [gifs]);

    if (gifs.length === 0 && !loadState) {
        return <p>NO GIFS</p>;
    }

    return <div style={{width: '100%'}}>
        <select onChange={e => setItemsPerRow(e.target.value)}>
            {gridOptions.map(noOfItems => <option key={noOfItems} value={noOfItems}>{noOfItems}</option>)}
        </select>
        <div ref={gifContainerRef}>
            {gifs.map(({ id, ...imageProps }) => (
                <Gif key={id} {...imageProps} width={containerWidth / itemsPerRow} />
            ))}
        </div>
        {loadState ? <p>Loading...</p> : null}
    </div>;
}

export default Grid;