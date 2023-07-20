import React, { useState } from 'react';
import '../styless/SearchBar.css';
import NameBuscador from './NameBuscador';

const SearchBar = ({ termoBusca, handleChange, handleSubmit, setExBotPag }) => {
  const [isEstiloA, setIsEstiloA] = useState(true);
  const[estiloTrocado, setEstiloTrocado] = useState(false);
  const alternarEstilo = () => {
    if(!estiloTrocado && termoBusca.trim != '')
     setIsEstiloA(!isEstiloA);
     setEstiloTrocado(true);
    setExBotPag(true);
  };

  return (
    <div>
      <NameBuscador isEstiloA = {isEstiloA}/>
      <div className={isEstiloA ? 'search' : 'search2'}>
        <form onSubmit={handleSubmit}>
          <div className="search-bar">
            <input
              type="text"
              className="search-text"
              value={termoBusca}
              onChange={handleChange}
            />
            <a href="#">
              <button
                className="search-button"
                type="submit"
                onClick={alternarEstilo}
                disabled={termoBusca.trim() === ''}
              >
                <img className="lupa" src="./imgs/lupa.svg" alt="Lupa" />
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};


export default SearchBar;
