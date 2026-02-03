import { Injectable } from '@angular/core';
import { PROJECTS } from '../data/projects.data';
import { Project, ProjectCategory } from '../models/projects';

export type ProjectResolved = Project & {
  assetBase: string;                 // 'assets/projects/<token>/'
  thumbnailUrl: string;
  logoUrl?: string;
  headerUrl?: string;
  compositionMediaUrls: string[];
};

export type ProjectsFilter = {
  category?: ProjectCategory;         // undefined => pas de filtre
};

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private resolve(p: Project): ProjectResolved {
    const assetBase = `assets/projects/${p.token}/`;

    return {
      ...p,
      assetBase,
      thumbnailUrl: assetBase + p.thumbnail,
      logoUrl: p.logo ? assetBase + p.logo : undefined,
      headerUrl: p.header ? assetBase + p.header : undefined,
      compositionMediaUrls: (p.compositionMedia ?? []).map(f => assetBase + f),
    };
  }

  getAll(): ProjectResolved[] {
    return PROJECTS.map(p => this.resolve(p));
  }

  getByToken(token: string): ProjectResolved | undefined {
    const found = PROJECTS.find(p => p.token === token);
    return found ? this.resolve(found) : undefined;
  }

  getByCategory(category: ProjectCategory): ProjectResolved[] {
    return PROJECTS
      .filter(p => (p.categories ?? []).includes(category))
      .map(p => this.resolve(p));
  }

  filterProjects(filter: ProjectsFilter): ProjectResolved[] {
    const all = PROJECTS;

    const filtered = filter.category
      ? all.filter(p => (p.categories ?? []).includes(filter.category!))
      : all;

    return filtered.map(p => this.resolve(p));
  }

  getCategories(): ProjectCategory[] {
    return ['graphisme', 'motion-design', 'web-design'];
  }
}
