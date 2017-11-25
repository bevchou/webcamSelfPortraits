//input fields
let nounArray = ['coffee', 'blue', 'dogs', 'cats'];

//Flickr API
let apiKey = '8f1bf8b1ab45b5399d990540ff031b5d';
let flickrData;
let flickrJSONArray = [];
let photoURL;
let photoArray = [];



function setup() {


}

function getPhotos(photoData) {
  flickrData = photoData;
}

function draw() {

  //loop through array to query imgs
  for (let i = 0; i < nounArray.length; i++) {
    flickrJSONArray = [];
    let flickrQuery = nounArray[i];
    let flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&sort=interestingness-desc&text=' + flickrQuery + '&format=json&nojsoncallback=1';
    loadJSON(flickrURL, getPhotos);
    flickrJSONArray.push(flickrData);
  }

}
