function adventDayEight(data) {
  let values = [];
  let highestValueEver = 0;
  let mathFuncs = {
    '>': function(a, b) { return a > b },
    '<': function(a, b) { return a < b },
    '>=': function(a, b) { return a >= b },
    '<=': function(a, b) { return a <= b },
    '==': function(a, b) { return a == b },
    '!=': function(a, b) { return a != b },
    'inc': function(a, b) { return a + b },
    'dec': function(a, b) { return a - b }
  }
  data.forEach(inputLine => {
    inputLine = inputLine.split(' ');
    let key = getOrCreate(values, inputLine[4]);
    let oper = inputLine[5];
    if (mathFuncs[oper](+key, +inputLine[6])) {
      let valueOfUpdate = getOrCreate(values, inputLine[0]);
      let toUpdate = inputLine[0];
      let updOper = inputLine[1];
      values[toUpdate] = +mathFuncs[updOper](+valueOfUpdate, +inputLine[2]);
      if (values[toUpdate] > highestValueEver) highestValueEver = values[toUpdate];
    }
  });
  console.log("Highest Value Ever : " + highestValueEver);
  console.log("Highest Value Now : " + getLargest(values));
}

function getLargest(values) {
  let largest = 0;
  for (let key in values) {
    if (values[key] > largest) largest = values[key];
  }
  return largest;
}

function getOrCreate(values, value) {
  if (values[value] === undefined) {
    values[value] = 0;
    return 0;
  }
  return values[value];
}
