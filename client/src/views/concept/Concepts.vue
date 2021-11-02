<template>
  <div>
    <section class="section-sm">
      <div>
        <div class="container">
          <div myspecialselector>
            <vue-masonry-wall
              :items="items"
              :options="{ width: 300, padding: 12 }"
              @append="getConcepts"
            >
              <template v-slot:default="{ item }">
                <div class="item">
                  <Card :concept="item" :options="options" />
                </div>
              </template>
            </vue-masonry-wall>
          </div>
        </div>
      </div>
    </section>
    <section class="section-lg" />
  </div>
</template>

<script>
import VueMasonryWall from 'vue-masonry-wall'
import Card from '@/components/concept/Card'

export default {
  components: { VueMasonryWall, Card },
  mounted() {
    this.getConcepts()
  },
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      items: [],
      options: {
        hoverEffect: true,
        showImg: true,
        shortContent: false,
        createButton: false,
        hasShadow: true,
        hasTags: true,
        contentLength: 5,
        redirect: true
      }
    }
  },
  methods: {
    getConcepts() {
      this.$http
        .get('/concepts')
        .then((res) => res.data)
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          res.forEach((e) => {
            this.items.push(e)
          })
        })
        .catch((err) => {
          if (err) {
            this.operationalState = {
              state: 'err',
              message: err
            }
          }
        })
    }
  }
}
</script>
<style scoped>
button[myspecialselector] {
  justify-content: center;
}
</style>
