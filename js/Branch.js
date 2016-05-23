/**
 * Constructs a new Branch
 * @param {THREE.Vector3} origin The starting point of the branch
 */
var Branch = function (origin) {
  this.topPoint = origin;
};


/**
 * Conceptually grows and renders the branch
 * @param {THREE.Scene} scene The scene to which the branch belongs
 */
Branch.prototype.grow = function (scene) {
  var destination = new THREE.Vector3(-100 + Math.random() * 200,
    Math.random() * 100, -100 + Math.random() * 200
  );
  var lcurve = new THREE.LineCurve3(this.topPoint, destination);

  var geometry = new THREE.TubeGeometry(
    lcurve, //path
    20, //segments
    0.1, //radius
    8, //radiusSegments
    false //closed
  );
  this.material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  var tube = new THREE.Mesh(geometry, this.material);
  scene.add(tube);
  this.topPoint = destination;
};
