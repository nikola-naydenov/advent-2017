let movement = {
  'n': function(node) {return { x:node.x, y:node.y+1, z:node.z-1 } },
  'nw': function(node) {return { x:node.x-1, y:node.y+1, z:node.z } },
  'ne': function(node) {return { x:node.x+1, y:node.y, z:node.z-1 } },
  's': function(node) {return { x:node.x, y:node.y-1, z:node.z+1 } },
  'sw': function(node) {return { x:node.x-1, y:node.y, z:node.z+1 } },
  'se': function(node) {return { x:node.x+1, y:node.y-1, z:node.z } }
}

function adventDayEleven(instructions) {
  let longestyard = 0;
  let startNode = { x: 0, y: 0, z: 0};
  let endNode = { x: 0, y: 0, z: 0};
  instructions = instructions.split(',');
  instructions.forEach(inst => {
    endNode = movement[inst](endNode);
    let currentDist = cube_distance(endNode, startNode);
    if (currentDist > longestyard) longestyard = currentDist;
  })
  console.log(endNode);
  console.log(cube_distance(endNode, startNode));
  console.log(longestyard);
}
function cube_distance(a, b) {
    return Math.max(Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y)), Math.abs(a.z - b.z));
}
