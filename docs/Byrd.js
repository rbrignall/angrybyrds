class Byrd extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("sprites/byrd.png");
    this.smokeImg = loadImage("sprites/smoke.png");
    this.trajectory = [];
    this.visibility = 255;
  }

  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;
    if (this.body.velocity.x > 10 && this.body.position.x > 200 && estado==="released"){
      var position = [this.body.position.x,this.body.position.y];
      this.trajectory.push(position);
    }
    for (var i = 0; i < this.trajectory.length; i++){
      image(this.smokeImg, this.trajectory[i][0], this.trajectory[i][1]);
    }
    super.display();
    // TODO: also capture if bird has fallen off screen
    /*
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0 && this.body.position.x > PLATFORMHEIGHT && estado==="released") {
        // disappear bird
        World.remove(world, this.body);
        push();
        this.visibility = this.visibility - 5;
        tint(255, this.visibility);
        imageMode(CENTER)
        rotate(this.body.angle);
        image(this.image, this.body.position.x, this.body.position.y,50,50);
        pop();
        // Set up for next byrd:
        // TODO
        estado="loaded";
    }
    */
  }
}
