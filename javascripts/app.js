// Rover Object Goes Here
// ======================

function Rover(direction, x, y) {
    this.direction = direction;
    this.x = x;
    this.y = y;
    this.travelLog = [];

}

var rover = new Rover("N", 0, 0);
var rover2 = new Rover("S", 0, 2);
var rover3 = new Rover("E", 5, 3);

// ======================

// IMPORTANT -> New rovers can be created from the console, in order to work properly they must
// be painted in the grid. Creating a rover on an obstacle or another rover won't give any error
// or warning, NEEDS to be FIXED

// IMPORTANT -> Dealing with the board Y and X will be inverted to match the coordinate based structure
// of the Grid
// Rober Grid
// Obstacles => 'O'
var board = [
  [' ','O','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ','O',' '],
  [' ',' ',' ',' ',' ',' ','O',' ',' ',' '],
  ['O','O',' ',' ','O',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ','O',' '],
  [' ',' ',' ',' ','O',' ',' ',' ',' ',' '],
  [' ',' ','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ','O',' ',' ',' ',' ','O',' ',' '],
  [' ',' ','O',' ',' ',' ',' ',' ',' ',' ']
];

paintRover(rover);
paintRover(rover2);
paintRover(rover3);

function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
    break;
    case "S":
      rover.direction = "E";
      console.log(rover);
    break;
    case "E":
      rover.direction = "N";
    break;
    case "W":
      rover.direction = "S";
    break;
  }
}

function turnRight(rover){
  console.log("turnRight was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
    break;
    case "S":
      rover.direction = "W";
    break;
    case "E":
      rover.direction = "S";
    break;
    case "W":
      rover.direction = "N";
    break;
  }
}

function moveForward(rover){
  console.log("moveForward was called");
  var currentX = rover.x;
  var currentY = rover.y;

  // If there is path ahead rover moves, if not console log to indicate it
  if(checkPath(rover.direction, rover.x, rover.y)){
    switch (rover.direction) {
      case "N":
        if(!checkObstacle(rover.y - 1, rover.x)){
          rover.y -= 1;
          // Update rover position on Board
          board[currentY][currentX] = ' ';
          board[currentY - 1 ][currentX] = rover;
          console.log("x = " + rover.x + " y = " + rover.y);
          // Print board to check rover position
          console.log(board);
        }
      break;
      case "S":
        if(!checkObstacle(rover.y + 1, rover.x)){
          rover.y += 1;
          board[currentY][currentX] = ' ';
          board[currentY + 1][currentX] = rover;
          console.log("x = " + rover.x + " y = " + rover.y);
          console.log(board);
        }
      break;
      case "E":
        if(!checkObstacle(rover.y, rover.x + 1)){
          rover.x += 1;
          board[currentY][currentX ] = ' ';
          board[currentY][currentX + 1] = rover;
          console.log("x = " + rover.x + " y = " + rover.y);
          console.log(board);
        }
      break;
      case "W":
        if(!checkObstacle(rover.y, rover.x - 1)){
          rover.x -= 1;
          board[currentY][currentX] = ' ';
          board[currentY][currentX -1] = rover;
          console.log("x = " + rover.x + " y = " + rover.y);
          console.log(board);
        }
      break;
    }
    saveLocation(currentX, currentY);
  } else {
    console.log("There is no path to move");
  }

}

function moveBackward(rover) {
  turnRight(rover);
  turnRight(rover);
}

function roverCommandList(command) {

  for (var i = 0; i < command.length; i++) {
    var currentCommand = command[i];
    switch (currentCommand) {
      case 'f':
        moveForward(rover);
      break;
      case 'r':
        turnRight(rover);
      break;
      case 'l':
        turnLeft(rover);
      break;
      case 'b':
        moveBackward(rover);
      break;

      default:
        console.log("Unknown command " + command[i]);
    }
  }
}

function saveLocation(x,y){
  rover.travelLog.push([x,y]);
}

// Check if there is path available, if not return false
function checkPath(direction, x , y){
  switch (direction) {
    case "N":
      return y <= 0 ?  false : true;
    case "S":
      return y >= 9 ?  false : true;
    case "E":
      return x >= 9 ?  false : true;
    case "W":
      return x <= 0 ?  false : true;

  }
}

// Check if there is an obstacle in the next position
// return false if there is no obstacle
function checkObstacle(y,x){
  if (board[y][x] === ' ') {
    return false;
  } else {
    if(board[y][x] === 'O'){
      console.log("Obstacle found, impossible to move in that direction");
      return true;
    } else {
      console.log("There is another rover on the way, impossible to move in that direction");
      return true;
    }
  }

}

// Paint rover on Grid
function paintRover(rover){
  // Rober Added to the Grid to check collisions with other rovers
  board[rover.y][rover.x] = rover;
}



console.log(board);
