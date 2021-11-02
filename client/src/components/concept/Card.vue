<template>
  <card
    @click.native="goToPage"
    header-tag="header"
    class="concept-card border-0"
    align="center"
    :hover="options.hoverEffect"
    :shadow="options.hasShadow"
    body-classes=""
  >
    <div v-if="options.hasCloseButton" align="start" class="header">
      <a
        style="color: #fb6340"
        href="#"
        role="button"
        v-on:click="onCloseButton"
        ><i class="close-button fa fa-times fa-2x"
      /></a>
    </div>
    <h6
      v-if="attributeCheck('name')"
      class="text-info text-capitalize text-center text-underline mb-1"
    >
      {{ concept.name }}
    </h6>
    <b-img
      v-if="hasImg && attributeCheck('img')"
      v-show="isImgLoaded"
      class="VS py-2"
      fluid
      height="300"
      width="250"
      :src="concept.img"
      @load="onImgLoad"
      :alt="concept.alt"
    />
    <div v-if="attributeCheck('content')">
      <p class="mt-2" :style="contentStyles">{{ concept.content }}</p>
    </div>
    <div v-if="attributeCheck('tags') && options.hasTags">
      <badge v-for="tag in concept.tags" :key="tag" type="warning" rounded>{{
        tag
      }}</badge>
    </div>
    <div v-if="options.createButton" class="text-center">
      <b-button v-on:click="create()" variant="warning" class="my-4"
        >Create</b-button
      >
    </div>
    <b-row
      container
      v-if="options.hasVotes && this.$store.getters.isLoggedIn"
      align-v="center"
      class="pt-4"
    >
      <b-col>
        <b-button :variant="colors.up" v-on:click="upvote"
          ><i style="color: #fff" class="fa fa-thumbs-up fa-2x"
        /></b-button>
      </b-col>
      <b-col align="center"
        ><div class="vote-amount">{{ this.options.vote }}</div>
      </b-col>
      <b-col>
        <b-button :variant="colors.down" v-on:click="downvote"
          ><i style="color: #fff" class="fa fa-thumbs-down fa-2x pl-1"
        /></b-button>
      </b-col>
    </b-row>
  </card>
</template>
<script>
export default {
  props: {
    concept: {
      type: Object
    },
    options: {
      type: Object,
      default() {
        return {
          vote: 0,
          upColor: 'info',
          downColor: 'warning',
          hoverEffect: false,
          showImg: true,
          createButton: false,
          hasShadow: false,
          hasTags: true,
          hasCloseButton: false,
          hasVotes: false,
          contentLength: 3
        }
      }
    }
  },
  mounted() {},
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      colors: {
        up: 'info',
        down: 'warning'
      },
      hasImg: this.options.showImg,
      isImgLoaded: false,
      contentLength: this.options.contentLength,
      thisConceptURL: 'concepts/concept/' + this.concept.name
    }
  },
  methods: {
    onCloseButton() {
      this.$emit('close-button-pressed')
    },
    swapUpColor() {
      if (this.colors.up === 'secondary') {
        this.colors.up = 'info'
      } else if (this.colors.down === 'secondary') {
        this.colors.down =
          this.colors.down === 'secondary' ? 'warning' : 'secondary'
      } else {
        this.colors.up = 'secondary'
      }
      // this.colors.down = this.colors.down === 'secondary' ? 'warning' : 'secondary'
    },
    swapDownColor() {
      if (this.colors.down === 'secondary') {
        this.colors.down = 'warning'
      } else if (this.colors.up === 'secondary') {
        this.colors.up = this.colors.up === 'secondary' ? 'info' : 'secondary'
      } else {
        this.colors.down = 'secondary'
      }
      // this.colors.down = this.colors.down === 'secondary' ? 'warning' : 'secondary'
    },
    upvote() {
      this.$emit('upvote')
      // this.swapUpColor()
    },
    downvote() {
      this.$emit('downvote')
      // this.swapDownColor()
    },
    onImgLoad() {
      this.isImgLoaded = true
    },
    create() {
      this.$http
        .post('/concepts', this.concept)
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          this.$emit('Created', this.concept)
        })
        .catch((err) => {
          if (err) {
            this.operationalState = { state: 'err', message: err }
          }
        })
    },
    attributeCheck(key) {
      const undef = typeof this.concept === 'undefined'
      if (undef) return
      return key in this.concept
    },
    sanitizeImg() {
      const notdef = this.concept.img === undefined
      if (!notdef) {
        const bookImg = this.concept.img.includes('Question_book-new.svg')
        const grayImg = this.concept.img.includes('Disambig_gray.svg')
        if (bookImg || grayImg) {
          this.hasImg = false
        }
      }
    },
    goToPage() {
      if (this.options.redirect) {
        this.$store.commit('update_concept', this.concept)
        this.$router.push({ path: this.thisConceptURL })
      }
    }
  },
  computed: {
    contentStyles() {
      return {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': this.contentLength,
        '-webkit-box-orient': 'vertical'
      }
    }
  },
  components: {
    // Comment
  }
}
</script>
<style scoped="css">
.close-button {
}
.vote-amount {
  font-size: 30px;
}
h6 {
  font-size: 150%;
}
.card {
  min-height: 50vh;
  z-index: 2;
}
</style>
