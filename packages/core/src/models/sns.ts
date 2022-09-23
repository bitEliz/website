import Identifiable from './identifiable'
import { User } from './user'

export interface SocialNetworkingService extends Identifiable<number> {
  name?: string
}

export interface SocialNetworking extends Identifiable<number> {
  url: string
  user?: User
  userId?: number
  service?: SocialNetworkingService
  serviceId?: number
}
