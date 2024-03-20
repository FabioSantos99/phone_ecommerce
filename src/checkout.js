import { desenharProdutoCarrinhoSimples, lerLocalStorage, apagarDoLocalStorage, salvarLocalStorage } from "./utilidades";

function desenharProdutosCheckout() {

    const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    for (const idProduto in idsProdutosCarrinhoComQuantidade) {
        desenharProdutoCarrinhoSimples(
            idProduto,
            "container-produtos-checkout",
            idsProdutosCarrinhoComQuantidade[idProduto]
        );
    }
}

function finalizarCompra(evento) {
    evento.preventDefault();


    //----------HISTÒRICO--------------
    const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if(Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutosCarrinhoComQuantidade
    }

    const historicoComPedidos = lerLocalStorage('historico') ?? [];
    const historicoPedidosAtualizado = [pedidoFeito, ...historicoComPedidos]

    salvarLocalStorage('historico', historicoPedidosAtualizado)
    apagarDoLocalStorage('carrinho')
    //--------------------------------------------

    window.location.href = window.location.origin + './pedidos.html';
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));