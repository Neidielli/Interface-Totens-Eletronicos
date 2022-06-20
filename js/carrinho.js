/** Funcionamento do carrinho */
if (document.readyState == "loading") {
    /*document.addEventListener("DOMContentLoaded",updateTotal)*/
    document.addEventListener("DOMContentLoaded", ready)
}else {
    ready();
}

// função ready
function ready(){
    atualizaLista();
    
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
function atualizaLista(){
    var memoria = new Array();
    for(var i = 0; i < localStorage.length; i++){
        memoria.push(localStorage.key(i));
    }
    memoria = memoria.sort();
    for(var i = 0; i < memoria.length; i = i + 3){
        addProdutoAoCarrinho(localStorage.getItem(memoria[i]), 
            localStorage.getItem(memoria[i+2]), localStorage.getItem(memoria[i+1]))
    }
    updateTotal();
}

function addProdutoAoCarrinho(nome, valor, quantidade){
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
                        <td class="cart-product-title">${nome}</td>
                        <td class="precoProduto">${valor}</td>
                        <td><input class="cartaoQuantidade" type="number" value="${quantidade}"></td>`;
                        
    caixaCarrinho.innerHTML = cartBoxContent;
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