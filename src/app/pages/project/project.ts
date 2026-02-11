import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewChild, ElementRef } from '@angular/core';
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
  private route = inject(ActivatedRoute);
  private projects = inject(ProjectsService);

@ViewChild('headerVideo') headerVideo?: ElementRef<HTMLVideoElement>;

  project?: ProjectResolved;
  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const token = params.get('token') ?? '';

      // ✅ flush immédiat pour éviter d’apercevoir l’ancien header
      this.project = undefined;

      // ✅ puis charge le nouveau
      queueMicrotask(() => {
        this.project = this.projects.getByToken(token);
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  tryPlayHeader() {
  const v = this.headerVideo?.nativeElement;
  if (!v) return;

  v.muted = true;        // ✅ double sécurité
  v.playsInline = true as any;

  const p = v.play();
  if (p && typeof p.catch === 'function') {
    p.catch(() => {
      // autoplay refusé => au moins la vidéo reste affichée (première frame)
    });
  }
}
}






