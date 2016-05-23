var scene, camera, renderer;

setup();
render();

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
}

var lastOrigin = new THREE.Vector3(0, 0, 0);

function render() {
  requestAnimationFrame(render);

  var destination = new THREE.Vector3(-100 + Math.random() * 200,
    Math.random() * 100, -100 + Math.random() * 200
  );
  var lcurve = new THREE.LineCurve3(lastOrigin, destination);
  var geometry = new THREE.TubeGeometry(
    lcurve, //path
    20, //segments
    0.1, //radius
    8, //radiusSegments
    false //closed
  );
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  var tube = new THREE.Mesh(geometry, material);

  scene.add(tube);
  renderer.render(scene, camera);
  lastOrigin = destination;
}
