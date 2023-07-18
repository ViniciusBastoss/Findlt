import React from 'react';

const MAX_ITENS = 9;
const MAX_LEFT = (MAX_ITENS - 1) / 2;

const Pagination = ({totalPages, atualPage, setPagina}) => {
    const first = Math.max(atualPage - MAX_LEFT, 1);
    
    return (
    <ul className='pagination'>
        <li>
            <button
               onClick={() => setPagina(atualPage - 1)}
               disabled={atualPage === 1}
               >
                Anterior
               </button>
        </li>
       {Array.from({ length: Math.min(MAX_ITENS, MAX_LEFT + 1 + totalPages - atualPage)})
       .map((_, index) => index + first)
       .map((page)=> (
        <li key={page}>
            <button 
              onClick={() => setPagina(page)}
              className={page === atualPage ? 'pagination__item--active' : null}
            >
                {page}</button>
        </li>
       ))}  
       <li>
        <button
               onClick={() => setPagina(atualPage + 1)}
               disabled={atualPage >= totalPages}
               >
                Próxima
               </button>
        </li>
    </ul>
    )
};

export default Pagination;