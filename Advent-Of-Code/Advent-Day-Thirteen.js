let allNodes = [];
let allGroups = [];
function adventDayTwelve(data) {
    let arrayOfNodes = [];
    data.forEach((inputLine => {
        let list = inputLine.replace(' <->', ',');
        list = list.split(', ');
        allNodes[list[0]] = { nodeId:list[0], directLinks:list.slice(1) };
    }));
  let checkedNodes = [];
  console.log(countAGroup('0', checkedNodes));
  for (let key in allNodes) {
    findGroup(key);
  }
  console.log(allGroups.length);
}
function countAGroup(startNode, checkedNodes) {
  let count = 1;
  checkedNodes[startNode] = true;
  allNodes[startNode].directLinks.forEach(node => {
    if (checkedNodes[node] === undefined) {
      count += countAGroup(node, checkedNodes)
    }
  });
  return count;
}
function findGroup(node) {
  let exists = false;
  allGroups.forEach(group => {
    if (group[node] !== undefined) exists = true;
  });
  if (!exists) {
    let group = [];
    group[node] = true;
    allNodes[node].directLinks.forEach(node => {
      if (group[node] === undefined) {
        collect(node, group);
      }
    });
    allGroups.push(group);
  }
}
function collect(node, group) {
    group[node] = true;
    allNodes[node].directLinks.forEach(node => {
      if (group[node] === undefined) {
        collect(node, group);
      }
    });
}
