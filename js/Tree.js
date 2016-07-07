/**
 * Tree 'class' constructure. Starts a tree at a given point with given genes
 * @param {object} genes    The genes that rule the Tree's growth. See README for list of options
 * @param {THREE.Vector3} position The Vector3 from which the trunk sprouts
 */
var Tree = function (genes, position) {
  this.genes = genes;
  this.branches = [];
  this.mtwister = new MersenneTwister(genes.seed);


  //create first branch
  this.branches.push(new Branch(
    position,
    genes.radius,
    genes.segmentLenght,
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
    }

  }
};



Tree.prototype.spawnBranch = function (origin, currentRadius, currentSegmentLenght, maxSegments, depth) {
  var thisTree = this;
  if (depth > thisTree.genes.maxDepth) {

    return false; //Dont make a new branch if depth is exceeded
  } else {

    var newMxSegments = Math.round(maxSegments * thisTree.genes.maxSegmentsDimP);
    thisTree.branches.push(new Branch(
      origin,
      currentRadius,
      currentSegmentLenght,
      newMxSegments,
      depth + 1,
      thisTree
    ));
  }
}
