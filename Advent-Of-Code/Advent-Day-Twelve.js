let nodes = [];
let lastNode = 0;
function adventDayThirteen(data) {
  createNodes(data);
  let severity = 0;
  for (let i = 0; i <= lastNode; i++) {
    let caught = amICaught(i);
    if (caught) {
      severity += (i * nodes[i].depth);
    }
    moveScan();
  }
  console.log('Severity : ' + severity);
}
function cloneNodes() {
  let clones = [];
  nodes.forEach(node => {
    let clonedNode = { pos:node.pos, depth:node.depth, direction:node.direction, scannerPos:node.scannerPos };
    clones[node.pos] = clonedNode;
  });
  return clones;
}
function adventDayThirteenPartTwo(data) {
  createNodes(data);
  let picoseconds = 0;
  let caught = true;
  let clones = cloneNodes();
  while (caught) {
    resetNodeStates();
    nodes = clones;
    if (picoseconds > 0) {
      moveScan();
      clones = cloneNodes();
    }
    caught = false;
    for (let i = 0; i <= lastNode; i++) {
      if (amICaught(i)) {
        caught = true;
        picoseconds++;
        break;
      }
      moveScan();
    }
  }
  console.log('Picoseconds : ' + (picoseconds));
}
function resetNodeStates() {
  for (let node in nodes) {
    nodes[node].direction = 'down';
    nodes[node].scannerPos = 1;
  }
}
function amICaught(pos) {
  if (nodes[pos] === undefined) return false;
  return nodes[pos].scannerPos === 1;
}
function createNodes(data) {
  data.forEach(item => {
    item = item.split(': ');
    nodes[item[0]] = { pos:item[0], depth:item[1], direction:'down', scannerPos:1 };
    lastNode = item[0]
  });
}
function moveScan() {
  nodes.forEach(node => {
    if (node.direction === 'down') {
      if (node.scannerPos < node.depth) {
        node.scannerPos++;
      } else {
        node.scannerPos--;
        node.direction = 'up';
      }
    } else {
      if (node.scannerPos > 1) {
        node.scannerPos--;
      } else {
        node.scannerPos++;
        node.direction = 'down';
      }
    }
  });
}
