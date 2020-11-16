import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-plan-salle',
  templateUrl: './plan-salle.component.html',
  styleUrls: ['./plan-salle.component.css']
})
export class PlanSalleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.start();
  }

  
  start() {
    const canvasContainerId = 'canvas-3dcontainer';
    const size = {
      width: document.getElementById(canvasContainerId).clientWidth,
      height: document.getElementById(canvasContainerId).clientHeight
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, size.width/size.height, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( size.width, size.height );
    //document.body.appendChild( renderer.domElement );
    //renderer.domElement.classList.add('canvas3dview');
    
    document.getElementById(canvasContainerId).appendChild(renderer.domElement)
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    animate();
  }


}
