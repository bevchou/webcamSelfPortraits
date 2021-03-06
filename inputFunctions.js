//GLOBAL VARIBLES

//INPUT FIELDS
let inpY = 600;
let inpW = 120;
let inpH = 18;
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

//FLICKR API to get JSON
let apiKey = '8f1bf8b1ab45b5399d990540ff031b5d';
let flickrQuery;
let flickrURL;

//DOM elements for setup()
function inputSetup() {
  nameInpX = windowWidth / 2 - 240;
  nounInpX = windowWidth / 2 - 65.5;
  adjInpX = windowWidth / 2 + 127;
  //name
  nameInput = createInput('');
  nameInput.size(inpW, inpH);
  // nameInput.position(nameInpX, inpY);
  nameInput.id('name');
  nameInput.changed(updateName);
  //what do you like
  nounInput = createInput('');
  nounInput.size(inpW, inpH);
  nounInput.position(nounInpX, inpY);
  //describe yourself
  adjInput = createInput('');
  adjInput.size(inpW, inpH);
  adjInput.position(adjInpX, inpY);
}

//CALLBACK FUNCTIONS FOR INPUTS
function updateName() {
  console.log(nameInput.value());
  newName = nameInput.value();
}

function updateNoun() {
  //do not allow user to input white space or empty string into the word array
  if (trim(nounInput.value()) != "") {
    //push input to word array
    nounArray.push(nounInput.value());
    //display submitted words below input field
    nounPara.push(createP(nounInput.value()));
    for (let i = 0; i < nounPara.length; i++) {
      nounPara[i].position(nounInpX, inpY + 20 * (i - 1));
    }
    //get photos from flickr
    flickrQuery = nounInput.value();
    flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&safe_search=1&sort=interestingness-desc&text=' + flickrQuery + '&format=json&nojsoncallback=1';
    loadJSON(flickrURL, getPhotos);
    //clear input field
    nounInput.remove();
    nounInput = createInput('');
    nounInput.position(nounInpX, inpY + nounArray.length * 20);
  }
  return false;
}

function updateAdj() {
  //do not allow user to input white space or empty string into the word array
  if (trim(adjInput.value()) != "") {
    //push input to word array
    adjArray.push(adjInput.value());
    //display submitted words below input field
    adjPara.push(createP(adjInput.value()));
    for (let i = 0; i < adjPara.length; i++) {
      adjPara[i].position(adjInpX, inpY + 20 * (i - 1));
    }
    flickrQuery = adjInput.value();
    flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&safe_search=1&sort=interestingness-desc&text=' + flickrQuery + '&tags=' + flickrQuery + '&format=json&nojsoncallback=1';
    loadJSON(flickrURL, getPhotos);
    //clear input field
    adjInput.remove();
    adjInput = createInput('');
    adjInput.position(adjInpX, inpY + adjArray.length * 20);
  }
  return false;
}
