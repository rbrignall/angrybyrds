class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,PIGr,PIGr);
    this.image = loadImage("sprites/enemy.png");
    this.points = 200;
  }
  display() {
    // console.log(this.body.speed);
    if(this.body.speed < 3){
        super.display();
    } else {
        World.remove(world, this.body);
        push();
        if (this.points > 0) {
            points+=5;
            this.points-=5;
        }
        tint(255, this.points * 255 / 200);
        imageMode(CENTER)
        image(this.image, this.body.position.x, this.body.position.y,PIGr,PIGr);
        pop();
    }
  }

}