<template>
  <div class="container m-0 p-0">
    <div>
      <a
        v-b-modal.modal-1
        href="#"
        class="float-right link-muted"
        style="color: white"
        ><i class="fa fa-pencil"
      /></a>
      <b-modal id="modal-1" title="Edit your profile" @ok="save">
        <div align="center">
          <div class="my-4">
            <Avatar :username="this.$store.getters.user.username" :size="150" />
          </div>
        </div>
        <base-input
          alternative
          v-model="form.title"
          class="mb-3"
          placeholder="Title"
          addon-left-icon="ni ni-spaceship"
        >
        </base-input>
        <base-input
          v-model="form.city"
          alternative
          placeholder="City"
          addon-left-icon="ni ni-pin-3"
        >
        </base-input>
        <textarea
          v-model="form.about"
          class="form-control form-control-alternative"
          rows="3"
          placeholder="About"
        ></textarea>
      </b-modal>
    </div>
  </div>
</template>
<script>
import Avatar from '../avatar/Avatar.vue'
export default {
  components: { Avatar },
  props: {
    image: {
      type: String
    }
  },
  data() {
    return {
      form: {
        title: '',
        city: '',
        about: ''
      }
    }
  },
  methods: {
    save() {
      this.$store.dispatch('edit_profile', this.form)
    }
  }
}
</script>
<style scoped>
.blur-bg {
  background-color: rgba(255, 255, 255, 0);
}
.blur-bg {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(50px);
}
</style>
