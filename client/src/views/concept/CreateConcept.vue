<template>
  <section class="section">
    <div class="container">
      <base-input
        @input="trackText()"
        @keypress.enter="search"
        v-model="value.text"
        type="text"
        alternative
        class="mb-3"
        placeholder="Search"
        addon-left-icon="fa fa-search"
      />
      <div v-if="progress.value !== 0">
        <b-progress
          class="the-progress-bar"
          :value="progress.value"
          :max="progress.max"
          height="1rem"
          variant="warning"
          animated
        />
      </div>
      <div v-if="!loading" class="justify-content-center">
        <vue-masonry-wall :items="items" :options="{ width: 300, padding: 10 }">
          <template v-slot:default="{ item }">
            <div class="item">
              <Card
                @Created="create($event)"
                :concept="item"
                :options="options"
              />
            </div>
          </template>
        </vue-masonry-wall>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '@/components/concept/Card'
import VueMasonryWall from 'vue-masonry-wall'
import services from '@/services/index'

export default {
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      loading: false,
      progress: {
        value: 0,
        max: 100
      },
      items: [],
      value: { filter: null, text: '' },
      options: {
        hoverEffect: true,
        showImg: true,
        shortContent: true,
        createButton: true,
        hasShadow: true,
        hasTags: false,
        contentLength: 5
      }
    }
  },
  components: {
    Card,
    VueMasonryWall
  },
  methods: {
    async search() {
      this.loading = true
      this.items = []
      const progress = (n) => {
        if (this.progress.value >= 100) {
          this.progress.value = 0
          clearInterval(identity)
        } else {
          this.progress.value += n
        }
      }
      const identity = setInterval(() => {
        progress(10)
      }, 300)
      // get all currently existing concepts
      const concepts = await this.$http
        .get('/concepts')
        .then((res) => {
          const concepts = []
          Object.values(res.data).forEach((e) => {
            const name = e.name.toLowerCase()
            concepts.push(name)
          })
          return concepts
        })
        .catch((err) => {
          return err
        })
      // inner function to check for redundacy and existance
      const checkItem = (concept) => {
        const err = concept instanceof TypeError
        if (typeof concept === 'undefined' || concept === null || err) {
          return false
        }
        const item = concept.name.toLowerCase()
        const doesNotExist = !concepts.includes(item)
        const mayRefer = concept.content.includes('may refer to:')
        return doesNotExist && !mayRefer
      }
      // get the search results
      const query = await services.wiki
        .search(this.value.text)
        .then((res) => {
          return res.results
        })
        .catch((err) => {
          return err
        })
      // get search results as concepts
      const promises = []
      query.forEach((e) => {
        const item = services.wiki
          .getConcept(e)
          .then((res) => {
            // progress(3)
            return res
          })
          .catch((err) => {
            return err
          })
        promises.push(item)
      })
      // const incrementValue = 70 / promises.length
      // resolve all promises and validate each result then display result
      Promise.all(promises)
        .then((res) => {
          const arr = []
          res.forEach((e) => {
            if (checkItem(e)) {
              arr.push(e)
            }
          })
          this.items = arr
        })
        .catch((err) => {
          if (err) {
            this.operationalState = {
              state: 'err',
              message: err
            }
          }
        })
      this.loading = false
    },
    trackText() {
      // console.log(this.search.text)
    },
    create(concept) {
      const index = this.items.findIndex((e) => e.name === concept.name)
      this.items.splice(index, 1)
    }
  },
  computed: {}
}
</script>
<style scoped="css">
.the-progress-bar {
  box-shadow: unset;
  background-color: rgba(255, 255, 255, 0);
}
</style>
