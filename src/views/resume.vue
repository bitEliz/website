<template>
  <div id="__cv">
    <nav class="nav">
      <a-row align="top" justify="space-between" style="width: 100%">
        <div class="nav__logo">{{ getFullname }}</div>
        <a-collapse
          v-model:activeKey="state.active"
          :bordered="false"
          :accordion="true"
          expand-icon-position="right"
        >
          <template #expandIcon="{ isActive }">
            <CloseOutlined class="nav__menu-toggle" v-if="isActive" />
            <MenuOutlined class="nav__menu-toggle" v-else />
          </template>
          <a-collapse-panel key="__nav_pannel__">
            <ul class="nav__item-list" v-bk-scrollspy.44>
              <li v-for="mdle in getMdles" :key="mdle.id" class="nav__item nav-item">
                <a class="nav__link nav-link" :href="'#' + mdle.id">{{ mdle.title }}</a>
              </li>
            </ul>
          </a-collapse-panel>
        </a-collapse>
      </a-row>
    </nav>
    <main>
      <section v-for="mdl in getMdles" :id="mdl.id" :key="mdl.id" :class="mdl.id">
        <div
          v-if="mdl.id === MDL_ID.PROFILE"
          class="section__wrapper d--flex flex--column sm:flex--row align-i--center"
        >
          <div class="profile__me txt-a--center">
            <a-avatar
              class="profile__avatar"
              :src="mdl.list[0].avatarUrl"
              alt="User Avatar"
            ></a-avatar>
            <h1 class="txt-t--uppercase">{{ getFullname }}</h1>
            <ul v-if="mdl.list[0].social" class="list--unstyled m-b--0">
              <li
                v-for="(social, index) in mdl.list[0].social"
                :key="index"
                class="d--inline-flex align-i--center justify-c--center"
              >
                <a :href="social.service.name === 'Mail' ? 'mailto:' + social.url : social.url">
                  <i
                    class="ali"
                    :class="social.service.name.toLowerCase()"
                    style="font-size: 2rem"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div
            v-if="mdl.list[0].aboutMe"
            class="profile__about"
            v-html="getAboutMeHtmlLiteral"
          ></div>
        </div>
        <template v-else-if="mdl.id === MDL_ID.PROJECT">
          <div v-for="g in mdl.list" :key="g.id" class="section__wrapper">
            <h1 class="txt-t--uppercase">{{ g.title }}</h1>
            <div class="project__list-wrapper">
              <ul class="project__list list--unstyled">
                <li v-for="proj in g.list" :key="proj.id" class="project__list-item">
                  <ProjTileView :content="proj" />
                </li>
              </ul>
            </div>
          </div>
        </template>
        <div
          v-else-if="mdl.id === MDL_ID.EXPERIENCE"
          class="section__wrapper d--flex flex--column sm:flex--row"
        >
          <ul v-for="m in mdl.list" :key="m.id" class="exp__list list--unstyled">
            <h1 class="txt-t--uppercase">{{ m.title }}</h1>
            <template v-if="m.id === MDL_ID.EXPERIENCE">
              <li v-for="(exp, index) in m.list" :key="index" class="exp__list-item">
                <h4>{{ exp.companyName }} • {{ exp.title }}</h4>
                <time
                  class="d--inline-block"
                  style="margin-bottom: 0.5rem"
                  :datetime="exp.startDate + '/' + exp.endDate"
                  >{{ exp.startDate + " - " + exp.endDate }}</time
                >
                <ul v-if="exp.responsibilities" class="list--circle-inside">
                  <li v-for="(responsibility, idx) in exp.responsibilities" :key="idx">
                    {{ responsibility }}
                  </li>
                </ul>
              </li>
            </template>
            <template v-if="m.id === MDL_ID.EDUCATIONAL">
              <li v-for="(exp, index) in m.list" :key="index" class="exp__list-item">
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
            <li v-for="(skill, index) in mdl.list" :key="index" v-html="markup(skill)"></li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
// import { MetaInfo } from "vue-meta"
import darkModeEnabled from "~/utils/dark-mode"
import ProjectTileView from "/@/components/proj-tile-view.vue"
import { Project, User } from "/@/models/resume"
import { computed, defineComponent, onMounted, onUnmounted, ref, unref } from "vue"
import { useRoute } from "vue-router"
import { ListGroup, MDL_ID } from "/@/models/list-group"
import markup from "/@/utils/markup"
import { CloseOutlined, MenuOutlined } from "@ant-design/icons-vue"

export default defineComponent({
  components: {
    ProjectTileView,
    CloseOutlined,
    MenuOutlined
  },
  setup() {
    const user = ref<User | undefined>()

    const state = ref({ active: "__nav_pannel__" })

    const getMdles = computed(() => _getMdles(unref(user)))

    const getFullname = computed(() => {
      const $user = unref(user)
      const lastName = $user?.lastName ?? ""
      const firstName = $user?.firstName ?? ""
      return lastName + firstName
    })

    const getAboutMeHtmlLiteral = computed(() => markup(unref(user)?.aboutMe))

    const getTitle = computed(() => unref(user)?.username?.toUpperCase() ?? "")

    function _getMdles(arg?: User) {
      const result: ListGroup<any>[] = []

      if (!arg) {
        return result
      }

      const user = arg!

      result.push(new ListGroup(MDL_ID.PROFILE, "简介", [arg]))

      const PROJ_VISIBILITY_PUBLIC = "public"
      const GITHUB = "github.com"

      // Filter visible projects
      const repositories = user.projects?.filter(
        (e) =>
          e.visibility === PROJ_VISIBILITY_PUBLIC &&
          e.trackViewUrl &&
          e.trackViewUrl?.indexOf(GITHUB) !== -1
      )
      const apps = user.projects?.filter(
        (e) => e.visibility === PROJ_VISIBILITY_PUBLIC && e.trackViewUrl?.indexOf(GITHUB) === -1
      )

      const proj: ListGroup<Project>[] = []
      proj.push(new ListGroup(MDL_ID.DEFAULT, "开源项目", repositories))
      proj.push(new ListGroup(MDL_ID.DEFAULT, "精选项目", apps))
      result.push(new ListGroup(MDL_ID.PROJECT, "项目", proj))

      const exp: ListGroup<any>[] = []
      exp.push(new ListGroup(MDL_ID.EXPERIENCE, "工作经历", user.experiences))
      exp.push(new ListGroup(MDL_ID.EDUCATIONAL, "教育经历", user.education))
      result.push(new ListGroup(MDL_ID.EXPERIENCE, "经历", exp))

      result.push(new ListGroup(MDL_ID.SKILL, "技能", user.skill!.professional))

      return result
    }

    const route = useRoute()

    async function loadUser() {
      try {
        const response = await fetch("http://localhost:8080/users/paul/resume")
        user.value = await response.json()
      } catch (error) {
        handleError(error)
      }
    }

    function handleError(error: Error) {
      console.log(error)
    }

    function handleResize() {
      if (window.innerWidth > 576) state.value.active = "__nav_pannel__"
    }

    onMounted(loadUser)
    // onMounted(() => window.addEventListener("resize", handleResize))
    // onUnmounted(() => window.removeEventListener("resize", handleResize))
    onMounted(() => {
      window.onresize = handleResize
    })

    return {
      state,
      getMdles,
      getFullname,
      getAboutMeHtmlLiteral,
      getTitle,
      MDL_ID,
      markup
    }
  }
})
</script>

<style lang="scss">
@import url("https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css");
@import "node_modules/prettify/scss/_functions.scss";
@import "node_modules/prettify/scss/_variables.scss";
@import "node_modules/prettify/scss/_mixins.scss";

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
    z-index: 1000;

    .nav__logo {
      padding: 9.5px 0;
    }

    .ant {
      &-collapse {
        @include media-breakpoint-down(xs) {
          flex: 1 1 auto;
        }

        &-item {
          border-bottom: none;
        }

        &-content-box {
          padding: 9.5px 0;
        }

        &-header {
          height: 44px;
          @include media-breakpoint-up(sm) {
            display: none;
          }
        }
      }
    }

    .nav__item-list {
      @include media-breakpoint-up(sm) {
        flex-direction: row;
      }

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
        padding-top: 2rem;

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
            // height: 100%;

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
