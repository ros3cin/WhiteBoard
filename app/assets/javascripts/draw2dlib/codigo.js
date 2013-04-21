//Aqui é como se fosse o main
$(document).ready(function() {
  var canvas = new draw2d.Canvas("gfx_holder");

  var btn = $("#conexaoDireta");
  //Ao clicar em retificar conexoes
  btn.click( function () {
  	retificarConexoes(canvas);
  });
  
  //Ao clicar em CriarHidrogenio
  $("#addH").click( function() {
    criarHidrogenio(canvas);
  });

  //Ao clicar em CriarCarbono
  $("#addC").click( function() {
    criarCarbono(canvas);
  });
  
  $("#menuOpcoes").mouseover( function() {
  	$("#exportarPNG").slideDown(100);
  });
  $("#menuPrincipal").mouseout( function() {
  	fecharMenuOpcoes()
  });
  
  $("#exportarPNG").click( function() {
  	 $("#abrirModalExportarPNG").click();
  });
  
  
});


//qualquer duvida, vide API: http://draw2d.org/draw2d_touch/jsdoc/#!/api





function fecharMenuOpcoes(){
	if(!$("#exportarPNG").is(':hover'))
		$("#exportarPNG").slideUp(50);
}



function setarConexaoDireta(shape) {
	var arrayCon = shape.getConnections();
  	for ( var i = 0; i < arrayCon.size; i++ ) {
		arrayCon.get(i).setRouter( new draw2d.layout.connection.DirectRouter() );
  	}
}

function retificarConexoes(canvas){
  var portas = canvas.getAllPorts();
  for ( var i = 0; i < portas.size; i++ ) {
    setarConexaoDireta(portas.get(i));
  }
}
function criarCarbono(canvas) {
  var carbono = new draw2d.shape.basic.Image("/atomos/Carbono.png",60,60);
  var width = carbono.getWidth();
  var height = carbono.getHeight();
  
  carbono.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  carbono.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  carbono.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  carbono.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );

  carbono.getPorts().get(0).translate(width/2,0);
  carbono.getPorts().get(1).translate(0,height/2);
  carbono.getPorts().get(2).translate(width,height/2);
  carbono.getPorts().get(3).translate(width/2,height);

  canvas.addFigure(carbono,100,100);
}
function criarHidrogenio(canvas){
  var hidrogenio =  new draw2d.shape.basic.Image("/atomos/Hidrogenio.png",60,60);


  var width = hidrogenio.getWidth();
  var height = hidrogenio.getHeight();

  hidrogenio.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );

  hidrogenio.getPorts().get(0).translate(0,height/2);
  hidrogenio.getPorts().get(0).posicaoPorta = 0;

  //definindo acao de clique duplo numa porta (a bolinha) do hidrogenio.
  //faz com que ela mude posicao
  hidrogenio.getPorts().get(0).onDoubleClick = function() {
    var pai = this.getParent();
    var width = pai.getWidth();
    var height = pai.getHeight();
    switch (this.posicaoPorta) {
      case 0:// se está na esquerda
        this.translate(width/2,height/2);// ir para baixo
        this.posicaoPorta = 1;
        break;
      case 1:// se está embaixo
        this.translate(width/2,-height/2);// ir para direita
        this.posicaoPorta = 2;
        break;
      case 2: // se está na direita
        this.translate(-width/2,-height/2);// ir para cima
        this.posicaoPorta = 3;
        break;
      case 3: // se está em cima
        this.translate(-width/2,height/2);// ir para esquerda
        this.posicaoPorta = 0;
        break;
    }
  }

  canvas.addFigure(hidrogenio,100,100);
}