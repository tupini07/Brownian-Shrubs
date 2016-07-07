(function() {
  'use strict';
  var scene, camera, renderer, controls;
  var tree = new Tree({
    segmentLenght: 10,
    segmentLenghtDim: 0.98, //each segment will be x% the lenght of the last segment
    maxSegmentsTrunk: 10, //Max segments for the trunk
    maxSegmentsDimP: 1, //each child will have x% segments
    pSubBranch: 0.9, //percentages of segments before new branch is created
    radius: 5.0,
    minRadius: 0.1, //min radius before extinsion, may never be 0
    maxDepth: 20, //max number of members in a chain of branches
    radiusDimP: 0.9, //x% of the radius is passed between segments
    color: 0x00fff0,
    seed: 12345, //seed for random number generator
  }, new THREE.Vector3(0, 0, 0));

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

    setupScene();

    setupCamera();

    setupRenderer();

    setupFloor();

    setupControls();

    setupDatGUI();

  }


  function setupCamera() {
    //Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 150;
    camera.position.y = 60;
  }

  function setupControls() {
    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function() {
      renderer.render(scene, camera);
    });

  }

  function setupDatGUI() {
    //Setup DAT.GUI
    var gui = new DAT.GUI({
      height: 12 * 32 - 1,
    });

    for (var gene in tree.genes) {
      switch (gene) {
        case 'segmentLenghtDim':
        case 'maxSegmentsDimP':
        case 'radiusDimP':
        case 'pSubBranch':
          gui.add(tree.genes, gene).min(0).max(1).step(0.01);
          break;
        case 'color':
          //gui.add(tree.genes, gene); //we don't want color to be custom
          break;
        case 'seed':
          gui.add(tree.genes, gene).min(0).max(99999999999).step(0.01); //maybe a max is not so good idea but well...
          break;
        default:
          gui.add(tree.genes, gene).min(0).max(100).step(1);
          break;
      }
    }

    var hfunctions = {
      Click_to_Redraw: function() {
        //Not very glamorous but for the moment will do fine
        tree = new Tree(tree.genes);
      },
      Click_to_clear: function() {
        setupScene();
        setupFloor();
      }

    };

    for (var hfunc in hfunctions) {
      gui.add(hfunctions, hfunc);
    }

  }

  function setupFloor() {
    //Floor setup
    var fgeo = new THREE.BoxGeometry(100, 2, 100);
    var fmat = new THREE.MeshBasicMaterial({
      color: 0xd3d3d3
    });
    var floor = new THREE.Mesh(fgeo, fmat);
    floor.position.y = -2;
    scene.add(floor);
    //End of setup
  }

  function setupRenderer() {
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
  }

  function setupScene() {
    //Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000);
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
  }
}());
