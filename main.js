import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
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

//background
//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;


const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(5, 2, -1);
controls.autoRotate = true;

function animate() {
  requestAnimationFrame(animate);

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

      amOrPm = time.getTimezoneOffset() > 0 ? "PM" : "AM";

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