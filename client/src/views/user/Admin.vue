<template>
  <div class="Admin">
    <section class="section-profile-cover section-shaped my-0"></section>
    <section id="coverage" class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image"></div>
              </div>
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              ></div>
            </div>
            <div class="text-center mt-5">
              <h1>Admin Panel</h1>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <!-- <div class="col-lg-9"> -->
                <base-button v-on:click="yeetClashes" class=""
                  >Delete Clashes</base-button
                >
                <base-button v-on:click="dropTheBase" class=""
                  >Delete Database</base-button
                >
                <base-button v-on:click="dropTheUsers" class=""
                  >Delete All Users</base-button
                >
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      }
    }
  },
  methods: {
    yeetClashes() {
      this.$http
        .delete('/clashes')
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
    dropTheBase() {
      this.$http
        .delete('/dropthebase')
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
    dropTheUsers() {
      this.$http
        .delete('/users')
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
    }
  }
}
</script>
<style lang="css" scoped>
#coverage {
  min-height: 20vh;
}
</style>
