<template>
  <div class="container my-5 py-5 text-white font-weight-normal">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12 col-lg-10">
        <div class="blur-bg card">
          <div class="card-body p-4">
            <h4 class="mb-0 text-white">Comments</h4>
            <div class="mb-4 pb-2" />
            <div v-for="(comment, idx) in comments" :key="idx">
              <Comment
                v-on:comment-edited="commentEdit"
                v-on:comment-deleted="commentDelete"
                :comment="comment"
              />
              <hr />
            </div>
            <base-input
              @keypress.enter="submit"
              alternative
              type="text"
              v-model="newComment"
              placeholder="Comment"
              addon-left-icon="fa fa-send"
            ></base-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/comments/Comment.vue'

export default {
  props: {
    comments: []
  },
  mounted() {},
  data() {
    return {
      newComment: ''
    }
  },
  methods: {
    commentEdit(id, content) {
      this.$emit('comment-edited', id, content)
    },
    commentDelete(id) {
      // this.localComments = this.localComments.filter(e => e._id !== id)
      this.$emit('comment-deleted', id)
    },
    submit() {
      const data = {
        content: this.newComment,
        author: this.$store.getters.user.username
      }
      this.$emit('create-new-comment', data)
    }
  },
  components: {
    Comment
  }
}
</script>
<style scoped Comment>
hr {
  border: 1px solid white;
}
.blur-bg {
  background-color: rgba(255, 255, 255, 0);
}
.blur-bg {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(50px);
}
</style>
