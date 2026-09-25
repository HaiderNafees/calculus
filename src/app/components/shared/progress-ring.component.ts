import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-progress-ring',
  standalone: true,
  template: `
    <div class="relative inline-flex items-center justify-center" role="img" [attr.aria-label]="label()">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--rule)" stroke-width="10" />
        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" stroke-width="10"
                stroke-linecap="butt"
                [attr.stroke-dasharray]="circumference"
                [attr.stroke-dashoffset]="offset"
                transform="rotate(-90 60 60)"
                style="transition: stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1);" />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="display text-[22px] text-ink">{{ pct }}%</span>
        <span class="caption">{{ subtitle }}</span>
      </div>
    </div>
  `,
})
export class ProgressRingComponent implements OnChanges {
  @Input({ required: true }) percent = 0;
  @Input() subtitle = 'complete';
  @Input() size = 120;

  circumference = 2 * Math.PI * 52;
  offset = this.circumference;
  pct = 0;

  ngOnChanges() {
    const p = Math.max(0, Math.min(100, this.percent));
    this.pct = Math.round(p);
    this.offset = this.circumference * (1 - p / 100);
  }

  label() {
    return `${this.pct}% ${this.subtitle}`;
  }
}
