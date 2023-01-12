const levelOne = {
    crates: [{
            x: citadelx-TRUNKLONGl+CRATEr/2,
            y: groundcoord
        },
        {
            x: citadelx-CRATEr/2,
            y: groundcoord
        },
        {
            x: citadelx-TRUNKLONGl+CRATEr/2,
            y: groundcoord-CRATEr-TRUNKw-30
        },
        {
            x: citadelx-CRATEr/2,
            y: groundcoord-CRATEr-TRUNKw-30
        },
        {
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-2*CRATEr-4*TRUNKw
        }
    ],
    trunks: [{
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-CRATEr,
            length: TRUNKLONGl,
            angle: Math.PI/2 
        },
        {
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-2*CRATEr-3*TRUNKw,
            length: TRUNKLONGl,
            angle: Math.PI/2 
        },
        {
            x: citadelx-3*TRUNKLONGl/4,
            y: groundcoord-2*CRATEr-5*TRUNKw,
            length: TRUNKLONGl/2,
            angle: Math.PI/7 
        },
        {
            x: citadelx-TRUNKLONGl/4,
            y: groundcoord-2*CRATEr-5*TRUNKw,
            length: TRUNKLONGl/2,
            angle: -Math.PI/7
        }
    ],
    pigs: [{
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord
        },
        {
            x: citadelx-TRUNKLONGl/2,
            y: groundcoord-CRATEr-TRUNKw-10
        },
    ],
    chances: 3,
    starscore: [430,520,600],
}



function setupLevel(level) {
    // Ground and platform:
    solo = new Solo(GAMEWIDTH/2,GAMEHEIGHT-BASEHEIGHT/2,GAMEWIDTH,BASEHEIGHT);
    platform = new Solo(PLATFORMWIDTH/2, groundcoord-PLATFORMHEIGHT/2, PLATFORMWIDTH, PLATFORMHEIGHT);

    // Add woodwork
    for (var i = 0; i < level.crates.length; i++) 
        crates[i] = new Crate(level.crates[i].x,level.crates[i].y,CRATEr,CRATEr);

    for (var i = 0; i < level.trunks.length; i++) 
        trunks[i] = new Trunk(level.trunks[i].x,level.trunks[i].y,level.trunks[i].length,level.trunks[i].angle);

    // Pigs
    for (var i = 0; i < level.pigs.length; i++) 
        pigs[i] = new Pig(level.pigs[i].x,level.pigs[i].y);

    // Birds
    for (var i = 0; i < level.chances; i++) {
        if (i < level.chances-1)
            birds[i] = new Byrd(forkx*(i+1)/level.chances,platformcoord-BYRDr)
        else {
            birds[i] = new Byrd(forkx,platformcoord-FORKh-5);
            birds[i].status = "loaded";
        }
    }
    // Sling
    sling = new Sling(birds[level.chances-1].body,{x:forkx, y:platformcoord-FORKh});
    chances = level.chances;
    currentbird = level.chances-1; // Yes, we need this stored separately!
    starscore = level.starscore;
    points = 0;
    gamestate = "playing";
    isTwoStar = false;
    isThreeStar = false;
    isFourStar = false;
//var highscore = localStorage.getItem("highscore") || 0;
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

