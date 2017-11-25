//input fields
let inpY = 400;
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

let nameInpX, nounInpX, adjInpX;


function setup() {
  createCanvas(500, 500);
  //positioning
  nameInpX = windowWidth / 2 - 237;
  nounInpX = windowWidth / 2 - 64;
  adjInpX = windowWidth / 2 + 127;
  //name
  nameInput = createInput('Who is this?');
  nameInput.position(nameInpX, inpY);
  nameInput.changed(updateName);
  //what do you like
  nounInput = createInput('in one word');
  nounInput.position(nounInpX, inpY);
  //describe yourself
  adjInput = createInput('in one word');
  adjInput.position(adjInpX, inpY);

}

function draw() {
  background(255);
  textSize(40);
  //name
  text(newName, 100, 100);
  //what do you like
  nounInput.changed(updateNoun);
  //describe yourself
  adjInput.changed(updateAdj);
}
