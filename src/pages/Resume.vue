<template>
  <div id="__cv">
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
          <LazyResumeProfile :profile="s.data" v-if="s.id == MDL_ID.PROFILE" />
          <LazyResumeProjectGallery :galleries="s.data" v-else-if="s.id == MDL_ID.PROJECT" />
          <LazyResumeExpGallery :galleries="s.data" v-else-if="s.id == MDL_ID.EXPERIENCE" />
          <ul class="list-unstyled" v-else-if="s.id == MDL_ID.SKILL">
            <li v-for="(e, i) in s.data" :key="i">
              <LazyMarkup :src="e"></LazyMarkup>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import fluent from "@/types/fluent"
import { MDL_ID } from "@/types/fluent/resume"

const __uid = useRuntimeConfig().public.__uid
const { pending: isLoading, data: profile } = useLazyFetch<fluent.User>(
  `/api/users/${__uid}?emb=edu.exp.proj.sns.skill`
)

const sections = computed(() => {
  if (!profile.value) {
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
  result.push({ id: MDL_ID.PROFILE, title: "简介", data: profile.value })

  const projectGroups = _prepareProjs(profile.value)
  if (projectGroups.length > 0) {
    result.push({ id: MDL_ID.PROJECT, title: "项目", data: projectGroups })
  }

  const exp = _prepareExps(profile.value!)
  if (exp.length > 0) {
    result.push({ id: MDL_ID.EXPERIENCE, title: "经历", data: exp })
  }

  if (profile.value.skill?.professional) {
    result.push({ id: MDL_ID.SKILL, title: "技能", data: profile.value.skill?.professional })
  }

  return result
})

const fullName = computed(() => {
  const lastName = profile.value?.lastName || ""
  const firstName = profile.value?.firstName || ""
  return lastName + firstName
})

const documentTitle = computed(() => {
  let documentTitle: string = profile.value?.username?.toUpperCase() || ""
  if (documentTitle) {
    documentTitle += " - RESUME"
  }
  return documentTitle
})

useHead({ title: documentTitle })

const { $bootstrap } = useNuxtApp()

watch(sections, () => {
  nextTick(() => {
    const scrollspy = $bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
      target: "#navigation",
      offset: 0
    })
    scrollspy?.refresh()
  })
})

onUpdated(() => {
  $bootstrap.ScrollSpy.getInstance(document.body)?.refresh()
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
