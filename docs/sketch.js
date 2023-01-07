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
var bird, sling;
var estado = "loaded";
var points = 0;
var chances= 3;
var reiniciar;

function preload() {
    getBackgroundImg();
    fundoImg = loadImage("sprites/bg.png");
}

function setup(){
    // TODO: If width < height, tell user to rotate screen
    // TODO: move some of these parameters to consts.js
    var gamewidth = window.innerWidth;
    var gameheight = window.innerHeight;
    var baseheight = 60;
    var groundcoord = gameheight-baseheight;
    var platformcoord = gameheight-PLATFORMHEIGHT-baseheight;
    var canvas = createCanvas(gamewidth,gameheight);
    engine = Engine.create();
    world = engine.world;


    solo = new Solo(gamewidth/2,gameheight-baseheight/2,gamewidth,baseheight);
    plataforma = new Solo(PLATFORMWIDTH/2, groundcoord-PLATFORMHEIGHT/2, PLATFORMWIDTH, PLATFORMHEIGHT);

    crate1 = new Crate(700,groundcoord,70,70);
    crate2 = new Crate(920,groundcoord,70,70);
    pig1 = new Pig(810,groundcoord);
    trunk1 = new Trunk(810,groundcoord-70,300, PI/2);

    crate3 = new Crate(700,groundcoord-150,70,70);
    crate4 = new Crate(920,groundcoord-150,70,70);
    pig2 = new Pig(810, groundcoord-100);

    trunk3 =  new Trunk(810,groundcoord-220,300, PI/2);

    crate5 = new Crate(810,groundcoord-250,70,70);
    trunk4 = new Trunk(760,groundcoord-250,150, PI/7);
    log5 = new Trunk(870,groundcoord-250,150, -PI/7);

    bird = new Byrd(200,platformcoord-255);

    sling = new Sling(bird.body,{x:200, y:platformcoord-250});

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
    image(bird.image,70,13,30,30);

    Engine.update(engine);
    //strokeWeight(4);
    crate1.display();
    crate2.display();
    solo.display();
    pig1.display();
    pig1.score();
    trunk1.display();

    crate3.display();
    crate4.display();
    pig2.display();
    pig2.score();
    trunk3.display();

    crate5.display();
    trunk4.display();
    log5.display();

    if(chances<=0 && estado === "loaded"){
    }else{
        bird.display(); 
    }
    
    plataforma.display();
    //log6.display();
    sling.display();  
    
    // Draw next birds:
    if (chances > 1){
        image(bird.image,110,height-310,50,50);

        if (chances > 2){
            image(bird.image,40,height-310,50,50);
        }
    } 

    if (points === 400){
        textSize(50);
        fill("white");
        text("You win!",450,200);
    } else if (chances<=0){
        textSize(50);
        fill("white");
        text("Try again...",450,200);
    }
    
    if (mouseIsPressed && chances > 0 && estado === "loaded"){
        Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}
function mousePressed(){
    if(estado === "released" && chances > 0) {
        sling.ligar();
        Body.setPosition(bird.body, {x: 200, y: 50});
        Body.setAngle(bird.body,0);
        estado = "loaded";
        bird.trajectory = []; 
    }
}

function mouseReleased(){
    if (estado === "loaded" && chances>0){
        sling.voar();
        estado = "released";
        chances--;
    }
}

function keyPressed(){
    if(keyCode === 32 && chances > 0){
        sling.ligar();
        Body.setPosition(bird.body, {x: 200, y: 50});
        Body.setAngle(bird.body,0);
        estado = "loaded";
        bird.trajectory = [];  
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London");
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
