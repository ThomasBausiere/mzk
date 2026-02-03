import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProjectsService, ProjectResolved } from '../../services/projects.services';

type ProjectCategory = 'graphisme' | 'motion-design' | 'web-design';
type CategoryFilter = 'all' | ProjectCategory;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects {
  filter: CategoryFilter = 'all';

  constructor(private projectsService: ProjectsService) {}

  get filteredProjects(): ProjectResolved[] {
    if (this.filter === 'all') return this.projectsService.getAll();
    return this.projectsService.getByCategory(this.filter);
  }

  setFilter(next: CategoryFilter) {
    this.filter = next;
  }

  isActive(cat: CategoryFilter) {
    return this.filter === cat;
  }
}
