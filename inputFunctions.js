//DOM elements for setup()
function inputSetup() {
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

// function positionInputs() {
//   let nameInpX = windowWidth / 2 - 237;
//   let nounInpX = windowWidth / 2 - 64;
//   let adjInpX = windowWidth / 2 + 127;
//   nameInput.position(nameInpX, inpY);
//   nounInput.position(nounInpX, inpY);
//   adjInput.position(adjInpX, inpY);
// }

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
    //clear input field
    adjInput.remove();
    adjInput = createInput('');
    adjInput.position(adjInpX, inpY + adjArray.length * 20);
  }
  return false;
}
