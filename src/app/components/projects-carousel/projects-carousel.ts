import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  OnDestroy,
  inject,
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

  /** vitesse de base (px/s) */
  speed = 75;

  paused = false;

  projects: UiProject[] = PROJECTS.map((p) => ({
    _key: p.token,
    token: p.token,
    title: p.title?.trim() ? p.title : p.name,
    img: `assets/projects/${p.token}/${p.thumbs}`,
  }));

  /** belt dupliqué (obligatoire pour l’infini sans saut) */
  renderProjects: (UiProject & { _dup: 1 | 2; _k: string })[] = [];
  private baseLen = 0;

  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLElement>;
  @ViewChild('viewport', { static: true }) viewportRef!: ElementRef<HTMLElement>;
  @ViewChildren('item') items!: QueryList<ElementRef<HTMLElement>>;

  private raf = 0;
  private lastT = 0;

  /** translation courante (px) */
  private x = 0;

  /** largeur d’un “tour” (= largeur du 1er set) */
  private loopW = 0;

  ngAfterViewInit(): void {
    this.baseLen = this.projects.length;

    // duplique 2x
    this.renderProjects = [
      ...this.projects.map((p) => ({ ...p, _dup: 1 as const, _k: `${p._key}-1` })),
      ...this.projects.map((p) => ({ ...p, _dup: 2 as const, _k: `${p._key}-2` })),
    ];

    const tryInit = () => {
      // on a besoin d'au moins baseLen + 1 items pour calculer loopW
      if (this.items.length < this.baseLen + 1) return false;

      this.measure();
      this.start();

      window.addEventListener('resize', this.onResize, { passive: true });
      return true;
    };

    // tentative immédiate
    if (tryInit()) return;

    // sinon on attend le rendu (items.changes)
    const sub = this.items.changes.subscribe(() => {
      if (tryInit()) sub.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
  }

  private onResize = () => {
    this.measure();
  };

  private measure() {
    const els = this.items.toArray().map((x) => x.nativeElement);
    if (els.length < this.baseLen + 1) return;

    // le 1er élément du 2e set commence exactement à loopW
    const firstOfSecondSet = els[this.baseLen];
    this.loopW = firstOfSecondSet.offsetLeft;

    // reset position
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

  /**
   * Anti-saut :
   * calcule la position des cartes en modulo loopW, et choisit la version la plus proche du centre
   * => la valeur --d ne "reset" jamais brutalement.
   */
  private updateDistances() {
    if (!this.loopW) return;

    const viewport = this.viewportRef.nativeElement;
    const center = viewport.clientWidth / 2;

    const els = this.items.toArray().map((x) => x.nativeElement);

    for (const el of els) {
      const w = el.offsetWidth;

      // position "bouclée" [0..loopW)
      const baseLeft = this.mod(this.x + el.offsetLeft, this.loopW);

      // candidates autour du centre
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

    // évite focus "collant" sur mobile
    this.paused = false;
    (document.activeElement as HTMLElement | null)?.blur();

    this.router.navigate(['/project', token]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }
}
