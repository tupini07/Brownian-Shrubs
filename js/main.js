var scene, camera, renderer;

setup();

class Cubee {
  constructor() {

  }
  nep() {
    var geometry = new THREE.BoxGeometry(150, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    return cube;
  }

}
var cube = new Cubee().nep();
var lcurve = new THREE.LineCurve3(new THREE.Vector3(0,0,0), new THREE.Vector3(100,100,50));
var geometry = new THREE.TubeGeometry(
    lcurve,  //path
    20,    //segments
    2,     //radius
    8,     //radiusSegments
    false  //closed
);
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});
var tube = new THREE.Mesh(geometry, material);

scene.add(cube);
scene.add(tube);

render();

//set's up basic scene
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

  //End of setup
  var fgeo = new THREE.BoxGeometry(100, 2, 100);
  var fmat = new THREE.MeshBasicMaterial({
    color: 0xd3d3d3
  });
  var floor = new THREE.Mesh(fgeo, fmat);
  floor.position.y = -2;
  scene.add(floor);
}

function render() {
  requestAnimationFrame(render);

  // var geometry = new THREE.SphereGeometry(1,8,6);
  // var material = new THREE.MeshBasicMaterial({
  //   color: 0x000000
  // });
  // var point = new THREE.Mesh(geometry, material);
  // point.position.x = -100 + Math.random() * 200;
  // point.position.y = Math.random()*100;
  // point.position.z = -100 + Math.random()*200;
  // scene.add(point);

  cube.rotation.x += 0;
  cube.rotation.y += 0.1;


  renderer.render(scene, camera);
}
