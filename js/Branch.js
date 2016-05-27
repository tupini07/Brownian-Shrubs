/**
 * Constructs a new Branch
 * @param {THREE.Vector3} origin The starting point of the branch
 */
var Branch = function (origin) {
  this.topPoint = origin;
  this.maxSegmentLenght = 2;

  //Directions are represented as a Vector3 where dirx*i+diry*j+dirz*k and
  //each dir is the magnitude that can go from 0 to 1 and multiplies the max segment lenght
  //Starting direction is UP
  this.direction = {
    x: 0,
    y: 1,
    z: 0
  };

  this.material = new THREE.MeshBasicMaterial({
    color: 0x38cb65
  });
};


/**
 * Conceptually grows and renders the branch
 * @param {THREE.Scene} scene The scene to which the branch belongs
 */
Branch.prototype.grow = function (scene) {
  var thisBranch = this;

  //calculate new direction, our drawing space is a 200x200x200 cube
  var newX = newPos('x');
  var newY = newPos('y');
  var newZ = newPos('z');

  if (newY < 0 || newY > 200 ||
    newZ < -100 || newZ > 100 ||
    newX < -100 || newX > 100) {
    randomizeDir();
    return;
  }

  var destination = new THREE.Vector3(newX, newY, newZ);

  var lcurve = new THREE.LineCurve3(this.topPoint, destination);

  var geometry = new THREE.TubeGeometry(
    lcurve, //path
    20, //segments
    0.2, //radius
    8, //radiusSegments
    true //opened
  );

  var tube = new THREE.Mesh(geometry, this.material);

  //Update color using dirs
//  var colt = hexToRgb(this.material.color);

  this.material.color.r += Math.abs(this.direction.x);
  this.material.color.g += Math.abs(this.direction.y);
  this.material.color.b += Math.abs(this.direction.z);

//  var hex = rgbToHex(colt.r, colt.g, colt.b);
  //this.material.color = 0x00ff00;//parseInt(hex,16);
//  console.log(this.material.color);
  scene.add(tube);

  this.topPoint = destination;

  randomizeDir();

  //Helper functions.
  function randomizeDir() {
    //we want our dir to be from -1 to
    thisBranch.direction.x = (Math.random() * 2) - 1;
    thisBranch.direction.y = (Math.random() * 2) - 1;
    thisBranch.direction.z = (Math.random() * 2) - 1;
  }

  function newPos(dimension) {
    return thisBranch.topPoint[dimension] + (thisBranch.direction[dimension] * thisBranch.maxSegmentLenght);
  }
};

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return {
    r: r,
    g: g,
    b: b
  };
}

function rgbToHex(R, G, B) {
  return toHex(R) + toHex(G) + toHex(B)
}

function toHex(n) {
  n = parseInt(n, 10);
  if (isNaN(n)) return "00";
  n = Math.max(0, Math.min(n, 255));
  return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
}
