import { Component, ElementRef, EventEmitter, Output, ViewChild, inject, signal } from '@angular/core';
import { MathJaxService } from '../../services/mathjax.service';

const SYMBOLS: Array<{ label: string; insert: string; latex: string }> = [
  { label: 'x²', insert: '^2', latex: 'x^2' },
  { label: 'x³', insert: '^3', latex: 'x^3' },
  { label: '√', insert: '\\sqrt{}', latex: '\\sqrt{x}' },
  { label: '∫', insert: '\\int ', latex: '\\int' },
  { label: 'dx', insert: ' dx', latex: 'dx' },
  { label: 'lim', insert: '\\lim_{x \\to }', latex: '\\lim_{x \\to a}' },
  { label: '→', insert: '\\to ', latex: '\\to' },
  { label: '∞', insert: '\\infty', latex: '\\infty' },
  { label: 'π', insert: '\\pi', latex: '\\pi' },
  { label: 'e', insert: 'e^{}', latex: 'e^x' },
  { label: 'ln', insert: '\\ln ', latex: '\\ln x' },
  { label: '≤', insert: ' \\le ', latex: '\\le' },
];

@Component({
  selector: 'app-math-input',
  standalone: true,
  template: `
    <div class="flex flex-col gap-2">
      <div class="flex flex-wrap gap-1.5" role="group" aria-label="Insert math symbols">
        @for (s of symbols; track s.label) {
          <button type="button" class="chip hover:border-accent" (click)="insert(s.insert)" [attr.aria-label]="'Insert ' + s.label">{{ s.label }}</button>
        }
      </div>

      <label class="sr-only" for="math-answer">Your answer</label>
      <input id="math-answer" type="text" [value]="value()"
             (input)="onInput($event)" (keyup.enter)="submit.emit()"
             placeholder="Type your answer…"
             class="w-full px-3 py-3 min-h-[44px] text-[15px] mono bg-surface border border-rule-strong rounded-[2px] text-ink placeholder:text-muted focus:border-accent" />

      @if (preview() !== '') {
        <div class="text-[13px] text-muted flex items-start gap-2">
          <span class="mono text-[10px] uppercase tracking-wider mt-1">Preview:</span>
          <span #previewEl class="text-ink"></span>
        </div>
      }
    </div>
  `,
})
export class MathInputComponent {
  @ViewChild('previewEl') previewEl?: ElementRef<HTMLElement>;

  readonly value = signal('');
  readonly preview = signal('');
  readonly symbols = SYMBOLS;

  private debounce: ReturnType<typeof setTimeout> | null = null;
  private readonly mathjax = inject(MathJaxService);

  onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.value.set(v);
    this.preview.set(v.trim() !== '' ? 'show' : '');

    if (this.debounce) clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      const el = this.previewEl?.nativeElement;
      if (!el) return;
      el.textContent = '$' + v + '$';
      this.mathjax.typeset(el);
    }, 350);
  }

  insert(text: string) {
    this.value.update((v) => v + text);
    // Re-trigger preview
    const el = this.previewEl?.nativeElement;
    if (el) {
      el.textContent = '$' + this.value() + '$';
      this.mathjax.typeset(el);
    }
  }

  clear() {
    this.value.set('');
    this.preview.set('');
  }

  @Output() submit = new EventEmitter<void>();
}
