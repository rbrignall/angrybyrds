class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,60,60);
    this.image = loadImage("sprites/enemy.png");
    this.visibility = 255;
  }
  display() {
    // console.log(this.body.speed);
    if(this.body.speed < 3){
        super.display();
    } else {
        World.remove(world, this.body);
        push();
        this.visibility = this.visibility - 5;
        tint(255, this.visibility);
        imageMode(CENTER)
        image(this.image, this.body.position.x, this.body.position.y,60,60);
        pop();
    }
  }
  score(){
    if (this.visibility<0 && this.visibility> -1005){
      points++;
    }
    }
}