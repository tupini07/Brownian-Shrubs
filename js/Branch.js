/**
 * Constructs a new Branch
 * @param {THREE.Vector3} origin The starting point of the branch
 */
var Branch = function (origin, genes) {
  this.topPoint = origin;

  this.genes = genes;

  this.segments = 0; //always start in 0

  //Directions are represented as a Vector3 where dirx*i+diry*j+dirz*k and
  //each dir is the magnitude that can go from 0 to 1 and multiplies the max segment lenght
  //Starting direction is UP
  this.direction = {
    x: 0,
    y: 1,
    z: 0
  };

  this.material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
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
    return true;
  } else {
    //direction is ok and branch is going to grow
    thisBranch.segments += 1;
  }

  var destination = new THREE.Vector3(newX, newY, newZ);

  var lcurve = new THREE.LineCurve3(this.topPoint, destination);

  var geometry = new THREE.TubeGeometry(
    lcurve, //path
    20, //segments
    thisBranch.genes.radius, //radius
    8, //radiusSegments
    true //opened
  );

  var tube = new THREE.Mesh(geometry, this.material);
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
    return thisBranch.topPoint[dimension] + (thisBranch.direction[dimension] * thisBranch.genes.segmentLenght);
  }

  if (thisBranch.segments % thisBranch.genes.lenghtSubbranch === 0){
    thisBranch.spawnSubB();
  }

  //add to segments, if segments > maxSegments then stop growing
  if (thisBranch.segments > thisBranch.genes.maxSegments) {
    return false;
  } else {
    return true;
  }

};


//Branch should be inside a tree and the tree should be in charge of drawing it's branches and holding the specimen's genes
Branch.prototype.spawnSubB = function() {

}
