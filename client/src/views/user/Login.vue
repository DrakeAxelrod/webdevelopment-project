<template>
  <section class="section-lg">
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type=""
            shadow
            header-classes="pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <img class="h-50 w-50" src="assets/login_person.svg" />
              </div>
              <b-form @submit="onSubmit" role="form">
                <base-input
                  alternative
                  autocomplete="on"
                  class="mb-3"
                  placeholder="Email"
                  v-model="form.email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                <base-input
                  autocomplete="on"
                  alternative
                  type="password"
                  placeholder="Password"
                  v-model="form.password"
                  addon-left-icon="ni ni-lock-circle-open"
                >
                </base-input>
                <b-form-text v-if="notCorrectCredentials">
                  <div class="text-danger">
                    either your username or password is incorrect
                  </div>
                </b-form-text>
                <div class="text-center">
                  <b-button type="submit" variant="info" class="my-4"
                    >Login</b-button
                  >
                </div>
              </b-form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: null
      },
      notCorrectCredentials: false
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$store
        .dispatch('login', {
          username: this.form.email,
          password: this.form.password
        })
        .then(() => this.$router.push('/'))
        .catch((err) => {
          if (err) {
            this.notCorrectCredentials = true
          }
        })
    }
  }
}
</script>
<style scoped>
.section {
  height: 100vh;
}

.card {
  background-color: rgba(255, 255, 255, 0);
}
.card  {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(50px);
}
</style>
