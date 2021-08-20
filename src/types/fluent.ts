declare namespace fluent {
  export interface Model<ID> {
    id: ID
  }

  export interface Blog extends Model<number> {
    alias: string
    title: string
    excerpt: string
    content?: string
    artworkUrl?: string
    tags?: Array<string>
    user?: User
    userId?: number
    categories: Array<BlogCategory>
    createdAt?: string
  }

  export interface BlogCategory extends Model<number> {
    name: string
    blog?: Array<Blog>
  }

  export interface User extends Model<number> {
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

  export interface Skill extends Model<number> {
    professional: Array<string>
    workflow?: Array<string>
  }

  export interface SocialNetworkingService extends Model<number> {
    name?: string
  }

  export interface SocialNetworking extends Model<number> {
    url: string
    user?: User
    userId?: number
    service?: SocialNetworkingService
    serviceId?: number
  }

  export type ProjKind = "app" | "website" | "library"

  export type ProjVisibility = "private" | "public"

  export interface Project extends Model<number> {
    name: string
    summary: string
    kind: ProjKind
    visibility: ProjVisibility
    startDate: string
    endDate: string
    isOpenSource: boolean
    note?: string
    artworkUrl?: string
    backgroundImageUrl?: string
    promoImageUrl?: string
    trackViewUrl?: string
    trackId?: string
    genres?: Array<string>
    screenshotUrls?: Array<string>
    padScreenshotUrls?: Array<string>
    user?: User
    userId?: number
  }

  export interface Industry extends Model<number> {
    title?: string
  }

  export interface Experience extends Model<number> {
    title: string
    companyName: string
    location: string
    startDate: string
    endDate: string
    headline?: string
    responsibilities?: Array<string>
    media?: string
    user?: User
    userId?: number
    industries: Array<Industry>
  }

  export interface Education extends Model<number> {
    school: string
    degree: string
    field: string
    startYear?: string
    endYear?: string
    grade?: string
    activities?: Array<string>
    accomplishments?: Array<string>
    media?: string
    user?: User
    userId?: number
  }
}

export default fluent
