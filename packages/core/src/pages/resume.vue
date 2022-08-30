<template>
  <div id="__cv">
    <main>
      <section v-for="s in sections" :key="s.id" :id="s.id">
        <div
          class="container"
          style="padding-top: 2rem; padding-bottom: var(--bs-gutter-x, 0.75rem)"
        >
          <h3
            v-if="
              s.id != RESUME_MODULE_ID.PROFILE &&
              s.id != RESUME_MODULE_ID.EXPERIENCE
            "
          >
            {{ s.title }}
          </h3>
          <LazyResumeProfile
            :profile="s.data"
            v-if="s.id == RESUME_MODULE_ID.PROFILE"
          />
          <LazyResumeProjectGallery
            :galleries="s.data"
            v-else-if="s.id == RESUME_MODULE_ID.PROJECT"
          />
          <LazyResumeExpGallery
            :galleries="s.data"
            v-else-if="s.id == RESUME_MODULE_ID.EXPERIENCE"
          />
          <ul class="list-unstyled" v-else-if="s.id == RESUME_MODULE_ID.SKILL">
            <li v-for="(e, i) in s.data" :key="i">
              <LazyMarkdown :content="e"></LazyMarkdown>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Project, User } from '@/types/fluent'
import { RESUME_MODULE_ID } from '@/types/fluent'

const { data: profile } = await useFetch('/api/_resume')

const sections = computed(() => {
  if (!profile.value) {
    return []
  }

  const _prepareExps = (profile: User): Array<any> => {
    let exp = []
    if (profile.experiences) {
      exp.push({
        id: RESUME_MODULE_ID.EXPERIENCE,
        title: '工作经历',
        data: profile.experiences
      })
    }
    if (profile.education) {
      exp.push({
        id: RESUME_MODULE_ID.EDUCATIONAL,
        title: '教育经历',
        data: profile.education
      })
    }
    return exp
  }

  const _prepareProjs = (profile: User): Array<Array<Project>> => {
    const projects =
      profile.projects?.filter((e) => e.visibility == 'public') || []
    let projectGroups: Array<Array<Project>> = []
    projectGroups.push(projects.filter((e) => e.isOpenSource))
    projectGroups.push(projects.filter((e) => !e.isOpenSource))
    projectGroups = projectGroups.filter((e) => e.length > 0)
    return projectGroups
  }

  let result: Array<any> = []
  result.push({
    id: RESUME_MODULE_ID.PROFILE,
    title: '简介',
    data: profile.value
  })

  const projectGroups = _prepareProjs(profile.value)
  if (projectGroups.length > 0) {
    result.push({
      id: RESUME_MODULE_ID.PROJECT,
      title: '项目',
      data: projectGroups
    })
  }

  const exp = _prepareExps(profile.value)
  if (exp.length > 0) {
    result.push({ id: RESUME_MODULE_ID.EXPERIENCE, title: '经历', data: exp })
  }

  if (profile.value.skill?.professional) {
    result.push({
      id: RESUME_MODULE_ID.SKILL,
      title: '技能',
      data: profile.value.skill?.professional
    })
  }

  return result
})

useHead({
  title: computed(() => {
    let documentTitle: string = profile.value?.username?.toUpperCase() || ''
    if (documentTitle) {
      documentTitle += ' - RESUME'
    }
    return documentTitle
  })
})
</script>

<style lang="scss">
@import 'https://at.alicdn.com/t/font_1932202_s1pihrh03mo.css';

#__cv {
  user-select: none;

  .navbar {
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: rgba(255, 255, 255, 0.72);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
      0 2px 8px rgba(0, 0, 0, 0.05);

    @supports (
      (-webkit-backdrop-filter: initial) or (backdrop-filter: initial)
    ) {
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
