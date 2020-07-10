<template>
  <div id="resume">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#resume">
        <span class="d-block d-lg-none">APPL</span>
        <span class="d-none d-lg-block">
          <img
            class="img-fluid img-profile rounded-circle mx-auto mb-2"
            src="@/assets/img/profile.jpg"
            alt
          />
        </span>
      </b-navbar-brand>
      <b-button v-b-toggle.collapse class="navbar-toggler">
        <span class="navbar-toggler-icon"></span>
      </b-button>
      <b-collapse id="collapse" class="navbar-collapse">
        <b-navbar-nav v-scroll-spy-active v-scroll-spy-link>
          <li class="nav-item" v-for="mdl in modules" :key="mdl.id">
            <a class="nav-link">{{ mdl.title }}</a>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="resume-wrapper" v-scroll-spy>
      <section v-for="mdl in modules" :key="mdl.id" :id="mdl.id">
        <div v-if="mdl.id === 'profile'" class="section-wrapper">
          <h1 class="font-weight-bold text-uppercase display-2 mb-0">
            {{ mdl.profile.first_name }}
            <span class="text-primary">{{ mdl.profile.last_name }}</span>
          </h1>
          <h4 class="mb-5">{{ mdl.profile.location }}</h4>
          <p class="lead mb-5">{{ mdl.profile.about_me }}</p>
          <div class="sns-list">
            <a
              class="sns-list-item"
              v-for="(social, index) in mdl.profile.social"
              :key="index"
              :href="social.href"
            >
              <i
                class="ali icon"
                :class="social.service.type.toLowerCase()"
              ></i>
            </a>
          </div>
        </div>
        <div v-else-if="mdl.id === 'experiance'" class="section-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <div
            class="exp-wrapper"
            v-for="(exp, index) in mdl.works"
            :key="index"
          >
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="font-weight-bold mb-0">{{ exp.title }}</h2>
              <span class="text-primary">{{ exp.start_date }} - {{ exp.end_date }}</span>
            </div>
            <h4 class="mb-3" v-if="exp.responsibilities != null">
              {{ exp.responsibilities }}
            </h4>
            <p v-if="exp.description != null">{{ exp.description }}</p>
          </div>
        </div>
        <div v-else-if="mdl.id === 'education'" class="section-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <div
            class="exp-wrapper"
            v-for="(exp, index) in mdl.edu"
            :key="index"
          >
            <div class="d-flex justify-content-between">
              <div class="flex-grow-1">
                <h2 class="font-weight-bold mb-0">{{ exp.title }}</h2>
                <h4 class="mb-3">{{ exp.school }} • {{ exp.degree }}</h4>
              </div>
              <span class="text-primary">
                {{ exp.start_year }} - {{ exp.end_year }}
              </span>
            </div>
            <p>{{ exp.field }}</p>
            <div v-if="exp.activities">
              <h5>activities</h5>
              <ul class="activities mb-0">
                <li v-for="(activity, index) in exp.activities" :key="index">
                  <span>{{ activity }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else-if="mdl.id === 'skills'" class="section-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <h4 class="mb-3" v-if="mdl.skill.profesional != null">
            Programming Languages &amp; Tools
          </h4>
          <ul class="list-inline xxLang-list">
            <li
              class="list-inline-item"
              v-for="(skill, index) in mdl.skill.profesional"
              :key="index"
            >
              <eli-svg
                class="icon"
                v-if="skill.icon != null"
                :paths="skill.icon.paths"
              ></eli-svg>
              <span v-else class="font-weight-bold">{{ skill }}</span>
            </li>
          </ul>
          <h4 class="mb-3" v-if="mdl.skill.workflow != null">Workflow</h4>
          <ul class="mb-0">
            <li v-for="(wkf, index) in mdl.skill.workflow" :key="index">
              <span>{{ wkf }}</span>
            </li>
          </ul>
        </div>
        <div v-else-if="mdl.id === 'interests'" class="section-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
          <p
            :class="index === mdl.hobbies.length - 1 ? 'mb-0' : ''"
            v-for="(hobby, index) in mdl.hobbies"
            :key="index"
          >
            {{ hobby }}
          </p>
        </div>
        <div v-else class="section-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">{{ mdl.title }}</h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import http from 'utils/task';

export default {
  name: 'resume',
  data() {
    return {
      modules: [],
    };
  },
  methods: {
    async onLoading() {
      this.modules = await http('/users/website/resume');
    },
  },
  mounted() {
    this.onLoading();
  },
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import url("https://at.alicdn.com/t/font_1932202_ngetwtjh2xl.css");

$navbar-max-width: 17rem;

.navbar {
  @include media-breakpoint-up(lg) {
    position: fixed;
    text-align: center;

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

.resume-wrapper {
  padding: 0 1rem;
  height: 100%;

  @include media-breakpoint-up(lg) {
    margin-left: $navbar-max-width;
    padding: 0 3rem;
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

    .section-wrapper {
      width: 100%;
    }

    .exp-wrapper {
      &:not(:last-child) {
        margin-bottom: $spacer * 3;
      }
    }
  }
}

.sns-list {
  .sns-list-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3.5rem;
    width: 3.5rem;
    &:hover {
      color: $primary;
    }
  }

  .icon {
    font-size: 2rem;
  }
}

.xxLang-list {
  margin: 2rem 0;

  .list-inline-item:not(:last-child) {
    margin-right: 1.5rem;
  }
}
</style>
