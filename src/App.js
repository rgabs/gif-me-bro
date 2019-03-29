import React, { useState, useEffect } from 'react';
import useGifs from './utils/hooks';
import { storeCacheToLocalStorage, setCacheFromLocalStorage} from './utils/cache';

const Grid = ({ searchText}) => {
  const {gifs, loadState} = useGifs(searchText);
  
  const renderGif = ({ id, url, title}) => (
    <div key={id}>
      <img src={url} alt={title}></img>
      <br></br>
    </div>
  );

  if (!searchText) {
    return <p>Hello! I am GIF-me-bro. I will gif you for all kind of inputs. <br/>Happy Gifing ;)</p>
  }

  else if (gifs.length === 0) {
    return <p>NO GIFS</p>;
  }

  return <div>
    {gifs.map(renderGif)}
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
