import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  get basePath(): string {
    return `assets/projects/${this.token}/`;
  }

  src(fileOrUrl: string): string {
    return /^https?:\/\//i.test(fileOrUrl) ? fileOrUrl : `${this.basePath}${fileOrUrl}`;
  }

  isLocalVideo(fileOrUrl: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(fileOrUrl);
  }
isVimeo(fileOrUrl: string): boolean {
  return /(^https?:\/\/)?(www\.)?(vimeo\.com|player\.vimeo\.com)\//i.test(fileOrUrl);
}
  isYouTube(fileOrUrl: string): boolean {
    return /(^https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(fileOrUrl);
  }

youtubeEmbed(fileOrUrl: string, autoplay = false): SafeResourceUrl {
  const id = this.extractYouTubeId(fileOrUrl);
  const url =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?playsinline=1&controls=1&rel=0&modestbranding=1` +
    (autoplay ? `&autoplay=1` : ``);
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}


vimeoEmbed(fileOrUrl: string, autoplay = false): SafeResourceUrl {
  const id = this.extractVimeoId(fileOrUrl);
  const url =
    `https://player.vimeo.com/video/${id}` +
    `?playsinline=1&loop=1&title=0&byline=0&portrait=0&dnt=1&controls=1` +
    (autoplay ? `&autoplay=1` : ``);
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

  private extractYouTubeId(input: string): string {
    // If already looks like an id (11 chars), accept it
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

    try {
      const u = new URL(input);
      // youtu.be/<id>
      if (u.hostname.includes('youtu.be')) {
        return u.pathname.replace('/', '').split('/')[0] || '';
      }
      // youtube.com/watch?v=<id>
      const v = u.searchParams.get('v');
      if (v) return v;
      // youtube.com/embed/<id>
      const parts = u.pathname.split('/').filter(Boolean);
      const embedIndex = parts.indexOf('embed');
      if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    } catch {
      // fallback regex
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


  openYouTubeUrl: SafeResourceUrl | null = null;

openYouTube(item: string) {
  this.openYouTubeUrl = this.youtubeEmbed(item);
}

closeYouTube() {
  this.openYouTubeUrl = null;
}

youtubeThumb(fileOrUrl: string): string {
  const id = this.extractYouTubeId(fileOrUrl);
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

private extractVimeoId(input: string): string {
  // accepte directement un id numérique
  if (/^\d+$/.test(input)) return input;

  try {
    const u = new URL(input);

    // player.vimeo.com/video/<id>
    const parts = u.pathname.split('/').filter(Boolean);
    const videoIndex = parts.indexOf('video');
    if (videoIndex >= 0 && parts[videoIndex + 1]) return parts[videoIndex + 1];

    // vimeo.com/<id> ou vimeo.com/channels/.../<id> ou /showcase/.../video/<id>
    // on prend le dernier segment numérique
    const lastNumeric = [...parts].reverse().find(p => /^\d+$/.test(p));
    if (lastNumeric) return lastNumeric;
  } catch {
    // fallback regex
    const m = input.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m?.[1]) return m[1];
  }

  return '';
}

activeEmbeds = new Set<string>();

activate(item: string) {
  this.activeEmbeds.add(item);
}

isActive(item: string) {
  return this.activeEmbeds.has(item);
}
}
