export const catalogo = [
      {
      id: "1",
      nome: "Iphone 8",
      marca: "apple",
      preco: 1500,
      imagem: "apple-phone8.png",
      
  },
  {
      id: '2',
      nome: "Apple14",
      marca: "apple",
      preco: 9000,
      imagem: "Apple14.png",

  },
  {
      id: '3',
      nome: "GalaxyA10",
      marca: "samsung",
      preco: 1050,
      imagem: "galaxyA10.png",

  },
  {
      id: '4',
      nome: "GalaxyA23",
      marca: "samsung",
      preco: 760,
      imagem: "galaxya23.png",
  
  },
  {
      id: '5',
      nome: "Iphone SE",
      marca: "apple",
      preco: 1100,
      imagem: "iphoneSE.png",

  },
  {
      id: '6',
      nome: "Moto Edge",
      marca: "motorola",
      preco: 1580,
      imagem: "MotoEdge.png",

  },
  {
      id: '7',
      nome: "MotoG",
      marca: "motorola",
      preco: 2000,
      imagem: "motoG.png",

  },
  {
      id: '8',
      nome: "MotoNeo",
      marca: "motorola",
      preco: 1500,
      imagem: "MotoNeo.png",

  },
  
  
  ];

  export function salvarLocalStorage(chave, informacao) {

      localStorage.setItem(chave, JSON.stringify(informacao));
  }
  
  export function lerLocalStorage(chave) {
  
      return JSON.parse(localStorage.getItem(chave));
  }
  
  export function apagarDoLocalStorage(chave) {
      localStorage.removeItem(chave);
  }
  
  export function desenharProdutoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto) {
  
      const produto = catalogo.find((p) => p.id === idProduto);
      const containerProdutosCarrinho = document.getElementById(idContainerHtml);
    
        // - Ajeitando elemento article para ajustar selecionador de quantidade da página E_COMMERCE.
    
        const elementoArticle = document.createElement('article'); //<article< </article>
        const articleClasses = [
        'd-flex',
        'colorCard',
        'gap-2',
        'rounded',
        'position-relative',
        'm-2',
      ];
      
      for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
      }
    
        const cartaoProdutoCarrinho = `
        <img src="/Img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="rounded pt-2" style="width: 35%; height: 55%;">
      <div>
        <div class="d-flex flex-column ">
    
        <p class="text-dark fw-bolder">${produto.nome}</p>
        </div>
        <p class="text-dark">Cor: Preto</p>
        <p class="text-dark"> $ ${produto.preco}</p>
        </div>
      <div class='d-flex position-absolute top-50 end-0 p-2'>
          
          <p id = "quantidade-${produto.id}" class='ml-2'> Qtd: ${quantidadeProduto}</p>
      </div>
      </div>`;
    
      elementoArticle.innerHTML = cartaoProdutoCarrinho;
      containerProdutosCarrinho.appendChild(elementoArticle);
    
    }