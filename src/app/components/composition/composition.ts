import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Player from '@vimeo/player';

type CompositionRow = string[];

@Component({
  selector: 'app-composition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './composition.html',
  styleUrls: ['./composition.css'],
})
export class Composition {
  @Input({ required: true }) token!: string;
  @Input({ required: true }) composition!: 1 | 2 | 3 | 4;
  @Input({ required: true }) media: string[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  /** players Vimeo instanciés (1 par item) */
  private vimeoPlayers = new Map<string, Player>();

  /** utile pour certains devices : on ne tente play() que si user a déjà interagi */
  private userInteracted = false;

  get basePath(): string {
    return `assets/projects/${this.token}/`;
  }

  src(fileOrUrl: string): string {
    return /^https?:\/\//i.test(fileOrUrl) ? fileOrUrl : `${this.basePath}${fileOrUrl}`;
  }

  isLocalVideo(fileOrUrl: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(fileOrUrl);
  }

  isYouTube(fileOrUrl: string): boolean {
    return /(^https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(fileOrUrl);
  }

  isVimeo(fileOrUrl: string): boolean {
    return /(^https?:\/\/)?(www\.)?(vimeo\.com|player\.vimeo\.com)\//i.test(fileOrUrl);
  }

  /** YouTube: embed simple (pas d’autoplay ici) */
  youtubeEmbed(fileOrUrl: string): SafeResourceUrl {
    const id = this.extractYouTubeId(fileOrUrl);
    const url =
      `https://www.youtube-nocookie.com/embed/${id}` +
      `?playsinline=1&controls=1&rel=0&modestbranding=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /** Vimeo: embed "officiel", en conservant h=HASH si présent */
  vimeoEmbed(fileOrUrl: string): SafeResourceUrl {
    const { id, h } = this.extractVimeoIdAndHash(fileOrUrl);

    const qp: string[] = [];
    if (h) qp.push(`h=${encodeURIComponent(h)}`);

    // ✅ lecture inline, UI ok, pas d’autoplay par défaut
    qp.push(
      `autoplay=0`,
      `muted=0`,
      `loop=1`,
      `playsinline=1`,
      `title=0`,
      `byline=0`,
      `portrait=0`,
      `dnt=1`
    );

    const url = `https://player.vimeo.com/video/${id}?${qp.join('&')}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * ✅ iOS fix:
   * On appelle player.play() dans un vrai handler de geste utilisateur (pointerdown/touchstart/click)
   * sans setTimeout / Promise / queueMicrotask autour.
   */
  onVimeoGesture(item: string, iframe: HTMLIFrameElement | null) {
    this.userInteracted = true;
    if (!iframe) return;

    let player = this.vimeoPlayers.get(item);
    if (!player) {
      try {
        player = new Player(iframe);
        this.vimeoPlayers.set(item, player);
      } catch {
        return;
      }
    }

    // Tentative de play immédiate (valide comme "user gesture")
    // (le .catch est ok, mais pas de logique async avant)
    player.play().catch(() => {
      // si iOS refuse encore, l’utilisateur peut utiliser les controls du player
    });
  }

  private extractYouTubeId(input: string): string {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

    try {
      const u = new URL(input);
      if (u.hostname.includes('youtu.be')) {
        return u.pathname.replace('/', '').split('/')[0] || '';
      }
      const v = u.searchParams.get('v');
      if (v) return v;

      const parts = u.pathname.split('/').filter(Boolean);
      const embedIndex = parts.indexOf('embed');
      if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];

      const shortsIndex = parts.indexOf('shorts');
      if (shortsIndex >= 0 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
    } catch {
      const m = input.match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
      if (m?.[1]) return m[1];
    }
    return '';
  }

  /**
   * Vimeo:
   * - récupère l'id numérique
   * - récupère aussi h=HASH si présent (souvent requis pour vidéos privées/unlisted)
   */
  private extractVimeoIdAndHash(input: string): { id: string; h?: string } {
    // id direct
    if (/^\d+$/.test(input)) return { id: input };

    try {
      const u = new URL(input);
      const parts = u.pathname.split('/').filter(Boolean);

      // player.vimeo.com/video/<id>
      const videoIndex = parts.indexOf('video');
      if (videoIndex >= 0 && parts[videoIndex + 1]) {
        const id = parts[videoIndex + 1];
        const h = u.searchParams.get('h') || undefined;
        return { id, h };
      }

      // vimeo.com/<id> ou .../<id>
      const lastNumeric = [...parts].reverse().find((p) => /^\d+$/.test(p));
      const id = lastNumeric || '';

      // hash possible en query: ?h=xxxx
      const h = u.searchParams.get('h') || undefined;

      return { id, h };
    } catch {
      const m = input.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\?h=([a-zA-Z0-9]+))?/);
      if (m?.[1]) return { id: m[1], h: m?.[2] };
    }
    return { id: '' };
  }

  get rows(): { row1: CompositionRow; row2: CompositionRow; row3: CompositionRow } {
    const m = this.media ?? [];
    const row1 = m.slice(0, 1);

    if (this.composition === 1) {
      const row2 = m.slice(1, 3);
      const row3 = m.slice(3, 4);
      return { row1, row2, row3 };
    }

    if (this.composition === 2) {
      const row2 = m.slice(1, 3);
      return { row1, row2, row3: [] };
    }

    if (this.composition === 3) {
      const row2 = m.slice(1, 4);
      const row3 = m.slice(4, 5);
      return { row1, row2, row3 };
    }

    const row2 = m.slice(1, 4);
    const row3 = m.slice(4, 6);
    return { row1, row2, row3 };
  }
}
