class Imgcloud {
  constructor(img, x, y, xspeed, yspeed) {
    //pass to class
    this.img = img;
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    //internal variables
    this.imgW = 50;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, vidWidth);
    this.xspeed = bounce(this.x+this.imgW, this.xspeed, 0, vidWidth);
    this.yspeed = bounce(this.y, this.yspeed, 0, vidHeight);
    this.yspeed = bounce(this.y+this.imgW, this.yspeed, 0, vidHeight);
    this.x = move(this.x, this.xspeed);
    this.y = move(this.y, this.yspeed);
  }
  display() {
    push();
    translate()
    image(this.img, this.x, this.y, this.imgW, this.imgW);
    pop();
  }
}

function bounce(pos, speed, min, max) {
  if (pos < min || pos > max) {
    speed *= -1;
  }
  return speed;
}

function move(pos, speed) {
  pos += speed;
  return pos;
}
