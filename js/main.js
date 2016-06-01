var scene, camera, renderer, controls;
var tree = new Tree({
  segmentLenght: 2,
  maxSegmentsTrunk: 200,
  maxSegmentsDimP: 0.5, //each child will have x% segments
  pSubBranch: 0.5, //percentages of segments before new branch is created
  radius: 1.0,
  minRadius: 0.5,
  maxDepth: 10, //max number of members in a chain of branches
  radiusDimP: 1.0, //98% of the radius is passed between segments
  color: 0x00fff0,
});

setup();
loop();

function loop() {
  requestAnimationFrame(loop);

  tree.grow(scene);

  controls.update();
  renderer.render(scene, camera);
}

//sets up basic scene
function setup() {
  //Scene Setup
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 2000, 10000);
  var light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  //Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 150;
  camera.position.y = 60;


  //Renderer Setup
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor(scene.fog.color);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;

  var pointLight = new THREE.PointLight( 0xffffff, 300, 300);
  pointLight.position.set( 10, 200, 10 );

  scene.add(pointLight);


  //Floor setup
  var fgeo = new THREE.BoxGeometry(100, 2, 100);
  var fmat = new THREE.MeshBasicMaterial({
    color: 0xd3d3d3
  });
  var floor = new THREE.Mesh(fgeo, fmat);
  floor.position.y = -2;
  scene.add(floor);
  //End of setup


  lastOrigin = new THREE.Vector3(0, 0, 0);


  controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', function () {
    renderer.render(scene, camera);
  });


}
