import Identifiable from './identifiable'
import { User } from './user'

export interface Industry extends Identifiable<number> {
  title?: string
}

export interface Experience extends Identifiable<number> {
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
