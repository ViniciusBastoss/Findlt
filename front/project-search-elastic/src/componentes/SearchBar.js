import React, { useState } from 'react';
import '../styless/SearchBar.css';
import NameBuscador from './NameBuscador';

const SearchBar = ({ termoBusca, handleChange, handleSubmit, setExBotPag}) => {
  const [botaoPressionado, setBotaoPressionado] = useState(false);
  const [isEstiloA, setIsEstiloA] = useState(true);
  

  const alternarEstilo = () => {
    if (!botaoPressionado && !(termoBusca.trim() === '')) {
      setIsEstiloA(!isEstiloA);
      setBotaoPressionado(true);
      setExBotPag(true);
    }
    else
      if(!(termoBusca.trim() === ''))
        setExBotPag(true);
      else
         setExBotPag(false);
  };

  return (
    <div>
      <NameBuscador isEstiloA = {isEstiloA}/>
    <div className={isEstiloA ? 'search' : 'search2'}>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input type="text" className='search-text' value={termoBusca} onChange={handleChange} />
          <a href="#">
            <button className="search-button" type="submit" onClick={alternarEstilo}>
              <img src="./imgs/lupa.svg" alt="Lupa" height="20" width="20" />
            </button>
          </a>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SearchBar;
