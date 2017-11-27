class Imgcloud {
  constructor(r, theta, theta_vel) {
    //inputs
    this.r = r;
    this.theta = theta;
    this.theta_vel = theta_vel;
    //other variables
    this.x = 0;
    this.y = 0;
    this.color = color(255, 255, 255);
  }
  run() {
    this.convertToRad();
    this.update();
    this.show();
  }
  convertToRad() {
    this.x = this.r * cos(this.theta);
    this.y = this.r * sin(this.theta);
  }
  update() {
    // this.xspeed = bounce(this.x, this.xspeed, 0, width);
    // this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.theta += this.theta_vel;
  }
  show() {
    fill(this.color);
    ellipse(this.x, this.y, 20, 20);
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
