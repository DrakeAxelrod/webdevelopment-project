<template>
  <div class="profile-page">
    <section class="section-profile-cover"></section>
    <section class="section section-skew">
      <div class="container">
        <card shadow class="blur-bg card-profile mt--300">
          <div class="px-4">
            <div class="row justify-content-center">
              <Edit />
              <div coolattribute>
                <Avatar :username="user.username" :size="150" />
              </div>
            </div>
            <div class="text-center mt-5 text-white">
              <h3 class="text-white">
                {{ user.username }}
              </h3>
              <div class="h6 font-weight-500 text-white">
                <i class="ni location_pin mr-2"></i> {{ user.email }}
              </div>
              <div class="h6 font-weight-500 text-white">
                <i class="ni location_pin mr-2"></i> {{ user.profile.city }}
              </div>
              <div class="h6 mt-4 text-white">
                <i class="ni business_briefcase-24 mr-2"></i
                >{{ user.profile.title }}
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9 text-white">
                  <p>
                    {{ user.profile.about }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import Edit from '@/components/profile/Edit'
import Avatar from '@/components/avatar/Avatar'
export default {
  components: {
    Edit,
    Avatar
  },
  methods: {},
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>
<style scoped>
div[coolattribute] {
  align-items: center;
  justify-content: center;
  align-content: center;
}
.blur-bg {
  background-color: rgba(255, 255, 255, 0);
}
.blur-bg {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(50px);
}
</style>
