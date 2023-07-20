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
  let isTermoBuscaVazio = termoBusca.trim() === '';
  const [exibirBotoesPaginacao, setExBotPag] = useState(pagina !== 0);
  const [termoBuscaAntigo, setTermoBuscaAntigo] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  const handleChange = (event) => {
      setTermoBusca(event.target.value);
      isTermoBuscaVazio = termoBusca.trim() === ''
  }


  const setPaginaButton = (page) =>{
    setPagina(page);
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPagina(1);
    setIsLoading(true); // Inicia o carregamento
    setTermoBuscaAntigo(termoBusca);

    try {
      const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=1&numResults=true`);
      const data = await response.json();
      setResultados(data.results);
      setTotalPaginas(Math.ceil(data.numResults/10.0));
      setTotalResults(data.numResults)
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
        let response;
        if(termoBuscaAntigo != termoBusca)
        response = await fetch(`http://localhost:8080/v1/search?query=${termoBuscaAntigo}&page=${pagina}`);
        else
        response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=${pagina}`);
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

  return (
    <div>
      <SearchBar termoBusca={termoBusca} handleChange={handleChange} handleSubmit={handleSubmit} setExBotPag={setExBotPag} />
  
      {!isLoading  && (
        <>
        {resultados  && totalPaginas != 0 &&(<div className='NumeroResultados'>Foram encontrados {totalResults} resultados </div>)}
         <div className={`results`}>
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
            <div className='nada_encontrado'><h1>Nenhum resultado encontrado</h1></div>
        )}
  
            <Pagination
              totalPages={totalPaginas}
              atualPage={pagina}
              setPagina={setPaginaButton}
              exibirBotoesPaginacao={exibirBotoesPaginacao && !totalPaginas < 1}
            />

        </>
      )}
    </div>
  );
  
}

export default Buscador;
