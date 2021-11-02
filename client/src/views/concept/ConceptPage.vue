<template>
  <div class="container">
    <section class="section-lg" />
    <div class="justify-content-center">
      <div class="item">
        <Card :concept="concept" :options="options" />
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
import Card from '@/components/concept/Card'
import Comments from '@/components/comments/Comments'

export default {
  components: { Comments, Card },
  mounted() {
    this.getConcept()
    this.getComments()
  },
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      comments: [],
      concept: {},
      options: {
        hoverEffect: false,
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
      const route = `/concepts/${this.concept._id}/comments/${id}`
      this.$http
        .put(route, data)
        .then(
          (res) =>
            (this.operationalState = {
              state: 'ok',
              message: res
            })
        )
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
      const route = `/concepts/${this.concept._id}/comments/${id}`
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
      const route = `/concepts/${this.concept._id}/comments`
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
    getConcept() {
      this.concept = this.$store.getters.concept
    },
    getComments() {
      this.comments = []
      this.$http
        .get('/concepts/' + this.concept._id + '/comments')
        .then((res) => res.data)
        .then((res) => {
          this.operationalState = {
            state: 'ok',
            message: res
          }
          res.forEach((e) => {
            this.comments.push(e)
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
<style></style>
