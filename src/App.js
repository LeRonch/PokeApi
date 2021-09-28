import React, { useState, useEffect } from 'react';

import Card from './components/Card';
import { getPokemon, getAllPokemon } from './services/poke';
import './App.css';
import NavBar from './components/Navbar';


function App() {

  const [pokeData, setPokeData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon?limit=30";
  const searchUrl = "https://pokeapi.co/api/v2/pokemon/ditto";

  useEffect(() => {

    async function fetchData() {

      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);

    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }


  const loadingPokemon = async (data) => {

    let _pokeData = await Promise.all(data.map(async pokemon => {
      let pokeRecord = await getPokemon(pokemon.url);
      return pokeRecord;
    }))

    setPokeData(_pokeData);
    
  };


  return( 

    <div>
    {loading ? <h1></h1> : (

      <>
        <NavBar />
        
        <div className='btn'>
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>
        </div>

        <div className="grid-container">
          {pokeData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon}/>;
          })}
        </div>

        <div className='btn'>
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>
        </div>
      </>

      )
    }
    </div>

  );

}

export default App;
