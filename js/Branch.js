var Branch = function (origin, baseRadius, tree) {
  this.topPoint = origin;
  this.radius = baseRadius;
  this.tree = tree;

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
    color: tree.genes.color
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
    thisBranch.radius, //radius
    8, //radiusSegments
    true //opened
  );

  //  modify next segment's radius
  thisBranch.spawnBranch.radius = thisBranch.spawnBranch.radius * thisBranch.tree.genes.radiusDimP;

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
    return thisBranch.topPoint[dimension] + (thisBranch.direction[dimension] * thisBranch.tree.genes.segmentLenght);
  }

  if (thisBranch.segments % thisBranch.tree.genes.lenghtSubbranch === 0) {
    thisBranch.tree.spawnBranch(thisBranch.topPoint, thisBranch.radius);
  }

  //check if we can kill branch
  if (thisBranch.radius <= 0){
    return false; //kill branch
  }

  //Kill if we have reached the max number of segments
  if (thisBranch.segments > thisBranch.tree.genes.maxSegments) {
    return false;
  } else {
    console.log('grow;');
    return true;
  }

};
