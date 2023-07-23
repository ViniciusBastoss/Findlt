import React from 'react';

const MAX_ITENS = 9;
const MAX_LEFT = (MAX_ITENS - 1) / 2;

const Pagination = ({ totalPages, atualPage, setPagina, exibirBotoesPaginacao, modoExibicao}) => {
  const first = Math.max(atualPage - MAX_LEFT, 1);
  const last = Math.min(totalPages, first + MAX_ITENS - 1);

  return (
    <ul className='pagination'>
      {exibirBotoesPaginacao && (
        <li>
          <button 
            onClick={() => setPagina(atualPage - 1)}
            disabled={atualPage <= 1} className={modoExibicao === 'normal' ? 'pagination_ProxAnt' : 'pagination_ProxAnt-noturno'}
          >
            Anterior
          </button>
        </li>
      )}
      {Array.from({ length: last - first + 1 })
        .map((_, index) => index + first)
        .map((page) => (
          <li key={page}>
            <button
              onClick={() => setPagina(page)}
              className={page === atualPage ? 'pagination__item--active' : 'pagination_button'}
            >
              {page}
            </button>
          </li>
        ))}
      {exibirBotoesPaginacao && (
        <li>
          <button
            onClick={() => setPagina(atualPage + 1)}
            disabled={atualPage >= totalPages} className={modoExibicao === 'normal' ? 'pagination_ProxAnt' : 'pagination_ProxAnt-noturno'}
          >
            Próxima
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
