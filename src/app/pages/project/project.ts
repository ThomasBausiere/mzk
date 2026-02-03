import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProjectsService, ProjectResolved } from '../../services/projects.services';
import { Composition } from '../../components/composition/composition';
import { ProjectsCarousel } from '../../components/projects-carousel/projects-carousel';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, Composition, ProjectsCarousel],
  templateUrl: './project.html',
  styleUrls: ['./project.css'],
})
export class Project implements OnInit, OnDestroy {
  private sub?: Subscription;

  project?: ProjectResolved;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      const token = params.get('token') ?? '';
      this.project = this.projectsService.getByToken(token);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
