class Trunk extends BaseClass{
  constructor(x,y,height,angle){
    super(x,y,TRUNKw,height,angle);
    this.body.friction = 2;
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
        World.remove(world, this.body);
        if (this.points > 0){
            points++;
            this.points--;
        }
    }
  }
}