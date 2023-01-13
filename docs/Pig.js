class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,PIGx,PIGy);
    this.image = loadImage("sprites/enemyhat.png");
    this.points = 200;
    this.tint = 255;
    this.status = "alive";
    this.oldspeed = this.body.speed;
  }
  display() {
    if(Math.abs(this.body.speed - this.oldspeed) < PIGDIESPEED/2 && this.body.speed < 20) {
        super.display();
        this.oldspeed=this.body.speed;
    } else if(Math.abs(this.body.speed - this.oldspeed) < PIGDIESPEED && this.status === "alive" && this.body.speed < 20) {
        super.display();
        this.oldspeed=this.body.speed;        
        this.status="injured";
        this.image = loadImage("sprites/hurtpig.png");
    } else {
        World.remove(world, this.body);
        this.status = "dead";
        if (this.points > 0) {
            points += this.points;
            this.points = 0;
        }
        push();
        if (this.tint > 0) {
            this.tint-=5;
        }
        tint(255, this.tint);
        imageMode(CENTER)
        image(this.image, this.body.position.x, this.body.position.y,PIGx,PIGy);
        pop();
    }
  }

}