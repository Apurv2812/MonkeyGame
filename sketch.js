
var monkey , monkey_running;
var banana ,bananaImage,bananaGroup, obstacle, obstacleImage;
var obstaclesGroup;
var score=0;
var survialTime=0;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;
 
  
  ground = createSprite(400,380,900,20);
  ground.velocityX=-4;
   ground.x = ground.width/2;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
background("white");

   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y>=100){
     monkey.velocityY=-12;
  }
   monkey.velocityY = monkey.velocityY+0.8;
  
 
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time "+survivalTime,100,50); 
 
  food();
  obstacles();
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+1;
  }
  if(obstaclesGroup.isTouching(monkey)){
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    ground.velocityX=0;
  }
  
drawSprites();  
   stroke("red");
  textSize(20);
  text("Score "+score,500,50);
  
}



function obstacles(){
   if (frameCount % 300 === 0){
  obstacle = createSprite(600,350);
  obstacle.velocityX=-4;
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2
  obstacle.lifetime=200;
  obstaclesGroup.add(obstacle);
   }
}

function food(){
if(frameCount % 80 === 0){
  banana = createSprite(400,50,20,20);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.velocityX = -1;
  banana.lifetime=300;
  bananaGroup.add(banana);
  banana.scale=0.1;
}

}


