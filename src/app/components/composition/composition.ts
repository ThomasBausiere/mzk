import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type CompositionRow = string[];

@Component({
  selector: 'app-composition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './composition.html',
  styleUrls: ['./composition.css'],
})
export class Composition {
  @Input({ required: true }) token!: string;              // ex: "ac-immo"
  @Input({ required: true }) composition!: 1 | 2 | 3 | 4; // 1..4
  @Input({ required: true }) media: string[] = [];        // ex: ["01.mp4","02.png",...]

  get basePath(): string {
    return `assets/projects/${this.token}/`;
  }

  src(file: string): string {
    return `${this.basePath}${file}`;
  }

  isVideo(file: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(file);
  }

  /**
   * Règle de distribution:
   * - comp1: row1: 1 / row2: 2 / row3: 1
   * - comp2: row1: 1 / row2: 2
   * - comp3: row1: 1 / row2: 3 / row3: 1
   * - comp4: row1: 1 / row2: 3 / row3: 2
   */
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

    // composition === 4
    const row2 = m.slice(1, 4);
    const row3 = m.slice(4, 6);
    return { row1, row2, row3 };
  }
}
