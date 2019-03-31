import React, { useState, useEffect} from 'react';
import { storeCacheToLocalStorage, setCacheFromLocalStorage} from './utils/cache';
import Grid from './components/Grid';

const App = () => {
  const [searchText, setSearchText] = useState('');
  
  useEffect(() => {
    setCacheFromLocalStorage();
    window.addEventListener("beforeunload", storeCacheToLocalStorage);
    return () => window.removeEventListener("beforeunload", storeCacheToLocalStorage);
  },[]);

  return (
    <div className="App">
      <h3 align="center">Hello! I am GIF-me-bro. I will gif you for all kind of inputs. <br />Happy Gifing ;)</h3>
       <input className="search-input" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
      <Grid searchText={searchText}/>
    </div>
  );
}

export default (App);
