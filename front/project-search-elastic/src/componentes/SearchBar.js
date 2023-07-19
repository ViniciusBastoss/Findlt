import React, { useState } from 'react';
import '../styless/SearchBar.css';
import NameBuscador from './NameBuscador';

const SearchBar = ({ termoBusca,setBotaoPesquisaAtivado, handleChange, handleSubmit, setExBotPag}) => {
  const [AlterarEstilo, setAlterarEstilo] = useState(false);
  const [isEstiloA, setIsEstiloA] = useState(true);
  

  const alternarEstilo = () => {
    setBotaoPesquisaAtivado(true);
    if (!AlterarEstilo && !(termoBusca.trim() === '')) {
      setIsEstiloA(!isEstiloA);
      setAlterarEstilo(true);
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
