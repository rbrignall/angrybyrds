

function gameOverModal(){
    refreshbtn.position(GAMEWIDTH/2-CRATEr/2,GAMEHEIGHT-2*CRATEr);
    refreshbtn.size(CRATEr,CRATEr);
    menubtn.position(GAMEWIDTH/2-2*CRATEr,GAMEHEIGHT-2*CRATEr);
    menubtn.size(CRATEr,CRATEr);
    
    if (level < 2 && levelunlocked[level+1]) nextbtn.show();
    
    triggerStars();
    push();
    fill(51);
    rect(GAMEWIDTH/2, GAMEHEIGHT/2, GAMEWIDTH-40, GAMEHEIGHT-40);
    textSize(30);
    textAlign(CENTER);    
    fill("white");
    text("Score: " + points + "   Highscore: " + highscore[level],GAMEWIDTH/2,GAMEHEIGHT/2-125);
    textSize(50);
    
    if (gamestate=== "win"){
        text("Sing joyfully!",GAMEWIDTH/2,GAMEHEIGHT/2+CRATEr);
        image(isFourStar ? starB : starBgrey,GAMEWIDTH/2+65,GAMEHEIGHT/2-CRATEr,CRATEr,CRATEr);                
        image(isThreeStar ? starT : starATgrey,GAMEWIDTH/2,GAMEHEIGHT/2-CRATEr-15,CRATEr,CRATEr);
        image(isTwoStar ? starA : starATgrey,GAMEWIDTH/2-70,GAMEHEIGHT/2-CRATEr-15,CRATEr,CRATEr);
        image(starS,GAMEWIDTH/2-135,GAMEHEIGHT/2-CRATEr,CRATEr,CRATEr);
    } else {
        text("Lord in Thy Wrath",GAMEWIDTH/2,GAMEHEIGHT/2+CRATEr);
    }

    
    pop();
}