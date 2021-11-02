<template>
  <section>
    <div class="container">
      <div v-if="!this.loading" class="">
        <vue-masonry-wall
          :items="items"
          :options="{ width: 800, padding: 12 }"
          @append="getClashes"
        >
          <template v-slot:default="{ item }">
            <div class="item">
              <Card :clash="item" :options="options" />
            </div>
          </template>
        </vue-masonry-wall>
      </div>
    </div>
  </section>
</template>

<script>
import VueMasonryWall from 'vue-masonry-wall'
import Card from '@/components/clash/Card'

export default {
  components: { VueMasonryWall, Card },
  mounted() {
    this.getClashes()
  },
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      loading: true,
      items: [],
      options: {
        hoverEffect: false,
        showImg: true,
        shortContent: true,
        createButton: false,
        hasShadow: true,
        hasTags: true,
        hasVotes: true,
        contentLength: 3,
        goToButton: true
      }
    }
  },
  methods: {
    getClashes() {
      this.$http
        .get('/clashes')
        .then((res) => res.data)
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          res.forEach((e) => {
            this.items.push(e)
          })
          this.loading = false
        })
        .catch((err) => {
          this.operationalState = {
            state: 'err',
            message: err
          }
        })
    }
  }
}
</script>
<style lang="css" scoped>
vue-masonry-wall {
  min-height: 100vh;
}
</style>
