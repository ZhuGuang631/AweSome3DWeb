import { useEffect, useRef, useState } from "react";
import COLOR_MAP from "../Maps/COLOR_MAP";
import Debounce from "../Tools/Debounce";
import math from "math";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Sphere() {
  const refContainer = useRef(null);
  const [sizes, setSizes] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    //Scene
    const scene = new THREE.Scene();

    //Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
    camera.position.set(0, 0, 20);
    scene.add(camera);

    //AxesHelper
    // const axeshelper = new THREE.AxesHelper(5);
    // scene.add(axeshelper);

    //Light
    const light = new THREE.PointLight(COLOR_MAP.INITCOLOR, 500);
    light.position.set(0, 10, 10);
    scene.add(light);

    //Create our sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: COLOR_MAP.WHITE,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //Canvas
    const canvas = refContainer.current;

    //renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene, camera);

    //Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.panSpeed = 0.8;

    //Animation
    animate()
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    //Resize
    const debounce = Debounce(() => {
      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 5);
    window.addEventListener("resize", debounce);

    //ChangeColor
    let flag = false;
    const rgb = { r: 12, g: 34, b: 57 }
    window.addEventListener("mousedown", () => flag = true)
    window.addEventListener("mouseup", () => flag = false)
    window.addEventListener("mousemove", (e) => {
      if (flag) {
        rgb.r = math.floor(255 * (e.pageX / window.outerWidth));
        rgb.g = math.floor(255 * (e.pageY / window.outerHeight));
        rgb.b = 110;
        light.color = new THREE.Color(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
      }
    })
    window.addEventListener("touchstart", () => flag = true)
    window.addEventListener("touchend", () => flag = false)
    window.addEventListener("touchmove", (e) => {
      if (flag) {
        rgb.r = math.floor(255 * (e.pageX / window.outerWidth));
        rgb.g = math.floor(255 * (e.pageY / window.outerHeight));
        rgb.b = 110;
        light.color = new THREE.Color(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
      }
    })

  }, [sizes]);

  return <canvas ref={refContainer}></canvas>;
}
