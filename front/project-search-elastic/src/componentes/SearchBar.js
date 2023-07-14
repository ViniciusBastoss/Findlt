import React from 'react';
import '../styless/SearchBar.css';
import NameBuscador from './NameBuscador';

const SearchBar = ({ termoBusca, handleChange, handleSubmit }) => {
  return (
    <div className='search'>
      <NameBuscador/>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input type="text" className='search-text' value={termoBusca} onChange={handleChange} />
            <a href="#">
            <button className="search-button" type="submit"><img src="./imgs/lupa.svg" alt="Lupa" height="20" width="20"/></button>
            </a>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
