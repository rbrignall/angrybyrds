class Crate extends BaseClass {
  constructor(x, y, width, height){
    super(x,y,width,height);
    this.image = loadImage("sprites/sharp.png");
    this.points = 20;
    this.oldspeed = this.body.speed;
  }
  display() {
    //console.log(this.body.speed);
    //if(this.body.speed < CRATEBREAKSPEED){
    if(Math.abs(this.body.speed - this.oldspeed) < CRATEBREAKSPEED  && this.body.speed < 20) {
        super.display();
        this.oldspeed = this.body.speed;
    } else {
        World.remove(world, this.body);
        if (this.points > 0){
            points++;
            this.points--;
        }
    }
  }
};
