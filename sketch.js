//concepts - self portraits are an expression of ones self perception. their place in society, feelings, mortality, storytelling etc.

//GLOBAL VARIABLES
//font
let karla;
let karla_bold;
//webcam
let video;
let vidWidth = 600;
let vidHeight = 450;
//clm trackr
let facepos;
let ctracker;
let faceX, faceY, faceW, faceH;
let faceCenter;
//flickr API data
let flickrData;
let photoURL;
let photoArray = [];
let numImgPerQuery = 10;
let imgW = 50;
//save snapshot
let button;
let saveimg_index = 0;

function setup() {
  //font
  karla = loadFont('Karla/Karla-Regular.ttf');
  karla_bold = loadFont('Karla/Karla-Bold.ttf');
  textFont(karla);
  //get webcam
  video = createCapture(VIDEO);
  video.id('webcam');
  video.size(vidWidth, vidHeight)
  video.volume(0);
  video.hide();
  //canvas overlay on video
  canvas = createCanvas(vidWidth, vidHeight);
  canvas.id('canvas');
  pixelDensity(1);
  //DOM elements
  inputSetup();
  button = createButton('Save portrait!');
  button.position(windowWidth / 2 + 207, 475);
  button.mousePressed(takeSnap);
  //initilize face tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);
}

function takeSnap() {
  let filename = 'selfportrait' + saveimg_index;
  saveCanvas(canvas, filename, 'png');
  saveimg_index++;
}

//flickr loadJSON callback
function getPhotos(photoData) {
  flickrData = photoData;
  //once data loads
  if (flickrData) {
    for (let i = 0; i < numImgPerQuery; i++) {
      let farmid = flickrData.photos.photo[i].farm;
      let serverid = flickrData.photos.photo[i].server;
      let id = flickrData.photos.photo[i].id;
      let secret = flickrData.photos.photo[i].secret;
      //create photo url
      photoURL = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '_s.jpg';
      //and create an array of img elements
      let r = random(faceH / 2 + 20, vidWidth / 2 + 50);
      let theta = 0;
      let theta_vel = random(-.05, .05);
      photoArray.push(new Imgcloud(loadImage(photoURL), r, theta, theta_vel));
    }
  }
}

function draw() {
  //show video
  image(video, 0, 0, vidWidth, vidHeight);
  //run clmtrackr
  faceTracking();

  //input dropdowns
  //what do you like
  nounInput.changed(updateNoun);
  //describe yourself
  adjInput.changed(updateAdj);

  //show photos
  imgW = map(faceH, 100, 450, 35, 75);
  push();
  translate(faceCenter.x, faceCenter.y);
  for (let i = 0; i < photoArray.length; i++) {
    photoArray[i].run();
  }
  pop();

  //name input on canvas
  push();
  textFont(karla_bold);
  fill(255, 255, 255, 200);
  textSize(map(faceW, 70, 250, 25, 60));
  textAlign(CENTER);
  text(newName, faceX + faceW * 0.5, faceY - imgW);
  pop();
}


function faceTracking() {
  //get face points
  facepos = ctracker.getCurrentPosition();
  for (j = 0; j < facepos.length; j++) {
    // ellipse(facepos[j][0], facepos[j][1], 5);
    //bounding box of face
    faceW = facepos[13][0] - facepos[1][0];
    faceH = (facepos[7][1] - facepos[16][1]) * 1.25;
    faceX = facepos[1][0];
    faceY = facepos[21][1] - faceH * .25;
  }
  //locate center of face
  faceCenter = {
    x: faceX + faceW / 2,
    y: faceY + faceH / 2
  }
}
