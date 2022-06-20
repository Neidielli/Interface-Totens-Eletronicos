if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}else {
    ready();
}

function ready(){
    var addCarrinho = document.getElementsByClassName('add-carrinho');
    
    addCarrinho[0].addEventListener("click", addCarrinhoClicado);

}

function addCarrinhoClicado(event){
    var shopProdutos = event.target.parentElement;
    var id = shopProdutos.id;
    var nomeValor = shopProdutos.getElementsByClassName("produto-titulo")[0].innerText; 
    var valor = shopProdutos.getElementsByClassName("produto-preco")[0].innerText.replace("R$",""); 
    var quantidade = shopProdutos.getElementsByClassName("produto-quantidade")[0].value;
    console.log(quantidade);
    var departamento = shopProdutos.getElementsByClassName("produto-departamento")[0].innerText.replace("Home / ","")
   
    localStorage.setItem(id + " nome", nomeValor);
    localStorage.setItem(id + " valor", valor);
    localStorage.setItem(id + " quantidade", quantidade);
    localStorage.setItem(id + " departamento", departamento);
}