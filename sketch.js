//concepts - self portraits are an expression of ones self perception. their place in society, feelings, mortality, storytelling etc.

//GLOBAL VARIABLES
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
//save snapshot
let button;
let saveimg_index = 0;

function setup() {
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
  button = createButton('save!');
  button.position(windowWidth / 2 + 320, 450);
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
      photoArray.push(new Imgcloud(loadImage(photoURL), random(vidWidth-75), random(vidHeight-75), random(-5, 5), random(-5, 5)));
    }
  }
}


function draw() {
  //show video
  image(video, 0, 0, vidWidth, vidHeight);
  //run clmtrackr
  faceTracking();

  // rect(faceX, faceY, faceW, faceH);

  //input dropdowns
  push();
  textSize(40);
  //what do you like
  nounInput.changed(updateNoun);
  //describe yourself
  adjInput.changed(updateAdj);
  pop();


  //show photos
  for (let i = 0; i < photoArray.length; i++) {
    // let y = 0;
    // push();
    // scale(.7);
    // rotate(PI / 4);
    // image(photoArray[i], 75 * i, y);
    // pop();
    photoArray[i].run();
  }


  //name input on canvas
  fill(255);
  textSize(faceW / 5);
  text(newName, faceX - faceW * 0.2, faceY - 50);
  //locate face
  faceCenter = {
    x: faceX + faceW/2,
    y: faceY + faceH/2
  }
  // ellipse(faceCenter.x, faceCenter.y, faceH, faceH);
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
}
