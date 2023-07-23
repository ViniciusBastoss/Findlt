import './App.css';
import SearchBar from './componentes/SearchBar';
import Pagination from './componentes/Pagination';
import React, { useState, useEffect } from 'react';

function Buscador() {
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [isLoading, setIsLoading] = useState(false); 
  const [exibirNadaEncontrado, setExibirNadaEncontrado] = useState(false);
  let isTermoBuscaVazio = termoBusca.trim() === '';
  const [exibirBotoesPaginacao, setExBotPag] = useState(pagina !== 0);
  const [termoBuscaAntigo, setTermoBuscaAntigo] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [responseTime, setResponseTime] = useState(null);
  const [modoNoturno, setModoNoturno] = useState('normal');
  const [ordenacao, setOrdenacao] = useState(0);

  const alternarModo = () => {
    setModoNoturno(modoNoturno === 'normal' ? 'noturno' : 'normal');
  }

  useEffect(() => {
    document.body.setAttribute('data-style', modoNoturno);
  }, [modoNoturno]);

  const handleChange = (event) => {
    setTermoBusca(event.target.value);
    isTermoBuscaVazio = termoBusca.trim() === '';
  }

  const setPaginaButton = (page) => {
    setPagina(page);
  }

  const handleSubmit = async (event) => {
    const startTime = Date.now();
    event.preventDefault();
    setIsLoading(true); 
    setTermoBuscaAntigo(termoBusca);

    try {
      const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=1&numResults=true&ordinationDate=${ordenacao}`);
      const data = await response.json();
      setResultados(data.results);
      setTotalPaginas(Math.ceil(data.numResults / 10.0));
      setTotalResults(data.numResults)
      setPagina(1);
      const endTime = Date.now();
      setResponseTime((endTime - startTime) / 1000);
      if (data.results.length === 0) {
        setExibirNadaEncontrado(true);
      }

    } catch (error) {
      console.error('Erro ao realizar a busca:', error);
    }

    setIsLoading(false); 
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchResultados = async () => {
      setIsLoading(true); 
      scrollToTop();
      try {
        let response;
        if (termoBuscaAntigo !== termoBusca)
          response = await fetch(
            `http://localhost:8080/v1/search?query=${termoBuscaAntigo}&page=${pagina}&numResults=false&ordinationDate=${ordenacao}`
          );
        else
          response = await fetch(
            `http://localhost:8080/v1/search?query=${termoBusca}&page=${pagina}&numResults=false&ordinationDate=${ordenacao}`
          );
        const data = await response.json();
        setResultados(data.results);
        if (data.results.length === 0) {
          setExibirNadaEncontrado(true);
        }
      } catch (error) {
        console.error('Erro ao realizar a busca:', error);
      }
      setIsLoading(false);
    };

    fetchResultados();
  }, [pagina, ordenacao]);

  

  const handleClickMaisRecentes = () => {
    setOrdenacao(2)
  };

  const handleClickMaisAntigos = () => {
    setOrdenacao(1)
  };

  return (
    <div>
      <div className="nightButton">
        <input type="checkbox" className="nightButton-checkbox" id="toggle" onClick={alternarModo} />
        <label htmlFor="toggle" className="nightButton-label"></label>
      </div>
      <SearchBar 
        termoBusca={termoBusca} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        setExBotPag={setExBotPag} 
        modoExibicao={modoNoturno}/>
      <div className="filtros">
        <button onClick={handleClickMaisRecentes}>Mais recentes</button>
        <button onClick={handleClickMaisAntigos}>Mais antigos</button>
      </div>
      {!isLoading && (
        <>
          {resultados && totalPaginas !== 0 && (
            <div className={modoNoturno === 'noturno' ? 'NumeroResultados-noturno' : 'NumeroResultados'}>
              <p> {totalResults} resultados ({responseTime} segundos)</p>
            </div>
          )}
          <div className={`results`}>
            <ul>
              {resultados && resultados.map((resultado) => (
                <li key={resultado.key} className={modoNoturno === 'noturno' ? 'noturno' : 'normal'}>
                  <a href={resultado.url}><h3>{resultado.title}</h3></a>
                  <p dangerouslySetInnerHTML={{ __html: resultado.abs }}></p>
                  
            
                  <div className='date'><p>Published in: {resultado.date}</p></div>
                </li>
              ))}
            </ul>
          </div>
  
          {exibirNadaEncontrado && exibirBotoesPaginacao && totalPaginas === 0 && (
            <div className={modoNoturno === 'noturno' ? 'nada_encontrado-noturno' : 'nada_encontrado'}><h1>Nenhum resultado encontrado</h1></div>
        )}
  
            <Pagination
              totalPages={totalPaginas}
              atualPage={pagina}
              setPagina={setPaginaButton}
              exibirBotoesPaginacao={exibirBotoesPaginacao && !totalPaginas < 1}
              modoExibicao={modoNoturno}
            />

        </>
      )}
    </div>
  );
  
}

export default Buscador;
