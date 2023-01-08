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
var estado = "loaded";
var points = 0;
var chances= 3;
var turn=0;
var reiniciar;

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

    bird[0] = new Byrd(forkx,platformcoord-FORKh-5);
    sling = new Sling(bird[0].body,{x:forkx, y:platformcoord-FORKh});

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

    if(chances<=0){
    }else{
        for (i=0; i <= turn; i++)
        bird[i].display(); 
    }
    
    plataforma.display();
    //log6.display();
    sling.display();  
    
    // Draw next birds:
    if (chances > 1){
        image(bird[turn].image,forkx*2/3,platformcoord
              -BYRDr,BYRDr,BYRDr);

        if (chances > 2){
            image(bird[turn].image,forkx/3,platformcoord-BYRDr,BYRDr,BYRDr);
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
        Body.setPosition(bird[turn].body, {x: mouseX , y: mouseY});
    }
}
function mousePressed(){
    if(estado === "released" && chances > 0) {
        sling.mount();
        Body.setPosition(bird[turn].body, {x: forkx, y: platformcoord-FORKh-5});
        Body.setAngle(bird[turn].body,0);
        estado = "loaded";
        bird[turn].trajectory = []; 
    }
}

function mouseReleased(){
    if (estado === "loaded" && chances>0){
        sling.fire();
        estado = "released";
        // TODO: this should all happen when the previous bird has finished, maybe
        chances--;
        setTimeout(() => {
            turn++;
            if(chances>0) {
                bird[turn] = new Byrd(forkx,platformcoord-FORKh-5);
                //sling = new Sling(bird[turn].body,{x:forkx, y:platformcoord-FORKh});
                sling.bodyA = bird[turn].body;
                sling.mount();
            }
        },4000);
    }
}

function keyPressed(){
    if(keyCode === 32 && chances > 0){
        sling.mount();
        Body.setPosition(bird[turn].body, {x: 200, y: 50});
        Body.setAngle(bird[turn].body,0);
        estado = "loaded";
        bird[turn].trajectory = [];
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
