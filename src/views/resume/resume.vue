<template>
  <div id="resume">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand>
        <span class="d-block d-lg-none">APPL</span>
        <span class="d-none d-lg-block">
          <!-- <img
            class="img-fluid img-profile rounded-circle mx-auto mb-2"
            :src="modules.filter((mdl) => mdl.id === 'profile').avatar_url"
          /> -->
        </span>
      </b-navbar-brand>
      <b-button v-b-toggle.collapse class="navbar-toggler">
        <span class="navbar-toggler-icon" />
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
      <section class="module" v-for="mdl in modules" :key="mdl.id">
        <div v-if="mdl.id === 'profile'" class="module-wrapper">
          <h1 class="font-weight-bold text-uppercase display-2 mb-0">
            {{ mdl.profile.first_name }}
            <span class="text-primary">{{ mdl.profile.last_name }}</span>
          </h1>
          <h4 class="mb-5">
            {{ mdl.profile.location }}
          </h4>
          <p class="lead mb-5">
            {{ mdl.profile.about_me }}
          </p>
          <div class="sns-list">
            <a
              class="sns-list-item"
              v-for="(social, index) in mdl.profile.social"
              :key="index"
              :href="social.href"
            >
              <i class="ali icon" :class="social.service.type.toLowerCase()" />
            </a>
          </div>
        </div>
        <div v-else-if="mdl.id == 'projects'" class="module-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">
            {{ mdl.title }}
          </h1>
          <div class="d-flex flex-wrap flex-column flex-md-row">
            <div
              class="grid-tile overflow-hidden p-4 pb-5 pb-sm-4"
              v-for="proj in projs"
              :key="proj.id"
            >
              <grid-tile :content="proj" />
            </div>
          </div>
        </div>
        <div v-else-if="mdl.id === 'experiance'" class="module-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">
            {{ mdl.title }}
          </h1>
          <div
            class="exp-wrapper"
            v-for="(exp, index) in sortedExpList(mdl.works)"
            :key="index"
          >
            <div
              class="d-flex flex-column flex-md-row justify-content-between mb-3"
            >
              <h4>{{ exp.company_name }} • {{ exp.title }}</h4>
              <span class="text-secondery"
                >{{ exp.start_date }} - {{ exp.end_date }}</span
              >
            </div>
            <ul v-if="exp.responsibilities != null">
              <li
                class="mb-3"
                v-for="(responsibility, index) in exp.responsibilities"
                :key="index"
              >
                {{ responsibility }}
              </li>
            </ul>
          </div>
        </div>
        <div v-else-if="mdl.id === 'education'" class="module-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">
            {{ mdl.title }}
          </h1>
          <div class="exp-wrapper" v-for="(exp, index) in mdl.edu" :key="index">
            <div
              class="d-flex flex-column flex-md-row justify-content-between mb-3"
            >
              <div class="flex-grow-1">
                <h2 class="font-weight-bold mb-0">
                  {{ exp.title }}
                </h2>
                <div class="d-flex align-items-center">
                  <i class="ali degree icon" />
                  <h4 class="mb-0">{{ exp.field }} • {{ exp.degree }}</h4>
                </div>
              </div>
              <span class="text-secondery">
                {{ exp.start_year }} - {{ exp.end_year }}
              </span>
            </div>
            <h5 v-if="index === mdl.edu.lenght - 1">
              {{ exp.school }}
            </h5>
            <h5 class="mb-0" v-else>
              {{ exp.school }}
            </h5>
            <div v-if="exp.activities != null">
              <h5>activities</h5>
              <ul class="activities mb-0">
                <li v-for="(activity, index) in exp.activities" :key="index">
                  <span>{{ activity }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else-if="mdl.id === 'skills'" class="module-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">
            {{ mdl.title }}
          </h1>
          <div
            class="professional"
            v-if="mdl.skill && mdl.skill.profesional != null"
          >
            <h4 class="mb-3">
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
                />
                <span v-else class="font-weight-bold">{{ skill }}</span>
              </li>
            </ul>
          </div>
          <div class="workflow" v-if="mdl.skill && mdl.skill.workflow != null">
            <h4 class="mb-3">
              Workflow
            </h4>
            <ul class="mb-0">
              <li v-for="(wkf, index) in mdl.skill.workflow" :key="index">
                <span>{{ wkf }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-else-if="mdl.id === 'interests'" class="module-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">
            {{ mdl.title }}
          </h1>
          <ul>
            <li class="mb-3" v-for="(hobby, index) in mdl.hobbies" :key="index">
              {{ hobby }}
            </li>
          </ul>
        </div>
        <div v-else class="module-wrapper">
          <h1 class="font-weight-bold text-uppercase mb-5">
            {{ mdl.title }}
          </h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import http from "@utils/task";
import GridTile from "@components/grid-tile.vue";

export default {
  name: "Resume",
  components: {
    "grid-tile": GridTile,
  },
  data() {
    return {
      modules: [],
      projs: [
        {
          id: "1",
          url: "/users/littlerkie/projs/1",
          title:
            "Stack Overflow for Teams has a new kind of content – Articles",
          summary:
            "A new tool for bringing your organization's essential knowledge together in an easy-to-search platform.",
          imageUrl:
            "https://149351115.v2.pressablecdn.com/wp-content/uploads/2020/08/Articles-blog-image-2048x1075.png",
          time: "AUGUST 10, 2020",
        },
        {
          id: "2",
          url: "/users/littlerkie/projs/1",
          title: "The key components for building a React community",
          summary:
            "The React community grew organically thanks to its instant popularity. Here's how the folks shepherding that community ensure that everyone who wants to contribute is welcome to.",
          imageUrl:
            "https://149351115.v2.pressablecdn.com/wp-content/uploads/2020/08/Nabors.png",
          time: "AUGUST 6, 2020",
        },
        {
          id: "3",
          url: "/users/littlerkie/projs/1",
          title: "The Overflow #34: WYSIWYG style",
          summary:
            "Welcome to ISSUE #34 of the Overflow! This week, we explore how to build a full-text search engine, ways to get involved in open source development, and how to force a right-click on a website that doesn’t want you to. Plus, the debut of Articles, a new form of post in Stack Overflow for Teams.",
          imageUrl:
            "https://149351115.v2.pressablecdn.com/wp-content/uploads/2019/09/The-Overflow-Blog.png",
          time: "AUGUST 17, 2020",
        },
        {
          id: "4",
          url: "/users/littlerkie/projs/1",
          title:
            "Our Series E Funding – An Inflection Point to Accelerate the Realization of our Mission",
          summary:
            "This is my third in a series of quarterly CEO blog posts. I'm excited to share some very positive updates.",
          imageUrl:
            "https://149351115.v2.pressablecdn.com/wp-content/uploads/2020/07/stack-overflow-pc-july20-2048x1075.png",
          time: "JULY 28, 2020",
        },
      ],
    };
  },
  methods: {
    async onLoading() {
      this.modules = await http(`/users/${this.$route.params.userId}/resume`);
    },

    sortedExpList(exp) {
      return exp
        .slice()
        .sort((lhs, rhs) => (lhs.start_date > rhs.start_date ? -1 : 1));
    },
  },
  mounted() {
    this.onLoading();
  },
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import url("https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css");

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

  .module {
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

    .module-wrapper {
      width: 100%;
    }

    .exp-wrapper {
      &:not(:last-child) {
        margin-bottom: $spacer * 3;
      }

      .degree {
        margin-right: 1rem;
        font-size: 1.5rem;
      }
    }
  }
}

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

.xxLang-list {
  margin: 2rem 0;

  .list-inline-item:not(:last-child) {
    margin-right: 1.5rem;
  }
}

.grid-tile {
  flex-basis: 33%;
}
</style>
