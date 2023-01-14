const levelOne = {
    crates: [{
            x: citadelx-TRUNKLONGl+CRATEr/2,
            y: groundcoord-CRATEr/2
        },
        {
            x: citadelx-CRATEr/2,
            y: groundcoord-CRATEr/2
        },
        {
            x: citadelx-TRUNKLONGl+CRATEr/2,
            y: groundcoord-1.5*CRATEr-TRUNKw-30
        },
        {
            x: citadelx-CRATEr/2,
            y: groundcoord-1.5*CRATEr-TRUNKw-30
        },
        {
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-2.5*CRATEr-4*TRUNKw
        }
    ],
    trunks: [{
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-CRATEr-TRUNKw/2,
            length: TRUNKLONGl,
            angle: 0 
        },
        {
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-2*CRATEr-3*TRUNKw,
            length: TRUNKLONGl,
            angle: 0 
        },
        {
            x: citadelx-3*TRUNKLONGl/4,
            y: groundcoord-2*CRATEr-5*TRUNKw,
            length: TRUNKLONGl/2,
            angle: -2*Math.PI/7 
        },
        {
            x: citadelx-TRUNKLONGl/4,
            y: groundcoord-2*CRATEr-5*TRUNKw,
            length: TRUNKLONGl/2,
            angle: 2*Math.PI/7
        }
    ],
    pigs: [{
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-PIGy/2
        },
        {
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-CRATEr-TRUNKw-PIGy/2
        },
    ],
    chances: 3,
    starscore: [430,520,600],
}

const levelTwo = {
    crates: [{
            x: citadelx-1.2*TRUNKLONGl,
            y: groundcoord-CRATEr/2
        },
        {
            x: citadelx-1.2*TRUNKLONGl-CRATEr-TRUNKw,
            y: groundcoord-CRATEr/2
        },
        {
            x: citadelx-1.2*TRUNKLONGl-2*CRATEr-2*TRUNKw,
            y: groundcoord-CRATEr/2
        },
        {
            x: citadelx+CRATEr,
            y: groundcoord-CRATEr/2
        },
        {
            x: citadelx-TRUNKw,
            y: groundcoord-CRATEr/2
        },
        {
            x: citadelx-CRATEr-2*TRUNKw,
            y: groundcoord-CRATEr/2
        },
    ],
    trunks: [{
            x: citadelx-1.2*TRUNKLONGl-CRATEr-TRUNKw,
            y: groundcoord-CRATEr-TRUNKw/2,
            length: TRUNKLONGl,
            angle: 0,
            choir: "can",
        },
        {
            x: citadelx-TRUNKw,
            y: groundcoord-CRATEr-TRUNKw/2,
            length: TRUNKLONGl,
            angle: 0,
            choir: "dec",
        },
    ],
    pigs: [{
            x: citadelx-1.2*TRUNKLONGl,
            y: groundcoord-CRATEr-TRUNKw-PIGy/2
        },
        {
            x: citadelx-1.2*TRUNKLONGl-CRATEr-TRUNKw,
            y: groundcoord-CRATEr-TRUNKw-PIGy/2
        },
        {
            x: citadelx-1.2*TRUNKLONGl-2*CRATEr-2*TRUNKw,
            y: groundcoord-CRATEr-TRUNKw-PIGy/2
        },
        {
            x: citadelx+CRATEr,
            y: groundcoord-CRATEr-TRUNKw-PIGy/2
        },
        {
            x: citadelx-TRUNKw,
            y: groundcoord-CRATEr-TRUNKw-PIGy/2
        },
        {
            x: citadelx-CRATEr-2*TRUNKw,
            y: groundcoord-CRATEr-TRUNKw-PIGy/2
        },
/*       {
            x: citadelx-0.8*TRUNKLONGl,
            y: groundcoord-PIGy/2
        },*/
    ],
    chances: 3,
    starscore: [1210,1290,1360],
}

const levelThree = {
    crates: [{
            x: citadelx-1.5*TRUNKLONGl-CRATEr/2,
            y: groundcoord-2.5*CRATEr-2*TRUNKw   
        },
        {
            x: citadelx-1.5*TRUNKLONGl,
            y: groundcoord-CRATEr/2
        },
        {
            x: citadelx-1.5*TRUNKLONGl+CRATEr,
            y: groundcoord-3.5*CRATEr-3*TRUNKw
        },
        {
            x: citadelx-1.5*TRUNKLONGl+3*CRATEr/2,
            y: groundcoord-1.5*CRATEr-TRUNKw
        }
    ],
    trunks: [{
            x: citadelx-TRUNKLONGl/2-CRATEr,
            y: groundcoord-CRATEr-TRUNKw/2,
            length: 2*TRUNKLONGl,
            angle: 0 
        },
        {
            x: citadelx-TRUNKLONGl/2-CRATEr,
            y: groundcoord-2*CRATEr-1.5*TRUNKw,
            length: 2*TRUNKLONGl,
            angle: 0 
        },
        {
            x: citadelx-TRUNKLONGl/2-CRATEr,
            y: groundcoord-3*CRATEr-2.5*TRUNKw,
            length: 2*TRUNKLONGl,
            angle: 0 
        },
        {
            x: citadelx-TRUNKLONGl/2-CRATEr,
            y: groundcoord-4*CRATEr-3.5*TRUNKw,
            length: 2*TRUNKLONGl,
            angle: 0 
        },
        {
            x: citadelx+TRUNKLONGl/2-CRATEr-TRUNKw/2-5,
            y: groundcoord-CRATEr/2,
            length: CRATEr,
            angle: Math.PI/2 
        },
        {
            x: citadelx+TRUNKLONGl/2-CRATEr-TRUNKw/2-5,
            y: groundcoord-3*CRATEr/2-TRUNKw,
            length: CRATEr,
            angle: Math.PI/2 
        },
        {
            x: citadelx+TRUNKLONGl/2-CRATEr-TRUNKw/2-5,
            y: groundcoord-5*CRATEr/2-2*TRUNKw,
            length: CRATEr,
            angle: Math.PI/2 
        },
        {
            x: citadelx+TRUNKLONGl/2-CRATEr-TRUNKw/2-5,
            y: groundcoord-7*CRATEr/2-3*TRUNKw,
            length: CRATEr,
            angle: Math.PI/2 
        },
        {
            x: citadelx-TRUNKLONGl/2-TRUNKw/2,
            y: groundcoord-CRATEr/2,
            length: CRATEr,
            angle: Math.PI/2 
        },
        {
            x: citadelx-TRUNKLONGl/2-TRUNKw/2,
            y: groundcoord-3*CRATEr/2-TRUNKw,
            length: CRATEr,
            angle: Math.PI/2 
        },
        {
            x: citadelx-TRUNKLONGl/2-TRUNKw/2,
            y: groundcoord-5*CRATEr/2-2*TRUNKw,
            length: CRATEr,
            angle: Math.PI/2 
        },
        {
            x: citadelx-TRUNKLONGl/2-TRUNKw/2,
            y: groundcoord-7*CRATEr/2-3*TRUNKw,
            length: CRATEr,
            angle: Math.PI/2 
        },
    ],
    pigs: [{
            x: citadelx-TRUNKLONGl/4,
            y: groundcoord-CRATEr-TRUNKw-PIGy/2
        },
        {
            x: citadelx-3*TRUNKLONGl/4,
            y: groundcoord-2*CRATEr-2*TRUNKw-PIGy/2
        },
        {
            x: citadelx-TRUNKLONGl/4,
            y: groundcoord-3*CRATEr-3*TRUNKw-PIGy/2
        },
        {
            x: citadelx-3*TRUNKLONGl/4,
            y: groundcoord-4*CRATEr-4*TRUNKw-PIGy/2
        },
    ],
    chances: 3,
    starscore: [870,970,1100],
}

function setupLevel(level) {
    rectMode(CENTER);

    // Ground and platform:
    solo = new Solo(GAMEWIDTH/2,GAMEHEIGHT-BASEHEIGHT/2,GAMEWIDTH,BASEHEIGHT);
    platform = new Solo(PLATFORMWIDTH/2, groundcoord-PLATFORMHEIGHT/2, PLATFORMWIDTH, PLATFORMHEIGHT);

    // Add woodwork
    for (var i = 0; i < level.crates.length; i++) 
        crates[i] = new Crate(level.crates[i].x,level.crates[i].y,CRATEr,CRATEr);

    for (var i = 0; i < level.trunks.length; i++) {
        if ('choir' in level.trunks[i])
            trunks[i] = new Trunk(level.trunks[i].x,level.trunks[i].y,level.trunks[i].length,level.trunks[i].angle,level.trunks[i].choir);
        else
            trunks[i] = new Trunk(level.trunks[i].x,level.trunks[i].y,level.trunks[i].length,level.trunks[i].angle);
    }

    
    // Pigs
    for (var i = 0; i < level.pigs.length; i++) 
        pigs[i] = new Pig(level.pigs[i].x,level.pigs[i].y);

    // Birds
    birds[level.chances-1] = new Byrd(forkx,platformcoord-FORKh-5);
    birds[level.chances-1].status = "loaded";
    for (var i = 0; i < level.chances - 1; i++) 
        birds[i] = new Byrd(forkx*(i+1)/level.chances,platformcoord-BYRDr)

    // Sling
    sling = new Sling(birds[level.chances-1].body,{x:forkx, y:platformcoord-FORKh});
    chances = level.chances;
    currentbird = level.chances-1; // Yes, we need this stored separately!
    starscore = level.starscore;
    points = 0;
    displaypoints = 0;
    gamestate = "playing";
    isTwoStar = false;
    isThreeStar = false;
    isFourStar = false;
    showGameOver = false;
    slingTaught = false;

}

function clearLevel() {
    // Removes all bodies of items 
    // N.B. Items will still appear in final state until arrays are reset
    for (var i = 0; i < crates.length; i++)
        World.remove(world,crates[i].body);
    for (var i = 0; i < trunks.length; i++)
        World.remove(world,trunks[i].body);
    for (var i = 0; i < pigs.length; i++)
        World.remove(world,pigs[i].body);
    for (var i = 0; i < birds.length; i++)
        World.remove(world,birds[i].body);     
}

