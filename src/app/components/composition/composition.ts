import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type CompositionItem = {
  value: string;
  index: number;
};

type CompositionRow = CompositionItem[];

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

  get basePath(): string {
    return `assets/projects/${this.token}/`;
  }

  src(fileOrUrl: string): string {
    return /^https?:\/\//i.test(fileOrUrl)
      ? fileOrUrl
      : `${this.basePath}${fileOrUrl}`;
  }

  isLocalVideo(fileOrUrl: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(fileOrUrl);
  }

  isYouTube(fileOrUrl: string): boolean {
    return /(^https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(fileOrUrl);
  }

  youtubeThumb(index: number): string {
    const file = `${String(index + 1).padStart(2, '0')}.jpg`;
    return `${this.basePath}${file}`;
  }

  youtubeAlt(index: number): string {
    return `Vignette de la vidéo ${index + 1}`;
  }

get rows(): { row1: CompositionRow; row2: CompositionRow; row3: CompositionRow } {
  const items: CompositionItem[] = (this.media ?? []).map((value, index) => ({
    value,
    index,
  }));

  /* ✅ exception spécifique au projet omd :
     3 visuels => 3 lignes de 1 visuel */
  if (this.token === 'omd') {
    return {
      row1: items.slice(0, 1),
      row2: items.slice(1, 2),
      row3: items.slice(2, 3),
    };
  }

  const row1 = items.slice(0, 1);

  if (this.composition === 1) {
    const row2 = items.slice(1, 3);
    const row3 = items.slice(3, 4);
    return { row1, row2, row3 };
  }

  if (this.composition === 2) {
    const row2 = items.slice(1, 3);
    return { row1, row2, row3: [] };
  }

  if (this.composition === 3) {
    const row2 = items.slice(1, 4);
    const row3 = items.slice(4, 5);
    return { row1, row2, row3 };
  }

  const row2 = items.slice(1, 4);
  const row3 = items.slice(4, 6);
  return { row1, row2, row3 };
}
}