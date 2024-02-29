<template>
  <div class="p-5">
    <div ref="canvasRef" id="container"></div>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  watch,
  nextTick,
  reactive,
  onMounted,
  computed,
  onUnmounted,
} from "vue";
import moment from "moment";
import "moment/dist/locale/zh-cn";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const state: any = ref({
  camera: null, //相机对象
  scene: null, //场景对象
  renderer: null, //渲染器对象
  mesh: null, //网格模型对象Mesh
});
const canvasRef = ref();

const make3D = () => {
  console.log("开始构建");

  //创建一个三维场景
  const scene = new THREE.Scene();

  //添加光源
  // const ambient: any = new THREE.AmbientLight(0xffffff, 0.5),
  //   light1: any = new THREE.PointLight(0xffffff, 0.4),
  //   light2: any = new THREE.PointLight(0xffffff, 0.4);
  // scene.add(ambient);
  // light1.position.set(200, 300, 400);
  // scene.add(light1);
  // light2.position.set(-200, -300, -400);
  // scene.add(light2);
  //创建一个透视相机
  const width = window.innerWidth,
    height = window.innerHeight,
    camera : any = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  //设置相机位置
  camera.position.set(200, 200, 200);
  //设置相机方向
  camera.lookAt(0, 0, 0);
  //创建辅助坐标轴
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  //创建一个物体（形状）
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  //创建材质（外观）
  const material: any = new THREE.MeshLambertMaterial({
    color: 0x00ffff, //设置材质颜色
    transparent: true, //开启透明度
    opacity: 0.8, //设置透明度
  });


 
  // 7.创建光源
  const ambient: any = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
  scene.add(ambient);
  const spotLight1: any = new THREE.SpotLight(0xfffeff, 0.6); //(光照颜色, 光照强度)
  // 设置光源位置
  spotLight1.position.set(100, 1000, 100);
  
  spotLight1.castShadow = true;


  const spotLight2: any = new THREE.SpotLight(0xffffff, 0.1); //(光照颜色, 光照强度)
  // 设置光源位置
  spotLight2.position.set(-200, -300, -400);

  
  // 将光源添加到场景中
  scene.add(spotLight1, spotLight2);
 


  //创建一个网格模型对象
  const mesh: any = new THREE.Mesh(geometry, material);
  //把网格模型添加到三维场景
  scene.add(mesh);
  //创建一个WebGL渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () => {
    renderer.render(scene, camera);
  });


   

  // document.getElementById("container")?.appendChild(renderer.domElement);
  canvasRef.value.appendChild(renderer.domElement);
};

onMounted(() => {
  make3D();
});
// 页面卸载时
onUnmounted(() => {
  console.log("页面卸载时");
  // mittBus.off('changeTheme', () => {});
});
</script>
<style lang="scss">
.box {
  background-color: var(--next-bg-topBar);
}
.qrcode-box {
  width: 160px;
  height: 160px;
}
</style>
