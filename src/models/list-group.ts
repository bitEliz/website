export enum MDL_ID {
  DEFAULT = "",
  PROJECT = "projects",
  PROFILE = "profile",
  EXPERIENCE = "experience",
  EDUCATIONAL = "educational",
  SKILL = "skills",
}

export class ListGroup<T> {
  id: MDL_ID;
  title: string;
  list: Array<T>;

  constructor(id?: MDL_ID, title?: string, list?: Array<T>) {
    this.id = id ?? MDL_ID.DEFAULT;
    this.title = title ?? "";
    this.list = list ?? [];
  }
}
