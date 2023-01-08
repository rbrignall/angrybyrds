class Trunk extends BaseClass{
  constructor(x,y,height,angle){
    super(x,y,TRUNKw,height,angle);
    this.body.friction = 2;
    this.image = loadImage("sprites/wood2.png");
    Matter.Body.setAngle(this.body, angle);
    this.points = 25;
  }
  display() {
    // console.log(this.body.speed);
    if(this.body.speed < 6){
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