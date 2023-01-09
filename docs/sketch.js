const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, bg, backgroundImg;
var crate1, crate2, pig1, trunk1;
var crate3, crate4, pig2, trunk2;
var crate5, trunk3, trunk4;
var fundoImg, solo, plataforma;
var bird = [], sling;
var points = 0;
var chances= CHANCES;
var currentbird=CHANCES-1;
var reiniciar;
var gamestate = "playing";
var starscore = [430,480,530];
var isTwoStar = false;
var isThreeStar = false;
var isFourStar = false;
var highscore = localStorage.getItem("highscore") || null;


function preload() {
    getBackgroundImg();
    fundoImg = loadImage("sprites/bg.png");
}

function setup(){
   
    var canvas = createCanvas(GAMEWIDTH,GAMEHEIGHT);
    engine = Engine.create();
    world = engine.world;


    solo = new Solo(GAMEWIDTH/2,GAMEHEIGHT-BASEHEIGHT/2,GAMEWIDTH,BASEHEIGHT);
    plataforma = new Solo(PLATFORMWIDTH/2, groundcoord-PLATFORMHEIGHT/2, PLATFORMWIDTH, PLATFORMHEIGHT);

    crate1 = new Crate(citadelx-TRUNKLONGl+CRATEr/2,groundcoord,CRATEr,CRATEr);
    crate2 = new Crate(citadelx-CRATEr/2,groundcoord,CRATEr,CRATEr);
    pig1 = new Pig(citadelx-TRUNKLONGl/2,groundcoord);
    trunk1 = new Trunk(citadelx-TRUNKLONGl/2,groundcoord-CRATEr,TRUNKLONGl, PI/2);

    crate3 = new Crate(citadelx-TRUNKLONGl+CRATEr/2,groundcoord-CRATEr-TRUNKw-30,CRATEr,CRATEr);
    crate4 = new Crate(citadelx-CRATEr/2,groundcoord-CRATEr-TRUNKw-30,CRATEr,CRATEr);
    pig2 = new Pig(citadelx-TRUNKLONGl/2, groundcoord-CRATEr-TRUNKw-10);

    trunk3 =  new Trunk(citadelx-TRUNKLONGl/2,groundcoord-2*CRATEr-3*TRUNKw,TRUNKLONGl, PI/2);

    crate5 = new Crate(citadelx-TRUNKLONGl/2,groundcoord-3*CRATEr-3*TRUNKw,CRATEr,CRATEr);
    trunk4 = new Trunk(citadelx-3*TRUNKLONGl/4,groundcoord-3*CRATEr-4*TRUNKw,TRUNKLONGl/2, PI/7);
    log5 = new Trunk(citadelx-TRUNKLONGl/4,groundcoord-3*CRATEr-4*TRUNKw,TRUNKLONGl/2, -PI/7);

    bird[2] = new Byrd(forkx,platformcoord-FORKh-5);
    bird[2].status = "loaded";
    bird[1] = new Byrd(forkx*2/3,platformcoord-BYRDr);
    bird[0] = new Byrd(forkx/3,platformcoord-BYRDr);

    sling = new Sling(bird[currentbird].body,{x:forkx, y:platformcoord-FORKh});

    refreshbtn = createImg("sprites/menu_refresh.png");
    refreshbtn.position(20,12);
    refreshbtn.size(35,35);
    refreshbtn.mouseClicked(()=>{location.reload()});
}

function draw(){
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
    image(bird[0].image,70,13,30,30);

    Engine.update(engine);
    //strokeWeight(4);
    crate1.display();
    crate2.display();
    solo.display();
    pig1.display();
    trunk1.display();

    crate3.display();
    crate4.display();
    pig2.display();
    trunk3.display();

    crate5.display();
    trunk4.display();
    log5.display();

    for (i=0; i < CHANCES; i++)
        bird[i].display(); 
    
    
    plataforma.display();
    //log6.display();
    sling.display();  
    
    if (pig1.status === "dead" && pig2.status === "dead"){
        if(gamestate != "win") {
            points += chances * 50;
            gamestate = "win";
        }
        gameOverModal();
    } else if ((chances<=0 && gamestate === "pending") || gamestate === "lose"){
        gamestate = "lose";
        gameOverModal();
    }
    
    if (mouseIsPressed && chances > 0 && bird[currentbird].status === "loaded"){
        Body.setPosition(bird[currentbird].body, {x: mouseX , y: mouseY});
    }
}

function mouseReleased(){
    // FIRE!
    if ( chances>0 && bird[currentbird].status === "loaded"){
        sling.fire();
        bird[currentbird].status = "released";
        chances--;
        setTimeout(() => {
            // Load next bird after 2 second delay
            currentbird--;
            if(chances>0) {
                Body.setPosition(bird[currentbird].body, {x: forkx, y: platformcoord-FORKh-5});
                Body.setAngle(bird[currentbird].body,0);
                sling.bodyA = bird[currentbird].body;
                sling.mount();
                bird[currentbird+1].trajectory = [];
                bird[currentbird].status = "loaded";
            } else {
                gamestate = "pending";
            }
        },2000);
    }
}
/*
function keyPressed(){
    if(keyCode === 32 && chances > 0){
        sling.mount();
        bird[currentbird].status = "loaded";
        Body.setPosition(bird[currentbird].body, {x: 200, y: 50});
        Body.setAngle(bird[currentbird].body,0);
        bird[currentbird].trajectory = [];
    }
}
*/

function triggerStars(){
    if (points > highscore) {
        highscore = points;
        localStorage.setItem("highscore",highscore);
    }
    if(points > starscore[0])
        setTimeout(() => {
            isTwoStar = true;
            if(points > starscore[1])
                setTimeout(() => {
                    isThreeStar = true;
                    if(points > starscore[2])
                        setTimeout(() => {
                            isFourStar = true;
                        },750);  
                },750);
        },750);
}

function gameOverModal(){
    refreshbtn.position(GAMEWIDTH/2,GAMEHEIGHT-CRATEr);
    refreshbtn.size(CRATEr,CRATEr);
    triggerStars();
    push();
    fill(51);
    rect(GAMEWIDTH/2, GAMEHEIGHT/2, GAMEWIDTH-40, GAMEHEIGHT-40);
    textSize(30);
    textAlign(CENTER);    
    fill("white");
    text("Score: " + points + "  Highscore: " + highscore,GAMEWIDTH/2,GAMEHEIGHT/2-125);
    textSize(50);
    
    if (gamestate=== "win"){
        text("Sing joyfully!",GAMEWIDTH/2,GAMEHEIGHT/2+50);
        textSize(60);
        fill(255, 204, 0);
        text("S",GAMEWIDTH/2-90,GAMEHEIGHT/2-50)
        if(!isTwoStar) {
            textSize(40);
            fill("black");
        }
        text("A",GAMEWIDTH/2-30,GAMEHEIGHT/2-50);
        if(!isThreeStar) {
            textSize(40);
            fill("black");
        }
        text("T",GAMEWIDTH/2+30,GAMEHEIGHT/2-50);
        if(!isFourStar) {
            textSize(40);
            fill("black");
        }
        text("B",GAMEWIDTH/2+90,GAMEHEIGHT/2-50);
        
    } else {
        text("Lord in Thy Wrath",GAMEWIDTH/2,GAMEHEIGHT/2+50);
        
    }

    
    pop();
}

async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Europe/London");
    console.log(response);
    var responseJSON = await response.json();
    console.log(responseJSON);

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
