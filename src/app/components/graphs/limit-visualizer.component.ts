import { Component, Input, OnChanges, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JSXGraphService } from '../../services/jsxgraph.service';

let boardCounter = 0;

/**
 * Visualizes a limit: a draggable point glides along the curve toward x = target.
 * Shows live readouts of x and f(x) as the student drags closer.
 */
@Component({
  selector: 'app-limit-visualizer',
  standalone: true,
  template: `
    <div>
      <div [id]="boardId" class="w-full rounded-[2px] border border-rule" style="height: 320px;" aria-label="Drag the point along the curve to approach the limit"></div>
      <div class="mt-3 flex flex-wrap gap-6 mono text-[12px] text-ink-soft">
        <span>x = <strong>{{ xVal() | number:'1.4-4' }}</strong></span>
        <span>f(x) = <strong>{{ fxVal() | number:'1.4-4' }}</strong></span>
        <span class="text-signal">target x = {{ target }}</span>
      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class LimitVisualizerComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) expr = '';
  @Input() target = 2;
  @Input() boundingBox: number[] = [-6, 5, 6, -5];

  readonly boardId = `lim-board-${++boardCounter}`;
  readonly xVal = signal(0);
  readonly fxVal = signal(0);

  private board: any = null;
  private readonly jsx = inject(JSXGraphService);

  ngOnChanges() {
    this.render();
  }

  ngOnDestroy() {
    this.jsx.destroy(this.board);
    this.board = null;
  }

  private render(): void {
    if (!this.expr) return;
    this.jsx.destroy(this.board);
    setTimeout(() => {
      const el = document.getElementById(this.boardId);
      if (!el) return;
      this.board = this.jsx.createBoard(this.boardId, this.boundingBox);
      if (!this.board) return;

      const curve = this.jsx.plot(this.board, this.expr);
      const start = this.target - 1.5;
      const g = this.jsx.glider(this.board, start, curve);
      if (g) {
        this.board.on('update', () => {
          try {
            const x = g.X();
            this.xVal.set(x);
            this.fxVal.set(g.Y());
          } catch { /* noop */ }
        });
        // Initialize readouts
        this.xVal.set(start);
      }
      // Marker at the target x on the x-axis
      this.jsx.point(this.board, this.target, 0, { name: '', fillColor: '#1a1a1a', strokeColor: '#1a1a1a', size: 1, fixed: true });
      this.board.update();
    }, 0);
  }
}
