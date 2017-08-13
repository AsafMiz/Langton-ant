var run = false;
var grid;
//var cols = 10; //width
//var rows = 10; //height
var w = 10; //size of each cell
var playButton;
var resetButton;
var savebutton;
var blink = 0;
var ant;

function setup() {
  createCanvas(601, 401);
  frameRate(15);
  colorMode(RGB);
  playButton = createButton("Play");
  resetButton = createButton("Reset");
  saveButton = createButton("Save");
  playButton.mousePressed(play);
  resetButton.mousePressed(reset);
  saveButton.mousePressed(saveCanv);
  cols = floor(width / w);
  rows = floor(height / w);
  ant = new AntCell(floor(cols / 2), floor(rows / 2), w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function draw() {
  if (run) {
    update();
  } else {
    ant.blink(); //blink when not running
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  ant.show();
}

update = function() { //TODO new function plzzzz
  //flip the cell first
  grid[ant.x][ant.y].alive = (grid[ant.x][ant.y].alive + 1) % 2;

  // direction: L = 0 , U = 1 , R = 2 , D = 3
  if (grid[ant.x][ant.y].alive == 0) { //met a "dead" cell
    if (ant.direction == 0) { //L -> U
      ant.x = (ant.x + 0 + cols) % cols;
      ant.y = (ant.y + 1 + rows) % rows;
      ant.direction = 1;

    } else if (ant.direction == 1) { //U -> R
      ant.x = (ant.x + 1 + cols) % cols;
      ant.y = (ant.y + 0 + rows) % rows;
      ant.direction = 2;

    } else if (ant.direction == 2) { //R -> D
      ant.x = (ant.x + 0 + cols) % cols;
      ant.y = (ant.y + (-1) + rows) % rows;
      ant.direction = 3;

    } else { //D -> L
      ant.x = (ant.x + (-1) + cols) % cols;
      ant.y = (ant.y + 0 + rows) % rows;
      ant.direction = 0;
    }
  } else { //met a "live" cell
    // direction: L = 0 , U = 1 , R = 2 , D = 3
    if (ant.direction == 0) { //L -> D
      ant.x = (ant.x + 0 + cols) % cols;
      ant.y = (ant.y + (-1) + rows) % rows;
      ant.direction = 3;

    } else if (ant.direction == 1) { //U -> L
      ant.x = (ant.x + (-1) + cols) % cols;
      ant.y = (ant.y + 0 + rows) % rows;
      ant.direction = 0;

    } else if (ant.direction == 2) { //R -> U
      ant.x = (ant.x + 0 + cols) % cols;
      ant.y = (ant.y + 1 + rows) % rows;
      ant.direction = 1;

    } else { //D -> R
      ant.x = (ant.x + 1 + cols) % cols;
      ant.y = (ant.y + 0 + rows) % rows;
      ant.direction = 2;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].flip();
      }
    }
  }
}

function play() {
  run = !run;
  ant.blinker = 9; //on for red fill
  if (run) {
    playButton.html("Pause");
  } else {
    playButton.html("Play");
  }
}

function reset() { //TODO update ant's starting move
  run = false;
  playButton.html("Play");
  ant.x = floor(cols / 2);
  ant.y = floor(rows / 2);
  ant.direction = 0;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].alive = 0;
    }
  }
}

function saveCanv() {
  save('canvas.png');
}
