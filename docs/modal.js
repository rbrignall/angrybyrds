

function gameOverModal(){
    refreshbtn.position(SCRNWIDTH/2-BTNSIZE,SCRNHEIGHT-2*BTNSIZE);
    refreshbtn.size(BTNSIZE*2,BTNSIZE*2);
    menubtn.position(SCRNWIDTH/2-3*BTNSIZE,SCRNHEIGHT-2*BTNSIZE);
    menubtn.size(BTNSIZE*2,BTNSIZE*2);
    
    if (level < 2 && levelunlocked[level+1]) nextbtn.show();
    
    triggerStars();
    push();
    fill(51);
    rect(GAMEWIDTH/2, GAMEHEIGHT/2, GAMEWIDTH, GAMEHEIGHT);
    textSize(30);
    textAlign(CENTER);    
    fill("white");
    text("Score: " + points + "   Highscore: " + highscore[level],GAMEWIDTH/2,GAMEHEIGHT/2-125);
    textSize(50);
    
    if (gamestate=== "win"){
        text("Sing joyfully!",GAMEWIDTH/2,GAMEHEIGHT/2+CRATEr);
        image(isFourStar ? starB : starBgrey,GAMEWIDTH/2+CRATEr,GAMEHEIGHT/2-CRATEr,CRATEr,CRATEr);                
        image(isThreeStar ? starT : starATgrey,GAMEWIDTH/2,GAMEHEIGHT/2-CRATEr-15,CRATEr,CRATEr);
        image(isTwoStar ? starA : starATgrey,GAMEWIDTH/2-CRATEr,GAMEHEIGHT/2-CRATEr-15,CRATEr,CRATEr);
        image(starS,GAMEWIDTH/2-2*CRATEr,GAMEHEIGHT/2-CRATEr,CRATEr,CRATEr);
    } else {
        text("Lord in Thy Wrath",GAMEWIDTH/2,GAMEHEIGHT/2+CRATEr);
    }

    
    pop();
}