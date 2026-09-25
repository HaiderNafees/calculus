import { Component, ElementRef, Input, OnChanges, ViewChild, inject } from '@angular/core';
import { MathJaxService } from '../../services/mathjax.service';

/**
 * Renders a LaTeX string via MathJax. Display mode by default;
 * set inline=true for inline rendering.
 */
@Component({
  selector: 'app-math-formula',
  standalone: true,
  template: `<span #host [class]="inline ? '' : 'block text-center my-2'"></span>`,
})
export class MathFormulaComponent implements OnChanges {
  @Input({ required: true }) latex = '';
  @Input() inline = false;

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;

  private readonly mathjax = inject(MathJaxService);
  private lastRendered = '';

  ngOnChanges() {
    this.render();
  }

  private async render(): Promise<void> {
    const el = this.host.nativeElement;
    if (this.latex === this.lastRendered) return;
    this.lastRendered = this.latex;

    const trimmed = this.latex.trim();
    const wrapped = this.inline ? `\\(${trimmed}\\)` : `$$${trimmed}$$`;
    el.innerHTML = '';
    el.textContent = wrapped; // MathJax picks up text nodes

    await this.mathjax.typeset(el);
  }
}
