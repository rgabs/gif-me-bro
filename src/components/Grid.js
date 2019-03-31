import React, { useState, useEffect, useRef } from 'react';
import useGifs from '../utils/hooks';
import Gif from './Gif';

const Grid = ({ searchText }) => {
    const [itemsPerRow, setItemsPerRow] = useState(1);
    const { gifs, loadState } = useGifs(searchText);

    if (!searchText) {
        return <p>Hello! I am GIF-me-bro. I will gif you for all kind of inputs. <br />Happy Gifing ;)</p>
    }

    else if (gifs.length === 0) {
        return <p>NO GIFS</p>;
    }

    return <div>
        <select onChange={e => setItemsPerRow(e.target.value)}>
            {[1, 2, 3, 4].map(noOfItems => <option key={noOfItems} value={noOfItems}>{noOfItems}</option>)}
        </select>
        <div>
            {gifs.map(({ id, ...imageProps }) => (
                <Gif key={id} {...imageProps} width={680 / itemsPerRow} />
            ))}
        </div>
        {loadState && <p>Loading...</p>}
    </div>;
}

export default Grid;