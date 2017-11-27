class Imgcloud {
  constructor(img, r, theta, theta_vel) {
    //pass to class
    this.img = img;
    this.r = r;
    this.theta = theta;
    this.theta_vel = theta_vel;
    //other variables
    this.x = 0;
    this.y = 0;
    this.randomRotate = random(-PI/2, PI/2);

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
    this.theta += this.theta_vel;
  }
  show() {
    push();
    // translate(-imgW / 2, -imgW / 2);
    rotate(this.randomRotate);
    tint(255, 190);
    image(this.img, this.x, this.y, imgW, imgW);
    pop();
  }
}
