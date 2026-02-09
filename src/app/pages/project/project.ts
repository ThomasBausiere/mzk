import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  private sanitizer = inject(DomSanitizer);

  project?: ProjectResolved;
  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const token = params.get('token') ?? '';
      this.project = this.projects.getByToken(token);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  youtubeHeader(url: string): SafeResourceUrl {
    const id = this.extractYouTubeId(url);
    const embed =
      `https://www.youtube-nocookie.com/embed/${id}` +
      `?autoplay=1&mute=1&loop=1&playlist=${id}` +
      `&controls=0&modestbranding=1&rel=0&playsinline=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }

  private extractYouTubeId(input: string): string {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

    try {
      const u = new URL(input);
      if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '').split('/')[0] || '';
      const v = u.searchParams.get('v');
      if (v) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      const embedIndex = parts.indexOf('embed');
      if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    } catch {
      const m = input.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (m?.[1]) return m[1];
    }
    return '';
  }
}
