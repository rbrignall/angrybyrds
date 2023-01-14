const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;


var engine, world, bg, backgroundImg;
var level = 0; // default
var starscore = [0,0,0];
var fundoImg, padlockImg;
var solo, platform;
var birds = [], sling;
var slingTaught = false; // When user clicks to pull back sling
var crates = [];
var trunks = [];
var pigs = [];
var points = 0;
var displaypoints = 0;
var chances;
var currentbird;
var gamestate = "playing";
var isTwoStar = false;
var isThreeStar = false;
var isFourStar = false;
var highscore = JSON.parse(localStorage.getItem("highscores") || "[0,0,0]");
var stars = JSON.parse(localStorage.getItem("stars") || "[0,0,0]");
var levelunlocked = JSON.parse(localStorage.getItem("levelunlocked") || "[true,false,false]");
console.log(highscore);
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
    padlockImg = loadImage("assets/padlock.png");
    
    starSgrey = loadImage("assets/Sstargrey.png");
    starATgrey = loadImage("assets/ATstargrey.png");
    starBgrey = loadImage("assets/Bstargrey.png");
    starS = loadImage("assets/Sstar.png");
    starA = loadImage("assets/Astar.png");
    starT = loadImage("assets/Tstar.png");
    starB = loadImage("assets/Bstar.png");
    
    song = loadSound('assets/Gloria.mp3');
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
    
    menubtn = createImg("assets/menu.png");
    menubtn.position(60,12);
    menubtn.size(35,35);
    menubtn.mouseClicked(()=>{loadMenu()});
    menubtn.hide();

    soundbtn = createImg("assets/sound.png");
    soundbtn.position(GAMEWIDTH-55,12);
    soundbtn.size(35,35);
    soundbtn.mouseClicked(()=>{toggleSong()});
    soundoffbtn = createImg("assets/soundoff.png");
    soundoffbtn.position(GAMEWIDTH-55,12);
    soundoffbtn.size(35,35);
    soundoffbtn.mouseClicked(()=>{toggleSong()});
    soundbtn.hide();

    nextbtn = createImg("assets/next.png");
    nextbtn.position(GAMEWIDTH/2+CRATEr,GAMEHEIGHT-2*CRATEr);
    nextbtn.size(CRATEr,CRATEr);
    nextbtn.mouseClicked(()=>{loadNextGame()});
    nextbtn.hide();

    aboutbtn = createImg("assets/about.png");
    aboutbtn.hide();

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
    menubtn.position(60,12);
    menubtn.size(35,35);
    refreshbtn.position(20,12);
    refreshbtn.size(35,35);
    nextbtn.hide();
}

function loadNextGame() {
    level++;
    reloadLevel();
}

function loadMenu() {
    rectMode(CORNER);
    clearLevel();
    reset();
    menubtn.position(60,12);
    menubtn.size(35,35);
    refreshbtn.position(20,12);
    refreshbtn.size(35,35);
    menubtn.hide();
    refreshbtn.hide();
    nextbtn.hide();
    curScreen = "menu";
}

function toggleSong() {
    if (song.isPlaying()) {
        song.stop();
        soundbtn.hide();
        soundoffbtn.show();
    } else {
        song.play();
        soundoffbtn.hide();
        soundbtn.show();
    }
}

function draw(){
    if (curScreen === "game")
        drawgame();
    else if (curScreen === "menu") {
        
        push();
        fill(255);
        rect(0,0,GAMEWIDTH,GAMEHEIGHT);
        textSize(30);
        textAlign(CENTER);
        text("Angry Byrds", GAMEWIDTH/2, 30);
        for (var i = 0; i < LEVELS; i++) {
            if (levelunlocked[i]) {
                fill(161,223,80);
                rect(GAMEWIDTH*(i+1)/4-75,50,150,150,20);
                fill(218,255,138);
                rect(GAMEWIDTH*(i+1)/4-70,55,140,140,17);
                
                image(stars[i] > 3 ? starB : starBgrey,GAMEWIDTH*(i+1)/4+35,115,40,40);                
                image(stars[i] > 2 ? starT : starATgrey,GAMEWIDTH*(i+1)/4,105,40,40);
                image(stars[i] > 1 ? starA : starATgrey,GAMEWIDTH*(i+1)/4-40,105,40,40);
                image(stars[i] > 0 ? starS : starSgrey,GAMEWIDTH*(i+1)/4-75,115,40,40);                
            } else {
                fill(101);
                rect(GAMEWIDTH*(i+1)/4-75,50,150,150,20);
                fill(151);
                rect(GAMEWIDTH*(i+1)/4-70,55,140,140,17);
                image(padlockImg,GAMEWIDTH*(i+1)/4-padlockImg.width/2,125);
            }    
            textSize(30);
            fill("black");        
            text("Level "+(i+1), GAMEWIDTH*(i+1)/4, 95);
            if (highscore[i] > 0) {
                textSize(15);
                text("Highscore: "+highscore[i], GAMEWIDTH*(i+1)/4, 175);
            }
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
    textSize(30);
    fill("white");
    if(displaypoints < points)
        displaypoints += 5;//Math.min(10,points-displaypoints);
    text("Score: "+displaypoints, width-210, 40);
    text(chances, 130, 40);
    image(birds[0].image,100,13,30,30);

    Engine.update(engine);
    
    solo.display();
    platform.display();

    for (i = 0; i < crates.length; i++)
        crates[i].display();
    for (i = 0; i < trunks.length; i++)
        trunks[i].display();
    for (i = 0; i < pigs.length; i++)
        pigs[i].display();
    for (i=0; i < birds.length; i++)
        birds[i].display(); 

    sling.display();  
    
    if (pigs.every(pig => pig.status === "dead")) {
        if(gamestate != "win") {
            points += chances * 100;
            gamestate = "win";
            if (level < LEVELS-1)
                levelunlocked[level+1] = true;
            localStorage.setItem("levelunlocked",JSON.stringify(levelunlocked));
            delay(3000).then(() => {clearLevel(); showGameOver=true});
        }
    } else if (chances<=0 && gamestate === "pending") {               
        gamestate = "lose";
        delay(3000).then(() => {clearLevel(); showGameOver=true});
    }
    if (showGameOver) {
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
function mouseClicked(){
    if (curScreen === "menu") {
 //       if (song.isPlaying()) {
//        } else {
//            song.play();
//        }
        if (Math.abs(mouseY-125) <= 75) {
            if (Math.abs(mouseX-GAMEWIDTH/4) <= 75) {
                level = 0;
                setupLevel(levelOne);
                refreshbtn.show();
                menubtn.show();
                curScreen = "game";
            }
            if (Math.abs(mouseX-2*GAMEWIDTH/4) <= 75) {
                level = 1;
                setupLevel(levelTwo);
                refreshbtn.show();
                menubtn.show();
                curScreen = "game";
            }
            if (Math.abs(mouseX-3*GAMEWIDTH/4) <= 75) {
                level = 2;
                setupLevel(levelThree);
                refreshbtn.show();
                menubtn.show();
                curScreen = "game";
            }
        }
    }
    return false;
}      */  

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
                    Body.setPosition(birds[currentbird].body, {x: forkx, y: platformcoord-FORKh});
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
    if (curScreen === "menu") {
 /*       if (song.isPlaying()) {
        } else {
            song.play();
        }*/
        if (Math.abs(mouseY-125) <= 75) {
            if (Math.abs(mouseX-GAMEWIDTH/4) <= 75) {
                level = 0;
                setupLevel(levelOne);
                refreshbtn.show();
                menubtn.show();
                curScreen = "game";
            }
            if (Math.abs(mouseX-2*GAMEWIDTH/4) <= 75) {
                level = 1;
                setupLevel(levelTwo);
                refreshbtn.show();
                menubtn.show();
                curScreen = "game";
            }
            if (Math.abs(mouseX-3*GAMEWIDTH/4) <= 75) {
                level = 2;
                setupLevel(levelThree);
                refreshbtn.show();
                menubtn.show();
                curScreen = "game";
            }
        }
    }
    return false;
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
    if (points > highscore[level]) {
        highscore[level] = points;
        localStorage.setItem("highscores",JSON.stringify(highscore));
        if (pigs.every(pig => pig.status === "dead")) {
            stars[level] = Math.max(stars[level],starscore.filter(number => number < points).length + 1);
            localStorage.setItem("stars",JSON.stringify(stars));
        }
    }
    if(points > starscore[0] && !isTwoStar)
        delay(750).then(() => {
            isTwoStar = true;
            if(points > starscore[1] && !isThreeStar)
                delay(750).then(() => {
                    isThreeStar = true;
                    if(points > starscore[2] && !isFourStar)
                        delay(750).then(() => {
                            isFourStar = true;

                        });  
                });
        });
    // TODO: Do this just once:
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
