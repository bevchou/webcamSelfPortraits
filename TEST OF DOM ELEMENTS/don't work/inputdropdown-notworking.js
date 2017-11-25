class InputDrop {
  constructor(input, wordArray, paraArray) {
    this.input = input;
    this.wordArray = wordArray;
    this.paraArray = paraArray;
    this.inputH = 250;
    this.leading = 20;
  }
  run() {
    //do not allow user to input white space or empty string into the word array
    if (trim(this.input.value()) != "") {
      this.fillArray();
      this.displayWords();
      this.moveInput();
    }
  }
  fillArray() {
    //push input to word array
    this.wordArray.push(this.input.value());
  }
  displayWords() {
    //display submitted words below input field
    this.paraArray.push(createP(this.input.value()));
    for (let i = 0; i < this.paraArray.length; i++) {
      this.paraArray[i].position(250, this.inputH + this.leading * (i - 1));
    }
  }
  moveInput() {
    //clear input field & move down
    this.input.remove();
    this.input = createInput('');
    this.input.position(250, this.inputH + this.wordArray.length * this.leading);
  }
}
