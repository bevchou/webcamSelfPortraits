let video;
let facepos;
let ctracker;
let vidWidth = 600;
let vidHeight = 400;
let buttonA;



function setup() {
  //canvas overlay on video
  createCanvas(vidWidth, vidHeight);

  //videos
  sky = createVideo('Assets/sky.mp4');
  sky.loop();
  sky.hide();
}

function draw() {
  background(100);



  fill(0);


  //rect(mouseX, mouseY, 100, 100);
  image(sky, mouseX, mouseY, 100, 200, 100, 100, 100, 100);



}
