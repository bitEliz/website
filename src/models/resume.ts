import { Model } from "./model";

export class User extends Model<string> {
  id!: string;
  emailAddress?: string;
  eduExps?: EducationalExp[];
  firstName!: string;
  projects?: Project[];
  workExps?: WorkExp[];
  lastName!: string;
  social?: SocialNetwork[];
  skill?: Skill;
  avatarUrl?: string;
  location?: string;
  username?: string;
  interests?: string[];
  aboutMe?: string;
}

export class Project extends Model<string> {
  summary!: string;
  trackViewUrl?: string;
  note?: string;
  id!: string;
  startDate!: string;
  endDate!: string;
  userId!: string;
  kind!: string;
  name!: string;
  visibility!: string;
  trackId?: string;
}

export class Skill extends Model<string> {
  id!: string;
  profesional?: string[];
  workflow?: string[];
}

export class SocialNetwork extends Model<string> {
  id!: string;
  userId!: string;
  url!: string;
  service!: SocialNetworkService;
}

export class SocialNetworkService extends Model<string> {
  id!: string;
  type!: string;
}

export class Industry extends Model<string> {
  id!: string;
  title!: string;
}

export class EducationalExp extends Model<string> {
  school!: string;
  userId!: string;
  degree?: string;
  id!: string;
  startYear?: string;
  field!: string;
  endYear?: string;
}

export class WorkExp extends Model<string> {
  location!: string;
  responsibilities?: string[];
  endDate!: string;
  id!: string;
  startDate!: string;
  title!: string;
  userId!: string;
  companyName!: string;
  industry!: Industry[];
  headline?: string;
}
