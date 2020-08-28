<template>
  <div>
    <nav role="nav" class="nav nav--expand-md">
      <div class="wrapper-fluid">
        <div class="nav__logo">
          <span>{{ fullname }}</span>
        </div>
        <button class="nav__menu-toggle" v-b-toggle.collapse></button>
        <b-collapse id="collapse" class="nav__collapse">
          <ul class="nav__item-list" v-b-scrollspy>
            <li class="nav__item nav-item" v-for="mdl in modules" :key="mdl.id">
              <a class="nav__link nav-link" :href="'#' + mdl.id">{{
                mdl.title
              }}</a>
            </li>
          </ul>
        </b-collapse>
      </div>
    </nav>

    <main role="main" class="main resume">
      <section
        v-for="mdl in modules"
        :key="mdl.id"
        class="resume__module"
        :class="mdl.id"
        :id="mdl.id"
      >
        <template v-if="mdl.profile">
          <div class="profile__me">
            <img :src="mdl.profile.avatarUrl" alt="" />
            <h1 class="text-uppercase">
              {{ mdl.profile.firstName }}
              <span>{{ mdl.profile.lastName }}</span>
            </h1>
            <ul v-if="mdl.profile.social">
              <li
                v-for="(social, index) in mdl.profile.social"
                :key="index"
                :href="social.href"
              >
                <i
                  v-if="social.service && social.service.type"
                  class="ali icon"
                  :class="social.service.type.toLowerCase()"
                />
              </li>
            </ul>
          </div>
          <div class="profile__about">
            <p>{{ mdl.profile.aboutMe }}</p>
          </div>
        </template>
        <template v-else-if="mdl.projects">
          <h1 class="text-uppercase">{{ mdl.title }}</h1>
          <div class="d-flex flex-wrap flex-column flex-md-row">
            <div
              class="grid-tile overflow-hidden p-4 pb-5 pb-sm-4"
              v-for="proj in mdl.projects"
              :key="proj.id"
            >
              <grid-tile :content="projTileMaker(proj)" />
            </div>
          </div>
        </template>
        <template v-else-if="mdl.experiance">
          <h1 class="text-uppercase">{{ mdl.title }}</h1>
          <div
            class="exp-wrapper"
            v-for="(exp, index) in sortedExpList(mdl.works)"
            :key="index"
          >
            <div
              class="d-flex flex-column flex-md-row justify-content-between mb-3"
            >
              <h4>{{ exp.companyName }} • {{ exp.title }}</h4>
              <span class="text-secondery">
                {{ exp.startDate }} - {{ exp.endDate }}
              </span>
            </div>
            <ul v-if="exp.responsibilities != null">
              <li
                v-for="(responsibility, index) in exp.responsibilities"
                :key="index"
              >
                {{ responsibility }}
              </li>
            </ul>
          </div>
        </template>
        <template v-else-if="mdl.edu">
          <h1 class="text-uppercase">
            {{ mdl.title }}
          </h1>
          <div class="exp-wrapper" v-for="(exp, index) in mdl.edu" :key="index">
            <div
              class="d-flex flex-column flex-md-row justify-content-between mb-3"
            >
              <div class="flex-grow-1">
                <h2 class="mb-0">{{ exp.title }}</h2>
                <div class="d-flex align-items-center">
                  <i class="ali degree icon" />
                  <h4 class="mb-0">{{ exp.field }} • {{ exp.degree }}</h4>
                </div>
              </div>
              <span class="text-secondery">
                {{ exp.startYear }} - {{ exp.endYear }}
              </span>
            </div>
            <h5 v-if="index === mdl.edu.lenght - 1">{{ exp.school }}</h5>
            <h5 class="mb-0" v-else>{{ exp.school }}</h5>
            <div v-if="exp.activities != null">
              <h5>activities</h5>
              <ul class="activities mb-0">
                <li v-for="(activity, index) in exp.activities" :key="index">
                  <span>{{ activity }}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else-if="mdl.skill">
          <h1 class="text-uppercase">{{ mdl.title }}</h1>
          <div
            class="professional"
            v-if="mdl.skill && mdl.skill.profesional != null"
          >
            <h4 class="mb-3">Programming Languages &amp; Tools</h4>
            <ul class="list-inline xxLang-list">
              <li
                class="list-inline-item"
                v-for="(skill, index) in mdl.skill.profesional"
                :key="index"
              >
                <span class="font-weight-bold">{{ skill }}</span>
              </li>
            </ul>
          </div>
          <div class="workflow" v-if="mdl.skill && mdl.skill.workflow != null">
            <h4 class="mb-3">Workflow</h4>
            <ul class="mb-0">
              <li v-for="(wkf, index) in mdl.skill.workflow" :key="index">
                <span>{{ wkf }}</span>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <h1 class="text-uppercase">{{ mdl.title }}</h1>
          <ul>
            <li class="mb-3" v-for="(hobby, index) in mdl.hobbies" :key="index">
              {{ hobby }}
            </li>
          </ul>
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import http from "@utils/task";
import GridTile from "@components/grid-tile";

export default {
  name: "Resume",
  components: {
    "grid-tile": GridTile,
  },
  data() {
    return {
      modules: [],
    };
  },
  computed: {
    items() {
      return this.modules?.map((m) => ({
        id: m.id,
        title: m.title,
        uri: m.id,
      }));
    },

    fullname() {
      let profile = this.modules?.filter((m) => m.profile != null)[0]?.profile;
      let lastName = profile?.lastName ? profile.lastName : "";
      let firstName = profile?.firstName ? profile.firstName : "";
      return lastName + firstName;
    },
  },
  created() {
    this.$root.$on("bv::scrollspy::activate", this.onEvtActive);
  },
  mounted() {
    this.onLoading();
  },
  methods: {
    async onLoading() {
      this.modules = await http(`/users/${this.$route.params.userId}/resume`);
    },

    sortedExpList(exp) {
      return exp
        .slice()
        .sort((lhs, rhs) => (lhs.startDate > rhs.startDate ? -1 : 1));
    },

    projTileMaker(proj) {
      return {
        url: "",
        title: proj.name,
        summary: proj.summary,
        backgroundImageUrl: proj.backgroundImageUrl,
        category: proj.kind,
        time: proj.startDate + " - " + proj.endDate,
      };
    },

    onEvtActive(target) {
      console.log("evt :", target);
    },
  },
};
</script>

<style lang="scss">
@import url("https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css");

.nav {
  position: fixed;
  background-color: var(--white);
  // // background-color: rgba($color: var(--white), $alpha: 0.7);
  // // backdrop-filter: saturate(180%) blur(20px);
  z-index: $zindex-fixed;
  width: 100%;
  box-shadow: var(--shadow-sm);

  .wrapper-fluid {
    padding: 0 2rem;
  }

  &__logo {
    padding: 1em 0;
  }

  &__menu-toggle {
    width: 21px;
    height: 21px;
    background: no-repeat url(~@assets/img/close.svg);
    border: none;

    &.collapsed {
      background: no-repeat url(~@assets/img/menu.svg);
    }
  }

  &__link {
    text-transform: uppercase;
    &.active {
      color: var(--orange);
    }
  }

  &__collapse {
    justify-content: flex-end;
  }
}

.resume {
  height: 100%;
  margin: 0 5rem;

  &__module {
    padding: 5em 0;

    @include media-breakpoint-up(md) {
      padding: 5rem 3rem;
      min-height: 100vh;
    }
    &:not(:last-child) {
      border-bottom: 1px solid var(--black-075);
    }

    .exp-wrapper {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      .degree {
        margin-right: 1rem;
        font-size: 1.5rem;
      }
    }
  }

  .profile {
    background: url(~@assets/img/bottom-line.png) bottom no-repeat;
    background-size: 100% calc(100% * 271 / 1440);
    display: flex;
    flex-flow: column nowrap;
    @include media-breakpoint-up(md) {
      flex-flow: row wrap;
    }

    &:not(:first-child) {
      margin-left: 0;
      margin-top: 1em;
      @include media-breakpoint-up(md) {
        margin-left: 1rem;
        margin-top: 0;
      }
    }

    &__me {
      display: flex;
      flex-basis: 33%;
      align-items: center;
    }

    &__about {
    }

    h1 {
      font-size: 5rem;
      font-weight: bold;

      span {
        color: var(--blue-500);
      }
    }

    ul li {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &:not(:last-child) {
        margin-right: 1rem;
      }

      &:hover {
        color: var(--blue-500);
      }
    }
  }

  .experiance {
    ul {
      margin-left: 1rem;
      list-style: disc inside;
    }
  }
}

.icon {
  font-size: 2em;
}

.grid-tile {
  flex-basis: 33%;
}
</style>
