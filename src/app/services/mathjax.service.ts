import { Injectable, signal } from '@angular/core';

declare global {
  interface Window {
    MathJax?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class MathJaxService {
  readonly ready = signal(false);

  constructor() {
    this.waitForMathJax();
  }

  private waitForMathJax(): void {
    if (typeof window === 'undefined') return;
    if (window.MathJax?.typesetPromise) {
      this.ready.set(true);
      return;
    }
    // Poll until the async CDN script has loaded
    const timer = setInterval(() => {
      if (window.MathJax?.typesetPromise) {
        clearInterval(timer);
        this.ready.set(true);
      }
    }, 120);
    // Give up after 15s to avoid an infinite loop offline
    setTimeout(() => clearInterval(timer), 15000);
  }

  /** Typeset math inside a specific element (or the whole document). */
  async typeset(el?: HTMLElement): Promise<void> {
    if (!this.ready()) {
      // Wait for readiness (max ~15s) then try once
      await new Promise<void>((resolve) => {
        const timer = setInterval(() => {
          if (this.ready()) { clearInterval(timer); resolve(); }
        }, 120);
        setTimeout(() => { clearInterval(timer); resolve(); }, 15000);
      });
    }
    if (window.MathJax?.typesetPromise) {
      try {
        await window.MathJax.typesetPromise(el ? [el] : undefined);
      } catch { /* rendering errors are non-fatal */ }
    }
  }

  /** Clear the cached MathJax state for an element before re-typesetting. */
  clear(el?: HTMLElement): void {
    if (window.MathJax?.typesetClear) {
      try { window.MathJax.typesetClear(el ? [el] : undefined); } catch { /* noop */ }
    }
  }
}
