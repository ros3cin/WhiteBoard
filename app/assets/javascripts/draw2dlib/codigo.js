//Aqui é como se fosse o main[]
$(document).ready(function() {
  var canvas = new draw2d.Canvas("gfx_holder");

  var btn = $("#conexaoDireta");
  //Ao clicar em retificar conexoes
  btn.click( function () {
  	retificarConexoes(canvas);
  });
  
  //Ao clicar em CriarHidrogenio
  $("#addHidrogenio").click( function() {
    criarHidrogenio(canvas);
  });

  //Ao clicar em CriarCarbono
  $("#addCarbono").click( function() {
    criarCarbono(canvas);
  });
  
  $("#addNitrogenio").click( function() {
    criarNitrogenio(canvas);
  });

  $("#addFosforo").click( function() {
    criarFosforo(canvas);
  });
  
  $("#addOxigenio").click( function() {
    criarOxigenio(canvas);
  });
  
  $("#addCloro").click( function() {
    criarCloro(canvas);
  });
  
  $("#addBromo").click( function() {
    criarBromo(canvas);
  });
  
  $("#menuOpcoes").mouseover( function() {
  	$("#exportarPNG").slideDown(100);
  });
  $("#menuPrincipal").mouseout( function() {
  	fecharMenuOpcoes()
  });
  
  $("#exportarPNG").click( function() {
  	 //var writer = new draw2d.io.png.Writer();
	 //var png = writer.marshal(canvas);
     //$("#preview").attr("src",png);
     //$('#caminho').append(png);
     //$("#preview").attr("src",png);
     
     //TODO funciona!
     var svg = canvas.getHtmlContainer().html().replace(/>\s+/g, ">").replace(/\s+</g, "<");
     svg = svg.replace("overflow: hidden; position: absolute;","overflow: hidden; position: absolute;border: 1px solid #CCC;border-radius: 2px;-moz-border-radius: 2px;-webkit-border-radius: 2px;position: relative");
     $('#reslt').append(svg);
     $('#reslt > #menuPrincipal').remove();
     $('#esquemaSVG').attr('value',document.getElementById('reslt').innerHTML);
     $('#reslt > svg').remove();
     
     $("#abrirModalExportarPNG").click();
  });
  

  
  var menuAtomosAberto = false;
  $("#atomos").click( function() {
  	if(!menuAtomosAberto){
		$("#addHidrogenio").slideDown(100);
  		$("#addCarbono").slideDown(100);
  		$("#addNitrogenio").slideDown(100);
  		$("#addOxigenio").slideDown(100);
  		$("#addFosforo").slideDown(100);
  		$("#addCloro").slideDown(100);
  		$("#addBromo").slideDown(100);
  		menuAtomosAberto = true;
	} else {
		$("#addHidrogenio").slideUp(50);
  		$("#addCarbono").slideUp(50);
  		$("#addNitrogenio").slideUp(50);
  		$("#addOxigenio").slideUp(50);
  		$("#addFosforo").slideUp(50);
  		$("#addCloro").slideUp(50);
  		$("#addBromo").slideUp(50);
		menuAtomosAberto = false;		
	}
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

function criarNitrogenio(canvas) {
  var nitrogen = new draw2d.shape.basic.Image("/atomos/Nitrogenio.png",60,60);
  var width = nitrogen.getWidth();
  var height = nitrogen.getHeight();
  
  nitrogen.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  nitrogen.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  nitrogen.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  nitrogen.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  nitrogen.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );

  nitrogen.getPorts().get(0).translate(width/3,0);
  nitrogen.getPorts().get(1).translate(width/2 + width/6,0);
  nitrogen.getPorts().get(2).translate(0,height/2);
  nitrogen.getPorts().get(3).translate(width,height/2);
  nitrogen.getPorts().get(4).translate(width/2,height);

  canvas.addFigure(nitrogen,100,100);
}

function criarFosforo(canvas) {
  var fosforo = new draw2d.shape.basic.Image("/atomos/Fosforo.png",60,60);
  var width = fosforo.getWidth();
  var height = fosforo.getHeight();
  
  fosforo.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  fosforo.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  fosforo.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  fosforo.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  fosforo.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );

  fosforo.getPorts().get(0).translate(width/3,0);
  fosforo.getPorts().get(1).translate(width/2 + width/6,0);
  fosforo.getPorts().get(2).translate(0,height/2);
  fosforo.getPorts().get(3).translate(width,height/2);
  fosforo.getPorts().get(4).translate(width/2,height);

  canvas.addFigure(fosforo,100,100);
}

function criarCloro (canvas)
{
  var cloro= new draw2d.shape.basic.Image("/atomos/Cloro.png",60,60);
  var width = cloro.getWidth();
  var height = cloro.getHeight();
  
  cloro.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  cloro.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  cloro.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  cloro.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  cloro.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  cloro.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  cloro.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );

  cloro.getPorts().get(0).translate(width/3,0);
  cloro.getPorts().get(1).translate(width/2 + width/6,0);
  cloro.getPorts().get(2).translate(0,height/3);
  cloro.getPorts().get(3).translate(0,height/2 + height/6);
  cloro.getPorts().get(4).translate(width,height/3);
  cloro.getPorts().get(5).translate(width,height/2 + height/6);
  cloro.getPorts().get(6).translate(width/2,height);
  
  canvas.addFigure(cloro,100,100);
}

function criarBromo (canvas)
{
	var bromo = new draw2d.shape.basic.Image("/atomos/Bromo.png", 60,60);
	var width = bromo.getWidth();
	var height = bromo.getHeight();
	
	bromo.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
	bromo.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
	bromo.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
	
	bromo.getPorts().get(0).translate(0,height/2);
	bromo.getPorts().get(1).translate(width,height/2);
	bromo.getPorts().get(2).translate(width/2,height);
	
	canvas.addFigure(bromo, 100,100);
}

function criarOxigenio (canvas)
{
  var oxigenio= new draw2d.shape.basic.Image("/atomos/Oxigenio.png",60,60);
  var width = oxigenio.getWidth();
  var height = oxigenio.getHeight();
  
  oxigenio.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  oxigenio.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  oxigenio.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  oxigenio.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  oxigenio.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  oxigenio.addPort( new draw2d.HybridPort(), new draw2d.layout.locator.Locator() );
  

  oxigenio.getPorts().get(0).translate(width/3,0);
  oxigenio.getPorts().get(1).translate(width/2 + width/6,0);
  oxigenio.getPorts().get(2).translate(0,height/2);
  oxigenio.getPorts().get(3).translate(width,height/3);
  oxigenio.getPorts().get(4).translate(width,height/2 + height/6);
  oxigenio.getPorts().get(5).translate(width/2,height);
  
  canvas.addFigure(oxigenio,100,100);
}