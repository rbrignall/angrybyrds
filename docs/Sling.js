class Sling{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.imagem1 = loadImage('sprites/forkR.png');
        this.imagem2 = loadImage('sprites/forkL.png');
        this.imagem3 = loadImage('sprites/sling3.png');
        this.pointB = pointB;
        this.bodyA = bodyA;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    fire(){
        this.sling.bodyA = null;
    }

    mount(){
      this.sling.bodyA = this.bodyA;
    }

    display(){
          var pointB = this.pointB;
        image(this.imagem1,forkx, pointB.y,FORKw,FORKh);//25);
        image(this.imagem2,forkx,pointB.y,SMALLFORKw,SMALLFORKh);//20);
        if (this.sling.bodyA) {
          var pointA = this.sling.bodyA.position;
          push();
          stroke(48,22,8);
          if (forkx - pointA.x > -5){
            strokeWeight(15);
            if(forkx - pointA.x > 10){
              strokeWeight(10);
              if(forkx - pointA.x > 40){
                strokeWeight(7);
              }
            }
            line(pointA.x-20, pointA.y, pointB.x-15, pointB.y+6);
            line(pointA.x-20, pointA.y, pointB.x+25, pointB.y+6);
            image(this.imagem3,pointA.x-30, pointA.y-10,15,30);
          } else {
            strokeWeight(10);
              if(pointA.x > PLATFORMWIDTH){
                strokeWeight(7);
              }
            line(pointA.x+28, pointA.y, pointB.x-15, pointB.y+6);
            line(pointA.x+28, pointA.y, pointB.x+25, pointB.y+6);
            image(this.imagem3,pointA.x+25, pointA.y-10,15,30);
          }
          
          pop();
        }
    }
    
}