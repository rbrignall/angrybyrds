class Crate extends BaseClass {
  constructor(x, y, width, height){
    super(x,y,width,height);
    this.image = loadImage("sprites/sharp.png");
    this.points = 20;
  }
  display() {
    // console.log(this.body.speed);
    if(this.body.speed < 5){
        super.display();
    } else {
        World.remove(world, this.body);
        if (this.points > 0){
            points++;
            this.points--;
        }
    }
  }
};
