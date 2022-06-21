import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50,1, 0.1,1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
/* set renderer size to smaller than window */
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//model addition
const loader = new GLTFLoader();

loader.load(
	// resource URL
	'scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


//light creation
const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

//helpers
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200,50);

//const controls = new OrbitControls(camera, renderer.domElement);


//add to scene
scene.add(ambientLight);
scene.add(pointLight);
//scene.add(lightHelper);
//scene.add(gridHelper);

// set background to grey
scene.background = new THREE.Color( 0xff202023 );



const controls = new OrbitControls( camera, renderer.domElement );
camera.position.y = 4;
camera.position.x = 6;
camera.position.z = 10;
controls.autoRotate = true;
controls.enableZoom = false;
controls.enableRotate = false;

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }
}

function animate() {
  requestAnimationFrame(animate);
  resizeCanvasToDisplaySize();
  controls.update();

  renderer.render(scene, camera);
}

animate();


function clock() {// We create a new Date object and assign it to a variable called "time".
    var time = new Date(),
      
      // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),
    
    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes(),
    
    
    seconds = time.getSeconds(),

    amOrPm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

  
  document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds) + " " + harold(amOrPm);
    
    function harold(standIn) {
      if (standIn < 10) {
        standIn = '0' + standIn
      }
      return standIn;
    }
  }
  setInterval(clock, 1000);


  const topMenu = document.getElementsByClassName( "topnav" );
  const topMenuHeight = topMenu.offsetHeight + 1;
  const menuItems = document.querySelectorAll( ".menu-item" );
  const scrollItems = document.querySelectorAll( "section" );
  let lastId;
  /* highlights the current section in the navbar */
  window.addEventListener( "scroll", function () {
    // Get container scroll position
    const container = document.querySelector( "main" );
    let fromTop = window.pageYOffset + topMenuHeight + 40;

    // Get id of current scroll item
    let cur = [];

    [ ...scrollItems ].map( function ( item ) {
      if ( item.offsetTop < fromTop ) {
        cur.push( item );
      }
    } );

    // Get the id of the current element
    cur = cur[ cur.length - 1 ];
    let id = cur ? cur.id : "";

    if ( lastId !== id ) {
      lastId = id;

      menuItems.forEach( function ( elem, index ) {
        elem.classList.remove( "active" );
        const filteredItems = [ ...menuItems ].filter( elem => elem.getAttribute( "href" ) === `#${id}` );
        filteredItems[ 0 ].classList.add( "active" );
      } );
    }
  } );