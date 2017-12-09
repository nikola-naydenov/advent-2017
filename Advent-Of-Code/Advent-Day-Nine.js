let allGroups = [];

function adventDayNine(data) {
  data = data.split('');
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '<') {
      i += traverseGarbage(data, i);
    }
    if (data[i] === '{') {
      makeGroups(data, i, 1);
      break;
    }
  }
}
function makeGroups(data, index, score) {
  let group = { name:'group', groups:[], groupString:[], totalLength:0, score:score };
  let lastChar = null;
  for (let g = index; g < data.length; g++) {
    group.totalLength++;
    if (data[g] === '{' && lastChar !== null) {
      console.log('index at ' + g);
      let subGroup = makeGroups(data, g, score+1);
      group.groups.push(subGroup);
      group.totalLength += subGroup.totalLength;
      g += subGroup.totalLength;
      group.groupString.push(data[g]);
      console.log('index at ' + g);
      continue;
    }
    if (data[g] === '<') {
      let garbageLen = traverseGarbage(data, g);
      g += garbageLen+1;
      group.totalLength += garbageLen;
      group.groupString.push(data[g]);
      continue;
    }
    group.groupString.push(data[g]);
    lastChar = data[g];
    if (data[g] === '}') break;
  }
  allGroups.push(group);
  return group;
}
function traverseGarbage(data, index) {
  let garbage = { name:'garbage', garbageString:[] };
  let lastChar = null;
  for (let g = index; g < data.length; g++) {
    garbage.garbageString.push(data[g]);
    if (data[g] === '>' && lastChar != '!') break;
    lastChar = dealWithEscapeChar(lastChar, data[g]);
  }
  allGroups.push(garbage);
  return garbage.garbageString.length;
}
function dealWithEscapeChar(lastChar, thisChar) {
  if (lastChar === '!' && thisChar === '!') return null;
  return thisChar;
}
function logScore() {
  allGroups.forEach(group => {
    if (group.name === 'group') {
      
    }
  });
}
adventDayNine('{{<ab>},{<ab>},{<ab>},{<ab>}}');
