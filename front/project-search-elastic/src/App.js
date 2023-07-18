import './App.css';
import SearchBar from './componentes/SearchBar';
import Pagination from './componentes/Pagination';
import React, { useState, useEffect } from 'react';

function Buscador() {
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [pagina, setPagina] = useState(-1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const handleChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPagina(1); // Reinicia a página para 1 ao fazer uma nova busca
    try {
      const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=${pagina}&includePages=true`);
      const data = await response.json();
      setResultados(data.results);
      setTotalPaginas(data.pages)
      // Verifica se a próxima página está disponível
    } catch (error) {
      console.error('Erro ao realizar a busca:', error);
    }
  };

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=${pagina}`);
        const data = await response.json();
        setResultados(data.results);
        // Verifica se a próxima página está disponível
      } catch (error) {
        console.error('Erro ao realizar a busca:', error);
      }
    };

    fetchResultados();
  }, [pagina]);

  const isTermoBuscaVazio = termoBusca.trim() === '';
  const [exibirBotoesPaginacao, setExBotPag] = useState(pagina !== -1);

  const updateExBotPag = (newValue)=>{
    setExBotPag(newValue);
  };

  return (
    <div>
      <SearchBar termoBusca={termoBusca} handleChange={handleChange} handleSubmit={handleSubmit} setExBotPag = {setExBotPag}/>
      <div className='results'>
         <ul>
          {resultados && resultados.map((resultado) => (
           <li key={resultado.key}>
             <a href={resultado.url}><h3>{resultado.title}</h3></a>
             <p dangerouslySetInnerHTML={{ __html: resultado.abs }}></p>
           </li>
            ))}
        </ul>
      </div>

      {exibirBotoesPaginacao && totalPaginas === 0 &&(
        <h1>Nada encontrado</h1>
      )}
      <Pagination totalPages={totalPaginas} atualPage={pagina} setPagina={setPagina}/>
    </div>
  );
}

export default Buscador;
