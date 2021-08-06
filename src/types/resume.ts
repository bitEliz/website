import Model from "./model"

export interface Project extends Model<string> {
  summary: string
  trackViewUrl?: string
  artworkUrl?: string
  note?: string
  startDate: string
  endDate: string
  userId: string
  kind: string
  name: string
  visibility: string
  trackId?: string
}

export interface Skill extends Model<string> {
  professional?: string[]
  workflow?: string[]
}

export interface SocialNetworkService extends Model<string> {
  name: string
}

export interface SocialNetwork extends Model<string> {
  userId: string
  url: string
  service: SocialNetworkService
}

export interface Industry extends Model<string> {
  title: string
}

export interface Education extends Model<string> {
  school: string
  userId: string
  degree?: string
  startYear?: string
  field: string
  endYear?: string
}

export interface Experience extends Model<string> {
  location: string
  responsibilities?: string[]
  endDate: string
  startDate: string
  title: string
  userId: string
  companyName: string
  industry: Industry[]
  headline?: string
}

export interface User extends Model<string> {
  emailAddress?: string
  education?: Education[]
  firstName: string
  projects?: Project[]
  experiences?: Experience[]
  lastName: string
  social?: SocialNetwork[]
  skill?: Skill
  avatarUrl?: string
  location?: string
  username?: string
  interests?: string[]
  aboutMe?: string
}
