class Trunk extends BaseClass{
  constructor(x,y,height,angle,choir = ""){
    super(x,y,height,TRUNKw,angle);
    this.body.friction = 2;
    if (choir==="can")
        this.image = loadImage("sprites/woodcan.png");
    else if (choir==="dec")
        this.image = loadImage("sprites/wooddec.png");
    else
        this.image = loadImage("sprites/wood2.png");
    Matter.Body.setAngle(this.body, angle);
    this.points = 25;
    this.oldspeed = 0;
  }
  display() {
    // console.log(this.body.speed);
    // TODO: Speed should be proportional to dimensions of game! 
    //if(this.body.speed < TRUNKBREAKSPEED){
    if(Math.abs(this.body.speed - this.oldspeed) < TRUNKBREAKSPEED && this.body.speed < 20) {
        super.display();
        this.oldspeed = this.body.speed;
        super.display();
    } else {
        if (this.points > 0){
            World.remove(world, this.body);
            points+= this.points;
            this.points = 0;
        }
    }
  }
}