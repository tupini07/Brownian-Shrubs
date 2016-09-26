var Branch = function (origin, baseRadius, baseSegment, maxSegments, depth, tree) {
  this.gid = Math.round(Math.random() * maxSegments);
  this.topPoint = origin;
  this.radius = baseRadius;
  this.maxSegments = maxSegments;
  this.lenghtSubbranch = tree.genes.pSubBranch !== 0 ? Math.floor(maxSegments * tree.genes.pSubBranch) : 0;

  this.segmentLenght = baseSegment;

  this.depth = depth; //current position of the branch in chain
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

  this.material = new THREE.MeshLambertMaterial({
    color: Math.floor(Math.random()*16777215),//tree.genes.color,
    side: 2,
    shading: THREE.FlatShading
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

  if (newY < 0 || newY > 300 ){
    // newZ < -100 || newZ > 100 ||
    // newX < -100 || newX > 100) {
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
    thisBranch.tree.genes.segmentLenght, //segments
    thisBranch.radius, //radius
    8, //radiusSegments
    true //opened, muuuch more efficient but not so nice
  );

  //  modify next segment's radius
  thisBranch.radius = thisBranch.radius * thisBranch.tree.genes.radiusDimP;

  var tube = new THREE.Mesh(geometry, this.material);
  scene.add(tube);

  this.topPoint = destination;

  randomizeDir();

  //Helper functions.
  function randomizeDir() {
    //we want our dir to be from -1 to
    thisBranch.direction.x = (thisBranch.tree.mtwister.random() * 2) - 1;
    thisBranch.direction.y = (thisBranch.tree.mtwister.random() * 2) - 1;
    thisBranch.direction.z = (thisBranch.tree.mtwister.random() * 2) - 1;
  }

  function newPos(dimension) {
    return thisBranch.topPoint[dimension] + (thisBranch.direction[dimension] * thisBranch.segmentLenght);
  }

  //calculate segment lenght for new segment
  thisBranch.segmentLenght = thisBranch.segmentLenght * thisBranch.tree.genes.segmentLenghtDim;

  if (thisBranch.lenghtSubbranch !== 0 && thisBranch.segments % thisBranch.lenghtSubbranch === 0) {
    thisBranch.tree.spawnBranch(thisBranch.topPoint, thisBranch.radius, thisBranch.segmentLenght, this.maxSegments, this.depth);
  }

  //check if we can kill branch
  if (thisBranch.radius <= thisBranch.tree.genes.minRadius) {
    return false; //kill branch
  }

  //Kill if we have reached the max number of segments
  if (thisBranch.segments > thisBranch.maxSegments) {
    return false;
  } else {
    return true;
  }

};
