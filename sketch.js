//coordenadas dos botões
var xbotao1, ybotao1;

var xbotao2, ybotao2;

var xbotao3, ybotao3;

//coordenadas do cursor
var xcursor, ycursor;

//variavel de estado
var estado, tela;

var tempV = 1, vida = 3, pontos = 0;
var inicioDaFase = true, cordXY = true;
var auxPrnX = [], auxPrnY = [];
var xPrnS = [] , yPrnS = [], colideC = []; 
var xPrnP = [] , yPrnP = [], colideS = [], colidiuVogalAnterior = [];
var prnS = [], prnP = []
let img;

function preload() {
  Menu = loadImage('menu2.gif');
  Creditos = loadImage('creditos3.gif');
  Start = loadImage('play.gif');
  Tutorial = loadImage('Menu/tuto.gif');
  Tutorial2 = loadImage('Menu/tutorial3.png');
  Creditos2 = loadImage('creditos2.png');
  jogoFundo = loadImage('Menu/fundojogo.gif')
  Vida = loadImage('Menu/Vidapng.png')
  Gameover = loadImage('Menu/game over.jpg')
  Win = loadImage('Menu/acertou.png')
  Letraa = loadImage('Menu/A.JPG')
  Letrae = loadImage('Menu/e.jpg')
  Letrai = loadImage('Menu/i.jpg')
  Letrao = loadImage('Menu/o.jpg')
  Letrau = loadImage('Menu/u.jpg')
  Letrab = loadImage('Menu/B.jpg')
  Letrac = loadImage('Menu/c.jpg')
  Letrad = loadImage('Menu/d.jpg')
  Letrag = loadImage('Menu/g.jpg')
  Letrah = loadImage('Menu/h.jpg')
  Letraj = loadImage('Menu/j.jpg')
  Letrak = loadImage('Menu/k.jpg')
  Letral = loadImage('Menu/l.jpg')
  Letram = loadImage('Menu/m.jpg')
}

function setup(){
  createCanvas(400,400)
  
 
  //fundo dos botões
  xbotao1 = 140;
  ybotao1 = 60;  
  
  xbotao2 = 140;
  ybotao2 = 155;
  
  xbotao3 = 140;
  ybotao3 = 250;
  
  xcursor = 140;
  ycursor = 60;
  
  estado = 1;
  
  tela = 1;
  
  frameRate(30);
 
}


function draw() {
  strokeWeight(0);
  stroke(0);
  fill(0);
  textSize(25);
  textStyle(NORMAL);
  //text("x: "+mouseX+", y: "+mouseY, 20, 300)
 
  if(estado==1){
   menu();
 }
  else if(estado==2){
    start();
              }
  else if(estado==3){
    creditos();
  }
 else if(estado==4){
    instrucoes();
  }
  else if(estado==5){
    background(Gameover);
  }
  else if(estado==6){
    background(Win);
  }
  

}

function keyPressed(){
  if(estado == 1){
  if(keyCode==UP_ARROW && ycursor>100){
    tela += -1;
    ycursor += -95;
    console.log(tela);
    }
  if(keyCode==DOWN_ARROW && ycursor<200){
    tela += 1;
    ycursor += 95;
    console.log(tela); 
  }
  }
  if(keyCode==ESCAPE){
    estado=1;
  }
 
  
  if(keyCode==ENTER){
    if(tela == 1){
      estado=2
    }
    else if(tela == 2){
      estado=3;
    }
     else if(tela == 3){
      estado=4;
    }
    console.log("Start");
    }
  if(keyCode==LEFT_ARROW){
    if(estado==2 || estado==3){
      estado = 1;
    }
  }
  
  
 }  

function menu(){
  background(Menu);
  stroke(0);
  fill(300);
  strokeWeight(1);
  
  
  
  //desenho dos botoes
  fill(400);
  rect(xbotao1, ybotao1, 100,60);
  image(Start, xbotao1, ybotao1, 100, 60);
  textSize(12);
  fill(0);
  
  
  fill(400);
  rect(xbotao3, ybotao3, 100,60);
  image(Tutorial, xbotao3, ybotao3, 100, 60);
  textSize(12);
  fill(0);
 
  
  fill(300);
  rect(xbotao2, ybotao2,100,60);
  image(Creditos, xbotao2, ybotao2, 100, 60);
  textSize(12);
  fill(0);
  
  
  rect(100,60);
  textSize(12);
  fill(400);
  text("Utilize as setas e ENTER para se mover \n ESC para voltar", xbotao3+50, ybotao3+100);
  
  textAlign(CENTER);
  
  
  
  noFill();
  stroke(0,0,255);
  textSize(12);
  strokeWeight(4);
  rect(xcursor, ycursor, 100,60);
  

  //reinicialização
  prnS = [Letraa, Letrae, Letrai, Letrao, Letrau]

  prnP = [Letrab, Letrac, Letrad, Letrag, Letrah, Letraj, Letrak, Letral,Letram] 
  tempV = 1;
  vida = 3;
  pontos = 0;
  cordXY = true;
  inicioDaFase = true;
} 
 
function start(){ 
    if ((vida > 0) && (pontos != 5)){
    background(jogoFundo);
      if(tempV > -1){
        if(frameCount%30 == 0){
          tempV-=1
        }
      }
    Letras();
    console.log(vida)
    for ( i = 0; i < vida; i++){
      if (i==0)  
      image(Vida, 370, 35,20,20, 20); 
      if (i==1)     
      image(Vida, 350, 35,20,20, 20);
      if (i==2)     
      image(Vida, 330, 35,20,20, 20);
    }
    
      
    }
    else if (vida == 0) {
      estado=5
    }
    else if (pontos == 5){
        estado=6
      
    }
    
  
}

function Letras(){
  var i, j, k, colidePrn = true, tol = 80;
/*Se for no início da fase, tem que gerar as coordenadas aleatórias
  para a posição dos prnS*/
  if (inicioDaFase) {
    //console.log("Tamanho dos vetores: " + prnS.length + " e " + prnP.length);
    //Gerar 10 alvos em posições aleatórias
    
    auxPrnX[0] = random(10, 350);
    auxPrnY[0] = random(10, 350);
    
    
    for (i = 0; i < 14; i++){
      
      while(colidePrn) {
      
        auxPrnX[i] = random(10, 350);
        auxPrnY[i] = random(10, 350);
        
        colidePrn = false;
        
        /*AQUI VERIFICAMOS A COLISÃO COM A VIDA (DO MEIO, PARA FACILITAR)*/
          var DxS = 330 - auxPrnX[i];
          var DyS = 20 - auxPrnY[i];
          var distS = Math.sqrt(DxS**2 + DyS**2);

          if ((distS < tol)){ 
              colidePrn = true;      
          }
        
        /*AQUI VERIFICAMOS A COLISÃO DO LIVRO GERADO AGORA 
          COM OS LIVROS ANTERIORES*/
        for (j = 0; j <= i-1; j++) {
           /*Se a distância de um alvo para outro for menor que uma tolerância aceitável   
             então, consideramos que houve colisão*/
          DxS = auxPrnX[j] - auxPrnX[i];
          DyS = auxPrnY[j] - auxPrnY[i];
          distS = Math.sqrt(DxS**2 + DyS**2);
         
          if ((distS < tol)){ 
            colidePrn = true;      
          } 
        }
      }
      colidePrn = true;
    }
  }
  inicioDaFase = false;
  
  if (cordXY) {
    for (i = 0, j = 0, k = 0; i < 14; i++){
      if (i < 5) {
        xPrnS[j] = auxPrnX[i]
        yPrnS[j] = auxPrnY[i];
        j++;
      }
      else{
        xPrnP[k] = auxPrnX[i]
        yPrnP[k] = auxPrnY[i];
        k++;
      }
    }
  }
  cordXY = false;
/*Desenhar as figurinhas dos prnS nas posições já previamente
  calculadas*/
    for (i=0; i<prnS.length ; i++){
      //fill(prnS[i])
      image(prnS[i], xPrnS[i],yPrnS[i],40,40)
     
      if(mouseX > xPrnS[i] && mouseX < xPrnS[i] + 40 && mouseY > yPrnS[i] && mouseY < yPrnS[i] + 40 && mouseIsPressed){
        
      colideS[i] = true;
      
      
        if (colideS[i] && !colidiuVogalAnterior[i]) { 
          pontos++;
          prnS.splice(i,1);
          xPrnS.splice(i,1);
          yPrnS.splice(i,1);
          colideS.splice(i,1);
          colidiuVogalAnterior.splice(i,1);
          tempV =1;
        }  
        else { 
          colidiuVogalAnterior[i] = colideS[i]; 
        }
      }
    }
  
  for (i=0 ; i < 9; i++){
      //fill(prnP[i])
      image(prnP[i], xPrnP[i],yPrnP[i],40,40);
      
    if(mouseX > xPrnP[i] && mouseX < xPrnP[i] + 40 && mouseY > yPrnP[i] && mouseY < yPrnP[i] + 40 && mouseIsPressed){
    colideC[i] = true
      
   
     if(colideC[i] && tempV <= 0) { 
        vida--;
        tempV = 1;
      } 
    }
  }    
}

function creditos(){
  background(Creditos2);
  
}

function instrucoes(){
  background(Tutorial2);
   }