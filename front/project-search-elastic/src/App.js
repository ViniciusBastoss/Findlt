import './App.css';
import SearchBar from './componentes/SearchBar';
import Pagination from './componentes/Pagination';
import React, { useState, useEffect } from 'react';

function Buscador() {
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Variável de estado para controlar o estado de carregamento
  const[exibirNadaEncontrado, setExibirNadaEncontrado] = useState(false);

  const handleChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPagina(1);
    setIsLoading(true); // Inicia o carregamento

    try {
      const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=1&includePages=true`);
      const data = await response.json();
      setResultados(data.results);
      setTotalPaginas(data.pages);
      if (data.results.length === 0) {
        setExibirNadaEncontrado(true);
      }
    } catch (error) {
      console.error('Erro ao realizar a busca:', error);
    }

    setIsLoading(false); // Finaliza o carregamento
  };

  useEffect(() => {
    const fetchResultados = async () => {
      setIsLoading(true); // Inicia o carregamento

      try {
        const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=${pagina}`);
        const data = await response.json();
        setResultados(data.results);
        if (data.results.length === 0) {
          setExibirNadaEncontrado(true); // 
        }
      } catch (error) {
        console.error('Erro ao realizar a busca:', error);
      }

      setIsLoading(false); // Finaliza o carregamento
    };

    fetchResultados();
  }, [pagina]);

  const isTermoBuscaVazio = termoBusca.trim() === '';

  const [exibirBotoesPaginacao, setExBotPag] = useState(pagina !== 0);

  const updateExBotPag = (newValue)=>{
    setExBotPag(newValue);
  };

  return (
    <div>
      <SearchBar termoBusca={termoBusca} handleChange={handleChange} handleSubmit={handleSubmit} setExBotPag={setExBotPag} />
  
      {isLoading ? (
        <div className='loading'>
          <div className='spinner'></div>
        </div>
      ) : (
        <>
          <div className={`results ${isTermoBuscaVazio ? 'hidden' : ''}`}>
            <ul>
              {resultados && resultados.map((resultado) => (
                <li key={resultado.key}>
                  <a href={resultado.url}><h3>{resultado.title}</h3></a>
                  <p dangerouslySetInnerHTML={{ __html: resultado.abs }}></p>
                </li>
              ))}
            </ul>
          </div>
  
          {exibirNadaEncontrado && exibirBotoesPaginacao && totalPaginas === 0 && (
            <h1>Nada encontrado</h1>
          )}
  
          {!isLoading && ( // Renderiza os botões de paginação somente se não estiver em estado de carregamento
            <Pagination
              totalPages={totalPaginas}
              atualPage={pagina}
              setPagina={setPagina}
              exibirBotoesPaginacao={exibirBotoesPaginacao && !totalPaginas < 1}
            />
          )}
        </>
      )}
    </div>
  );
  
}

export default Buscador;
