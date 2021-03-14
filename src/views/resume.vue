<template>
  <div id="__cv">
    <nav class="nav sm:nav--expand">
      <div class="wrapper--fluid">
        <div class="nav__logo">{{ formattedName }}</div>
        <button class="nav__menu-toggle" v-b-toggle.collapse></button>
        <b-collapse id="collapse" class="nav__collapse justify--flex-end">
          <ul class="nav__item-list" v-b-scrollspy="44">
            <li class="nav__item nav-item" v-for="mdl in modules" :key="mdl.id">
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
        :key="mdl.id"
        :class="mdl.id"
        :id="mdl.id"
      >
        <div class="section__wrapper d--flex flex--column sm:flex--row align-i--center" v-if="mdl.id === MDL_ID.PROFILE">
          <div class="profile__me txt-a--center">
            <b-img-lazy class="profile__avatar" :src="mdl.list[0].avatarUrl" alt="User Avatar" />
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
            class="profile__about"
            v-if="mdl.list[0].aboutMe"
            :inner-html.prop="mdl.list[0].aboutMe | markup"
          ></div>
        </div>
        <template v-else-if="mdl.id === MDL_ID.PROJECT">
          <div class="section__wrapper" v-for="g in mdl.list" :key="g.id">
            <h1 class="txt-t--uppercase">{{ g.title }}</h1>
            <div class="project__list-wrapper">
              <ul
                class="project__list list--unstyled"
              >
                <li class="project__list-item" v-for="proj in g.list" :key="proj.id">
                  <v-proj-tile-view :content="proj" />
                </li>
              </ul>
            </div>
          </div>
        </template>
        <div class="section__wrapper d--flex flex--column sm:flex--row" v-else-if="mdl.id === MDL_ID.EXPERIENCE">
          <ul
            class="exp__list list--unstyled"
            v-for="m in mdl.list"
            :key="m.id"
          >
            <h1 class="txt-t--uppercase">{{ m.title }}</h1>
            <template v-if="m.id === MDL_ID.EXPERIENCE">
              <li
                class="exp__list-item"
                v-for="(exp, index) in m.list"
                :key="index"
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
            <template v-if="m.id === MDL_ID.EDUCATIONAL">
              <li
                class="exp__list-item"
                v-for="(exp, index) in m.list"
                :key="index"
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
        <div class="section__wrapper" v-else>
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
import darkModeEnabled from "~/utils/dark-mode";
import { resumeStore } from "~/store";
import { Context } from "@nuxt/types";
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
      htmlAttrs: {
        lang: 'zh-CN'
      }
    }
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
