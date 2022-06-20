if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}else {
    ready();
}

function ready(){
    atualizaLista();
    updateTotal();
}

function removerItem(event) {
    var tr = event.target.parentElement.parentElement.parentElement;
    var nome = tr.getElementsByClassName("cart-product-title")[0].innerHTML
    var tamanho = localStorage.length + 1;
    var i = 0;
    var c1 = 0;

    while(true){
        if(localStorage.getItem(localStorage.key(i)) == nome){
            var id = localStorage.key(i)[0];
            console.log("É isso " + id)
            break;
        }
        i++;
    }

    i = 0;
    while(true){
        if(c1 == 4){
            break;
        }
        else if(localStorage.key(i)[0] == id){
            localStorage.removeItem(localStorage.key(i));
            i = 0;
            c1++;    
        }
        else{
            i++;       
        }
    }
    tr.remove();
    updateTotal();
}

function quantidadeMudado(event){
    var input = event.target
    
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

function atualizaLista(){
    var memoria = new Array();
    
    for(var i = 0; i < localStorage.length; i++){
        memoria.push(localStorage.key(i));
    }
    
    memoria = memoria.sort();
    for(var i = 0; i < memoria.length; i = i + 4){
        addProdutoAoCarrinho(
            localStorage.getItem(memoria[i+1]), 
            localStorage.getItem(memoria[i+3]), 
            localStorage.getItem(memoria[i+2]),
            localStorage.getItem(memoria[i]))
    }
}

function addProdutoAoCarrinho(nome, valor, quantidade, departamento){
    var caixaCarrinho = document.createElement("tr"); 
        caixaCarrinho.classList.add("carrinhoItens");
    var cartItems = document.getElementsByClassName("conteudoCarrinho")[0]
    var cartBoxContent = `
                        <td><i class="excluir"><img src="imagens/icone-fechar.png" height="20" width="25"></i></td>
                        <td><img src="imagens/${departamento}s/${nome}.png"></td>
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

function updateTotal(){
    var conteudoCarrinho = document.getElementsByClassName('conteudoCarrinho')[0];
    var carItens = conteudoCarrinho.getElementsByClassName('carrinhoItens');
    var total = 0;
    
    for (var i = 0; i < carItens.length; i++){
        var carrinhoItens = carItens[i];
        var elementoPreco = carrinhoItens.getElementsByClassName("precoProduto")[0];
        var elementoQuantidade = carrinhoItens.getElementsByClassName("cartaoQuantidade")[0];
        var preco = parseFloat(elementoPreco.innerText.replace(".", ""));
        var quantidade = elementoQuantidade.value;
        total = total + preco * quantidade;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-preco")[0].innerText = "R$" + total;
}