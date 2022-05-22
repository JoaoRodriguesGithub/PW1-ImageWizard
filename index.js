//Função para fazer o pedido para as imagens mais recentes:
function procura() {
  var endereco = 'https://api.unsplash.com/photos/?client_id=gxNCsWoxQjSyxiHLppkxHe2GTa2RWPTOXHzam7VBgLM&per_page=24&order_by=latest&page='
  var enderecoComPagina = endereco + pagina;

  $.ajax({
    url: enderecoComPagina,
    type: "get",
    async: true,
    success: function (data, status, response) {
      adicionarFotos(data);
    }
  });
}

//Função para adicionar fotos ao contentor de fotos:
function adicionarFotos(dataResposta) {
  $('#contentorFotos').empty();

  var arrayDeFotos = dataResposta;

  for (var i = 0; i < arrayDeFotos.length; i++) {
    var foto = arrayDeFotos[i];
    criarFoto(foto);
  }
}

//Função para fazer o pedido da pesquisa de imagens:
function pedidoSearch() {
  var inputDoSearch = document.getElementById("textoPesquisar");
  //Condição para quando se pesquisar com o input vazio passar a modal
  if (inputDoSearch.value == "") {
    var modalVazia = $('#modalVazia');
    modalVazia.modal('show');
  }
  
  //Condição para o pedido da pesquisa:
  else {
    var enderecoSearch = 'https://api.unsplash.com/search/photos?query='
    var key = '&client_id=gxNCsWoxQjSyxiHLppkxHe2GTa2RWPTOXHzam7VBgLM'
    var enderecoCompletoSearch = enderecoSearch + inputDoSearch.value + key;
    $.ajax({
      url: enderecoCompletoSearch,
      type: "get",
      async: true,
      success: function (data, status, response) {
        adicionarFotosSearch(data);
      }
    });
  }
}

//Função para adicionar fotos da pesquisa ao contentor de fotos:
function adicionarFotosSearch(dataRespostaSearch) {
  $('#contentorFotos').empty();

  var arrayDeFotosSearch = dataRespostaSearch;

  for (var i = 0; i < arrayDeFotosSearch.results.length; i++) {
    var foto = arrayDeFotosSearch.results[i];
    criarFoto(foto);
  }
}

//Função para voltar a esconder a modal quando se fizer o click no botão close:
function esconderModal() {
  var esconderModal = $('#modalVazia');
  esconderModal.modal('hide'); 
}

//Função para programar o botão close da modal:
function programarBotaoFecharModal(){
  var botaoFecharModal = document.getElementsById("fecharModal");
  botaoFecharModal.addEventListener("click", esconderModal);
}

/*
<div class="card col-4" style="width: 18rem;">
                <img src="https://images.unsplash.com/profile-1468003870880-1d44bae203c5?ixlib=rb-1.2.1\u0026q=80\u0026fm=jpg\u0026crop=faces\u0026cs=tinysrgb\u0026fit=crop\u0026h=128\u0026w=128"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#"><i class="fas fa-download"></i></a>
                </div>
            </div>
*/

//Função para criar o html do cartao de cada foto:
function criarFoto(foto) {
  // criar a
  var a = document.createElement("a");
  a.className = "fas fa-download";
  var download = a.target = foto.urls.regular;
  a.setAttribute("href", download)

  // criar p
  var p = document.createElement("p");
  p.className = "card-text";
  p.innerText = foto.description;

  // criar h5
  var h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = foto.user.name;

  // criar div filha
  var div = document.createElement("div");
  div.className = "card-body";
  div.appendChild(h5);
  div.appendChild(p);
  div.appendChild(a);

  // criar img
  var img = document.createElement("img");
  img.className = "card-img-top";
  var imgSrc = foto.urls.raw + "&fit=crop&w=500&h=500";
  img.setAttribute("src", imgSrc);

  // criar div pai
  var divPrincipal = document.createElement("div");
  divPrincipal.className = "card col-lg-3 col-md-4 col-sm-6";
  divPrincipal.appendChild(img);
  divPrincipal.appendChild(div);

  // adicionar div pai à pagina/DOM
  var container = document.getElementById("contentorFotos");
  container.appendChild(divPrincipal);
}

//Função para programar o carregamento da pagina:
function programarCarregamentoPagina() {
  $(window).on("load", procura);
}

//Função para programar o botão de download:
function programarBotaoDownload() {
  var botao = document.getElementsByClassName("btn btn-primary");
  botao.addEventListener("click", abrirPagina);
}

//Função para programar o botão de pesquisa:
function programarBotaoSearch() {
  var botaoSearch = document.getElementById("botaoPesquisa");
  botaoSearch.addEventListener("click", pedidoSearch);
}

//Função para abrir página:
function abrirPagina() {
  $.window.on("_self");
}

//Função para navegar para a página anterior:
function anterior() {
  if (pagina == 1)
    alert("ALERTA");
  else {
    pagina = pagina - 1;
    procura();
  }
}

//Função para navegar para a página seguinte:
function seguinte() {
  pagina = pagina + 1;
  procura();
}

//Função para programar os eventos dos botões seguinte e anterior:
function programarBotoesPaginacao() {
  var botaoAnterior = document.getElementById("anterior");
  var botaoSeguinte = document.getElementById("seguinte");

  botaoAnterior.addEventListener("click", anterior);
  botaoSeguinte.addEventListener("click", seguinte);
}

//programarBotaoFecharModal();
programarCarregamentoPagina();
programarBotoesPaginacao();
programarBotaoSearch();

var pagina = 1;