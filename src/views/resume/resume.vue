<template>
  <div id="resume">
    <nav role="nav" class="nav sm:nav--expand">
      <div class="wrapper--fluid">
        <div class="nav__logo">
          <span>{{ formattedName }}</span>
        </div>
        <button class="nav__menu-toggle" v-b-toggle.collapse></button>
        <b-collapse id="collapse" class="nav__collapse justify--flex-end">
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

    <main role="main" class="main">
      <section
        v-for="mdl in modules"
        :key="mdl.id"
        class="resume__module"
        :class="mdl.id"
        :id="mdl.id"
      >
        <template v-if="mdl.profile">
          <div class="profile__me txt-a--center">
            <el-avatar
              src="@assets/img/menu.svg"
              :size="160"
              style="margin-bottom: 2rem"
            >
              <img :src="mdl.profile.avatarUrl" alt="" />
            </el-avatar>
            <h1 class="txt-t--uppercase">{{ formattedName }}</h1>
            <ul v-if="mdl.profile.social" class="list--unstyled">
              <li
                v-for="(social, index) in mdl.profile.social"
                :key="index"
                :href="social.href"
              >
                <i
                  v-if="social.service && social.service.type"
                  class="ali"
                  :class="social.service.type.toLowerCase()"
                  style="font-size: 2rem"
                />
              </li>
            </ul>
          </div>
          <div class="profile__about">
            <p>{{ mdl.profile.aboutMe }}</p>
          </div>
        </template>
        <template v-else-if="mdl.projects">
          <h1 class="txt-t--uppercase">{{ mdl.title }}</h1>
          <div class="d--flex flex--column sm:flex--row sm:flex--wrap">
            <grid-tile
              class="project__tile"
              v-for="proj in mdl.projects"
              :key="proj.id"
              :content="projTileMaker(proj)"
            >
            </grid-tile>
          </div>
        </template>
        <template v-else-if="mdl.exp && mdl.exp.length > 0">
          <div class="exp__wrapper d--flex flex--column sm:flex--row">
            <div class="exp__group-list" v-for="m in mdl.exp" :key="m.id">
              <template v-if="m.workExps">
                <h1 class="txt-t--uppercase">{{ m.title }}</h1>
                <div
                  class="exp__work"
                  v-for="(exp, index) in sortedExpList(m.workExps)"
                  :key="index"
                >
                  <h4>{{ exp.companyName }} • {{ exp.title }}</h4>
                  <span> {{ exp.startDate }} - {{ exp.endDate }} </span>
                  <ul v-if="exp.responsibilities">
                    <li
                      v-for="(responsibility, index) in exp.responsibilities"
                      :key="index"
                    >
                      {{ responsibility }}
                    </li>
                  </ul>
                </div>
              </template>
              <template v-if="m.eduExps">
                <h1 class="txt-t--uppercase">{{ m.title }}</h1>
                <div
                  class="exp__edu"
                  v-for="(exp, index) in m.eduExps"
                  :key="index"
                >
                  <div>
                    <div class="flex-grow--1">
                      <h2 class="m-b--0">{{ exp.title }}</h2>
                      <div class="d--flex align-items-center">
                        <i class="ali degree icon" />
                        <h4 class="m-b--0">
                          {{ exp.field }} • {{ exp.degree }}
                        </h4>
                      </div>
                    </div>
                    <span class="text-secondery">
                      {{ exp.startYear }} - {{ exp.endYear }}
                    </span>
                  </div>
                  <h5>
                    {{ exp.school }}
                  </h5>
                  <div v-if="exp.activities != null">
                    <h5>activities</h5>
                    <ul class="activities m-b--0">
                      <li
                        v-for="(activity, index) in exp.activities"
                        :key="index"
                      >
                        <span>{{ activity }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
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
          <h1 class="txt-t--uppercase">{{ mdl.title }}</h1>
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
import GridTile from "@components/grid-tile";
import markup from "@utils/markup";
import http from "@utils/task";
import darkModeEnabled from "@utils/dark-mode";

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

    uid() {
      return this.$route.params.uid;
    },

    formattedName() {
      let profile = this.modules?.filter((m) => m.profile != null)[0]?.profile;
      let lastName = profile?.lastName ? profile.lastName : "";
      let firstName = profile?.firstName ? profile.firstName : "";
      return lastName + firstName;
    },
  },
  mounted() {
    darkModeEnabled();
    this.onLoading();
  },
  methods: {
    async onLoading() {
      const resume = await http(`/users/${this.uid}/resume`);

      this.modules = [
        {
          id: "profile",
          title: "个人资料",
          profile: resume,
        },
        {
          id: "projects",
          title: "精选项目",
          projects: resume.projects,
        },
        {
          id: "skills",
          title: "技能",
          skills: resume.skill,
        },
        {
          id: "experiance",
          title: "经验",
          exp: [
            {
              id: "work",
              title: "职业经历",
              workExps: resume.workExps,
            },
            {
              id: "education",
              title: "教育经历",
              eduExps: resume.eduExps,
            },
          ],
        },
      ];
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
        summary: markup(proj.summary),
        backgroundImageUrl: proj.backgroundImageUrl,
        category: proj.kind,
        date: proj.startDate + " - " + proj.endDate,
      };
    },
  },
};
</script>

<style lang="scss">
@import url("https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css");

.nav {
  position: fixed;
  width: 100%;
  padding: 0 1rem;
  background: var(--white);
  z-index: $zindex-fixed;
  box-shadow: var(--shadow-sm);

  .nav__logo {
    padding: 1em 0;
  }

  .nav__menu-toggle {
    width: 21px;
    height: 21px;
    background: no-repeat url(~@assets/img/close.svg);
    border-color: transparent;

    &.collapsed {
      background: no-repeat url(~@assets/img/menu.svg);
    }
  }

  .nav__item-list {
    & > :not(:last-child) {
      border-right-color: transparent;
      @include media-breakpoint-up(sm) {
        border-right: 1px solid var(--black-100);
      }
    }

    .nav__link {
      text-transform: uppercase;
      @include media-breakpoint-up(sm) {
        padding: 0 $nav-link-padding-x;
      }
      color: var(--black);

      &:hover {
        color: var(--powder-400);
      }

      &.active {
        color: var(--black-400);
      }
    }
  }
}

.main {
  .resume__module {
    padding: 3em 1rem;

    @include media-breakpoint-up(sm) {
      padding: 4rem;
      min-height: 100vh;
    }

    &.profile {
      display: flex;
      flex-direction: column;
      @include media-breakpoint-up(sm) {
        flex-direction: row;
      }
      align-items: center;

      & > div:not(:first-child) {
        margin-left: 0;
        margin-top: 1em;
        @include media-breakpoint-up(sm) {
          margin-left: 1rem;
          margin-top: 0;
        }
      }

      .profile__me {
        align-items: center;
        flex-grow: 1;

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

      .profile__about {
        flex-basis: 66.66667%;
      }
    }

    &.projects {
      .project__tile {
        @include media-breakpoint-up(md) {
          flex-basis: calc(100% / 3 - 2rem);
        }
        margin: 1rem;
      }
    }

    &.experiance {
      .exp__wrapper {
        $exp-spacing: 2rem;
        & > div {
          flex-grow: 1;
          width: 50%;

          &:not(:first-child) {
            padding-top: $exp-spacing;
            @include media-breakpoint-up(sm) {
              padding-top: 0;
              padding-left: $exp-spacing;
            }
          }

          &:not(:last-child) {
            margin-bottom: $exp-spacing;
            @include media-breakpoint-up(sm) {
              margin-bottom: 0;
              margin-right: $exp-spacing;
            }
          }
        }
      }

      ul {
        margin-left: 1rem;
        list-style: disc inside;
      }
    }
  }
}
</style>
