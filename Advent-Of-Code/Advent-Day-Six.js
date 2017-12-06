function adventDaySix(data) {
  let memorisedConfigurations = [];
  while (true) {
    let highestBlock = 0;
    let highestBlockIndex = 0;
    let currentIndex = 0;
    data.forEach(item => {
      if (item > highestBlock) {
        highestBlock = item;
        highestBlockIndex = currentIndex;
      }
      currentIndex++;
    });
    data = reallocate(data, highestBlockIndex);
    if (memorisedConfigurations.includes(getConfigKey(data))) {
      memorisedConfigurations.push(getConfigKey(data));
      break;
    } else memorisedConfigurations.push(getConfigKey(data));
  }
  let cycles = memorisedConfigurations.length - memorisedConfigurations.findIndex(element => {
    return element === memorisedConfigurations[memorisedConfigurations.length-1];
  });
  console.log(cycles-1);
  return memorisedConfigurations.length;
}
function reallocate(data, highestBlockIndex) {
  let blocks = data[highestBlockIndex];
  data[highestBlockIndex] = 0;
  for (let i = 1; blocks > 0; i++) {
    data[getCircularIndex(data, i+highestBlockIndex)] += 1;
    blocks--;
  }
  return data;
}
function getConfigKey(data) {
  let key = "";
  data.forEach(item => key += ":" + item);
  return key;
}
function getCircularIndex(data, index) {
    return index >= data.length ? index % data.length : index;
}
adventDaySix([10,3,15,10,5,15,5,15,9,2,5,8,5,2,3,6])
