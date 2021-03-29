
// Function to delete element from the array
function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

// An educated guess of how far it is between two points
function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  // var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}


var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openset = [];
var closedset = [];
var start;
var end;
var w, h;

var path = [];

function setup() {
  createCanvas(400, 400);
  console.log('A*');

  w = width / cols;
  h = height/ rows;

  // 2D Array
  for(var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
  }

  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j] = new Dot(i, j);
    }
  }

  // All the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols-1][rows-1];
  start.wall = false;
  end.wall = false;

  // openSet starts with beginning only
  openset.push(start);
}

function draw() {

  if(openset.length > 0){
    // we can continue on...
    var winner = 0;
    for (var i = 0; i < openset.length; i++) {
      if (openset[i].f < openset[winner].f) {
        winner = i;
      }
  }
  var current = openset[winner];

  if (current === end) {
      noLoop();
      console.log('DONE!');
  }

// Best option moves from openSet to closedSet
  removeFromArray(openset, current);
  closedset.push(current);

  // Check all the neighbors
  var neighbors = current.neighbors;
  for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Valid next spot?
      if (!closedset.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);

        // Is this a better path than before?
        var newPath = false;
        if (openset.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openset.push(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
    // Uh oh, no solution
  } else {
    console.log('no solution');
    noLoop();
    return;
  }


  // Draw current state of everything
  background(255);


  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j].show();
    }
  }

  for (var i = 0; i < closedset.length; i++) {
    closedset[i].show(color(255, 0, 0, 50));
  }

  for (var i = 0; i < openset.length; i++) {
    openset[i].show(color(0, 255, 0, 50));
  }

  // Find the path by working backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();
}
