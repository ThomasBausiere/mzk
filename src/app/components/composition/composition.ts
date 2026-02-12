import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type CompositionRow = string[];

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

@Component({
  selector: 'app-composition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './composition.html',
  styleUrls: ['./composition.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Composition implements AfterViewInit, OnDestroy {
  @Input({ required: true }) token!: string;
  @Input({ required: true }) composition!: 1 | 2 | 3 | 4;
  @Input({ required: true }) media: string[] = [];

  /** quels items youtube sont “ouverts” (player monté) */
  open = new Set<string>();

  /** players par item */
  private players = new Map<string, any>();

  private apiLoading = false;
  private apiReady = false;
  private apiPromise: Promise<void> | null = null;

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

  /** thumbnail youtube */
  youtubeThumb(url: string): string {
    const id = this.extractYouTubeId(url);
    // maxres peut ne pas exister → hqdefault est safe
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  /** id stable pour dom */
  domIdFor(item: string): string {
    const id = this.extractYouTubeId(item);
    return `yt-${this.token}-${id}`;
  }

  ngAfterViewInit(): void {
    // on ne charge l’API que si on a au moins une vidéo YouTube
    if (this.media?.some((m) => this.isYouTube(m))) {
      this.ensureYouTubeApi();
    }
  }

  ngOnDestroy(): void {
    // cleanup players
    for (const p of this.players.values()) {
      try {
        p.destroy?.();
      } catch {}
    }
    this.players.clear();
  }

  async playYouTube(item: string) {
    // ouvre l’overlay → mount player
    this.open.add(item);

    await this.ensureYouTubeApi();

    // laisse le DOM rendre le <div id="...">
    await new Promise<void>((resolve) => queueMicrotask(() => resolve()));

    const mountId = this.domIdFor(item);
    const videoId = this.extractYouTubeId(item);
    if (!videoId) return;

    // déjà créé
    const existing = this.players.get(item);
    if (existing) {
      try {
        existing.playVideo?.();
      } catch {}
      return;
    }

    const YT = window.YT;
    if (!YT?.Player) return;

    const player = new YT.Player(mountId, {
      videoId,
      playerVars: {
        autoplay: 1,           // on clique => autorisé
        playsinline: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (e: any) => {
          // lecture immédiate (geste utilisateur)
          try {
            e.target.playVideo();
          } catch {}
        },
      },
    });

    this.players.set(item, player);
  }

  private ensureYouTubeApi(): Promise<void> {
    if (this.apiReady) return Promise.resolve();
    if (this.apiPromise) return this.apiPromise;

    this.apiPromise = new Promise<void>((resolve) => {
      // API déjà présente
      if (window.YT?.Player) {
        this.apiReady = true;
        resolve();
        return;
      }

      // si déjà en train de charger
      if (this.apiLoading) {
        // on attend le callback
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          prev?.();
          this.apiReady = true;
          resolve();
        };
        return;
      }

      this.apiLoading = true;

      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        this.apiReady = true;
        resolve();
      };

      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      s.onload = () => {
        // certains navigateurs ne déclenchent pas le ready immédiatement
        // le resolve se fera via onYouTubeIframeAPIReady
      };
      document.head.appendChild(s);
    });

    return this.apiPromise;
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
    } catch {
      const m = input.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (m?.[1]) return m[1];
    }
    return '';
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
