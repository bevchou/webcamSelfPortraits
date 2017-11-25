function inputdropdown(inp, wordArray, wordPara, inpX, inpY) {
  let leading = 20;
  //do not allow user to input white space or empty string into the word array
  if (trim(inp.value()) != "") {
    //push input to word array
    wordArray.push(inp.value());
    //display submitted words below input field
    wordPara.push(createP(inp.value()));
    for (let i = 0; i < wordPara.length; i++) {
      wordPara[i].position(250, inpY + 20 * (i - 1));
    }
    //clear input field
    inp.remove();
    inp = createInput('');
    inp.position(250, inpY + wordArray.length * 20);
  }
  return false;
}
