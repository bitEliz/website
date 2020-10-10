<template>
  <div id="app">
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
        class="resume__module"
        v-for="mdl in modules"
        :key="mdl.id"
        :class="mdl.id"
        :id="mdl.id"
      >
        <template v-if="mdl.profile">
          <div class="profile__me txt-a--center">
            <el-avatar style="margin-bottom: 2rem" :size="160">
              <img :src="mdl.profile.avatarUrl" alt="" />
            </el-avatar>
            <h1 class="txt-t--uppercase">{{ formattedName }}</h1>
            <ul v-if="mdl.profile.social" class="list--unstyled">
              <li v-for="(social, index) in mdl.profile.social" :key="index">
                <a :href="social.url">
                  <i
                    v-if="social.service && social.service.type"
                    class="ali"
                    :class="social.service.type.toLowerCase()"
                    style="font-size: 2rem"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div
            class="profile__about"
            v-if="mdl.profile.aboutMe"
            :inner-html.prop="mdl.profile.aboutMe | markup"
          ></div>
        </template>
        <template v-else-if="mdl.projects">
          <h1 class="txt-t--uppercase">{{ mdl.title }}</h1>
          <ul
            class="d--flex flex--column sm:flex--row sm:flex--wrap list--unstyled"
          >
            <li
              class="project__tile"
              v-for="proj in mdl.projects"
              :key="proj.id"
            >
              <v-proj-tile :content="proj"> </v-proj-tile>
            </li>
          </ul>
        </template>
        <template v-else-if="mdl.exp">
          <div class="exp__wrapper d--flex flex--column sm:flex--row">
            <ul
              class="exp__item-list list--unstyled"
              v-for="m in mdl.exp"
              :key="m.id"
            >
              <h1 class="txt-t--uppercase">{{ m.title }}</h1>
              <template v-if="m.workExps">
                <li
                  class="exp__item"
                  v-for="(exp, index) in sortedExpList(m.workExps)"
                  :key="index"
                  :exp="exp"
                >
                  <h4>{{ exp.companyName }} • {{ exp.title }}</h4>
                  <time
                    class="d--inline-block"
                    style="margin-bottom: 0.5rem"
                    :datetime="exp.startDate + '/' + exp.endDate"
                    >{{ exp.startDate + " - " + exp.endDate }}</time
                  >
                  <ul class="list--circle-inside" v-if="exp.responsibilities">
                    <li
                      v-for="(responsibility, index) in exp.responsibilities"
                      :key="index"
                    >
                      {{ responsibility }}
                    </li>
                  </ul>
                </li>
              </template>
              <template v-if="m.eduExps">
                <li
                  class="exp__item"
                  v-for="(exp, index) in m.eduExps"
                  :key="index"
                  :exp="exp"
                >
                  <span class="d--flex">
                    <i class="ali degree icon" />
                    <h4>{{ exp.field }} • {{ exp.degree }}</h4>
                  </span>
                  <time
                    class="d--inline-block"
                    style="margin-bottom: 0.5rem"
                    :datetime="exp.startYear + '/' + exp.endYear"
                    >{{ exp.startYear + " - " + exp.endYear }}</time
                  >
                  <h5>{{ exp.school }}</h5>
                </li>
              </template>
            </ul>
          </div>
        </template>
        <template v-else-if="mdl.skills">
          <h1 class="txt-t--uppercase">{{ mdl.title }}</h1>
          <ul class="list--unstyled">
            <li v-for="(skill, index) in mdl.skills" :key="index">
              {{ skill }}
            </li>
          </ul>
        </template>
        <template v-else>
          <h1 class="txt-t--uppercase">{{ mdl.title }}</h1>
          <ul>
            <li v-for="(hobby, index) in mdl.hobbies" :key="index">
              {{ hobby }}
            </li>
          </ul>
        </template>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ProjTile from "~/components/proj-tile.vue";
import darkModeEnabled from "~/utils/dark-mode";
import { isArray } from "~/utils/inspect";
import { User, WorkExp } from "~/models/resume";
import { resumeStore } from "~/store";
import { Context } from "@nuxt/types";

@Component({
  components: {
    "v-proj-tile": ProjTile,
  },
})
export default class ResumeView extends Vue {
  get modules(): Array<object> {
    return resumeStore.list;
  }

  get formattedName(): string {
    return resumeStore.formattedName;
  }

  mounted() {
    darkModeEnabled();
  }

  async asyncData(context: Context) {
    try {
      await resumeStore.onLoading(context);
    } catch (error) {
      context.error(error);
    }
  }

  sortedExpList(exp: WorkExp[]) {
    return exp
      .slice()
      .sort((lhs, rhs) => (lhs.startDate > rhs.startDate ? -1 : 1));
  }
}
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
    background: no-repeat url(~@/assets/img/close.svg);
    border-color: transparent;

    &.collapsed {
      background: no-repeat url(~@/assets/img/menu.svg);
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
      color: var(--black-400);

      &:hover {
        color: var(--powder-400);
      }

      &.active {
        color: var(--black);
      }
    }
  }
}

.main {
  .resume__module {
    $module-spacing: $spacing;
    padding: $module-spacing;

    @include media-breakpoint-up(sm) {
      padding: 4rem 8rem;
    }

    &.profile {
      display: flex;
      flex-direction: column;
      @include media-breakpoint-up(sm) {
        min-height: 100vh;
        flex-direction: row;
      }
      padding-top: 7rem;
      align-items: center;

      & > div:not(:first-child) {
        margin-left: 0;
        margin-top: $spacing;
        @include media-breakpoint-up(sm) {
          margin-left: $spacing;
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
            margin-right: $spacing;
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
        margin: $spacing;
      }
    }

    &.experiance {
      .exp__item-list {
        flex-grow: 1;
        flex-basis: 50%;

        &:not(:first-child) {
          padding-top: $module-spacing * 2;
          @include media-breakpoint-up(sm) {
            padding-top: 0;
            padding-left: $module-spacing * 2;
          }
        }

        &:not(:last-child) {
          margin-bottom: $module-spacing;
          @include media-breakpoint-up(sm) {
            margin-bottom: 0;
            margin-right: $module-spacing * 2;
          }
        }

        .exp__item {
          &:not(:last-child) {
            margin-bottom: $spacing * 2;
          }
        }
      }
    }
  }
}
</style>
