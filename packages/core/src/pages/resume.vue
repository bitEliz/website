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
        <ResumeProfile
          :profile="s.data"
          v-if="s.id == RESUME_MODULE_ID.PROFILE"
        />
        <ResumeProjectGallery
          :galleries="s.data"
          v-else-if="s.id == RESUME_MODULE_ID.PROJECT"
        />
        <ResumeExpGallery
          :galleries="s.data"
          v-else-if="s.id == RESUME_MODULE_ID.EXPERIENCE"
        />
        <ul class="list-unstyled" v-else-if="s.id == RESUME_MODULE_ID.SKILL">
          <li v-for="(e, i) in s.data" :key="i">
            <Markdown :content="e"></Markdown>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Project, User, RESUME_MODULE_ID } from '@/models'

const store = useProfileStore()
const { profile } = storeToRefs(store)

onServerPrefetch(async () => {
  if (import.meta.env.SSR) {
    await store.fetch()
  }
})

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
    data: profile
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

useTitle(
  computed(() => {
    let documentTitle: string = profile.value.username?.toUpperCase() || ''
    if (documentTitle) {
      documentTitle += ' - RESUME'
    }
    return documentTitle
  })
)
</script>

<style lang="css">
@font-face {
  font-family: 'ali';
  src: url('//at.alicdn.com/t/font_1932202_s1pihrh03mo.eot?t=1594388184711'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1932202_s1pihrh03mo.eot?t=1594388184711#iefix')
      format('embedded-opentype'),
    /* IE6-IE8 */
      url('data:application/x-font-woff2;charset=utf-8;base64,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')
      format('woff2'),
    url('//at.alicdn.com/t/font_1932202_s1pihrh03mo.woff?t=1594388184711')
      format('woff'),
    url('//at.alicdn.com/t/font_1932202_s1pihrh03mo.ttf?t=1594388184711')
      format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('//at.alicdn.com/t/font_1932202_s1pihrh03mo.svg?t=1594388184711#ali')
      format('svg'); /* iOS 4.1- */
}

.ali {
  font-family: 'ali' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.degree:before {
  content: '\e673';
}

.twitter:before {
  content: '\e9b2';
}

.stackoverflow:before {
  content: '\e6e8';
}

.mail:before {
  content: '\e604';
}

.wechat:before {
  content: '\e634';
}

.github:before {
  content: '\e677';
}

.facebook:before {
  content: '\e953';
}
</style>
