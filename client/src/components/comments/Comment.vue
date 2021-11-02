<template>
  <div class="d-flex flex-start">
    <div class="pr-3">
      <Avatar :username="username" :size="60" />
    </div>
    <div>
      <h6 class="mb-1 text-white">
        {{ username }}
      </h6>
      <div class="d-flex align-items-center mb-3">
        <p class="mb-0 font-weight-normal mr-2">{{ parseDate() }}</p>
        <a
          v-if="canEditOrDelete()"
          href="#!"
          @click="toggleEdit"
          class="link-muted"
          :style="'color: ' + state.color"
          ><i class="fa fa-pencil ms-2 mx-2"></i
        ></a>
        <a
          v-if="canEditOrDelete()"
          href="#!"
          @click="deleted"
          class="link-muted"
          style="color: white"
          ><i class="fa fa-trash ms-2 mx-2"></i
        ></a>
      </div>
      <div>
        <p
          id="comment-content"
          @focus="focus"
          @blur="content = $event.target.value"
          :contentEditable="state.edit"
          class="comment-content mb-0 font-weight-normal"
          v-bind:value="content"
        >
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from '@/components/avatar/Avatar.vue'

// import Edit from '@/components/profile/Edit'
export default {
  props: {
    comment: {}
  },
  mounted() {},
  data() {
    return {
      state: {
        edit: false,
        color: 'white'
      },
      username: this.comment.author,
      content: this.comment.content,
      date: this.comment.date
    }
  },
  methods: {
    canEditOrDelete() {
      return this.username === this.$store.getters.user.username
    },
    toggleEdit() {
      this.state.edit = !this.state.edit
      if (this.state.edit === true) {
        this.state.color = '#11cdef'
      } else {
        this.state.color = 'white'
        this.edit()
      }
    },
    focus() {
      // console.log('editing')
    },
    blur() {
      // console.log('done')
    },
    parseDate() {
      const date = new Date(this.comment.created)
      const locale = 'en-US'
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }
      return date.toLocaleString(locale, options)
    },
    deleted() {
      this.$emit('comment-deleted', this.comment._id)
    },
    edit() {
      const element = document.getElementById('comment-content')
      const content = element.textContent
      const author = this.username
      const data = {
        author: author,
        content: content
      }
      this.$emit('comment-edited', this.comment._id, data)
    }
  },
  components: {
    Avatar
  }
}
</script>
<style scoped>
.comment-content {
  outline: none;
  bottom: 0;
  padding: 5px;
  min-height: 40px;
  padding: 10px;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}
.blur-bg {
  background-color: rgba(255, 255, 255, 0);
}
.blur-bg {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(50px);
}
</style>
