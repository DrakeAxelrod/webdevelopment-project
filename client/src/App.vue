<template>
  <div id="app" :style="image" class="">
    <Particles id="tsparticles" :options="bg" />
    <router-view name="header" />
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer" />
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import bg from '@/components/particles/bg'
export default {
  name: 'App',
  data() {
    return {
      bg,
      image: {
        backgroundImage:
          'url(https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80)'
      }
    }
  },
  components: {
    FadeTransition
  }
}
</script>
<style>
#app {
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
}
#tsparticles {
  z-index: 0;
}
main {
  min-height: 100vh;
}
</style>
