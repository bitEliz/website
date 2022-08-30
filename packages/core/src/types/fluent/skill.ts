import Identifiable from './identifiable'

export interface Skill extends Identifiable<number> {
  professional: Array<string>
  workflow?: Array<string>
}
