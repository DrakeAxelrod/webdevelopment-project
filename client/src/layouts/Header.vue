<template>
  <header class="header">
    <base-nav class="navbar-main" type="" effect="dark" expand>
      <!-- <router-link slot="brand" class="navbar-brand" to="/">
        <img src="logo.svg" alt="logo" />
      </router-link> -->
      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <!-- <a href="/">
            <img src="logo.svg" />
          </a> -->
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a
            slot="title"
            href="#"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <!-- <i class="ni ni-ui-04 d-lg-none"></i> -->
            <span class="nav-link-inner--text"
              ><strong class="nav-text">Opinge </strong></span
            >
          </a>
          <div class="dropdown-menu-inner">
            <a href="/concepts" class="media d-flex align-items-center">
              <div
                class="
                  icon icon-shape
                  bg-gradient-info
                  rounded-circle
                  text-white
                "
              >
                <i class="fa fa-lightbulb-o"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-info mb-md-1">Concepts</h6>
                <p class="description d-none d-md-inline-block mb-0">
                  are ideas, things, methodologies, and essentially any
                  conceptual real world concept.
                </p>
              </div>
            </a>
            <a href="/" class="media d-flex align-items-center">
              <div
                class="
                  icon icon-shape
                  bg-gradient-warning
                  rounded-circle
                  text-white
                "
              >
                <i class="fa fa-balance-scale" aria-hidden="true"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">Clashes</h5>
                <p class="description d-none d-md-inline-block mb-0">
                  created from two concepts, and representing a debate on which
                  concept is better for the world. You can view others opinions
                  and even make your own contributations to the clash.
                </p>
              </div>
            </a>
          </div>
        </base-dropdown>
      </ul>
      <ul class="navbar-nav ml-lg-auto">
        <base-dropdown
          v-if="isLoggedIn"
          tag="li"
          class="nav-item"
          menu-classes="dropdown-menu-lg"
        >
          <a
            slot="title"
            href="#"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <!-- <i class="ni ni-ui-04 d-lg-none"></i> -->
            <span class="nav-link-inner--text"
              ><strong class="nav-text">Create</strong></span
            >
          </a>
          <div class="dropdown-menu-inner">
            <a href="/concepts/create" class="media d-flex align-items-center">
              <div
                class="
                  icon icon-shape
                  bg-gradient-info
                  rounded-circle
                  text-white
                "
              >
                <i class="fa fa-plus"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-info mb-md-1">Concept</h6>
              </div>
            </a>
            <a href="/clashes/create" class="media d-flex align-items-center">
              <div
                class="
                  icon icon-shape
                  bg-gradient-warning
                  rounded-circle
                  text-white
                "
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">Clash</h5>
              </div>
            </a>
          </div>
        </base-dropdown>
        <li v-if="isLoggedIn">
          <base-dropdown tag="li" class="nav-item" data-toggle="dropdown">
            <a slot="title" class="nav-link" href="#" role="button">
              <span class="nav-link-inner--text"
                ><strong class="nav-text">{{ username }}</strong></span
              >
            </a>
            <router-link v-if="isAdmin" to="/admin" class="dropdown-item"
              >Admin</router-link
            >
            <router-link to="/profile" class="dropdown-item"
              >Profile</router-link
            >
            <button class="dropdown-item" v-on:click="logout">Logout</button>
          </base-dropdown>
        </li>
        <li v-else class="nav-item">
          <a
            v-if="this.$route.name == 'login'"
            slot="title"
            class="nav-link"
            href="/register"
            role="button"
          >
            <span class="nav-link-inner--text">
              <strong class="nav-text">Register</strong>
            </span>
          </a>
          <a v-else slot="title" class="nav-link" href="/login" role="button">
            <span class="nav-link-inner--text">
              <strong class="nav-text">Login</strong>
            </span>
          </a>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from '@/components/argon/BaseNav'
import BaseDropdown from '@/components/argon/BaseDropdown'
import CloseButton from '@/components/argon/CloseButton'

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  data() {
    return {
      operationalState: {
        state: 'ok',
        message: 'default'
      }
    }
  },
  methods: {
    logout() {
      const notHome = this.$route.path !== '/'
      this.$store
        .dispatch('logout', notHome)
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
  },
  computed: {
    username() {
      return this.$store.getters.user.username
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    isAdmin() {
      return this.$store.getters.user.admin
    }
  }
}
</script>
<style lang="css" scoped>
.nav-text {
  font-size: 150%;
}
</style>
