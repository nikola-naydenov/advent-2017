function adventDayFive(data) {
  let numberOfSteps = 0;
  let offset = data[0];
  let i = 0;
  while(true) {
    offset = data[i];
    data[i] += 1;
    i = i + offset;
    numberOfSteps++;
    if (i >= data.length) break;
  }
  return numberOfSteps;
}

function adventDayFivePartTwo(data) {
  let numberOfSteps = 0;
  let offset = data[0];
  let i = 0;
  while(true) {
    offset = data[i];
    data[i] = offset >= 3 ? data[i] - 1 : data[i] + 1;
    i = i + offset;
    numberOfSteps++;
    if (i >= data.length) break;
  }
  return numberOfSteps;
}
