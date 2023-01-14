class Byrd extends BaseCircleClass {
  constructor(x,y){
    super(x,y,BYRDr/2);
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
        delay(2000).then( () => {this.status="done";});
    if (this.status === "done")
        World.remove(world, this.body);
    else
        super.display();
  }
}
