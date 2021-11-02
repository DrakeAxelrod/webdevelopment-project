<!-- https://ctnicholas.medium.com/create-a-searchable-dropdown-list-in-vue-js-139dd064e845 -->
<template>
  <div class="Create-Clash-Page">
    <section class="section-sm"></section>
    <section align="center" class="section">
      <div class="container">
        <div align="center">
          <div align="center" class="border-0">
            <b-card-group class="bg-white rounded">
              <Card
                v-on:close-button-pressed="oneClosed"
                :concept="clash.one"
                :options="{
                  hoverEffect: false,
                  showImg: options.showImg,
                  createButton: false,
                  hasShadow: false,
                  hasTags: options.hasTags,
                  hasCloseButton: values.one.hasClose,
                  contentLength: options.contentLength
                }"
              />
              <img
                src="@/assets/media/vs.svg"
                alt="vs symbol"
                class="bg"
                height="50"
                width="50"
              />
              <Card
                fluid
                v-on:close-button-pressed="twoClosed"
                :concept="clash.two"
                :options="{
                  hoverEffect: false,
                  showImg: options.showImg,
                  createButton: false,
                  hasShadow: false,
                  hasTags: options.hasTags,
                  hasCloseButton: values.two.hasClose,
                  contentLength: options.contentLength
                }"
              />
            </b-card-group>
          </div>
          <b-row class="input-fields-wrapper">
            <b-col class="dropdown">
              <base-input
                v-if="Object.keys(values.one.selected).length === 0"
                ref="dropdowninput"
                v-model.trim="values.one.text"
                alternative
                type="text"
                class="dropdown-input"
                placeholder="Search Concept"
                addon-left-icon="fa fa-search"
              />
              <!-- <div v-else @click="resetSelectionOne" class="dropdown-selected">
                {{ values.one.selected }}
              </div> -->

              <div v-show="values.one.text" class="dropdown-list">
                <div
                  v-for="item in items"
                  :key="item"
                  @click="selectOneItem(item)"
                  v-show="itemOneVisible(item)"
                  class="dropdown-item"
                >
                  {{ item }}
                </div>
              </div>
            </b-col>
            <b-col class="dropdown">
              <base-input
                v-if="Object.keys(values.two.selected).length === 0"
                ref="dropdowninput"
                v-model.trim="values.two.text"
                alternative
                type="text"
                class="dropdown-input"
                placeholder="Search Concept"
                addon-left-icon="fa fa-search"
              />
              <!-- <div v-else @click="resetSelectionTwo" class="dropdown-selected">
                {{ values.two.selected }}
              </div> -->
              <div v-show="values.two.text" class="dropdown-list">
                <div
                  v-for="item in items"
                  :key="item"
                  @click="selectTwoItem(item)"
                  v-show="itemTwoVisible(item)"
                  class="dropdown-item"
                >
                  {{ item }}
                </div>
              </div>
            </b-col>
          </b-row>
          <section class="section-sm" />
          <div
            v-if="
              !(Object.keys(this.values.one.selected).length === 0) &&
              !(Object.keys(this.values.two.selected).length === 0) &&
              !optionsSame &&
              !beingCreated &&
              !exists
            "
          >
            <b-button v-on:click="create()" variant="warning" class="my-4"
              >Create</b-button
            >
          </div>
          <h3 v-if="optionsSame" class="text-danger pt-10">
            <strong>You cant have something be against itself!</strong>
          </h3>
          <h3 v-if="exists" class="text-danger pt-10">
            <strong>This Clash already exists!</strong>
          </h3>
        </div>
      </div>
    </section>
    <Particles v-if="clashCreate" id="tsparticles" :options="fireworks" />
  </div>
</template>

<script>
import Card from '@/components/concept/Card'
import fireworks from '../../components/particles/fireworks'
export default {
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      options: {
        hoverEffect: false,
        showImg: true,
        shortContent: true,
        createButton: false,
        hasShadow: false,
        hasTags: true,
        contentLength: 5
      },
      fireworks,
      clashCreate: false,
      beingCreated: false,
      exists: false,
      values: {
        one: {
          hasClose: false,
          text: '',
          selected: {}
        },
        two: {
          hasClose: false,
          text: '',
          selected: {}
        }
      },
      clash: {
        one: {},
        two: {}
      },
      notSame: true,
      concepts: [],
      items: []
    }
  },
  mounted() {
    this.getSuggestions()
    this.concepts = this.getConcepts()
  },
  components: {
    Card
  },
  methods: {
    oneClosed() {
      this.resetSelectionOne()
    },
    twoClosed() {
      this.resetSelectionTwo()
    },
    resetSelectionOne() {
      this.exists = false
      this.values.one.hasClose = false
      this.clash.one = {}
      this.values.one.selected = {}
      this.$emit('on-item-reset')
    },
    selectOneItem(item) {
      this.values.one.selected = item
      this.values.one.hasClose = true
      this.values.one.text = ''
      this.concepts.then((res) => {
        res.forEach(async (e) => {
          if (e.name === item) {
            this.clash.one = await e
          }
        })
      })
      this.$emit('on-item-selected', item)
    },
    itemOneVisible(item) {
      const currentName = item.toLowerCase()
      const currentInput = this.values.one.text.toLowerCase()
      return currentName.includes(currentInput)
    },
    resetSelectionTwo() {
      this.exists = false
      this.values.two.hasClose = false
      this.clash.two = {}
      this.values.two.selected = {}
      this.$emit('two-on-item-reset')
    },
    selectTwoItem(item) {
      this.values.two.selected = item
      this.values.two.hasClose = true
      this.values.two.text = ''
      this.concepts.then((res) => {
        res.forEach(async (e) => {
          if (e.name === this.values.two.selected) {
            this.clash.two = await e
          }
        })
      })
      this.$emit('two-on-item-selected', item)
    },
    itemTwoVisible(item) {
      const currentName = item.toLowerCase()
      const currentInput = this.values.two.text.toLowerCase()
      return currentName.includes(currentInput)
    },
    async getSuggestions() {
      const concepts = await this.getConcepts()
      const arr = []
      concepts.forEach((e) => {
        arr.push(e.name)
      })
      this.items = arr
    },
    async getConcepts() {
      const arr = []
      await this.$http
        .get('/concepts')
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          res.data.forEach((e) => {
            arr.push(e)
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
      return arr
    },
    async create() {
      this.exists = false
      const data = {
        one: '',
        two: ''
      }
      const promises = Promise.all([
        this.$http
          .get('/concepts?name=' + this.values.one.selected)
          .then((res) => {
            this.operationalState = {
              state: 'ok',
              message: res
            }
            return res.data
          })
          .catch((err) => {
            if (err) {
              this.operationalState = {
                state: 'err',
                message: err
              }
            }
          }),
        this.$http
          .get('/concepts?name=' + this.values.two.selected)
          .then((res) => {
            this.operationalState = {
              state: 'ok',
              message: res
            }
            return res.data
          })
          .catch((err) => {
            if (err) {
              this.operationalState = {
                state: 'err',
                message: err
              }
            }
          })
      ])
      await promises
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          data.one = res[0]._id
          data.two = res[1]._id
        })
        .catch((err) => {
          if (err) {
            this.operationalState = {
              state: 'err',
              message: err
            }
          }
        })
      await this.$http
        .post('/clashes', data)
        .then(() => {
          this.beingCreated = true
          this.clashCreate = true
          setTimeout(() => {
            this.clashCreate = false
            this.resetSelectionOne()
            this.resetSelectionTwo()
            this.beingCreated = false
          }, 5000)
        })
        .catch((err) => {
          if (err) {
            this.exists = true
          }
        })
    }
  },
  computed: {
    optionsSame() {
      return this.values.one.selected === this.values.two.selected
    }
  }
}
</script>

<style scoped>
.card-group {
  align-items: center;
  z-index: 100;
}

.create-display-text {
  z-index: 100;
  size: 100px;
}

.dropdown-input {
  margin-top: 1rem;
}
.dropdown {
  /* z-index: 100; */
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.dropdown-selected {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: #ffffff;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
}
.dropdown-input:focus,
.dropdown-selected:hover {
  background: #fff;
  border-color: #e2e8f0;
}
.dropdown-input::placeholder {
  opacity: 0.7;
}
.dropdown-selected {
  font-weight: bold;
  cursor: pointer;
}
.dropdown-list {
  position: absolute;
  width: 100%;
  max-height: 500px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.dropdown-item {
  display: flex;
  overflow: hidden;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
.dropdown-item:hover {
  background: #edf2f7;
}
</style>
