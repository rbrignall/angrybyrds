class Byrd extends BaseClass {
  constructor(x,y){
    super(x,y,BYRDr,BYRDr);
    this.image = loadImage("sprites/byrd.png");
    this.smokeImg = loadImage("sprites/smoke.png");
    this.trajectory = [];
  }

  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;
    if (this.body.velocity.x > 10 && this.body.position.x > PLATFORMWIDTH && estado==="released"){
      var position = [this.body.position.x,this.body.position.y];
      this.trajectory.push(position);
    }
    for (var i = 0; i < this.trajectory.length; i++){
      image(this.smokeImg, this.trajectory[i][0], this.trajectory[i][1]);
    }
    //if ((this.body.speed > 0.00278 && this.body.position.x > PLATFORMWIDTH && estado==="released") || (this.body.position.x <= PLATFORMWIDTH && estado==="released") || estado==="loaded") {
        super.display();
    /*    push();
        noStroke();
        textSize(35);
        fill("white");
        text(this.body.position.x, width-250, 100);
        text(this.body.position.y, width-250, 150);
        pop();
    } else {
        // disappear bird
        //World.remove(world, this.body);
        
    }*/
      /*

        // Set up for next byrd:
        // TODO
        estado="loaded";
    }
    */
  }
}
