import { Project, RESUME_MODULE_ID, User } from '@/models'

type ContentData = { id: RESUME_MODULE_ID; title: string; data: any }

function serializeExp(profile: User) {
  let exp: ContentData[] = []

  profile.experiences &&
    exp.push({
      id: RESUME_MODULE_ID.EXPERIENCE,
      title: '工作经历',
      data: profile.experiences
    })

  profile.education &&
    exp.push({
      id: RESUME_MODULE_ID.EDUCATIONAL,
      title: '教育经历',
      data: profile.education
    })

  return exp
}

function serializeProj(projects: Project[]) {
  let projectGroups: Array<Array<Project>> = []

  projects = projects.filter((e) => e.visibility == 'public')

  projectGroups.push(projects.filter((e) => e.isOpenSource))
  projectGroups.push(projects.filter((e) => !e.isOpenSource))
  projectGroups = projectGroups.filter((e) => e.length > 0)
  return projectGroups
}

async function fetchResume(uid: number | string) {
  const response: User = await $fetch(`/api/users/${uid}`, {
    query: { emb: 'edu.exp.proj.skill.sns' }
  })

  let ret: ContentData[] = []

  ret.push({
    id: RESUME_MODULE_ID.PROFILE,
    title: '简介',
    data: response
  })

  const projectGroups = serializeProj(response.projects || [])
  projectGroups.length > 0 &&
    ret.push({
      id: RESUME_MODULE_ID.PROJECT,
      title: '项目',
      data: projectGroups
    })

  const exp = serializeExp(response)
  exp.length > 0 &&
    ret.push({ id: RESUME_MODULE_ID.EXPERIENCE, title: '经历', data: exp })

  response.skill?.professional &&
    ret.push({
      id: RESUME_MODULE_ID.SKILL,
      title: '技能',
      data: response.skill?.professional
    })

  const documentTitle =
    response.lastName && response.firstName
      ? response.lastName + response.firstName + '的简历'
      : ''

  return {
    documentTitle,
    sections: ret
  }
}

export default defineEventHandler(() => {
  return fetchResume(useRuntimeConfig().public.uid)
})
