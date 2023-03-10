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
var showAbout = false;
var curScreen = "menu";
/* Options for curScreen:
menu        General menu to select levels
credits     Credits modal
game        Playing game
-------------------------*/
var elem = document.documentElement;
function preload() {
    getBackgroundImg();
    fundoImg = loadImage("sprites/bg.png");
    padlockImg = loadImage(PADLOCKSVG);
    gloriaImg = loadImage("assets/bggloria.png")
    
    starSgrey = loadImage("assets/Sstargrey.png");
    starATgrey = loadImage("assets/ATstargrey.png");
    starBgrey = loadImage("assets/Bstargrey.png");
    starS = loadImage("assets/Sstar.png");
    starA = loadImage("assets/Astar.png");
    starT = loadImage("assets/Tstar.png");
    starB = loadImage("assets/Bstar.png");
//    coffee = loadImage("https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png");
    song = loadSound('assets/Gloria.mp3');
}



function clicktoplay() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { 
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { 
        elem.msRequestFullscreen();
    }
    document.getElementById("clicktoplay").style.display = 'none';
    document.getElementById('runningtitle').style.display = 'block';
    document.getElementById("gamecanvas").style.display = 'block';
    var soundon = localStorage.getItem("sound") ?? "on";
    if(soundon === "on")
        toggleSong();
    else
        soundoffbtn.show();
    closebtn.show();
    aboutbtn.show();
}

function closeGame() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    loadMenu();
    document.getElementById("clicktoplay").style.display = 'block';
    document.getElementById("gamecanvas").style.display = 'none';
    document.getElementById('runningtitle').style.display = 'none';
    if (song.isPlaying())
        song.stop();
    closebtn.hide();
    menubtn.hide();
    refreshbtn.hide();
    nextbtn.hide();
    coffeebtn.hide();
    soundbtn.hide();
    soundoffbtn.hide();
    aboutbtn.hide();
}

function setup(){
    pixelDensity(1);
    var canvas = createCanvas(GAMEWIDTH,GAMEHEIGHT);
    canvas.id('gamecanvas');
    engine = Engine.create();
    world = engine.world;
    document.getElementById("run").style.display = "block";
    
    refreshbtn = createImg(REFRESHSVG);
    refreshbtn.position(BTNSIZE,BTNSIZE/2);
    refreshbtn.size(BTNSIZE,BTNSIZE);
    refreshbtn.mouseClicked(()=>{reloadLevel()});//location.reload()});
    refreshbtn.hide(); // Hide until we need it
    
    menubtn = createImg(MENUSVG);
    menubtn.position(2*BTNSIZE,BTNSIZE/2);
    menubtn.size(BTNSIZE,BTNSIZE);
    menubtn.mouseClicked(()=>{loadMenu()});
    menubtn.hide();

    soundbtn = createImg(SOUNDONSVG);
    soundbtn.position(SCRNWIDTH-3*BTNSIZE,BTNSIZE/2);
    soundbtn.size(BTNSIZE,BTNSIZE);
    soundbtn.mouseClicked(()=>{toggleSong()});
    soundoffbtn = createImg(SOUNDOFFSVG);
    soundoffbtn.position(SCRNWIDTH-3*BTNSIZE,BTNSIZE/2);
    soundoffbtn.size(BTNSIZE,BTNSIZE);
    soundoffbtn.mouseClicked(()=>{toggleSong()});
    soundbtn.hide();
    soundoffbtn.hide();
    
    closebtn = createImg(CLOSESVG);
    closebtn.position(SCRNWIDTH-2*BTNSIZE,BTNSIZE/2);
    closebtn.size(BTNSIZE,BTNSIZE);
    closebtn.mouseClicked(()=>{closeGame()});
    closebtn.hide();

    nextbtn = createImg(NEXTSVG);
    nextbtn.position(SCRNWIDTH/2+BTNSIZE,SCRNHEIGHT-2*BTNSIZE);
    nextbtn.size(2*BTNSIZE,2*BTNSIZE);
    nextbtn.mouseClicked(()=>{loadNextGame()});
    nextbtn.hide();

    aboutbtn = createImg(ABOUTSVG);
    aboutbtn.position(BTNSIZE,BTNSIZE/2);
    aboutbtn.size(BTNSIZE,BTNSIZE);
    aboutbtn.mouseClicked(()=>{toggleAbout()});
    aboutbtn.hide();
    
    coffeebtn = createImg(COFFEESVG);
    coffeebtn.position(SCRNWIDTH/2+BTNSIZE,SCRNHEIGHT-2*BTNSIZE);
    coffeebtn.size(2*BTNSIZE,2*BTNSIZE);
    coffeebtn.mouseClicked(()=>{window.open('https://www.buymeacoffee.com/rbrignall', '_blank').focus()});
    coffeebtn.hide();
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
    menubtn.position(2*BTNSIZE,BTNSIZE/2);
    menubtn.size(BTNSIZE,BTNSIZE);
    refreshbtn.position(BTNSIZE,BTNSIZE/2);
    refreshbtn.size(BTNSIZE,BTNSIZE);
    nextbtn.hide();
    coffeebtn.hide();
}

function loadNextGame() {
    level++;
    reloadLevel();
}

function loadMenu() {
    document.getElementById('runningtitle').style.display = 'block';
    rectMode(CORNER);
    clearLevel();
    reset();    
    menubtn.position(2*BTNSIZE,BTNSIZE/2);
    menubtn.size(BTNSIZE,BTNSIZE);
    refreshbtn.position(BTNSIZE,BTNSIZE/2);
    refreshbtn.size(BTNSIZE,BTNSIZE);
    menubtn.hide();
    refreshbtn.hide();
    nextbtn.hide();
    coffeebtn.hide();
    aboutbtn.show();
    curScreen = "menu";
}

function toggleSong() {
    if (song.isPlaying()) {
        localStorage.setItem("sound","off");
        song.stop();
        soundbtn.hide();
        soundoffbtn.show();
    } else {
        localStorage.setItem("sound","on");
        song.play();
        soundoffbtn.hide();
        soundbtn.show();
    }
}

function toggleAbout() {
    if(showAbout) 
        document.getElementById("about").style.display = "none";
    else
        document.getElementById("about").style.display = "block";
    showAbout = !showAbout;
}

function draw(){

    if (curScreen === "game")
        drawgame();
    else if (curScreen === "menu") {
        background(gloriaImg);
        textFont('Verdana');
        textSize(30);
        textAlign(CENTER);
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
    textAlign(RIGHT);
    text("Score: "+displaypoints, GAMEWIDTH-2*BTNSIZE, 40);
    textAlign(LEFT);
    text(chances, 4*BTNSIZE, 40);
    image(birds[0].image,3*BTNSIZE,13,30,30);
    textAlign(CENTER);
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
        ((Math.abs(mouseX-forkx) < 40 && Math.abs(mouseY-platformcoord+FORKh) < 40) || slingTaught )){
        Body.setPosition(birds[currentbird].body, {x: mouseX , y: mouseY});
        slingTaught = true;
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
    } else if (curScreen === "menu" && !showAbout) {
        if (Math.abs(mouseY-125) <= 75) {
            if (Math.abs(mouseX-GAMEWIDTH/4) <= 75) {
                level = 0;
                setupLevel(levelOne);
                aboutbtn.hide();
                refreshbtn.show();
                menubtn.show();
                document.getElementById('runningtitle').style.display = 'none';
                curScreen = "game";
            }
            if (Math.abs(mouseX-2*GAMEWIDTH/4) <= 75 && levelunlocked[1]) {
                level = 1;
                setupLevel(levelTwo);
                aboutbtn.hide();
                refreshbtn.show();
                menubtn.show();
                document.getElementById('runningtitle').style.display = 'none';
                curScreen = "game";
            }
            if (Math.abs(mouseX-3*GAMEWIDTH/4) <= 75 && levelunlocked[2]) {
                level = 2;
                setupLevel(levelThree);
                aboutbtn.hide();
                refreshbtn.show();
                menubtn.show();
                document.getElementById('runningtitle').style.display = 'none';
                curScreen = "game";
            }
        }
    }
}


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
