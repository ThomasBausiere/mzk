import { Component, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
})
export class Nav implements OnDestroy {
  private router = inject(Router);
  private sub: Subscription;

  isOpen = false;

  constructor() {
    // ✅ remonter en haut à CHAQUE navigation terminée
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        // important : ferme le menu mobile si ouvert
        this.isOpen = false;

        // retire un éventuel focus (mobile peut “figer” des états)
        (document.activeElement as HTMLElement | null)?.blur?.();

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }

  onNavClick() {
    this.close();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

    mailtoHref =
    'mailto:amelmerzouk@gmail.com';
}
