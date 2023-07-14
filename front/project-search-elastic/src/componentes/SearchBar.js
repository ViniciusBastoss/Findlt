import React from 'react';
import '../styless/SearchBar.css';

const SearchBar = ({ termoBusca, handleChange, handleSubmit }) => {
  return (
    <div className='search'>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input type="text" value={termoBusca} onChange={handleChange} />
          <i className="search-icon">&#128269;</i>
        </div>
        <button className="search-button" type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;
