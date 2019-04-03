import React, { useState, useEffect, useRef } from 'react';
import useGifs from '../utils/hooks';
import Gif from './Gif';
import createGrid from '../utils/grid';

const Grid = ({ searchText }) => {
    const [itemsPerRow, setItemsPerRow] = useState(2);
    const [containerWidth, setContainerWidth] = useState(0);
    const { gifs, loadState } = useGifs(searchText);
    const gifContainerRef = useRef(null);

    const gridOptions = [2, 3, 4, 5];
    const cellSpacing = 10;
    const processedGifs = createGrid(gifs, itemsPerRow, cellSpacing);

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

    return <div className="grid-wrapper">
        <div className="column-size-container">
            <span>Items per row:</span>
            <select onChange={e => setItemsPerRow(e.target.value)} value={itemsPerRow} className="column-size-select">
                {gridOptions.map(noOfItems => <option key={noOfItems} value={noOfItems}>{noOfItems}</option>)}
            </select>
        </div>
        
        <div ref={gifContainerRef} className="grid">
            {
                processedGifs.map((columnData, i) => {
                    return (
                        <div key={i} style={{ padding: cellSpacing + 'px'}}>
                            {columnData.map(({ id, ...imageProps },) => (
                                <Gif key={id} {...imageProps} width={(containerWidth / itemsPerRow) - 2 * cellSpacing} />
                            ))}
                        </div>
                    )
                })
            }
        </div>
        {loadState ? <p align="center">Loading...</p> : null}
    </div>;
}

export default Grid;