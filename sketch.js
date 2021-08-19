var mario,obstacle,ground,coin,coinCount;
var marioImg,marioJumping,obstacleImg,groundImg,coinImg,jumpSound;
var obstacleGroup,coinGroup;
var velocity;

var score,coins;

var PLAY=1;
var END=0;
var gamestate=PLAY;

function preload(){
    marioImg=loadImage('images/mario.png');
    marioJumping=loadImage('images/marioJumping.png');
    
    obstacleImg=loadImage('images/obstacle.png');

    groundImg=loadImage('images/marioGround.png');

    coinImg=loadImage('images/coin.png');

    jumpSound=loadSound('Mario-jump-sound.mp3');
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    mario=createSprite(displayWidth/8,displayHeight*(36/40),15,15);
    mario.addImage(marioImg);
    mario.scale=0.01;

    ground=createSprite(0,displayHeight,displayWidth*4,100);
    ground.addImage(groundImg);
    ground.scale=1; 
    ground.velocityX=-6;   

    obstacleGroup=new Group();
    coinGroup=new Group();

    velocity=-6;

    score=0;

    coinCount=0;
}

function draw(){
    if(gamestate===PLAY){
    background('lightblue');

    textSize(15);
    text('Score: '+score,displayWidth/8,displayHeight/4);
    
    spawnObstacles();

    mario.collide(ground);
    mario.velocityY+=0.8;

    if(touches.length>0||keyDown('space')&&mario.y>displayHeight*(34/40)){
        mario.velocityY=-15;
        jumpSound.play();
        touches=[];
    }
    
    if(ground.x<=displayWidth/4){
        ground.x=displayWidth*(3/4);
    }

    if(frameCount%500===0){
        ground.velocityX-=1;
        velocity-=1;
    }

    if(mario.isTouching(obstacleGroup)){
        gamestate=END;
    }
    
    if(frameCount%3===0){
        score++;
    }

    createCoins();

    if(mario.isTouching(coinGroup)){
        coinGroup.destroyEach();
        coinCount++;
    }

    text('Coins: '+coinCount,displayWidth/8,displayWidth*(3/16));

    drawSprites();
    console.log(mario.y);
    }


    if(gamestate===END){
        background('black');
        fill('yellow');
        textSize(50);
        text('Game Over!',displayWidth/3,displayHeight/2);
        textSize(15);
        text('Your final score was '+score+'!',displayWidth/2.7,displayHeight*(25/40));
        text('Press space to play again',displayWidth*(3/8),displayHeight*(27/40));

        if(keyDown('space')||touches.length>0){
            gamestate=PLAY;
            score=0;
            coinCount=0;

            touches=[];

            obstacleGroup.destroyEach();
            coinGroup.destroyEach();

            ground.velocityX=-6;
            velocity=-6;
            mario.y=displayHeight*(325/400);


        }
    }
}

function spawnObstacles(){
    if(frameCount%170===0){
        var obstacle=createSprite(displayWidth+displayWidth/8,displayHeight*(345/400),15,15);
        obstacle.addImage(obstacleImg);
        obstacle.scale=0.05;
        obstacle.velocityX=velocity;
        obstacle.lifetime=5000;
        obstacleGroup.add(obstacle);
    }
}

function createCoins(){
    if(frameCount%140===0){
        coin=createSprite(displayWidth+displayWidth/8,displayHeight*(26/40),10,10);
        coin.addImage(coinImg);
        coin.velocityX=velocity;
        coin.scale=0.03;
        coin.lifetime=5000;
        coinGroup.add(coin);
    }
}