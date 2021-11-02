<template>
  <Avatar :username="username" :size="size" :parser="parseIni" />
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  props: {
    username: String,
    size: Number
  },
  methods: {
    parseIni(username) {
      const name = username.match(/\p{Lu}/gu)
      if (name) {
        const final = name.join('').substr(0, 3)
        return final
      } else {
        return '$'
      }
    }
  },
  components: {
    Avatar
  }
}
</script>
