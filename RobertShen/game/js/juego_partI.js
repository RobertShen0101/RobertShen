var canvas;
var ctx;
var FPS = 50;

var widthF = 50;
var heightF = 50;

var roadrunner;

// ANIMATIONS
var tileMap;

var labMAT = [
  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0],
    [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
    [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
    [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0],
    [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0],
    [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0],
    [0,2,2,2,0,0,2,0,0,0,1,0,0,2,0],
    [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],

  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,0,0,2,1,0],
    [0,0,2,0,0,0,2,0,0,2,0,0,2,0,0],
    [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
    [0,0,2,0,0,0,2,2,0,0,0,2,0,0,0],
    [0,2,2,0,0,0,0,0,0,0,0,2,0,0,0],
    [0,0,2,0,0,0,2,2,2,2,0,2,2,2,0],
    [0,2,2,2,0,0,2,0,0,2,0,0,0,2,0],
    [0,2,2,3,2,2,2,0,0,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  
  ],

  [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,0,0,2,1,0],
    [0,0,2,0,2,0,2,0,0,2,0,0,2,0,0],
    [0,0,2,0,2,0,2,2,0,2,0,2,2,0,0],
    [0,0,2,0,2,0,2,2,0,2,0,2,0,0,0],
    [0,2,2,2,2,0,0,0,0,2,0,2,0,0,0],
    [0,0,2,0,0,0,2,2,2,2,0,2,2,2,0],
    [0,2,2,2,0,2,2,0,0,2,0,0,0,2,0],
    [0,2,2,3,2,2,2,0,0,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  
  ],
]

var randomPos = Math.floor(Math.random() * 3); // Random number between 0 and 3 
var labyrinth = labMAT[randomPos];


function drawLabyrinth(){

  for(y=0;y<10;y++){
    for(x=0;x<15;x++){
      var tile = labyrinth[y][x];
      switch (tile){
        case 0:
          ctx.drawImage(tileMap,5*50,0,50,50,widthF*x,heightF*y,widthF,heightF);
          break;
        case 1:
          ctx.drawImage(tileMap,4*50,0,50,50,widthF*x,heightF*y,widthF,heightF);
          break;
        case 2:
          ctx.drawImage(tileMap,2*50,0,50,50,widthF*x,heightF*y,widthF,heightF);
          break;
        case 3:
          ctx.drawImage(tileMap,3*50,0,50,50,widthF*x,heightF*y,widthF,heightF);
          break;
      }      
    }
  }
}


function init(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  tileMap = new Image();
  tileMap.src = 'img/tilemap_roadrunner.png';     

  setInterval(function(){
    main();
  },1000/FPS);
}

function clearCanvas(){
  canvas.width=750;
  canvas.height=500;
}

function main(){
  clearCanvas();
  drawLabyrinth();
}
