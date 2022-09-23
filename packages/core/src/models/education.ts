import Identifiable from './identifiable'
import { User } from './user'

export interface Education extends Identifiable<number> {
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
