<template>
  <div class="container">
    <section class="section-lg" />
    <div class="justify-content-center">
      <div class="item">
        <Card :clash="this.$store.getters.clash" :options="options" />
      </div>
    </div>
    <section class="justify-content-center" />
    <Comments
      v-on:create-new-comment="createComment"
      v-on:comment-edited="editComment"
      v-on:comment-deleted="deleteComment"
      :comments="comments"
    />
  </div>
</template>

<script>
import Card from '@/components/clash/Card'
import Comments from '@/components/comments/Comments'

export default {
  components: { Comments, Card },
  mounted() {
    this.getComments()
  },
  data() {
    return {
      clash: this.$store.getters.clash,
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      comments: [],
      options: {
        hoverEffect: false,
        hasVotes: true,
        showImg: true,
        shortContent: true,
        createButton: false,
        hasShadow: true,
        hasTags: true,
        contentLength: 100
      }
    }
  },
  methods: {
    editComment(id, data) {
      const route = `/clashes/${this.clash._id}/comments/${id}`
      this.$http
        .put(route, data)
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
        })
        .catch((err) => {
          if (err) {
            this.operationalState = {
              state: 'err',
              message: err
            }
          }
        })
    },
    deleteComment(id) {
      const route = `/clashes/${this.clash._id}/comments/${id}`
      this.$http
        .delete(route)
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          this.comments = this.comments.filter((e) => e._id !== id)
        })
        .catch((err) => {
          if (err) {
            this.operationalState = {
              state: 'err',
              message: err
            }
          }
        })
    },
    createComment(data) {
      const route = `/clashes/${this.clash._id}/comments`
      this.$http
        .post(route, data)
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          this.comments.push(res.data)
        })
        .catch((err) => {
          if (err) {
            this.operationalState = {
              state: 'err',
              message: err
            }
          }
        })
    },
    getclash() {
      this.clash = this.$store.getters.clash
    },
    getComments() {
      this.comments = []
      this.$http
        .get('/clashes/' + this.clash._id + '/comments')
        .then((res) => res.data)
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          res.forEach((e) => {
            this.comments.push(e)
          })
          this.comments.reverse()
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
<style></style>
