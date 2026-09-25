import { Injectable } from '@angular/core';

declare const JXG: any;

@Injectable({ providedIn: 'root' })
export class JSXGraphService {
  static isAvailable(): boolean {
    return typeof JXG !== 'undefined';
  }

  /** Create a board bound to an element id; returns null if JXG is unavailable. */
  createBoard(id: string, boundingBox: number[] = [-6, 5, 6, -5]): any | null {
    if (typeof JXG === 'undefined') return null;
    try {
      return JXG.JSXGraph.initBoard(id, {
        axis: true,
        boundingBox,
        showCopyright: false,
        showNavigation: true,
        pan: { enabled: true },
        zoom: { enabled: true },
      });
    } catch {
      return null;
    }
  }

  /** Plot a function curve on a board from a string expression like "x^2-1". */
  plot(board: any, expr: string, color = '#0f4c3a'): any | null {
    if (!board || typeof JXG === 'undefined') return null;
    try {
      return board.create('functiongraph', [expr], { strokeWidth: 2, strokeColor: color });
    } catch {
      return null;
    }
  }

  /** Add a draggable/static point. */
  point(board: any, x: number, y: number, attrs: Record<string, unknown> = {}): any | null {
    if (!board || typeof JXG === 'undefined') return null;
    try {
      return board.create('point', [x, y], {
        size: 2,
        strokeColor: '#b85c2a',
        fillColor: '#b85c2a',
        showInfobox: false,
        ...attrs,
      });
    } catch {
      return null;
    }
  }

  /** Attach a glider to a curve (draggable along it). */
  glider(board: any, x: number, curve: any): any | null {
    if (!board || typeof JXG === 'undefined') return null;
    try {
      return board.create('glider', [x, 0, curve], { size: 2, strokeColor: '#b85c2a', fillColor: '#b85c2a' });
    } catch {
      return null;
    }
  }

  /** Tangent line to a curve at a glider point. */
  tangent(board: any, gliderPoint: any): any | null {
    if (!board || typeof JXG === 'undefined') return null;
    try {
      return board.create('tangent', [gliderPoint], { strokeColor: '#b85c2a', strokeWidth: 1.5, dash: 2 });
    } catch {
      return null;
    }
  }

  /** Vertical dashed segment from x-axis up to a point (limit approaching visual). */
  verticalGuide(board: any, x: number, y: number): any | null {
    if (!board || typeof JXG === 'undefined') return null;
    try {
      return board.create('line', [[x, 0], [x, y]], {
        straightFirst: false, straightLast: false,
        strokeColor: '#8a8a8a', strokeWidth: 1, dash: 2, highlight: false,
      });
    } catch {
      return null;
    }
  }

  /** Riemann sum rectangles for a function on [a, b] with n bars, given rule. */
  riemann(board: any, expr: string, a: number, b: number, n: number, type: 'left' | 'right' | 'mid' | 'trapezoid' = 'left'): any | null {
    if (!board || typeof JXG === 'undefined') return null;
    try {
      return board.create('riemannsum', [expr, n, type, a, b], {
        fillOpacity: 0.35, fillColor: '#0f4c3a', strokeColor: '#0f4c3a', strokeWidth: 0.5,
      });
    } catch {
      return null;
    }
  }

  /** Destroy a board and free its DOM. */
  destroy(board: any): void {
    try {
      if (board && typeof JXG !== 'undefined') JXG.JSXGraph.freeBoard(board);
    } catch { /* noop */ }
  }
}
