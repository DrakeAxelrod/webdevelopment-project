<template>
  <section class="section-lg">
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <img class="h-50 w-50" src="assets/login_person.svg" />
              </div>
              <b-form @submit="onSubmit" role="form">
                <base-input
                  autocomplete="on"
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  v-model="form.email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                <base-input
                  autocomplete="on"
                  alternative
                  class="mb-3"
                  placeholder="Username"
                  v-model="form.username"
                  addon-left-icon="ni ni-circle-08"
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
                <div v-if="dontMatch" class="text-muted font-italic">
                  <small>
                    <span class="text-danger font-weight-600">
                      Passwords must Match
                    </span>
                  </small>
                </div>
                <base-input
                  autocomplete="on"
                  alternative
                  type="password"
                  placeholder="Confirm Password"
                  v-model="form.confirm"
                  addon-left-icon="ni ni-check-bold"
                >
                </base-input>
                <div class="text-muted font-italic">
                  <small
                    >password strength:
                    <span
                      v-bind:class="
                        'text-' + passStrengthColor + ' font-weight-700'
                      "
                      >{{ passStrength }}</span
                    >
                  </small>
                </div>
                <div class="text-center">
                  <b-button type="submit" variant="info" class="my-4"
                    >Register</b-button
                  >
                </div>
                <small>
                  <span class="text-white font-weight-700"
                    >Passwords must contain atleast one uppercase, one
                    lowercase, one symbol, and one number while being atleast 8
                    characters long.</span
                  >
                </small>
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
      operationalState: {
        state: 'ok',
        message: 'default'
      },
      form: {
        email: '',
        username: '',
        password: null,
        confirm: null
      },
      dontMatch: false
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const data = {
        email: this.form.email,
        username: this.form.username,
        password: this.form.password
      }
      if (this.passwordsMatch(this.form.password, this.form.confirm)) {
        this.$store
          .dispatch('register', data)
          .then((res) => {
            this.operationalState = {
              state: 'ok',
              message: res
            }
            this.$router.push('/')
          })
          .catch((err) => {
            if (err) {
              this.operationalState = {
                state: 'err',
                message: err
              }
            }
          })
      } else {
        this.dontMatch = true
      }
    },
    passwordsMatch(password, confirm) {
      return password === confirm
    },
    passwordStrength(password) {
      const strong =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
      const medium =
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
      let passStrength
      if (strong.test(password)) {
        passStrength = 'strong'
      } else if (medium.test(password)) {
        passStrength = 'medium'
      } else {
        passStrength = 'weak'
      }
      return passStrength
    }
  },
  computed: {
    passStrength() {
      return this.passwordStrength(this.form.password)
    },
    passStrengthColor() {
      let color
      if (this.passStrength === 'weak') {
        color = 'danger'
      } else if (this.passStrength === 'medium') {
        color = 'warning'
      } else {
        color = 'success'
      }
      return color
    }
  }
}
</script>
<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0);
}
.card {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(50px);
}
</style>
