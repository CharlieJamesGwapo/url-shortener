export interface Link {
  code: string;
  originalUrl: string;
  createdAt: string;
  clicks: number;
}

export interface LinkStore {
  links: Link[];
  version: number;
}
