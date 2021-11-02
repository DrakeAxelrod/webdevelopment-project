import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
import View from '@/views/index'
import store from '@/store/index'

export default [
  {
    path: '/',
    name: 'home',
    components: {
      header: Header,
      default: View.Clashes,
      footer: Footer
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      header: Header,
      default: View.Login,
      footer: Footer
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      header: Header,
      default: View.Register,
      footer: Footer
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      header: Header,
      default: View.Admin,
      footer: Footer
    },
    beforeEnter: (to, from, next) => {
      if (store.getters.user.admin) {
        next()
      } else {
        next('/')
      }
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    components: {
      header: Header,
      default: View.Profile,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/concepts/concept/:name',
    name: 'concept',
    components: {
      header: Header,
      default: View.ConceptPage,
      footer: Footer
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/clashes/clash/:id',
    name: 'clash',
    components: {
      header: Header,
      default: View.ClashPage,
      footer: Footer
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/concepts',
    name: 'concepts',
    components: {
      header: Header,
      default: View.Concepts,
      footer: Footer
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/clashes/create',
    name: 'clashes/create',
    components: {
      header: Header,
      default: View.CreateClash,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/concepts/create',
    name: 'concepts/create',
    components: {
      header: Header,
      default: View.CreateConcept,
      footer: Footer
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/*',
    name: '404',
    components: {
      // header: Header,
      default: View.PageNotFound
      // footer: Footer
    },
    meta: {
      requiresAuth: false
    }
  }
]
