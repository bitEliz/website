<template>
  <div id="resume">
    <b-navbar
    toggleable="lg" type="dark" variant="primary" class="fixed-top"
    >
      <b-navbar-brand href="#resume">
        <span class="d-block d-lg-none">APPL</span>
        <span class="d-none d-lg-block">
          <img
            class="img-fluid img-profile rounded-circle mx-auto mb-2"
            src="@/assets/images/profile.jpg"
            alt
          />
        </span>
      </b-navbar-brand>
      <b-button v-b-toggle.collapse-1 class="navbar-toggler">
        <span class="navbar-toggler-icon"></span>
      </b-button>
      <b-collapse id="collapse-1" class="navbar-collapse">
          <b-navbar-nav v-scroll-spy-active v-scroll-spy-link>
            <li class="nav-item" v-for="mdl in modules" :key="mdl.id">
              <a
                class="nav-link"
              >{{ mdl.title }}</a>
            </li>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid class="resume-wrap" v-scroll-spy>
      <section v-for="mdl in modules" :key="mdl.id">
        <div v-if="mdl.id === 0" class="section-wrap">
          <h1 class="mb-0 display-2 font-weight-bold text-uppercase">
            {{ mdl.profile.firstName }}
            <span class="text-primary">{{ mdl.profile.lastName }}</span>
          </h1>
          <h4 class="mb-5">
            {{ mdl.profile.address + ' ' + mdl.profile.phone + ' · ' }}
            <a
              :href="'mailto:' + mdl.profile.email"
            >{{ mdl.profile.email }}</a>
          </h4>
          <p class="lead mb-5">{{ mdl.profile.intro }}</p>
          <div class="social-list">
            <a
              class="social-list-item"
              v-for="(app, index) in mdl.profile.socialApps"
              :key="index"
              :href="app.href"
            >
              <appl-svg class="icon" v-if="app.icon !== undefined" :paths="app.icon.paths"></appl-svg>
            </a>
          </div>
        </div>
        <div v-else-if="mdl.id === 1 || mdl.id === 2" class="section-wrap">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <div
            class="d-flex flex-column flex-md-row justify-content-between"
            v-for="(exp, index) in expList(mdl)"
            :key="index"
            :class="index === expList(mdl).length - 1 ? '' : 'mb-5'"
          >
            <div class="flex-grow-1">
              <h2 class="font-weight-bold mb-0">{{ exp.title }}</h2>
              <h4 class="mb-3">{{ exp.responsibility }}</h4>
              <p>{{ exp.description }}</p>
            </div>
            <div class="flex-shrink-0">
              <span class="text-primary">{{ exp.time }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="mdl.id === 3" class="section-wrap">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <h4 class="mb-3">Programming Languages &amp; Tools</h4>
          <ul class="list-inline xxLang-list">
            <li
              class="list-inline-item"
              v-for="(skill, index) in mdl.skills.langAndDevTools"
              :key="index"
            >
              <appl-svg class="icon" v-if="skill.icon !== undefined" :paths="skill.icon.paths"></appl-svg>
              <a v-else class="font-weight-bold">{{ skill.title }}</a>
            </li>
          </ul>
          <h4 class="mb-3">Workflow</h4>
          <ul class="fa-ul mb-0">
            <li v-for="(wkf, index) in mdl.skills.workflow" :key="index">
              <span class="fa-li"></span>
              {{ wkf }}
            </li>
          </ul>
        </div>
        <div v-else-if="mdl.id === 4" class="section-wrap">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <p
            :class="index === mdl.hobbies.length - 1 ? 'mb-0' : ''"
            v-for="(hobby, index) in mdl.hobbies"
            :key="index"
          >{{ hobby }}</p>
        </div>
        <div v-else class="section-wrap">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
        </div>
      </section>
    </b-container>
  </div>
</template>

<script>
import http from 'utils/task';
import svg from 'components/svg.vue';

export default {
  name: 'resume',
  components: {
    'appl-svg': svg,
  },
  data() {
    return {
      toggle_visible: false,
      modules: [],
    };
  },
  methods: {
    async onLoading() {
      this.modules = await http('/v2/resume');
    },

    expList: (mdl) => (mdl.id === 1 ? mdl.works : mdl.edu),
  },
  mounted() {
    this.onLoading();
  },
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";

$navbar-max-width: 17rem;

.navbar {
  @include media-breakpoint-up(lg) {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;

    width: $navbar-max-width;
    height: 100vh;

    .navbar-brand {
      display: flex;

      margin: auto auto 0;
      padding: 0.5rem;
      .img-profile {
        max-width: 10rem;
        max-height: 10rem;
        border: 0.5rem solid fade-out($white, 0.8);
      }
    }

    .navbar-collapse {
      display: flex;
      align-items: flex-start;
      flex-grow: 0;

      width: 100%;
      margin-bottom: auto;
      .navbar-nav {
        flex-direction: column;

        width: 100%;
        .nav-item {
          display: block;
          .nav-link {
            display: block;
          }
        }
      }
    }
  }

  .navbar-nav .nav-item .nav-link {
    font-weight: 800;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
  }

  .navbar-toggler {
    background-color: $primary;
    &:focus {
      outline-color: lighten($primary, 15%);
    }
  }
}

.resume-wrap {
  padding: 0 1rem;

  @include media-breakpoint-up(lg) {
    padding-left: $navbar-max-width + 3rem !important;
    padding-right: 3rem;
  }

  section {
    display: flex;
    align-items: center;
    padding: 5rem 0;
    max-width: 75rem;

    border-bottom: 1px solid $border-color;
    &:last-child {
      border-bottom: none;
    }

    @include media-breakpoint-up(md) {
      min-height: 100vh;
    }

    .section-wrap {
      width: 100%;
    }
  }
}

.social-list {
  .social-list-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3.5rem;
    width: 3.5rem;
    background-color: $gray-700;
    color: $white;
    border-radius: 100%;
    font-size: 1.5rem;
    margin-right: 1.5rem;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      background-color: $primary;
    }
  }
}

.xxLang-list {
  margin: 2rem 0;

  .list-inline-item:not(:last-child) {
    margin-right: 1.5rem;
  }
}

.icon {
  width: 2rem;
  height: 2rem;
}
</style>
