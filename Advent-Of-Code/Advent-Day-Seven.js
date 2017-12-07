function adventDaySeven(data) {
    let arrayOfNodes = [];
    data.forEach((inputLine => {
        let split = inputLine.split(',');
        arrayOfNodes[split[0]] = { nodeId:split[0], _root:null, weight:split[1], children:split.slice(2), trueWeight:0 };
    }));
    arrayOfNodes = updateArrayOfNodes(arrayOfNodes);
    let rootNode = findRoot(arrayOfNodes);
    console.log("RootNode : " + rootNode.nodeId);
    calculateNodeWeight(rootNode);
    findBadNode(rootNode);
}
function findBadNode(rootNode) {
    let badNode = findBadWeightNode(rootNode);
    console.log("Bad Node");
    badNode._root.children.forEach(child => {
        console.log("{ Node ID : " + child.nodeId);
        console.log("Weight : " + child.weight);
        console.log("True Weight : " + child.trueWeight + " }");
    });
    console.log("With Children");
    badNode.children.forEach(child => {
        console.log("{ Node ID : " + child.nodeId);
        console.log("Weight : " + child.weight);
        console.log("True Weight : " + child.trueWeight + " }");
    });
}
function findBadWeightNode(rootNode) {
    let badNode = rootNode;
    if (rootNode.children.length > 0) {
        let aWeight = findACommonWeight(rootNode);
        rootNode.children.forEach(child => {
            if (!(child.trueWeight === aWeight)) {
                badNode = findBadWeightNode(child);
            }
        });
    }
    return badNode;
}
function findACommonWeight(rootNode) {
    let aWeight = rootNode.children[0].trueWeight;
    for (let i = 1; i < rootNode.children.length; i++) {
        if (rootNode.children[i].trueWeight === aWeight) return aWeight;
    }
    return rootNode.children[1].trueWeight;
}
function calculateNodeWeight(node) {
    let weight = +node.weight;
    node.children.forEach(childNode => {
        weight += +calculateNodeWeight(childNode);
    });
    node.trueWeight = weight;
    return weight;
}

function updateArrayOfNodes(arrayOfNodes) {
    for (let key in arrayOfNodes) {
        let childrenNodes = [];
        arrayOfNodes[key].children.forEach(node => {
            arrayOfNodes[node]._root = arrayOfNodes[key];
            childrenNodes.push(arrayOfNodes[node]);
        });
        arrayOfNodes[key].children = childrenNodes;
    }
    return arrayOfNodes;
}
function findRoot(arrayOfNodes) {
    for (let key in arrayOfNodes) {
        if (arrayOfNodes[key]._root === null) return arrayOfNodes[key];
    }
}