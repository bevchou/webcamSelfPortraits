//concepts - self portraits are an expression of ones self perception. their place in society, feelings, mortality, storytelling etc.

//webcam
let video;
let vidWidth = 600;
let vidHeight = 400;
//clm trackr
let facepos;
let ctracker;
let faceX, faceY, faceW, faceH;
//INPUT FIELDS
let inpY = 538;
//name
let nameInput;
let newName = "Who is this?";
//nouns
let nounInput;
let nounArray = [];
let nounPara = [];
//adjectives
let adjInput;
let adjArray = [];
let adjPara = [];

//flickr API
let apiKey = '8f1bf8b1ab45b5399d990540ff031b5d';
let flickrQuery;
let flickrURL;
let flickrData;
let photoURL;
let photoArray = [];
//concept net api
let conceptNetURL = "http://api.conceptnet.io/c/en/person";
let conceptNetData;



function setup() {
  //get webcam
  video = createCapture();
  video.id('webcam');
  video.size(vidWidth, vidHeight)
  video.volume(0);
  //canvas overlay on video
  canvas = createCanvas(vidWidth, vidHeight);
  canvas.id('canvas');
  pixelDensity(1);
  //DOM elements
  inputSetup();
  //initilize face tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);
  // flickr api
  // loadJSON(flickrURL, getPhotos);
  //conceptNet API
  loadJSON(conceptNetURL, getWords);
}



//JSON CALL BACK FUNCTIONS
function getPhotos(photoData) {
  flickrData = photoData;
  if (flickrData) {
    for (let i = 0; i < 2; i++) {
      let farmid = flickrData.photos.photo[i].farm;
      let serverid = flickrData.photos.photo[i].server;
      let id = flickrData.photos.photo[i].id;
      let secret = flickrData.photos.photo[i].secret;
      photoURL = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '_s.jpg';
      photoArray.push(createImg(photoURL));
      for (let i = 0; i < photoArray.length; i++) {
        photoArray[i].hide();
      }
    }
  }
}

function getWords(wordData) {
  conceptNetData = wordData;
  console.log(conceptNetData.edges[0].end.label);
}



function draw() {
  clear();
  faceTracking();
  fill(200, 0, 150, 100);
  rect(faceX, faceY, faceW, faceH);


  //name input on canvas
  textSize(faceW / 5);
  text(newName, faceX - faceW * 0.2, faceY - 50);
  //input dropdowns
  push();
  textSize(40);
  //what do you like
  nounInput.changed(updateNoun);
  //describe yourself
  adjInput.changed(updateAdj);
  pop();

  //loop through array to query imgs
  // for (let i = 0; i < nounArray.length; i++) {
  //   let flickrQuery = nounArray[i];
  //   let flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&sort=interestingness-desc&text=' + flickrQuery + '&format=json&nojsoncallback=1';
  //   loadJSON(flickrURL, getPhotos);
  //   flickrJSONArray.push(flickrData);
  // }





  //show photos
  // tileImg();
  for (let i = 0; i < photoArray.length; i++) {
    tint(255, 127);
    image(photoArray[i], 75 * i, 0);
  }

}


function faceTracking() {
  //get face points
  facepos = ctracker.getCurrentPosition();
  for (j = 0; j < facepos.length; j++) {
    //ellipse(facepos[i][0], facepos[i][1], 5);
    //bounding box of face
    faceW = facepos[13][0] - facepos[1][0];
    faceH = (facepos[7][1] - facepos[16][1]) * 1.25;
    faceX = facepos[1][0];
    faceY = facepos[21][1] - faceH * .25;
  }
}


//NEED DOM ELEMENTS ON TOP OF CANVAS https://github.com/processing/p5.js/issues/561
// function tileImg() {
//   if (flickrData) {
//     for (let i = 0; i < 10; i++) {
//       let farmid = flickrData.photos.photo[i].farm;
//       let serverid = flickrData.photos.photo[i].server;
//       let id = flickrData.photos.photo[i].id;
//       let secret = flickrData.photos.photo[i].secret;
//       photoURL = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '_s.jpg';
//       photoArray.push(createImg(photoURL));
//       for (let i = 0; i < photoArray.length; i++) {
//         photoArray[i].hide();
//       }
//     }
//   }
// }
