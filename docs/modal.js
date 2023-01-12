

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