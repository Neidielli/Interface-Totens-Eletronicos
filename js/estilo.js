// FAZENDO A FUNÇÃO DE PESQUISAR
function pesquisar(){
    var input,filtro,menu,menuItens,links;
    input = document.getElementById("pesquisa");
    filtro = input.value.toUpperCase();
    menu = document.getElementById("menu");
    menuItens = menu.getElementsByTagName("li");
    for(var i = 0; i < menuItens.length; i++){
        links = menuItens[i].getElementsByTagName("a")[0];
        if(links.innerHTML.toUpperCase().indexOf(filtro)>-1){
            menuItens[i].style.display="";
        }else{
            menuItens[i].style.display="none";
        }
    }
}

// DEIXANDO A BARRA DE PESQUISA DINÂMICA
let pesquisaIcon = document.querySelector(".pesquisaIcone");
let pesquisaConteudo = document.querySelector("#menu");
let fecharPesquisa = document.querySelector(""); /* FECHAR QUANDO O USUÁRIO CLICAR EM OUTRA COISA*/

pesquisaIcon.onclick = () => {
    pesquisaConteudo.classList.add(""); /* TORNAR ATIVO QUANDO REALIZAR A BUSCA */
}