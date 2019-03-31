import React, { useState, useEffect } from 'react';
import useGifs from './utils/hooks';
import { storeCacheToLocalStorage, setCacheFromLocalStorage} from './utils/cache';

const Gif = ({ url, title, aspectRatio, width }) => {
  const style = {
    width, 
    height: width / aspectRatio,
    backgroundColor: 'black',
    marginBottom: '20px'
  }
  return (
    <div style={style} className="image-container">
      <img src={url} alt={title} width="100%" />
      <br/>
    </div>
  )
}

const Grid = ({ searchText}) => {
  const [itemsPerRow, setItemsPerRow] = useState(1);
  const {gifs, loadState} = useGifs(searchText);

  if (!searchText) {
    return <p>Hello! I am GIF-me-bro. I will gif you for all kind of inputs. <br/>Happy Gifing ;)</p>
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

const App = () => {
  const [searchText, setSearchText] = useState('');
  
  useEffect(() => {
    setCacheFromLocalStorage();
    window.addEventListener("beforeunload", storeCacheToLocalStorage);
    return () => window.removeEventListener("beforeunload", storeCacheToLocalStorage);
  },[]);

  return (
    <div className="App">
      <input value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
      <Grid searchText={searchText}/>
    </div>
  );
}

export default (App);
