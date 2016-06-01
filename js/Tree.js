var Tree = function (genes) {
  this.genes = genes;
  this.branches = [];
  //create first branch
  this.branches.push(new Branch(
    0.0,
    genes.radius,
    this
  ));
};

Tree.prototype.grow = function (scene) {
  for (i in this.branches) {

    //if returns false then branch reached is limit, remove from array
    if (!this.branches[i].grow(scene)) {
      branches.splice(i, 1);
    }

  }
};



Branch.prototype.spawnBranch = function (origin, currentRadius) {
  spawnSubB
}
