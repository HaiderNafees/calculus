import { Component, Input, OnChanges, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JSXGraphService } from '../../services/jsxgraph.service';

let boardCounter = 0;

/**
 * Riemann sum visualization: area under a curve approximated by n rectangles.
 * Slider controls n; buttons choose left/right/midpoint rule.
 */
@Component({
  selector: 'app-riemann-sum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <div [id]="boardId" class="w-full rounded-[2px] border border-rule" style="height: 320px;" aria-label="Riemann sum rectangles under the curve"></div>

      <div class="mt-3 flex flex-wrap items-center gap-4">
        <label class="flex items-center gap-2 text-[13px] text-ink-soft flex-1 min-w-[220px]">
          Rectangles: <strong class="mono">{{ n() }}</strong>
          <input type="range" min="1" max="60" [value]="n()" (input)="onN($event)" class="flex-1 accent-[var(--accent)]" aria-label="Number of rectangles" />
        </label>

        <div class="flex gap-1.5" role="group" aria-label="Rule">
          @for (r of rules; track r) {
            <button type="button" class="chip" [class.chip-accent]="rule() === r" (click)="setRule(r)">{{ r }}</button>
          }
        </div>

        <div class="mono text-[12px] text-ink-soft">
          Σ ≈ <strong>{{ sum() | number:'1.3-4' }}</strong>
        </div>
      </div>
    </div>
  `,
})
export class RiemannSumComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) expr = '';
  @Input() a = 0;
  @Input() b = 4;
  @Input() boundingBox: number[] = [-1, 6, 6, -1];

  readonly rules = ['left', 'right', 'mid'] as const;
  readonly n = signal(8);
  readonly rule = signal<'left' | 'right' | 'mid'>('left');
  readonly sum = signal(0);

  readonly boardId = `rs-board-${++boardCounter}`;
  private board: any = null;
  private readonly jsx = inject(JSXGraphService);

  ngOnChanges() {
    this.render();
  }

  ngOnDestroy() {
    this.jsx.destroy(this.board);
    this.board = null;
  }

  onN(e: Event) {
    this.n.set(Number((e.target as HTMLInputElement).value));
    this.render();
  }

  setRule(r: 'left' | 'right' | 'mid') {
    this.rule.set(r);
    this.render();
  }

  private render(): void {
    if (!this.expr) return;
    this.jsx.destroy(this.board);
    setTimeout(() => {
      const el = document.getElementById(this.boardId);
      if (!el) return;
      this.board = this.jsx.createBoard(this.boardId, this.boundingBox);
      if (!this.board) return;

      this.jsx.plot(this.board, this.expr);
      this.jsx.riemann(this.board, this.expr, this.a, this.b, this.n(), this.rule());
      this.sum.set(this.approxSum());
    }, 0);
  }

  /** Numeric approximation independent of the visual rectangles. */
  private approxSum(): number {
    const f = this.makeFn();
    if (!f) return 0;
    const n = this.n();
    const dx = (this.b - this.a) / n;
    let s = 0;
    for (let i = 0; i < n; i++) {
      let x: number;
      if (this.rule() === 'left') x = this.a + i * dx;
      else if (this.rule() === 'right') x = this.a + (i + 1) * dx;
      else x = this.a + (i + 0.5) * dx;
      s += f(x) * dx;
    }
    return s;
  }

  private makeFn(): ((x: number) => number) | null {
    // Safe numeric evaluation of simple expressions via Function compile of a sanitized expr
    const expr = this.expr.replace(/\^/g, '**');
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('x', `"use strict"; const {sin,cos,tan,sqrt,abs,exp,log,pow} = Math; return (${expr});`);
      const f = (x: number) => fn(x);
      f(1); // probe
      return f;
    } catch {
      return null;
    }
  }
}
