import * as THREE from "three"
import { FBXLoader } from 'three/addons/loaders/FBXLoader'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);

const scene = new THREE.Scene();
// scene.background = new THREE.Color("rgb(255, 0, 0)");

// Lighting
var light = new THREE.PointLight();
light.position.set(0,1,2);
scene.add(light);
light = new THREE.PointLight();
light.position.set(1,1,-2);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x888888);
scene.add(ambientLight);

const testGeometry = new THREE.SphereGeometry(1,45,45);
const testMat = new THREE.MeshStandardMaterial({color: "#06ff22"});
const testMesh = new THREE.Mesh(testGeometry, testMat);
// scene.add(testMesh);
console.log(testMesh);

// Camera
const camera = new THREE.PerspectiveCamera(45, 800/600, .1, 30);
camera.position.set(0, .1, 0);
scene.add(camera);

/*
const fbxLoader = new FBXLoader();
fbxLoader.load(
	"assets/test.fbx",
	(object) => {
		object.position.set(0, 0, 0);
		renderer.render(scene, camera);
		console.log(object);
		scene.add(object);
	},
	(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
	},
	(error) => {
			console.log(error);
	}
);
*/
const gltfLoader = new GLTFLoader();
gltfLoader.load(
	"assets/dice-set/scene.gltf",
	(gltf) => {
		console.log(gltf);
		scene.add(gltf.scene);
		gltf.scene.scale.set(.012, .012, .012);
		renderer.render(scene, camera);
	},
	(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
	},
	(error) => {
			console.log(error);
	}
);

var test = 0;
setInterval(
	() => {
		test += .01;
		camera.position.z = Math.sin(test) * .1;
		camera.position.x = Math.cos(test) * .1;
		camera.lookAt(0, 0, 0);
		renderer.render(scene, camera);
		// console.log(camera.rotation);
	},
	1/60
);

renderer.render(scene, camera);
