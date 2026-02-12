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

  isYouTube(fileOrUrl: string): boolean {
    return /(^https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(fileOrUrl);
  }

youtubeEmbed(fileOrUrl: string): SafeResourceUrl {
  const id = this.extractYouTubeId(fileOrUrl);

  const url =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?controls=1&autoplay=0&rel=0&modestbranding=1&playsinline=1`;

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
}
