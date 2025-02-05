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

//CLASS PLAYER
var player = function(){
  this.x = 1;
  this.y = 1;
  this.key = false;

  this.plot = function(){
    ctx.drawImage(tileMap,0,0,50,50,widthF*this.x,heightF*this.y,widthF,heightF);
  }

  this.up = function(){   
      this.y--;
  }

  this.down = function(){
      this.y++;
  }

  this.left = function(){
      this.x--;
  }

  this.right = function(){
      this.x++;
  }

}

function init(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  tileMap = new Image();
  tileMap.src = 'img/tilemap_roadrunner.png';     

  //Create a player
  roadrunner = new player();
  //Listen to the keyboard
  document.addEventListener('keydown',function(button){

    if(button.code == 'ArrowUp'){
      roadrunner.up();
    }

    if(button.code == 'ArrowDown'){
      roadrunner.down();
    }

    if(button.code == 'ArrowLeft'){
      roadrunner.left();
    }

    if(button.code == 'ArrowRight'){
      roadrunner.right();
    }

  });

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
  roadrunner.plot();
}
