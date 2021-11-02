export default {
  fpsLimit: 60,
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: ['#54097F', '#96d3fd', '#c996fd']
    },

    shape: {
      type: 'circle',
      stroke: {
        width: 0.5,
        color: '#fff'
      },
      polygon: {
        nb_sides: 8
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: '#ffffff',
      opacity: 1,
      width: 1
    },
    move: {
      enable: true
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: false
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 150,
        line_linked: {
          opacity: 0.8
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
}
