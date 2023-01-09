class Byrd extends BaseClass {
  constructor(x,y){
    super(x,y,BYRDr,BYRDr);
    this.image = loadImage("sprites/byrd.png");
    this.smokeImg = loadImage("sprites/smoke.png");
    this.trajectory = [];
    this.status = "ready";
  }

  display() {
    //this.body.position.x = mouseX;
    //this.body.position.y = mouseY;
    if (this.body.velocity.x > 10 && this.body.position.x > PLATFORMWIDTH && this.status==="released"){
      var position = [this.body.position.x,this.body.position.y];
      this.trajectory.push(position);
    }
    for (var i = 0; i < this.trajectory.length; i++){
      image(this.smokeImg, this.trajectory[i][0], this.trajectory[i][1]);
    }
    if (this.status === "released" && this.body.velocity.x === 0 && this.body.speed < 0.3) 
        setTimeout( () => {
            this.status="done";
            World.remove(world, this.body);
        },2000);
    if (this.status != "done")
      super.display();
  }
}
