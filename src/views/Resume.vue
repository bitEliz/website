<script setup lang="ts">
import ProjectGridItem from "../components/ProjectGridItem.vue"
import { ListGroup, MDL_ID } from "../types/list-group"
import { computed, nextTick, onUpdated, watch } from "vue"
import Markup from "../components/markup"
import Loading from "../components/Loading.vue"
import fluent from "../types/fluent"
import { useFetch } from "@vueuse/core"
import { ScrollSpy } from "bootstrap"

const { isFetching: isLoading, error, data: json } = useFetch(`/api/users/paul/resume`).get().json()

const sections = computed(() => {
  const result: ListGroup<any>[] = []

  if (!json.value) {
    return result
  }

  const arg: fluent.User = json.value

  result.push(new ListGroup(MDL_ID.PROFILE, "简介", [arg]))

  const PROJ_VISIBILITY_PUBLIC = "public"

  // Filter visible projects
  const repositories = arg.projects?.filter(
    (e) => e.visibility === PROJ_VISIBILITY_PUBLIC && e.isOpenSource == true
  )
  const apps = arg.projects?.filter(
    (e) => e.visibility === PROJ_VISIBILITY_PUBLIC && e.isOpenSource == false
  )

  const proj: ListGroup<fluent.Project>[] = []
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
  exp.push(new ListGroup(MDL_ID.EXPERIENCE, "工作经历", arg.experiences))
  exp.push(new ListGroup(MDL_ID.EDUCATIONAL, "教育经历", arg.education))
  result.push(new ListGroup(MDL_ID.EXPERIENCE, "经历", exp))

  result.push(new ListGroup(MDL_ID.SKILL, "技能", arg.skill?.professional))

  return result
})

const introduction = computed(() => json.value.aboutMe)

const fullName = computed(() => {
  const lastName = json.value?.lastName ?? ""
  const firstName = json.value?.firstName ?? ""
  return lastName + firstName
})

watch(json, () => {
  const documentTitle: string = json.value.username?.toUpperCase() || ""
  document.title = documentTitle + " - RESUME"
})

watch(sections, () => {
  nextTick(() => {
    const scrollspy = ScrollSpy.getOrCreateInstance(document.body, { target: "#navigation" })
    scrollspy?.refresh()
  })
})

onUpdated(() => {
  ScrollSpy.getInstance(document.body)?.refresh()
})
</script>

<template>
  <Loading v-if="isLoading"></Loading>

  <div id="__cv" v-else>
    <header class="sticky-top" id="navigation">
      <nav class="navbar navbar-expand-sm container-fluid" aria-label="navigation">
        <a class="navbar-brand" aria-label="resume" href="#">{{ fullName }}</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse"
          aria-controls="collapse"
          aria-expanded="false"
          aria-label="collapse.toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <div class="collapse navbar-collapse" id="collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" :key="mdl.id" v-for="(mdl, i) in sections">
              <a
                class="nav-link"
                :class="i == 0 ? 'active' : ''"
                :aria-current="i == 0 ? true : undefined"
                :href="'#' + mdl.id"
              >
                {{ mdl.title }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <main>
      <section v-for="mdl in sections" :id="mdl.id" :key="mdl.id">
        <div
          class="container"
          style="padding-top: 2rem; padding-bottom: var(--bs-gutter-x, 0.75rem)"
        >
          <h3 v-if="mdl.id != MDL_ID.PROFILE && mdl.id != MDL_ID.EXPERIENCE">{{ mdl.title }}</h3>
          <div class="d-sm-flex flex-row align-items-center" v-if="mdl.id == MDL_ID.PROFILE">
            <div class="col-sm-4 profile__me" style="text-align: center">
              <img
                class="profile__avatar rounded-circle mb-5"
                :src="mdl.list[0].avatarUrl"
                alt="user avatar"
              />
              <h1 class="mb-3">{{ fullName }}</h1>

              <div
                class="social-networking hstack justify-content-center"
                v-if="mdl.list[0].social"
              >
                <div
                  style="text-align: center; padding: 0 0.5rem"
                  v-for="e in mdl.list[0].social"
                  :key="e.id"
                >
                  <a :href="e.service?.name === 'Mail' ? 'mailto:' + e.url : e.url">
                    <i :class="'ali ' + e.service?.name?.toLowerCase()" style="font-size: 2rem"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-8 profile__about flex-grow-1">
              <Markup :src="introduction"></Markup>
            </div>
          </div>
          <template v-else-if="mdl.id == MDL_ID.PROJECT && mdl.list">
            <div class="grid" style="--bs-gap: 1rem" v-for="g in mdl.list">
              <div class="g-col-12 g-col-md-6 g-col-lg-4" v-for="e in g.list">
                <a
                  v-if="e.trackViewUrl"
                  class="text-decoration-none"
                  :href="e.trackViewUrl"
                  target="_blank"
                >
                  <ProjectGridItem :data="e"></ProjectGridItem>
                </a>
                <ProjectGridItem v-else :data="e"></ProjectGridItem>
              </div>
            </div>
          </template>
          <div class="row" v-else-if="mdl.id == MDL_ID.EXPERIENCE && mdl.list">
            <div class="col-sm-6" v-for="m in mdl.list">
              <ul class="exp__list list-unstyled">
                <h3>{{ m.title }}</h3>
                <template v-for="exp in m.list">
                  <li class="mb-3" v-if="m.id == MDL_ID.EXPERIENCE">
                    <h5>{{ exp.companyName + " • " + exp.title }}</h5>
                    <time
                      style="margin-bottom: 0.5rem"
                      :datetime="exp.startDate + '/' + exp.endDate"
                    >
                      {{ exp.startDate + " - " + exp.endDate }}
                    </time>

                    <ul class="list--circle-inside" v-if="exp.responsibilities">
                      <li v-for="responsibility in exp.responsibilities">{{ responsibility }}</li>
                    </ul>
                  </li>
                  <li class="mb-3" v-else>
                    <h5>
                      <i class="ali degree icon" />
                      {{ exp.field + " • " + exp.degree }}
                    </h5>
                    <time
                      style="margin-bottom: 0.5rem"
                      :datetime="exp.startYear + '/' + exp.endYear"
                    >
                      {{ exp.startYear + " - " + exp.endYear }}
                    </time>
                    <p style="font-size: 1rem; font-weight: 500">{{ exp.school }}</p>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <ul class="list-unstyled" v-else-if="mdl.id == MDL_ID.SKILL && mdl.list">
            <li v-for="e in mdl.list">
              <Markup :src="e"></Markup>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<style lang="scss">
@import "https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css";

#__cv {
  user-select: none;

  .navbar {
    background-color: rgba(255, 255, 255, 0.72);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
      0 2px 8px rgba(0, 0, 0, 0.05);

    @supports ((-webkit-backdrop-filter: initial) or (backdrop-filter: initial)) {
      -webkit-backdrop-filter: saturate(180%) blur(40px);
      backdrop-filter: saturate(180%) blur(40px);
    }

    .navbar-toggle {
      border: none;
    }

    .nav-link {
      text-transform: uppercase;
      color: #848d95;

      &:hover {
        color: #a0c7e4;
      }

      &.active {
        color: black;
      }
    }
  }

  section {
    color: #2f3337;

    &:first-child {
      padding-top: 0;
    }

    &:nth-child(even) {
      background: #fafafb;
    }

    .social-networking a {
      color: var(--#{$variable-prefix}body-color);
      text-decoration: none;

      &:hover {
        color: #a0c7e4;
      }
    }

    .profile__avatar {
      width: 50%;
      min-width: 100px;
      max-width: 170px;
      border: 4px solid white;
    }

    &#projects .grid {
      &:not(:last-child) {
        padding-bottom: var(--#{$variable-prefix}gap);
      }
    }
  }

  .grid {
    a {
      color: var(--#{$variable-prefix}body-color);

      &:focus,
      &:hover {
        color: var(--#{$variable-prefix}body-color);
      }
    }
  }
}
</style>
