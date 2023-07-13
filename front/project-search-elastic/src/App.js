import './App.css';
import NameBuscador from './componentes/NameBuscador';
import React, { useState, useEffect } from 'react';

function Buscador() {
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [proximaPaginaDisponivel, setProximaPaginaDisponivel] = useState(true);

  const handleChange = (event) => {
    setTermoBusca(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPagina(1); // Reinicia a página para 1 ao fazer uma nova busca

    try {
      const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=${pagina}`);
      const data = await response.json();
      const resultadosFormatados = formatarResultados(data);
      setResultados(resultadosFormatados);

      // Verifica se a próxima página está disponível
      setProximaPaginaDisponivel(data.length > 0);
    } catch (error) {
      console.error('Erro ao realizar a busca:', error);
    }
  };

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/search?query=${termoBusca}&page=${pagina}`);
        const data = await response.json();
        const resultadosFormatados = formatarResultados(data);
        setResultados(resultadosFormatados);

        // Verifica se a próxima página está disponível
        setProximaPaginaDisponivel(data.length > 0);
      } catch (error) {
        console.error('Erro ao realizar a busca:', error);
      }
    };

    fetchResultados();
  }, [pagina]);

  const formatarResultados = (data) => {
    return data.map((resultado, index) => {
      const { title, url, abs } = resultado;
      const absFormatado = abs.replace(/<em>/g, '').replace(/<\/em>/g, '');
      return { title, url, abs: absFormatado, key: index };
    });
  };

  const handlePaginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
      setProximaPaginaDisponivel(true); // Habilita novamente o botão "Próxima Página"
    }
  };

  const handleProximaPagina = () => {
    if (proximaPaginaDisponivel) {
      setPagina(pagina + 1);
    }
  };

  return (
    <div>
      <NameBuscador/>
      <form onSubmit={handleSubmit}>
        <input type="text" value={termoBusca} onChange={handleChange} />
        <button type="submit">Buscar</button>
      </form>

      <ul>
        {resultados.map((resultado) => (
          <li key={resultado.key}>
            <h3>{resultado.title}</h3>
            <a href={resultado.url}>{resultado.url}</a>
            <p>{resultado.abs}</p>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handlePaginaAnterior} disabled={pagina === 1}>Página Anterior</button>
        <button onClick={handleProximaPagina} disabled={!proximaPaginaDisponivel}>Próxima Página</button>
      </div>
    </div>
  );
}

export default Buscador;
