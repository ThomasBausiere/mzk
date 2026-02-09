import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  OnDestroy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { PROJECTS } from '../../data/projects.data';

type UiProject = {
  _key: string;
  token: string;
  title: string;
  img: string;
};

@Component({
  selector: 'app-projects-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-carousel.html',
  styleUrls: ['./projects-carousel.css'],
})
export class ProjectsCarousel implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  speed = 75;
  paused = false;

  projects: UiProject[] = PROJECTS.map((p) => ({
    _key: p.token,
    token: p.token,
    title: p.title?.trim() ? p.title : p.name,
    img: `assets/projects/${p.token}/${p.thumbs}`, // OK
  }));

  renderProjects: (UiProject & { _dup: 1 | 2; _k: string })[] = [];
  private baseLen = 0;

  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLElement>;
  @ViewChild('viewport', { static: true }) viewportRef!: ElementRef<HTMLElement>;
  @ViewChildren('item') items!: QueryList<ElementRef<HTMLElement>>;

  private raf = 0;
  private lastT = 0;
  private x = 0;
  private loopW = 0;

  ngAfterViewInit(): void {
    this.baseLen = this.projects.length;

    // ✅ 1) remplir le belt
    this.renderProjects = [
      ...this.projects.map((p) => ({ ...p, _dup: 1 as const, _k: `${p._key}-1` })),
      ...this.projects.map((p) => ({ ...p, _dup: 2 as const, _k: `${p._key}-2` })),
    ];

    // ✅ 2) FORCER le rendu du template (indispensable en zoneless / cas similaires)
    this.cdr.detectChanges();

    // ✅ 3) attendre que le DOM soit vraiment posé, puis init (measure/start)
    requestAnimationFrame(() => {
      this.measure();
      this.start();
      window.addEventListener('resize', this.onResize, { passive: true });
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
  }

  private onResize = () => this.measure();

  private measure() {
    const els = this.items.toArray().map((x) => x.nativeElement);
    if (els.length < this.baseLen + 1) return;

    const firstOfSecondSet = els[this.baseLen];
    this.loopW = firstOfSecondSet.offsetLeft;

    this.x = 0;
    this.applyTransform();
    this.updateDistances();
  }

  private start() {
    cancelAnimationFrame(this.raf);
    this.lastT = performance.now();

    const tick = (t: number) => {
      const dt = (t - this.lastT) / 1000;
      this.lastT = t;

      if (!this.paused && this.loopW > 0) {
        this.x -= this.speed * dt;

        // garde x dans [-loopW, 0)
        this.x = ((this.x % this.loopW) + this.loopW) % this.loopW;
        this.x = this.x - this.loopW;
      }

      this.applyTransform();
      this.updateDistances();
      this.raf = requestAnimationFrame(tick);
    };

    this.raf = requestAnimationFrame(tick);
  }

  private applyTransform() {
    this.trackRef.nativeElement.style.setProperty('--pcx', `${this.x}px`);
  }

  private updateDistances() {
    if (!this.loopW) return;

    const viewport = this.viewportRef.nativeElement;
    const center = viewport.clientWidth / 2;

    const els = this.items.toArray().map((x) => x.nativeElement);

    for (const el of els) {
      const w = el.offsetWidth;
      const baseLeft = this.mod(this.x + el.offsetLeft, this.loopW);

      const candidates = [baseLeft, baseLeft - this.loopW, baseLeft + this.loopW];
      let bestDist = Infinity;

      for (const left of candidates) {
        const c = left + w / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) bestDist = d;
      }

      const dn = bestDist / (w * 1.1);
      el.style.setProperty('--d', dn.toFixed(4));
    }
  }

  private mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  goToProject(token: string, ev: MouseEvent) {
    ev.preventDefault();
    this.paused = false;
    (document.activeElement as HTMLElement | null)?.blur();

     this.router.navigate(['/project', token]);

  }
}
