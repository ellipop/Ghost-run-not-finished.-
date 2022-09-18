var GAME = 1;
var END = 0;
var gameState = GAME;
var STAGE2 = 2;
var PAUSE = 3;

var score = 0;

var Bg,bgImg;

var BGMusic, winSound ;

var playerImgR, playerImgL, playerstap, Player;

var platform, platformGroup, platformImg;

var plat2, plat2Group;

var gameOver, restart, gameOverImg, restartImg;

var cloudImg, cloud, cloudGroup;

var candy, candyImg, giftImg;

var prizeScore = 0;

var redBar;

var catL,catR,Catidle;

var lightsImg, ornamentsImg;

var pauseImg, playImg, pause, play;

var gift, giftImg;


function preload(){
  playerImgR = loadImage("./assets/PlayerR.png");
  playerImgL = loadImage("./assets/PlayerL.png");
  playerstap = loadImage("./assets/playerStop.png");
  bgImg = loadImage("./assets/BG.png");

  gameOverImg = loadImage("./assets/GameOver.png");
  restartImg = loadImage("./assets/RestartImage.png");

  platformImg = loadImage("./assets/platform.png");
  cloudImg = loadImage("./assets/Cloud2.png");


  candyImg = loadImage("./assets/candy.png");
  catL = loadImage("./assets/catL.png");
  catR = loadImage("./assets/catR.png");
  catIdle = loadImage("./assets/catIdle.png");

  lightsImg = loadImage("./assets/lights.png");
  ornamentsImg = loadImage('./assets/ornaments.png');

  pauseImg = loadImage("./assets/pause.png");
  playImg = loadImage("./assets/play.png");

  BGMusic = loadSound("Music.mp3");
  winSound = loadSound("starSFX.mp3");

  giftImg = loadImage("./assets/gift.png");

  
}



function setup(){
  createCanvas(600, 600);
  redBar = createSprite(300,600, 600,20);
  redBar.visible = false;
  
  

  Player = createSprite(300,300, 50,50);
  Player.addImage(playerImgR);
  Player.scale = 0.2;
  Player.setCollider("rectangle", 0,0,600,350);
  Player.debug = false;
  
  Restart = createSprite(300,280, 100,100);
  Restart.addImage(restartImg);
  Restart.visible = false;
  gameOver = createSprite(300,150, 100,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  platformGroup = new Group();
  cloudGroup = new Group();

  plat2Group = new Group();
  //Player.debug = true;
  

  candy = createSprite(300,300, 100,100);
  candy.addImage(candyImg);
  candy.visible = false;
  candy.scale = 0.5;

  gift = createSprite(300,300, 100,100);
  gift.addImage(giftImg);
  gift.visible = false;
  gift.scale = 0.5;

  pause = createSprite(300,39, 50,50);
  pause.addImage(pauseImg);
  pause.scale = 0.1;


}



function draw(){
  background('#2B3B40');
  


  // GAME
  if (gameState===GAME){
    if (frameCount > 0 && frameCount > 10){
      score = score +1;
    }

    characterMovementStage1();

    if (keyDown("space")){
     Player.velocityY = -3;
    }
    
    Player.velocityY = Player.velocityY + 0.4;
    
    
    if (Player.isTouching(platformGroup)){
      Player.collide(platformGroup);
      Player.addImage(playerstap);
    }
    
 
    
  spawnPlatform();  

  winCandy();

  if (score >= 920){
    gameState = STAGE2;
  }

  

  
  if (mousePressedOver(pause)){
  gameState = PAUSE;
  pause.visible
  }
   
}




if (gameState===STAGE2){
  if (frameCount > 0 && frameCount > 10){
    score = score +1;
  }

  characterMovementStage2();

  if (keyDown("space")){
   Player.velocityY = -3;
  }
  
  Player.velocityY = Player.velocityY + 0.4;
  
  
  if (Player.isTouching(platformGroup)){
    Player.collide(platformGroup);
    Player.addImage(catIdle);
  }
  

  winGifts();  
spawnPlatformForStage2();  
 
}


if (gameState===PAUSE){
  pauseGame();
  play = createSprite(300,39, 50,50);
  play.addImage(playImg);
  play.scale = 0.1;


  if (mousePressedOver(play)){
    gameState = GAME;
    play.destroy();
    }
}


//The game ends if these:
if (Player.isTouching(plat2Group)){
  gameState = END;
  gameEnd();
}

if (Player.isTouching(redBar)){
  gameState = END;
  gameEnd();
}

drawSprites();



  //scores
  textFont('Creepster');
  fill('black');
  strokeWeight(5);
  stroke('#8D2E06');
  textSize(24);
  text("Score: "+ score, 395,50);
  text("Prices Recieved: "+ prizeScore, 40,50);
}

function winGifts(){
if (score > 0 && score % 1200 === 0 && score < 4800){
  gift.visible = true;
  candy.visible = false;
  prizeScore = prizeScore +1;
}
if (score > 0 && score % 1250 === 0 ){
  gift.visible = false;
}
}


function winCandy(){
  if (score > 0 && score % 300 === 0 && score < 910){
    candy.visible = true;
    prizeScore = prizeScore +1;
  }
  if (score > 0 && score % 360 === 0 ){
    candy.visible = false;
  }

}


function spawnPlatform(){
if (frameCount % 60 === 0){
  platform = createSprite(200,10,350,60);
  platform.setCollider("rectangle", -50,100,800,80);
  platform.debug = false;
  platform.scale = 0.2;
  platform.addImage(platformImg);
  platform.x = Math.round(random(0,550));
  platform.velocityY = 3;

  plat2 = createSprite(220,10,355,70);
  plat2.addImage(cloudImg);
  plat2.setCollider("rectangle", -40, 200,600,60);
  plat2.debug = true;
  plat2.scale = 0.2;
  plat2.x = platform.x -5;
  plat2.y = platform.y +10;
  plat2.velocityY = platform.velocityY;

    
  platform.depth = Player.depth +1;

  platform.lifetime = 220;
  platformGroup.add(platform);


  plat2.lifetime = 220;
  plat2Group.add(plat2);
}
}

function spawnPlatformForStage2(){
  if (frameCount % 60 === 0){
    platform = createSprite(200,10,350,60);
    platform.setCollider("rectangle", -60,-40,1000,70);
    platform.debug = true;
    platform.scale = 0.2;
    platform.addImage(lightsImg);
    platform.x = Math.round(random(0,550));
    platform.velocityY = 3;
    platform.depth() 
  
    plat2 = createSprite(220,10,355,70);
    plat2.addImage(ornamentsImg);
    plat2.setCollider("rectangle", 0, 30,1000,60);
    plat2.debug = true;
    plat2.scale = 0.2;
    plat2.x = platform.x -5;
    plat2.y = platform.y +10;
    plat2.velocityY = platform.velocityY;
  
      
    platform.depth = Player.depth +1;
  
    platform.lifetime = 220;
    platformGroup.add(platform);
  
  
    plat2.lifetime = 220;
    plat2Group.add(plat2);
  }
}


function gameEnd(){
  gameOver.visible = true;
  Restart.visible = true;

  plat2.velocityY = 0;
  plat2.velocityX = 0;
  platform.velocityY = 0;
  platform.velocityX = 0;
  plat2Group.velocityY = 0;
  plat2Group.velocityX = 0;
  platformGroup.velocityY = 0;
  platformGroup.velocityX = 0;
  Player.velocityY = 0;
  Player.velocityX = 0;

  platform.lifetime = -1;
  plat2.lifetime = -1;
  platformGroup.lifetime = -1;
  plat2Group.lifetime = -1;

  
  plat2.visible = false;
  platform.visible = false;

  plat2Group.visible = false;
  platformGroup.visible = false;

  Player.visible = false;

  if (mousePressedOver(Restart)){
    gameState = GAME;
    score = 0;
    candyScore = 0;
    spawnPlatform();
    gamePlay();
  }
}





function gamePlay(){
  gameOver.visible = false;
  Restart.visible = false;
  
  Player.visible = true;
  Player.x = 300;
  Player.y = 300;


}




function characterMovementStage1(){
  
  if (keyDown("a")){
    Player.x = Player.x -3;
    Player.addImage(playerImgR);
  }
  if (keyDown("d")){
    Player.x = Player.x +3;
    Player.addImage(playerImgL);
  }
  Player.scale = 0.2;
}


function characterMovementStage2(){
  
  if (keyDown("a")){
    Player.x = Player.x -3;
    Player.addImage(catL);
  }
  if (keyDown("d")){
    Player.x = Player.x +3;
    Player.addImage(catR);
  }
  Player.scale = 0.1;
}

function pauseGame(){
  
  plat2.velocityY = 0;
  plat2.velocityX = 0;
  platform.velocityY = 0;
  platform.velocityX = 0;
  plat2Group.velocityY = 0;
  plat2Group.velocityX = 0;
  platformGroup.velocityY = 0;
  platformGroup.velocityX = 0;
  Player.velocityY = 0;
  Player.velocityX = 0;

 
}





