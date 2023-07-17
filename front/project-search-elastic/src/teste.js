import './App.css';
import SearchBar from './componentes/SearchBar';
import React, { useState, useEffect } from 'react';

function Buscador() {
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [proximaPaginaDisponivel, setProximaPaginaDisponivel] = useState(true);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const handleChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPagina(1); // Reinicia a página para 1 ao fazer uma nova busca
    setResultados([]); // Limpa os resultados anteriores

    try {
      let hasMorePages = true;
      let totalPages = 0;
      while (hasMorePages) {
        const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=${pagina}`);
        const data = await response.json();
        totalPages++;
        if (data.length > 0) {
          setResultados((prevResultados) => [...prevResultados, data]);
          setPagina((prevPagina) => prevPagina + 1);
        } else {
          hasMorePages = false;
        }
      }
      setTotalPaginas(totalPages);
    } catch (error) {
      console.error('Erro ao realizar a busca:', error);
    }
  };

  useEffect(() => {
    // Não é necessário fazer nada aqui, pois as páginas são obtidas no handleSubmit
  }, []);

  const formatarResultados = (data) => {
    return data.map((resultado, index) => {
      const { title, url, abs } = resultado;
      const absFormatado = abs.replace(/<em>/g, '<em>').replace(/<\/em>/g, '</em>');
      return { title, url, abs: absFormatado, key: index };
    });
  };

  const handlePaginaAnterior = () => {
    if (pagina > 1) {
      setPagina((prevPagina) => prevPagina - 1);
    }
  };

  const handleProximaPagina = () => {
    if (proximaPaginaDisponivel) {
      setPagina((prevPagina) => prevPagina + 1);
    }
  };

  const isTermoBuscaVazio = termoBusca.trim() === '';
  const exibirBotoesPaginacao = pagina > 1 || proximaPaginaDisponivel;

  return (
    <div>
      <SearchBar termoBusca={termoBusca} handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className='results'>
        <ul>
          {resultados.map((listaResultados) => (
            <React.Fragment key={listaResultados[0].page}>
              {formatarResultados(listaResultados).map((resultado) => (
                <li key={resultado.key}>
                  <h3>{resultado.title}</h3>
                  <a href={resultado.url}>{resultado.url}</a>
                  <p dangerouslySetInnerHTML={{ __html: resultado.abs }}></p>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {!exibirBotoesPaginacao && <h2>teste</h2>}

      {exibirBotoesPaginacao && (
        <div>
          <button onClick={handlePaginaAnterior} disabled={pagina === 1}>
            Página Anterior
          </button>
          <button onClick={handleProximaPagina} disabled={!proximaPaginaDisponivel}>
            Próxima Página
          </button>
        </div>
      )}
    </div>
  );
}

export default Buscador;
