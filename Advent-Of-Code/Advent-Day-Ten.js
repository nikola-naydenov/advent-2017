let numberArray = [];
let skipSize = 0;
let currentPos = 0;
function adventDayTen(data) {
  initialiseArray();
  let instructions = data.split(',');
  let currentPos = 0;
  sparseHash(instructions);
  console.log(numberArray[0] * numberArray[1]);
}
function adventDayTenPartTwo(data) {
  initialiseArray();
  let instructions = getInputArray(data);
  console.log(instructions)
  let denseHash = [];
  for (let rounds = 0; rounds < 64; rounds++) {
    sparseHash(instructions);
  }
  for (let s = 0; s < numberArray.length; s += 16) {
    let sum = numberArray[s];
    for (let i = 1; i < 16; i++) {
      sum = sum ^ numberArray[i+s]; 
    }
    denseHash.push(sum);
  }
  console.log(denseHash.length);
  let result = '';
  denseHash.forEach(hsh => {
    result += hsh.toString(16);
  });
  console.log(result);
}
function sparseHash(instructions) {
  for (let i = 0; i < instructions.length; i++) {
    let tempArray = [];
    for (let j = 0; j < instructions[i]; j++) {
      tempArray.push(numberArray[getCircleIndex(numberArray, j+currentPos)]);
    }
    tempArray.reverse();
    for (let k = 0; k < tempArray.length; k++) {
      numberArray[getCircleIndex(numberArray, currentPos+k)] = tempArray[k];
    }
    currentPos += skipSize + +instructions[i];
    skipSize++;
  }
}
function initialiseArray() {
  for (let i = 0; i < 256; i++) {
    numberArray.push(i);
  }
}
function getCircleIndex(data, index) {
    return index >= data.length ? index % data.length : index;
}
function getInputArray(data) {
  let inputArray = [];
  data = data.split('');
  data.forEach(d => {
    inputArray.push(d.charCodeAt(0));
  });
  '17,31,73,47,23'.split(',').forEach(d => {
    inputArray.push(+d);
  });
  return inputArray;
}
