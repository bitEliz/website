<template>
  <main id="__cv">
    <section
      v-for="(s, i) in sections"
      :key="s.id"
      :id="s.id"
      :class="i % 2 == 0 ? '' : 'bg-light'"
    >
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
</style>
