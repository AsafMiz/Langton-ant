function AntCell(x, y, w) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.blinker = 0;
  this.direction = 0; //direction: L = 0 , U = 1 , R = 2 , D = 3
}

AntCell.prototype.show = function() { //TODO update red show for the ant
  stroke(0);
  if (this.blinker < 5) {
    noFill();
  } else {
    fill(255, 0, 0);
  }
  rect(this.x * this.w, this.y * this.w, this.w, this.w);
}

AntCell.prototype.blink = function() {
  //red blink when not running
  this.blinker = (this.blinker + 1) % 10; // 10 frames interval
}
