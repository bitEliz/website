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
            <ul class="nav__item-list list--unstyled" v-bk-scrollspy.44>
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
        <div v-if="mdl.id === MDL_ID.PROFILE" class="section__wrapper">
          <a-row align="middle" :gutter="64">
            <a-col class="profile__me">
              <a-avatar
                class="profile__avatar"
                :src="mdl.list[0].avatarUrl"
                alt="User Avatar"
              ></a-avatar>
              <h1>{{ getFullname }}</h1>
              <a-row align="middle" justify="center" v-if="mdl.list[0].social" :gutter="16">
                <a-col v-for="social in mdl.list[0].social" :key="social.id">
                  <a :href="social.service.name === 'Mail' ? 'mailto:' + social.url : social.url">
                    <i
                      class="ali"
                      :class="social.service.name.toLowerCase()"
                      style="font-size: 2rem"
                    />
                  </a>
                </a-col>
              </a-row>
            </a-col>
            <a-col
              v-if="mdl.list[0].aboutMe"
              class="profile__about"
              v-html="getAboutMeHtmlLiteral"
            ></a-col>
          </a-row>
        </div>
        <div v-else-if="mdl.id === MDL_ID.PROJECT" class="section__wrapper">
          <h1>{{ mdl.title }}</h1>
          <div class="project__list-wrapper" v-for="g in mdl.list" :key="g.id">
            <a-list
              :grid="{ gutter: 16, md: 2, lg: 3, xl: 3, xxl: 3 }"
              :data-source="g.list"
              class="project__list"
            >
              <template #renderItem="{ item: proj }">
                <a-list-item class="project__list-item">
                  <ProjectGridItem :content="proj" />
                </a-list-item>
              </template>
            </a-list>
          </div>
        </div>
        <div v-else-if="mdl.id === MDL_ID.EXPERIENCE" class="section__wrapper">
          <a-row :gutter="32">
            <a-col span="12" style="min-width: 400px" v-for="m in mdl.list" :key="m.id">
              <ul class="exp__list list--unstyled">
                <h1>{{ m.title }}</h1>
                <li v-for="exp in m.list" :key="exp.id" class="exp__list-item">
                  <template v-if="m.id === MDL_ID.EXPERIENCE">
                    <h4>{{ exp.companyName }} • {{ exp.title }}</h4>
                    <time
                      style="margin-bottom: 0.5rem"
                      :datetime="exp.startDate + '/' + exp.endDate"
                      >{{ exp.startDate + " - " + exp.endDate }}</time
                    >
                    <ul v-if="exp.responsibilities" class="list--circle-inside">
                      <li v-for="responsibility in exp.responsibilities" :key="responsibility">
                        {{ responsibility }}
                      </li>
                    </ul>
                  </template>
                  <template v-if="m.id === MDL_ID.EDUCATIONAL">
                    <h4>
                      <i class="ali degree icon" />
                      {{ exp.field }} • {{ exp.degree }}
                    </h4>

                    <time
                      style="margin-bottom: 0.5rem"
                      :datetime="exp.startYear + '/' + exp.endYear"
                      >{{ exp.startYear + " - " + exp.endYear }}</time
                    >
                    <h5>{{ exp.school }}</h5>
                  </template>
                </li>
              </ul>
            </a-col>
          </a-row>
        </div>
        <div v-else class="section__wrapper">
          <h1>{{ mdl.title }}</h1>
          <ul class="list--unstyled">
            <li v-for="skill in mdl.list" :key="skill" v-html="markup(skill)"></li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import ProjectGridItem from "../components/ProjectGridItem.vue"
import { Project, User } from "../types/resume"
import { ListGroup, MDL_ID } from "../types/list-group"
import markup from "../utils/markup"
import { CloseOutlined, MenuOutlined } from "@ant-design/icons-vue"
import { defineComponent, ref, computed, unref, onMounted, onUnmounted, reactive } from "vue"
import { useFetch } from "~/composables/fetch"

export default defineComponent({
  components: {
    ProjectGridItem,
    CloseOutlined,
    MenuOutlined
  },
  setup() {
    const { result: user } = useFetch("/api/users/paul/resume")

    const state = reactive({ active: "__nav_pannel__" })

    const getMdles = computed(() => _getMdles(unref(user)))

    const getFullname = computed(() => {
      const $user = unref(user)
      const lastName = $user?.lastName ?? ""
      const firstName = $user?.firstName ?? ""
      return lastName + firstName
    })

    const getAboutMeHtmlLiteral = computed(() => markup(unref(user)?.aboutMe))

    const getTitle = computed(() => unref(user)?.username?.toUpperCase() ?? "")

    const getMeta = computed(() => ({
      title: unref(user)?.username?.toUpperCase()
    }))

    const _getMdles = (arg?: User) => {
      const result: ListGroup<any>[] = []

      if (!arg) {
        return result
      }

      const user = arg!

      result.push(new ListGroup(MDL_ID.PROFILE, "简介", [user]))

      const PROJ_VISIBILITY_PUBLIC = "public"
      const GITHUB = "github.com"

      // Filter visible projects
      const repositories = user.projects?.filter(
        (e) => e.visibility === PROJ_VISIBILITY_PUBLIC && e.isOpenSource == true
      )
      const apps = user.projects?.filter(
        (e) => e.visibility === PROJ_VISIBILITY_PUBLIC && e.isOpenSource == false
      )

      const proj: ListGroup<Project>[] = []
      if (repositories?.length) {
        proj.push(new ListGroup(MDL_ID.DEFAULT, "开源项目", repositories))
      }

      if (apps?.length) {
        proj.push(new ListGroup(MDL_ID.DEFAULT, "精选项目", apps))
      }

      if (proj.length) {
        result.push(new ListGroup(MDL_ID.PROJECT, "项目", proj))
      }

      const exp: ListGroup<any>[] = []
      exp.push(new ListGroup(MDL_ID.EXPERIENCE, "工作经历", user.experiences))
      exp.push(new ListGroup(MDL_ID.EDUCATIONAL, "教育经历", user.education))
      result.push(new ListGroup(MDL_ID.EXPERIENCE, "经历", exp))

      result.push(new ListGroup(MDL_ID.SKILL, "技能", user.skill!.professional))

      return result
    }

    const handleResize = () => (state.active = window.innerWidth > 576 ? "__nav_pannel__" : "")

    onMounted(() => window.addEventListener("resize", handleResize))
    onUnmounted(() => window.removeEventListener("resize", handleResize))

    return {
      state,
      getMdles,
      getFullname,
      getAboutMeHtmlLiteral,
      getTitle,
      MDL_ID,
      markup,
      user
    }
  }
})
</script>

<style lang="scss">
@import url("https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css");

#__cv {
  .nav {
    top: 0;
    position: sticky;
    min-width: 100%;
    padding: 0 1rem;
    background: #fafafb;
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
      0 2px 8px rgba(0, 0, 0, 0.05);
    z-index: 1000;

    .nav__logo {
      padding: 9.5px 0;
    }

    .ant {
      &-collapse {
        &-item {
          border-bottom: none;
        }

        &-content-box {
          padding: 9.5px 0;
        }

        &-header {
          height: 44px;
          @media (min-width: 567px) {
            display: none;
          }
        }
      }
    }

    .nav__item-list {
      display: flex;
      flex-flow: row nowrap;
      list-style: none;
      margin-bottom: 0;
      padding-left: 0;
      @media (max-width: 576px) {
        flex-direction: column;
      }

      & > :not(:last-child) {
        border-right-color: transparent;
        @media (min-width: 576px) {
          border-right: 1px solid #d6d9dc;
        }
      }

      .nav__link {
        padding: 0.5em 1rem;
        text-transform: uppercase;
        // @include media-breakpoint-up(sm) {
        //   padding: 0 $nav-link-padding-x;
        // }

        color: #848d95;

        &:hover {
          color: #a0c7e4;
        }

        &.active {
          color: black;
        }
      }
    }
  }

  section {
    color: #2f3337;

    .section__wrapper {
      margin: 0 auto;
      padding: 1rem;
      max-width: 980px;
    }

    &:nth-child(even) {
      background: #fafafb;
    }

    &.profile {
      .section__wrapper {
        padding-top: 2rem;

        @media (max-width: 767px) {
          > .ant-row {
            flex-direction: column;
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
        text-align: center;
      }
    }

    .project__list-wrapper {
      margin: 0 auto;
      width: 100%;

      .project__list-item .tile {
        color: inherit;
      }

      @media (max-width: 991px) {
        width: 692px;
      }

      @media (max-width: 767px) {
        max-width: 366px;
        width: 87.5%;
      }
    }

    .exp__list {
      min-width: 300px;

      .exp__list-item {
        &:not(:last-child) {
          margin-bottom: 32px;
        }
      }
    }
  }
}
</style>
