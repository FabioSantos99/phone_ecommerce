import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutosCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho() {
  
    document.getElementById("carrinho").classList.add("cart-on");
    document.getElementById("carrinho").classList.remove("cart-off");
  }
  
  function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("cart-on");
    document.getElementById("carrinho").classList.add("cart-off");
  }

  function irParaCheckout() {
    if(Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
      return;
    }

    window.location.href = window.location.origin + '/checkout.html';
  }
  
  export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoIrparaCheckout = document.getElementById('finalizar-compra');

  
    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
    botaoIrparaCheckout.addEventListener("click", irParaCheckout);
  }


  // ------------- Remover produtos -----------


  function removerDoCarrinho(idProduto) {
    delete idsProdutosCarrinhoComQuantidade[idProduto];
    salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
  }

  // INCREMENTAR e DECREMENTAR QUANTIDADE DE PRODUTO


  function incrementarQuantidadeProduto(idProduto) {
    idsProdutosCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
  }  

  function decrementarQuantidadeProduto(idProduto) {
    if (idsProdutosCarrinhoComQuantidade[idProduto] === 1) {
      removerDoCarrinho(idProduto);
      return;
    }
    idsProdutosCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage("carrinho", idsProdutosCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
  }


  function atualizarInformacaoQuantidade(idProduto) {
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutosCarrinhoComQuantidade[idProduto];
  }

 //--------------------------------------------------

 function desenharProdutoNoCarrinho(idProduto) {

  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById('produtos-carrinho');

    // - Ajeitando elemento article para ajustar selecionador de quantidade da página E_COMMERCE.

    const elementoArticle = document.createElement('article'); //<article< </article>
    const articleClasses = [
    'd-flex',
    'colorCard',
    'rounded',
    'position-relative',
    'm-2'
  ];
  
  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="position-absolute top-0 border border-0 bg-transparent m-1"><i class="bi bi-x-circle"></i>
    </button>
    <img src="Img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="w-25 h-75 rounded m-3">
  <div>
    <div class="d-flex flex-column justify-content-between">

    <p class="text-dark">${produto.nome}</p>
    </div>
    <p class="text-dark">Cor: Preto</p>
    <p class="text-dark"> $ ${produto.preco}</p>
  </div>
  <div>
      <button id='decrementar-produto-${produto.id}' class='btn btn-secondary text-dark position-absolute bottom-0 end-0 m-1'>-</button>

      <p id = "quantidade-${produto.id}" class='text-dark position-absolute top-50 end-0 mx-3' style="margin: -10px"> ${idsProdutosCarrinhoComQuantidade[produto.id]}</p>

      <button class='btn btn-secondary ml-2 text-dark position-absolute top-0 end-0 m-1' id='incrementar-produto-${produto.id}'>+</button>

  </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);


  // -----------TEXTO DE INCREMENTO E DECREMENTO------------
  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));

  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

  document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));


}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho = document.getElementById('produtos-carrinho');
containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }

}

 export function adicionarAoCarrinho(idProduto) {
  if(idProduto in idsProdutosCarrinhoComQuantidade){
    incrementarQuantidadeProduto(idProduto);
    return;
  }
  idsProdutosCarrinhoComQuantidade[idProduto] = 1;
  salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

let TotalProdutosCarrinho = 0;
var quantidade;

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;

  TotalProdutosCarrinho = 0;


  for( const idProdutoNoCarrinho in idsProdutosCarrinhoComQuantidade) {

     quantidade = idsProdutosCarrinhoComQuantidade[idProdutoNoCarrinho];

    precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutosCarrinhoComQuantidade[idProdutoNoCarrinho];

    TotalProdutosCarrinho += quantidade;

  }
  precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
  atualizarTotalProdutos();

  
}

function atualizarTotalProdutos() {
  const totalProdutosElementos = document.getElementById("total-produtos");
  totalProdutosElementos.innerText = TotalProdutosCarrinho.toString();

  if(TotalProdutosCarrinho === 0) {
    totalProdutosElementos.classList.add("hidden")
  }
  else {
    totalProdutosElementos.classList.remove("hidden")
  }

}
