import '../styless/NameBuscadorStyless.css';
function NameBuscador({isEstiloA}){
    return(
        <div>
            <a className={isEstiloA ? 'titulo' : 'titulo2'} href="http://localhost:3000/"><h1>FindIt</h1></a>
        </div>
    )
}
export default NameBuscador