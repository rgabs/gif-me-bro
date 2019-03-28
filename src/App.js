import React, { useState, useEffect } from 'react';

const useGifs = (searchText) => {
  const [gifs, setGifs] = useState([]);
  const API_KEY = 'kVHHyZckoyzVBz92p2sdzGIOE50ewYm4';

  useEffect(() => {
    if (!searchText) return;
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchText}`)
      .then(res => res.json())
      .then(res => setGifs(res.data));
  }, [searchText]);

  return gifs;
}


const Grid = ({ searchText}) => {

  const gifs = useGifs(searchText);
  
  const renderGif = ({ id, url, images, title}) => (
    <div key={id}>
      <img src={images.downsized_medium.url} alt={title}></img>
      <br></br>
    </div>
  );


  return <div>
    {gifs.length > 0 ? gifs.map(renderGif) : 'NO GIFS'}
  </div>;
}



const App = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="App">
      <input value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
      <Grid searchText={searchText}/>
    </div>
  );
}

export default (App);
