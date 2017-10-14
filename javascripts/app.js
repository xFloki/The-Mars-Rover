// Rover Object Goes Here
// ======================
var rover =
{
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};
// ======================

// IMPORTANT -> Dealing with the board Y and X will be inverted to match the coordinate based structure
// of the Grid
// Rober Grid
// Obstacles => 'O'
var board = [
  [' ','O','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ','O',' ',' ',' '],
  ['O','O',' ',' ','O',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ','O',' ',' ',' ',' ',' '],
  [' ',' ','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ','O',' ',' ',' ',' ',' ',' ',' ']
];


// Rober Added to the Grid to check collisions with other rovers
board[rover.y][rover.x] = rover;


function turnLeft(rover){
  console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
    break;
    case "S":
      this.rover.direction = "E";
    break;
    case "E":
      this.rover.direction = "N";
    break;
    case "W":
      this.rover.direction = "S";
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
          console.log(board);
        } else {
          console.log("Obstaculo Encontrado");
        }
      break;
      case "S":
        if(!checkObstacle(rover.y + 1, rover.x)){
          rover.y += 1;
          board[currentY][currentX] = ' ';
          board[currentY + 1][currentX] = rover;
          console.log("x = " + rover.x + " y = " + rover.y);
          console.log(board);
        } else {
          console.log("Obstaculo Encontrado");
        }
      break;
      case "E":
        if(!checkObstacle(rover.y, rover.x + 1)){
          rover.x += 1;
          board[currentY][currentX ] = ' ';
          board[currentY][currentX + 1] = rover;
          console.log("x = " + rover.x + " y = " + rover.y);
          console.log(board);
        } else {
          console.log("Obstaculo Encontrado");
        }
      break;
      case "W":
        if(!checkObstacle(rover.y, rover.x - 1)){
          rover.x -= 1;
          board[currentY][currentX] = ' ';
          board[currentY][currentX -1] = rover;
          console.log("x = " + rover.x + " y = " + rover.y);
          console.log(board);
        } else {
          console.log("Obstaculo Encontrado");
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
  return board[y][x] === ' ' ? false : true ;
}


console.log(board);
