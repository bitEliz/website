<template>
  <Loading v-if="isLoading"></Loading>

  <div id="__cv" v-else>
    <header class="sticky-top" id="navigation">
      <nav class="navbar navbar-expand-sm container-fluid" aria-label="navigation">
        <a class="navbar-brand" aria-label="resume" href="#">{{ fullName }}</a>
        <ToggleButton
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#collapse"
          aria-controls="collapse"
          aria-expanded="false"
          aria-label="collapse.toggle"
        />
        <div class="collapse navbar-collapse" id="collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" :key="mdl.id" v-for="(mdl, i) in sections">
              <a class="nav-link" :class="i == 0 ? 'active' : ''" :href="'#' + mdl.id">
                {{ mdl.title }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <main>
      <section v-for="s in sections" :key="s.id" :id="s.id">
        <div
          class="container"
          style="padding-top: 2rem; padding-bottom: var(--bs-gutter-x, 0.75rem)"
        >
          <h3 v-if="s.id != MDL_ID.PROFILE && s.id != MDL_ID.EXPERIENCE">{{ s.title }}</h3>
          <Profile :profile="s.data" v-if="s.id == MDL_ID.PROFILE" />
          <ProjectGallery :galleries="s.data" v-else-if="s.id == MDL_ID.PROJECT" />
          <ExpGallery :galleries="s.data" v-else-if="s.id == MDL_ID.EXPERIENCE" />
          <ul class="list-unstyled" v-else-if="s.id == MDL_ID.SKILL">
            <li v-for="(e, i) in s.data" :key="i">
              <Markup :src="e"></Markup>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { MDL_ID } from "~/types/mdl_id"
import { computed, nextTick, onUpdated, watch } from "vue"
import Markup from "~/components/markup"
import Loading from "~/components/Loading.vue"
import fluent from "~/types/fluent"
import { useFetch, useTitle } from "@vueuse/core"
import { ScrollSpy } from "bootstrap"
import Profile from "~/components/Profile.vue"
import ProjectGallery from "~/components/ProjectGallery.vue"
import ExpGallery from "~/components/ExpGallery.vue"
import ToggleButton from "~/components/ToggleButton.vue"

const { isFetching: isLoading, error, data: json } = useFetch(`/api/users/paul/resume`).get().json()

const profile = computed<fluent.User | undefined>(() => json.value)

const sections = computed(() => {
  if (!json.value) {
    return []
  }

  const _prepareExps = (profile: fluent.User): Array<any> => {
    let exp = []
    if (profile.experiences) {
      exp.push({ id: MDL_ID.EXPERIENCE, title: "工作经历", data: profile.experiences })
    }
    if (profile.education) {
      exp.push({ id: MDL_ID.EDUCATIONAL, title: "教育经历", data: profile.education })
    }
    return exp
  }

  const _prepareProjs = (profile: fluent.User): Array<Array<fluent.Project>> => {
    const projects = profile.projects?.filter((e) => e.visibility == "public") || []
    let projectGroups: Array<Array<fluent.Project>> = []
    projectGroups.push(projects.filter((e) => e.isOpenSource))
    projectGroups.push(projects.filter((e) => !e.isOpenSource))
    projectGroups = projectGroups.filter((e) => e.length > 0)
    return projectGroups
  }

  let result: Array<any> = []
  result.push({ id: MDL_ID.PROFILE, title: "简介", data: json.value })

  const projectGroups = _prepareProjs(json.value)
  if (projectGroups.length > 0) {
    result.push({ id: MDL_ID.PROJECT, title: "项目", data: projectGroups })
  }

  const exp = _prepareExps(json.value!)
  if (exp.length > 0) {
    result.push({ id: MDL_ID.EXPERIENCE, title: "经历", data: exp })
  }

  if (json.value.skill?.professional) {
    result.push({ id: MDL_ID.SKILL, title: "技能", data: json.value.skill?.professional })
  }

  return result
})

const fullName = computed(() => {
  const lastName = profile.value?.lastName || ""
  const firstName = profile.value?.firstName || ""
  return lastName + firstName
})

useTitle(
  computed(() => {
    let documentTitle: string = profile.value?.username?.toUpperCase() || ""
    if (documentTitle) {
      documentTitle += " - RESUME"
    }
    return documentTitle
  })
)

watch(sections, () => {
  nextTick(() => {
    const scrollspy = ScrollSpy.getOrCreateInstance(document.body, {
      target: "#navigation",
      offset: 0
    })
    scrollspy?.refresh()
  })
})

onUpdated(() => {
  ScrollSpy.getInstance(document.body)?.refresh()
})
</script>

<style lang="scss">
@import "https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css";

#__cv {
  user-select: none;

  .navbar {
    padding-left: 1rem;
    padding-right: 1rem;
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
  }
}
</style>