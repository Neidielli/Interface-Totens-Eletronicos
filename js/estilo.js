let barraPesquisa = document.querySelector(".form-control");
barraPesquisa.onkeyup = () => {
    var filtro,menu,menuItens,links;
    
    filtro = barraPesquisa.value.toUpperCase();
    menu = document.getElementById("menu");
    menuItens = menu.getElementsByTagName("li");
    for(var i = 0; i < menuItens.length; i++){
        links = menuItens[i].getElementsByTagName("a")[0];
        console.log(links.innerHTML.toUpperCase().indexOf(filtro))
        if(links.innerHTML.toUpperCase().indexOf(filtro)> -1){
            menuItens[i].style.display="block";
        }else if(filtro == "" || links.innerHTML.toUpperCase().indexOf(filtro) == -1){
            menuItens[i].style.display="none";
        }
    }
}

// FAZENDO A FUNÇÃO DE PESQUISAR
function pesquisar(){

}

// DEIXANDO A BARRA DE PESQUISA DINÂMICA
/*let pesquisaIcon = document.querySelector(".pesquisaIcone");
let pesquisaConteudo = document.querySelector("#menu");
let fecharPesquisa = document.querySelector(""); /* FECHAR QUANDO O USUÁRIO CLICAR EM OUTRA COISA*/

