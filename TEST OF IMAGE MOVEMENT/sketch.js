let ball = [];
let numBalls;
let r;
let rad = 0;
let r_face = 100;

function setup() {
  createCanvas(600, 600);
  numBalls = 20;
  for (let i = 0; i < numBalls; i++) {
		let r = random(100, 250);
    let theta = 0;
    let theta_vel = random(-.05, .05);
    ball.push(new Imgcloud(r, theta, theta_vel));
  }
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  for (let i = 0; i < ball.length; i++) {
    ball[i].run();
  }
  push();
  noFill();
  ellipse(0, 0, 400);
}
