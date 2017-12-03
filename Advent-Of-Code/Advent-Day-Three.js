function adventDayThree(mValue) {
    let node1 = {xAxis: 0, yAxis: 0, mValue: 1};
    let node2 = findNode(mValue, (node) => {node.mValue+=1});
    return Math.abs(node1.xAxis - node2.xAxis) +
        Math.abs(node1.yAxis - node2.yAxis);
}

function adventDayThreePartTwo(mValue) {
    return findNode(mValue, (node, dict) => {
        fixNodeForDayTwo(node, dict)
    });
}

function fixNodeForDayTwo(node, dict) {
    node.mValue = 0;
    addNodeIfNotNull(node, dict[getKey(node.xAxis, node.yAxis-1)]);
    addNodeIfNotNull(node, dict[getKey(node.xAxis, node.yAxis+1)]);
    addNodeIfNotNull(node, dict[getKey(node.xAxis-1, node.yAxis)]);
    addNodeIfNotNull(node, dict[getKey(node.xAxis+1, node.yAxis)]);
    addNodeIfNotNull(node, dict[getKey(node.xAxis+1, node.yAxis+1)]);
    addNodeIfNotNull(node, dict[getKey(node.xAxis-1, node.yAxis-1)]);
    addNodeIfNotNull(node, dict[getKey(node.xAxis-1, node.yAxis+1)]);
    addNodeIfNotNull(node, dict[getKey(node.xAxis+1, node.yAxis-1)]);
    dict[getKey(node.xAxis, node.yAxis)] = node;
}

function addNodeIfNotNull(node1, node2) {
    if (typeof node2 !== "undefined") node1.mValue += node2.mValue;
}

function getKey(x, y) {
    return x + ":" + y;
}

function findNode(mValue, setNodeValFunc) {
    let node = {xAxis: 0, yAxis: 0, mValue: 1};
    if (mValue === 1) return node;
    let dict = [];
    dict[getKey(0,0)] = node;
    let distance = 1;
    for (let i = 0; i < mValue; i++) {
        for (let r = 0; r < distance; r++) {
            node = goRight(node);
            setNodeValFunc(node, dict);
            if (node.mValue >= mValue) return node;
        }
        for (let u = 0; u < distance; u++) {
            node = goUp(node);
            setNodeValFunc(node, dict);
            if (node.mValue >= mValue) return node;
        }
        distance += 1;
        for (let l = 0; l < distance; l++) {
            node = goLeft(node);
            setNodeValFunc(node, dict);
            if (node.mValue >= mValue) return node;
        }
        for (let d = 0; d < distance; d++) {
            node = goDown(node);
            setNodeValFunc(node, dict);
            if (node.mValue >= mValue) return node;
        }
        distance += 1;
    }
}

function goRight(node) {
    return {xAxis: node.xAxis+1, yAxis: node.yAxis, mValue: node.mValue};
}

function goUp(node) {
    return {xAxis: node.xAxis, yAxis: node.yAxis+1, mValue: node.mValue};
}

function goLeft(node) {
    return {xAxis: node.xAxis-1, yAxis: node.yAxis, mValue: node.mValue};
}

function goDown(node) {
    return {xAxis: node.xAxis, yAxis: node.yAxis-1, mValue: node.mValue};
}