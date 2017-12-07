function adventDaySeven(data) {
  let arrayOfNodes = [];
  data.forEach((inputLine => {
    let split = inputLine.split(',');
    arrayOfNodes[split[0]] = { nodeId:split[0], _root:null, weight:split[1], children:split.slice(2), trueWeight:0 };
  }));
  arrayOfNodes = updateNodes(arrayOfNodes);
  let rootNode = findRoot(arrayOfNodes);
  console.log(rootNode);
  calculateNodeWeight(arrayOfNodes, rootNode);
  findBadNode(arrayOfNodes, rootNode);
}

function findBadNode(arrayOfNodes, rootNode) {
  let badNode = findBadWeightNode(arrayOfNodes, rootNode);
  console.log("bad Node");
  arrayOfNodes[badNode._root].children.forEach(child => {
    console.log(arrayOfNodes[child]);
  });
  console.log("With Children");
  badNode.children.forEach(child => {
    console.log(arrayOfNodes[child]);
  });
}

function findBadWeightNode(arrayOfNodes, rootNode) {
  let badNode = rootNode;
  if (rootNode.children.length > 0) {
    let aWeight = findACommonWeight(arrayOfNodes, rootNode);
    rootNode.children.forEach(child => {
      if (!(arrayOfNodes[child].trueWeight === aWeight)) {
        badNode = findBadWeightNode(arrayOfNodes, arrayOfNodes[child]);
      }
    });
  }
  return badNode;
}

function findACommonWeight(arrayOfNodes, rootNode) {
  let aWeight = arrayOfNodes[rootNode.children[0]].trueWeight;
  for (let i = 1; i < rootNode.children.length; i++) {
    if (arrayOfNodes[rootNode.children[i]].trueWeight === aWeight) return aWeight;
  }
  return arrayOfNodes[rootNode.children[1]].trueWeight;
}

function calculateNodeWeight(arrayOfNodes, node) {
  let weight = +node.weight;
  node.children.forEach(childNode => {
    weight += +calculateNodeWeight(arrayOfNodes, arrayOfNodes[childNode]);
  });
  node.trueWeight = weight;
  return weight;
}

function updateNodes(arrayOfNodes) {
  for (let key in arrayOfNodes) {
    arrayOfNodes[key].children.forEach(node => {
      arrayOfNodes[node]._root = key;
    });
  }
  return arrayOfNodes;
}

function findRoot(arrayOfNodes) {
  for (let key in arrayOfNodes) {
    if (arrayOfNodes[key]._root === null) return arrayOfNodes[key];
  }
}
