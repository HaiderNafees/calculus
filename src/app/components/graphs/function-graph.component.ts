import { Component, Input, OnChanges, OnDestroy, inject } from '@angular/core';
import { JSXGraphService } from '../../services/jsxgraph.service';

let boardCounter = 0;

/**
 * Plots a function expression (JSXGraph syntax, e.g. "x^2 - 1").
 * Optional static point marker and optional tangent line at x0.
 */
@Component({
  selector: 'app-function-graph',
  standalone: true,
  template: `<div [id]="boardId" class="w-full rounded-[2px] border border-rule" style="height: 320px;" [attr.aria-label]="ariaLabel"></div>`,
})
export class FunctionGraphComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) expr = '';
  @Input() point: { x: number; y: number } | null = null;
  @Input() tangentAt: number | null = null;
  @Input() boundingBox: number[] = [-6, 5, 6, -5];
  @Input() ariaLabel = 'Interactive function graph. Pan and zoom enabled.';

  readonly boardId = `fg-board-${++boardCounter}`;
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
    // Defer until the element is attached to the DOM
    setTimeout(() => {
      const el = document.getElementById(this.boardId);
      if (!el) return;
      this.board = this.jsx.createBoard(this.boardId, this.boundingBox);
      if (!this.board) return;
      this.jsx.plot(this.board, this.expr);
      if (this.point) {
        this.jsx.point(this.board, this.point.x, this.point.y, { name: '' });
      }
      if (this.tangentAt !== null) {
        const curve = this.jsx.plot(this.board, this.expr, '#0f4c3a');
        const g = this.jsx.glider(this.board, this.tangentAt, curve);
        if (g) {
          g.moveTo([this.tangentAt, 0]);
          this.jsx.tangent(this.board, g);
        }
      }
    }, 0);
  }
}
