var ochooseTree;

(function() {
  'use strict';
  var scene, camera, renderer, controls;

  var mutationVs = {
    mutationProb: 0.2, //Probability of mutation
    mutationDelta: 0.1, //% of original value to be mutated
    mutationPosProb: 0.5, //probability that mutation will increase numeric value of a gene
  };

  var blueTree;
  var greenTree;
  var redTree;

  var vectorBlue = new THREE.Vector3(-200, 0, 0);
  var vectorGreen = new THREE.Vector3(0, 0, 0);
  var vectorRed = new THREE.Vector3(200, 0, 0);

  var startingGenes = {
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
  };


  startTrees();
  setup();
  loop();

  function loop() {
    requestAnimationFrame(loop);

    if (blueTree) blueTree.grow(scene);
    if (greenTree) greenTree.grow(scene);
    if (redTree) redTree.grow(scene);

    controls.update();
    renderer.render(scene, camera);
  }

  //sets up basic scene
  function setup() {
    ochooseTree = chooseTree;

    setupScene();

    setupCamera();

    setupRenderer();

    setupFloors();

    setupControls();

    setupDatGUI();

  }

  /**
   * Starts a next generation based on the chosen tree
   * @param  {string} name of tree (for the moment this is the color of the floor [blue, green, red])
   */
  function chooseTree(tree) {
    switch (tree) {
      case 'blue':
        startingGenes = blueTree.genes;
        break;
      case 'green':
        startingGenes = greenTree.genes;
        break;
      case 'red':
        startingGenes = redTree.genes;
        break;
      default:
        throw 'The specified tree does not exist';
    }

    setupScene();
    setupFloors();
    startTrees();
  }

  /**
   * Returns a new genes object based on the 'global' startingGenes after
   * this is mutated.
   * Makes the role of mutator
   * @return {Object} The new genes after they have been mutated
   */
  function mutateGenes() {
    var newGenes = {};
    for (var gn in startingGenes) {

      // This uses Javascript Math.random instead of the MersenneTwister's random
      // because we don't care for repitablity, in fact, we don't want it
      if (Math.random() < mutationVs.mutationProb) {
        var valueToMutate = startingGenes[gn] * mutationVs.mutationDelta;
        newGenes[gn] = Math.random() <= mutationVs.mutationPosProb ? startingGenes[gn] + valueToMutate : startingGenes[gn] - valueToMutate;
        if (newGenes[gn] < 0) newGenes[gn] = 0;
      } else {
        newGenes[gn] = startingGenes[gn];
      }
    }
    return newGenes;
  }

  function setupCamera() {
    //Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 350;
    camera.position.y = 80;
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
      height: 15 * 32 - 1,
    });

    for (var gene in startingGenes) {
      switch (gene) {
        case 'segmentLenghtDim':
        case 'maxSegmentsDimP':
        case 'radiusDimP':
        case 'pSubBranch':
          gui.add(startingGenes, gene).min(0).max(1).step(0.01);
          break;
        case 'color':
          //gui.add(startingGenes, gene); //we don't want color to be custom
          break;
        case 'seed':
          gui.add(startingGenes, gene).min(0).max(99999999999).step(0.001); //maybe a max is not so good idea but well...
          break;
        default:
          gui.add(startingGenes, gene).min(0).max(100).step(1);
          break;
      }
    }

    for (var mutationV in mutationVs) {
      //add specifics for mutation
      gui.add(mutationVs, mutationV).min(0).max(1).step(0.01);
    }



    var hfunctions = {
      Click_to_Start: function() {
        startTrees()
      },
      Click_to_clear: function() {
        setupScene();
        setupFloors();
      }

    };

    for (var hfunc in hfunctions) {
      gui.add(hfunctions, hfunc);
    }

  }

  function setupFloors() {
    //Floor 1 setup
    var fgeo1 = new THREE.BoxGeometry(100, 2, 100);
    var fmat1 = new THREE.MeshBasicMaterial({
      color: 0xb84a4a
    });
    var floor1 = new THREE.Mesh(fgeo1, fmat1);
    floor1.position.x = 200;
    floor1.position.y = -2;
    scene.add(floor1);

    //Floor 2 setup
    var fgeo2 = new THREE.BoxGeometry(100, 2, 100);
    var fmat2 = new THREE.MeshBasicMaterial({
      color: 0x3db854
    });
    var floor2 = new THREE.Mesh(fgeo2, fmat2);
    floor2.position.y = -2;
    scene.add(floor2);

    //Floor 3 setup
    var fgeo3 = new THREE.BoxGeometry(100, 2, 100);
    var fmat3 = new THREE.MeshBasicMaterial({
      color: 0x625dc9
    });
    var floor3 = new THREE.Mesh(fgeo3, fmat3);
    floor3.position.x = -200;
    floor3.position.y = -2;
    scene.add(floor3);

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

  function startTrees() {
    blueTree = new Tree(startingGenes, vectorBlue);
    greenTree = new Tree(mutateGenes(), vectorGreen);
    redTree = new Tree(mutateGenes(), vectorRed);

  }

}());
