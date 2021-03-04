var cols = 5;
var rows = 5;
var grid = new Array(cols);

var opetset = [];
var closedset = [];

function Dot(){
  this.f = 0;
  this.g = 0;
  this.h = 0;
}


function setup() {
  createCanvas(400, 400);
  console.log('A*');

  // 2D Array
  for(var i = 0; i < cols; i++){
    grid[i] = new Array(rows);
  }

  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      grid[i][j] = new Dot();
    }
  }
  console.log(grid);


}

function draw() {
  background(0);

}
