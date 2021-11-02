<template>
  <div class="permission_denied">
    <Particles id="tsparticles" :options="options" />
    <div class="denied__wrapper">
      <h1>404</h1>
      <h3>
        LOST IN <span>SPACE</span> Hmm your opinions are out of this world!
        However, looks like the page you were looking for doesn't exist.
      </h3>
      <img id="astronaut" src="@/assets/media/astronaut.svg" />
      <img id="planet" src="@/assets/media/planet.svg" />
      <a href="/"><button class="denied__link">Back to Earth</button></a>
    </div>
  </div>
</template>
<script lang="ts">
import options from './js/404'
export default {
  data() {
    return {
      options
    }
  }
}
</script>
<style scoped="text/css">
@import './css/404.css';
</style>
