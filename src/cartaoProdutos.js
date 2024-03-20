import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo} from "./utilidades";

export function renderizarCatalogo() {

    for (const produtoCatalogo of catalogo) {
        const cartaoProduto =  `<div class="card ${produtoCatalogo.marca}" style="width: 16rem; box-shadow: 3px 3px black,.5em 0 1em; margin: 20px">
            <img src="./Img/${produtoCatalogo.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4 class="card-title text-center">${produtoCatalogo.nome}</h4>
            <p class="card-text text-center">${produtoCatalogo.marca}</p>
            <p class="card-text text-center">R$ ${produtoCatalogo.preco}</p>
            <button id='adicionar-${produtoCatalogo.id}' class='rounded  p-2 w-50 btnStyle'><i class="bi bi-bag-plus-fill"></i></button>
         </div>`
        
        document.getElementById("container-produto").innerHTML += cartaoProduto;
    }

    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    }

}