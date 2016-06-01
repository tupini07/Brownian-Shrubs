var scene, camera, renderer, controls;
var tree = new Tree({
  segmentLenght: 10,
  maxSegments: 200,
  lenghtSubbranch: 100,
  radius: 0.2,
  radiusDimP: 0.98, //98% of the radius is passed between segments
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
  //  camera.lookAt(new THREE.Vector3( 0, 35, 0 ));


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
