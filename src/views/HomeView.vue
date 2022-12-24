<template>
   <canvas ref="experience" width="1000" height="1000"></canvas>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, SphereGeometry, MeshBasicMaterial } from 'three'
const experience = ref<HTMLCanvasElement | null>(null);

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.aspect = window.innerWidth / window.innerHeight
camera.position.z = 5;
scene.add(camera);

const sphere = new Mesh(new SphereGeometry(1, 20, 20), new MeshBasicMaterial({ color: 0x008080 }));
scene.add(sphere);
onMounted(() => {
   const render = new WebGLRenderer({
      canvas: experience.value as unknown as HTMLCanvasElement,
      antialias: true
   });
   render.setSize(window.innerWidth, window.innerHeight);
   render.render(scene, camera);
})


</script>

<style scoped>

</style>
