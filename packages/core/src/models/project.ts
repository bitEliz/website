import Identifiable from './identifiable'
import { User } from './user'

export type ProjKind = 'app' | 'website' | 'library'

export type ProjVisibility = 'private' | 'public'

export interface Project extends Identifiable<number> {
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
