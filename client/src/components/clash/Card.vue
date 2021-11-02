<template>
  <div align="center" class="border-0">
    <b-card-group align="start" class="bg-white rounded">
      <Card
        v-on:close-button-pressed="oneClosed"
        v-on:upvote="oneUpvote"
        v-on:downvote="oneDownvote"
        :concept="clash.one"
        :options="{
          vote: votes.one,
          hoverEffect: false,
          showImg: options.showImg,
          createButton: false,
          hasShadow: false,
          hasTags: options.hasTags,
          hasVotes: options.hasVotes,
          hasCloseButton: options.oneCloseButton,
          contentLength: options.contentLength
        }"
      />
      <div>
        <img
          src="@/assets/media/vs.svg"
          alt="vs symbol"
          class="bg"
          height="50"
          width="50"
        />
      </div>
      <Card
        fluid
        v-on:close-button-pressed="twoClosed"
        v-on:upvote="twoUpvote"
        v-on:downvote="twoDownvote"
        ref="cardTwo"
        :concept="clash.two"
        :options="{
          vote: votes.two,
          hoverEffect: false,
          showImg: options.showImg,
          createButton: false,
          hasShadow: false,
          hasTags: options.hasTags,
          hasVotes: options.hasVotes,
          hasCloseButton: options.twoCloseButton,
          contentLength: options.contentLength
        }"
      />
    </b-card-group>
    <b-button
      v-if="options.goToButton"
      @click="goToPage"
      variant="warning"
      class="mt-2"
      >Go to Clash</b-button
    >
  </div>
</template>
<script>
import Card from '../concept/Card.vue'
export default {
  components: { Card },
  props: {
    clash: {},
    options: {
      type: Object,
      default() {
        return {
          showImg: true,
          hasTags: true,
          hasVotes: true,
          contentLength: 3,
          oneCloseButton: false,
          twoCloseButton: false,
          goToButton: false
        }
      }
    }
  },
  mounted() {
    this.getVotes()
  },
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      voteStatus: {},
      votes: {
        one: 0,
        two: 0
      }
    }
  },
  methods: {
    oneClosed() {
      this.$emit('one-close-button-pressed')
    },
    twoClosed() {
      this.$emit('two-close-button-pressed')
    },
    getVotes() {
      const route = 'clashes/' + this.clash._id + '/votes/'
      this.$http.get(route).then((res) => {
        this.votes.one = res.data.votes.one.total
        this.votes.two = res.data.votes.two.total
      })
      if (this.$store.getters.isLoggedIn) {
        const userId = this.$store.getters.user._id
        this.voteStatus = {
          one: {
            up: this.clash.opinge.one.vote.positive.includes(userId)
              ? 'secondary'
              : 'info',
            down: this.clash.opinge.one.vote.negative.includes(userId)
              ? 'secondary'
              : 'warning'
          },
          two: {
            up: this.clash.opinge.two.vote.positive.includes(userId)
              ? 'secondary'
              : 'info',
            down: this.clash.opinge.two.vote.negative.includes(userId)
              ? 'secondary'
              : 'warning'
          }
        }
      }
    },
    oneUpvote() {
      this.vote('up', 'one')
    },
    twoUpvote() {
      this.vote('up', 'two')
    },
    oneDownvote() {
      this.vote('down', 'one')
    },
    twoDownvote() {
      this.vote('down', 'two')
    },
    vote(type, concept) {
      const route = 'clashes/' + this.clash._id + '/votes'
      const voteType = type === 'up' ? 1 : type === 'down' ? -1 : 0
      const data = {
        userId: this.$store.getters.user._id,
        vote: {
          type: voteType,
          concept: concept
        }
      }
      this.$http
        .post(route, data)
        .then((res) => {
          this.operationalState.message = res.data
          this.votes.one = res.data.votes.one.total
          this.votes.two = res.data.votes.two.total
        })
        .catch((err) => {
          if (err) {
            this.operationalState = { state: 'err', message: err }
          }
        })
    },
    goToPage() {
      this.$store.commit('update_clash', this.clash)
      this.$router.push({ path: 'clashes/clash/' + this.clash._id })
    }
  }
}
</script>
<style scoped>
.vl {
  border-left: 6px solid;
  height: 100%;
}
.card-group {
  align-items: center;
  z-index: 100;
}
.vote-amount {
  z-index: 100;
}
</style>
