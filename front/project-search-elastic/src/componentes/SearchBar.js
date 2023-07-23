import React, { useState } from 'react';
import '../styless/SearchBar.css';
import NameBuscador from './NameBuscador';

const SearchBar = ({ termoBusca, handleChange, handleSubmit, setExBotPag, modoExibicao}) => {
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
          <div className={modoExibicao === 'normal' ? 'search-bar' : 'search-bar-noturno'}>
            <input
              type="text"
              className={modoExibicao === 'normal' ? 'search-text' : 'search-text-noturno'}
              value={termoBusca}
              onChange={handleChange}
            />
            <a href="#">
              <button
                className={modoExibicao === 'normal' ? 'search-button' : 'search-button-noturno'}
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
