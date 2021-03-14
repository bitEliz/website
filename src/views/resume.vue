<template>
  <div id="__cv">
    <nav class="nav sm:nav--expand">
      <div class="wrapper--fluid">
        <div class="nav__logo">{{ formattedName }}</div>
        <button v-b-toggle.collapse class="nav__menu-toggle"></button>
        <b-collapse id="collapse" class="nav__collapse justify--flex-end">
          <ul v-b-scrollspy="44" class="nav__item-list">
            <li v-for="mdl in modules" :key="mdl.id" class="nav__item nav-item">
              <a class="nav__link nav-link" :href="'#' + mdl.id">{{
                mdl.title
              }}</a>
            </li>
          </ul>
        </b-collapse>
      </div>
    </nav>

    <main>
      <section
        v-for="mdl in modules"
        :id="mdl.id"
        :key="mdl.id"
        :class="mdl.id"
      >
        <div
          v-if="mdl.id === MDL_ID.PROFILE"
          class="section__wrapper d--flex flex--column sm:flex--row align-i--center"
        >
          <div class="profile__me txt-a--center">
            <b-img-lazy
              class="profile__avatar"
              :src="mdl.list[0].avatarUrl"
              alt="User Avatar"
            />
            <h1 class="txt-t--uppercase">{{ formattedName }}</h1>
            <ul v-if="mdl.list[0].social" class="list--unstyled m-b--0">
              <li
                v-for="(social, index) in mdl.list[0].social"
                :key="index"
                class="d--inline-flex align-i--center justify-c--center"
              >
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
            v-if="mdl.list[0].aboutMe"
            class="profile__about"
            :inner-html.prop="mdl.list[0].aboutMe | markup"
          ></div>
        </div>
        <template v-else-if="mdl.id === MDL_ID.PROJECT">
          <div v-for="g in mdl.list" :key="g.id" class="section__wrapper">
            <h1 class="txt-t--uppercase">{{ g.title }}</h1>
            <div class="project__list-wrapper">
              <ul class="project__list list--unstyled">
                <li
                  v-for="proj in g.list"
                  :key="proj.id"
                  class="project__list-item"
                >
                  <v-proj-tile-view :content="proj" />
                </li>
              </ul>
            </div>
          </div>
        </template>
        <div
          v-else-if="mdl.id === MDL_ID.EXPERIENCE"
          class="section__wrapper d--flex flex--column sm:flex--row"
        >
          <ul
            v-for="m in mdl.list"
            :key="m.id"
            class="exp__list list--unstyled"
          >
            <h1 class="txt-t--uppercase">{{ m.title }}</h1>
            <template v-if="m.id === MDL_ID.EXPERIENCE">
              <li
                v-for="(exp, index) in m.list"
                :key="index"
                class="exp__list-item"
              >
                <h4>{{ exp.companyName }} • {{ exp.title }}</h4>
                <time
                  class="d--inline-block"
                  style="margin-bottom: 0.5rem"
                  :datetime="exp.startDate + '/' + exp.endDate"
                  >{{ exp.startDate + " - " + exp.endDate }}</time
                >
                <ul v-if="exp.responsibilities" class="list--circle-inside">
                  <li
                    v-for="(responsibility, idx) in exp.responsibilities"
                    :key="idx"
                  >
                    {{ responsibility }}
                  </li>
                </ul>
              </li>
            </template>
            <template v-if="m.id === MDL_ID.EDUCATIONAL">
              <li
                v-for="(exp, index) in m.list"
                :key="index"
                class="exp__list-item"
              >
                <h4>
                  <i class="ali degree icon" />
                  {{ exp.field }} • {{ exp.degree }}
                </h4>

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
        <div v-else class="section__wrapper">
          <h1 class="txt-t--uppercase">{{ mdl.title }}</h1>
          <ul class="list--unstyled">
            <li v-for="(skill, index) in mdl.list" :key="index">
              {{ skill }}
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import darkModeEnabled from "~/utils/dark-mode";
import { resumeStore } from "~/store";
import ProjectTileView from "~/components/proj-tile-view.vue";
import { ListGroup, MDL_ID } from "~/models/list-group";

@Component({
  layout: "copyright",
  components: {
    "v-proj-tile-view": ProjectTileView,
  },
})
export default class ResumeView extends Vue {
  MDL_ID = MDL_ID;

  get modules(): Array<ListGroup<any>> {
    return resumeStore.list;
  }

  get formattedName(): string {
    return resumeStore.formattedName;
  }

  head() {
    return {
      title: resumeStore.formattedTitle,
      htmlAttrs: {
        lang: "zh-CN",
      },
    };
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
}
</script>

<style lang="scss">
@import url("https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css");

:lang(zh) {
  line-height: 1.6;
}

#__cv {
  .nav {
    top: 0;
    position: sticky;
    min-width: 100%;
    padding: 0 1rem;
    background: var(--black-025);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-sm);
    // border-bottom: 1px solid rgb(230, 230, 230);
    z-index: $zindex-sticky;

    .nav__logo {
      padding: 9.5px 0;
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

  section {
    font-size: 85%;
    color: var(--black-700);

    .section__wrapper {
      margin: 0 auto;
      padding: 1rem;
      max-width: 980px;
    }

    &:nth-child(even) {
      background: var(--black-025);
    }

    &.profile {
      .section__wrapper {
        & > div:not(:first-child) {
          margin-left: 0;
          margin-top: $spacing;
          @include media-breakpoint-up(sm) {
            margin-left: 4rem;
            margin-top: 0;
          }
        }
      }

      .profile__avatar {
        width: 160px;
        height: 160px;
        border: 4px solid white;
        border-radius: 80px;
        margin-bottom: 1rem;
      }

      .profile__me {
        ul li {
          &:not(:last-child) {
            margin-right: $spacing;
          }

          &:hover {
            color: var(--blue-500);
          }
        }
      }
    }

    .project__list-wrapper {
      margin: 0 auto;
      width: 100%;

      .project__list {
        margin-left: 0;
        margin-bottom: -2.25rem;
        margin-right: -2.25rem;
        display: flex;
        flex-flow: row wrap;

        .project__list-item {
          margin-bottom: 2.25rem;
          margin-right: 2.25rem;
          width: calc(100% / 3 - 2.25rem);

          .tile {
            padding: 2rem;
            padding-bottom: 1rem;
            color: inherit;
            height: 100%;

            .tile__media img {
              width: 5rem;
              height: 5rem;
              border-radius: 8px;
            }
          }
        }
      }

      @media (max-width: 1068px) {
        width: 692px;

        .project__list {
          margin-bottom: -1.5rem;
          margin-right: -1.5rem;
          flex-flow: row wrap;

          .project__list-item {
            margin-bottom: 1.5rem;
            margin-right: 1.5rem;
            width: calc(50% - 1.5rem);
          }
        }
      }

      @media (max-width: 734px) {
        max-width: 366px;
        width: 87.5%;

        .project__list {
          margin-bottom: -1.5rem;
          margin-right: 0;
          display: flex;
          flex-flow: column nowrap;

          .project__list-item {
            margin-right: 0;
            width: 100%;
          }
        }
      }
    }

    .exp__list {
      flex-basis: 50%;

      &:not(:first-child) {
        padding-top: $spacing * 2;
        @include media-breakpoint-up(sm) {
          padding-top: 0;
          padding-left: $spacing * 2;
        }
      }

      &:not(:last-child) {
        margin-bottom: $spacing;
        @include media-breakpoint-up(sm) {
          margin-bottom: 0;
          margin-right: $spacing * 2;
        }
      }

      .exp__list-item {
        &:not(:last-child) {
          margin-bottom: $spacing * 2;
        }
      }
    }
  }
}
</style>
