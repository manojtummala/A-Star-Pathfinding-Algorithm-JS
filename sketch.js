var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openset = [];
var closedset = [];
var start;
var end;
var w, h;

function Dot(i, j){
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.show = function(col) {
    fill(col);
    noStroke();
    rect(this.x * w, this.y * h, w-1, h-1);
  }
}


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

  start = grid[0][0];
  end = grid[cols-1][rows-1];

  openset.push(start);




  console.log(grid);


}

function draw() {

  if(openset.length > 0){
    // we can continue on...

  }
  else{
    // no solution to  it.. stop...
  }

  background(0);


  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < closedset.length; i++) {
    closedset[i].show(color(255, 0, 0));
  }

  for (var i = 0; i < openset.length; i++) {
    openset[i].show(color(0, 255, 0));
  }




}
