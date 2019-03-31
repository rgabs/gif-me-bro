import React, { useState, useEffect, useRef } from 'react';
import useGifs from '../utils/hooks';
import Gif from './Gif';

const Grid = ({ searchText }) => {
    const [itemsPerRow, setItemsPerRow] = useState(1);
    const { gifs, loadState } = useGifs(searchText);
    const gridOptions = [1, 2, 3, 4];

    if (gifs.length === 0 && !loadState) {
        return <p>NO GIFS</p>;
    }

    return <div>
        <select onChange={e => setItemsPerRow(e.target.value)}>
            {gridOptions.map(noOfItems => <option key={noOfItems} value={noOfItems}>{noOfItems}</option>)}
        </select>
        <div>
            {gifs.map(({ id, ...imageProps }) => (
                <Gif key={id} {...imageProps} width={680 / itemsPerRow} />
            ))}
        </div>
        {loadState ? <p>Loading...</p> : null}
    </div>;
}

export default Grid;