/** Funcionamento do carrinho */
if (document.readyState == "loading") {
    /*document.addEventListener("DOMContentLoaded",updateTotal)*/
    document.addEventListener("DOMContentLoaded", ready)
}else {
    ready();
}

// função ready
function ready(){
    // Remove os itens do carrinho
    var removerCarrinho = document.getElementsByClassName('excluir')
    console.log(removerCarrinho)
    for (var i = 0; i < removerCarrinho.length; i++){
        var button = removerCarrinho[i]
        button.addEventListener("click", removerItem)
    }
    // Mudanças na quantidade
    var quantidadeInputs = document.getElementsByClassName('cartaoQuantidade')
    for (var i = 0; i < quantidadeInputs.length; i++){
        var  input = quantidadeInputs[i];
        input.addEventListener("change", quantidadeMudado);
    }
    // Adicionar ao carrinho
    var addCarrinho = document.getElementsByClassName('add-carrinho')
    for (var i = 0; i < addCarrinho.length; i++){
        var button = addCarrinho[i]
        button.addEventListener('click', addCarrinhoClicado);
    }
}

// função removerItem
function removerItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    updateTotal();
}
// Quantidade mudada
function quantidadeMudado(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}
// Adiciona ao carrinho 
function addCarrinhoClicado(event){
    var button = event.target;
    var shopProdutos = button.parentElement.parentElement
    var title = shopProdutos.getElementsByClassName("produto-titulo")[0].innerText; // Dentro de cada produto
    var price = shopProdutos.getElementsByClassName("produto-preco")[0].innerText; // Dentro de cada produto
    var img = shopProdutos.getElementsByClassName("produto-img")[0].src;
    addProdutoAoCarrinho(title, price, img);
    updateTotal();
}
function addProdutoAoCarrinho(title, price, img){
    var caixaCarrinho = document.createElement("tr"); // Dentro do carrinho mesmo
    caixaCarrinho.classList.add("carrinhoItens");
    var cartItems = document.getElementsByClassName("conteudoCarrinho")[0]
    /*var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
        alert("Você já adicionou este item ao carrinho");
        return;
        }
    }*/
    var cartBoxContent = `
                        <td><i class="excluir"><img src="imagens/icone-fechar.png" height="20" width="25"></i></td>
                        <td><img src="imagens/Cadeiras/Cadeira Gamer Husky Gaming Snow.png"></td>
                        <td class="cart-product-title">Cadeira Gamer Husky Gaming snow</td>
                        <td class="precoProduto">R$629.04</td>
                        <td><input class="cartaoQuantidade" type="number" value="1"></td>`;
                        
    caixaCarrinho.innerHTML = cartBoxContent;
    console.log(cartItems);
    console.log(caixaCarrinho);
    cartItems.append(caixaCarrinho);
    caixaCarrinho
        .getElementsByClassName('excluir')[0]
        .addEventListener('click', removerItem);
    caixaCarrinho
        .getElementsByClassName('cartaoQuantidade')[0]
        .addEventListener('change', quantidadeMudado);
}

// Atualização do total
function updateTotal(){
    var conteudoCarrinho = document.getElementsByClassName('conteudoCarrinho')[0];
    var carItens = conteudoCarrinho.getElementsByClassName('carrinhoItens');
    var total = 0;
    for (var i = 0; i < carItens.length; i++){
        var carrinhoItens = carItens[i];
        var elementoPreco = carrinhoItens.getElementsByClassName("precoProduto")[0];
        var elementoQuantidade = carrinhoItens.getElementsByClassName("cartaoQuantidade")[0];
        var preco = parseFloat(elementoPreco.innerText.replace("R$", ""));
        var quantidade = elementoQuantidade.value;
        total = total + preco * quantidade;
    }
        // se o preço tiver centavos
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-preco")[0].innerText = "R$" + total;
}