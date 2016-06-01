var Tree = function (genes) {
  this.genes = genes;
  this.branches = [];

  //create first branch
  this.branches.push(new Branch(
    new THREE.Vector3(0, 0, 0),
    genes.radius,
    genes.maxSegmentsTrunk,
    0, //initial depth is always 0
    this
  ));

};

Tree.prototype.grow = function (scene) {
  for (i in this.branches) {

    //if returns false then branch reached is limit, remove from array
    if (!this.branches[i].grow(scene)) {
      this.branches.splice(i, 1);
      console.log(this.branches);
    }

  }
};



Tree.prototype.spawnBranch = function (origin, currentRadius, maxSegments, depth) {
  if (depth > this.genes.maxDepth) {
    return; //Dont make a new branch if depth is exceeded
  }
  var newMxSegments = Math.round(maxSegments * this.genes.maxSegmentsDimP);
  this.branches.push(new Branch(
    origin,
    this.genes.radius,
    this.genes.maxSegmentsTrunk,
    depth + 1,
    this
  ));
}
