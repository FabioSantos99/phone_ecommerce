import { renderizarCatalogo } from "./src/cartaoProdutos";
import { inicializarCarrinho, atualizarPrecoCarrinho, renderizarProdutosCarrinho } from "./src/menuCarrinho";
import { inicializarFiltros } from "./src/filtroCatalogo";

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();

