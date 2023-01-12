const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;


var engine, world, bg, backgroundImg;
var level = 0; // default
var levelunlocked = [true,false,false];
var starscore = [0,0,0];
var fundoImg, padlockImg;
var solo, platform;
var birds = [], sling;
var slingTaught = false; // When user clicks to pull back sling
var crates = [];
var trunks = [];
var pigs = [];
var points = 0;
var chances;
var currentbird;
var gamestate = "playing";
var isTwoStar = false;
var isThreeStar = false;
var isFourStar = false;
var highscore = localStorage.getItem("highscore") || 0;
var showGameOver = false;
var curScreen = "menu";
/* Options for curScreen:
menu        General menu to select levels
credits     Credits modal
game        Playing game
-------------------------*/

function preload() {
    getBackgroundImg();
    fundoImg = loadImage("sprites/bg.png");
    padlockImg = loadImage("sprites/padlock.png");
    song = loadSound('Gloria.mp3');
}

function setup(){
    var canvas = createCanvas(GAMEWIDTH,GAMEHEIGHT);
    engine = Engine.create();
    world = engine.world;

    refreshbtn = createImg("sprites/menu_refresh.png");
    refreshbtn.position(20,12);
    refreshbtn.size(35,35);
    refreshbtn.mouseClicked(()=>{reloadLevel()});//location.reload()});
    refreshbtn.hide(); // Hide until we need it
}

function reset(){
    crates = [];
    trunks = [];
    pigs = [];
    birds = [];
}

function reloadLevel() {
    clearLevel(); // Removes world bodies
    reset(); // Removes array entities
    if (level === 0)
        setupLevel(levelOne);
    else if (level === 1)
        setupLevel(levelTwo);
    else if (level === 2)
        setupLevel(levelThree);
    refreshbtn.position(20,12);
    refreshbtn.size(35,35);
}


function draw(){
    if (curScreen === "game")
        drawgame();
    else if (curScreen === "menu") {
        push();
        // TODO: menu page    
        textSize(30);
        textAlign(CENTER);
        text("Angry Byrds", GAMEWIDTH/2, 30);
        for (var i = 0; i < 3; i++) {
            if (levelunlocked[i]) {
                fill(212,175,55);
                rect(GAMEWIDTH*(i+1)/4-75,50,150,150,20);
                fill(255,223,0);
                rect(GAMEWIDTH*(i+1)/4-70,55,140,140,17);
                
            } else {
                fill(101);
                rect(GAMEWIDTH*(i+1)/4-75,50,150,150,20);
                fill(151);
                rect(GAMEWIDTH*(i+1)/4-70,55,140,140,17);
                image(padlockImg,GAMEWIDTH*(i+1)/4-padlockImg.width/2,125);
            }    
            fill("black");        
            text("Level "+(i+1), GAMEWIDTH*(i+1)/4, 95);
        }
        pop();
    }
}

// Main game drwaing routine:
function drawgame(){
    if (backgroundImg){
        background(backgroundImg);
    } else {
        background(fundoImg);
    }

    noStroke();
    textSize(35);
    fill("white");
    text("Points: "+points, width-250, 50);
    text(chances, 110, 40);
    image(birds[0].image,70,13,30,30);

    Engine.update(engine);
    
    for (i = 0; i < crates.length; i++)
        crates[i].display();
    for (i = 0; i < trunks.length; i++)
        trunks[i].display();
    for (i = 0; i < pigs.length; i++)
        pigs[i].display();
    for (i=0; i < CHANCES; i++)
        birds[i].display(); 

    solo.display();
    platform.display();
    sling.display();  
    
    if (pigs.every(pig => pig.status === "dead")) {
        if(gamestate != "win") {
            points += chances * 100;
            gamestate = "win";
            delay(3000).then(() => {showGameOver=true});
        }
    } else if (chances<=0 && gamestate === "pending") {               
        gamestate = "lose";
        delay(1000).then(() => {showGameOver=true});
    }
    if (showGameOver) {
        clearLevel();
        gameOverModal();
    }
    forkx,platformcoord-FORKh-5
    // Activate slingshot:
    if (mouseIsPressed && chances > 0 && birds[currentbird].status === "loaded" &&
        ((Math.abs(mouseX-forkx) < 20 && Math.abs(mouseY-platformcoord+FORKh) < 20) || slingTaught )){
        Body.setPosition(birds[currentbird].body, {x: mouseX , y: mouseY});
        slingTaught = true;
    }
}
/*
function mousePressed() {
  if (song.isPlaying()) {
  } else {
    song.play();
  }
}
*/
function mouseClicked(){
    if (curScreen === "menu") {
        if (song.isPlaying()) {
        } else {
            song.play();
        }
        if (Math.abs(mouseY-125) <= 75) {
            if (Math.abs(mouseX-GAMEWIDTH/4) <= 75) {
                setupLevel(levelOne);
                refreshbtn.show();
                curScreen = "game";
            }
            // TODO: levels 2 and 3
        }
    }
    
}        

function mouseReleased(){
    if (curScreen === "game") {
        // FIRE!
        if ( chances>0 && birds[currentbird].status === "loaded" && slingTaught){
            sling.fire();
            slingTaught = false;
            birds[currentbird].status = "released";
            chances--;
            delay(2000).then(() => {
                // Load next bird after 2 second delay
                currentbird--;
                if(chances>0) {
                    Body.setPosition(birds[currentbird].body, {x: forkx, y: platformcoord-FORKh-5});
                    Body.setAngle(birds[currentbird].body,0);
                    sling.bodyA = birds[currentbird].body;
                    sling.mount();
                    birds[currentbird+1].trajectory = [];
                    birds[currentbird].status = "loaded";
                } else {
                    gamestate = "pending";
                }
            });
        }
    }
}
/*
function keyPressed(){
    if(keyCode === 32 && chances > 0){
        sling.mount();
        birds[currentbird].status = "loaded";
        Body.setPosition(birds[currentbird].body, {x: 200, y: 50});
        Body.setAngle(birds[currentbird].body,0);
        birds[currentbird].trajectory = [];
    }
}
*/

function triggerStars(){
    if (points > highscore) {
        highscore = points;
        localStorage.setItem("highscore",highscore);
    }
    if(points > starscore[0])
        delay(750).then(() => {
            isTwoStar = true;
            if(points > starscore[1])
                delay(750).then(() => {
                    isThreeStar = true;
                    if(points > starscore[2])
                        delay(750).then(() => {
                            isFourStar = true;
                        });  
                });
        });
}



function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Europe/London");
    //console.log(response);
    var responseJSON = await response.json();
    //console.log(responseJSON);

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if (hour >= 06 && hour <19){
        bg = "sprites/bg.png";
    } else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
