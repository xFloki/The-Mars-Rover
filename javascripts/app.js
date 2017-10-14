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
        rover.y -= 1;
        console.log("x = " + rover.x + " y = " + rover.y);
      break;
      case "S":
        rover.y += 1;
        console.log("x = " + rover.x + " y = " + rover.y);
      break;
      case "E":
        rover.x += 1;
        console.log("x = " + rover.x + " y = " + rover.y);
      break;
      case "W":
        rover.x -= 1;
        console.log("x = " + rover.x + " y = " + rover.y);
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

console.log(rover);
