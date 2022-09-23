import { Blog } from './blog'
import { Education } from './education'
import { Experience } from './experience'
import Identifiable from './identifiable'
import { Project } from './project'
import { Skill } from './skill'
import { SocialNetworking } from './sns'

export interface User extends Identifiable<number> {
  username: string
  firstName: string
  lastName: string
  avatarUrl?: string
  phone?: string
  emailAddress?: string
  aboutMe?: string
  location?: string
  interests?: Array<string>
  skill?: Skill
  social?: Array<SocialNetworking>
  projects?: Array<Project>
  education?: Array<Education>
  experiences?: Array<Experience>
  blog?: Array<Blog>
}
