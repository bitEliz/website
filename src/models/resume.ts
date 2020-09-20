export interface Model {
  id: string;
}

export class User implements Model {
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

export class Project implements Model {
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

export class Skill implements Model {
  id!: string;
  profesional?: string[];
  workflow?: string[];
}

export class SocialNetwork implements Model {
  id!: string;
  userId!: string;
  url!: string;
  service!: SocialNetworkService;
}

export class SocialNetworkService implements Model {
  id!: string;
  type!: string;
}

export class Industry implements Model {
  id!: string;
  title!: string;
}

export class EducationalExp implements Model {
  school!: string;
  userId!: string;
  degree?: string;
  id!: string;
  startYear?: string;
  field!: string;
  endYear?: string;
}

export class WorkExp implements Model {
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
