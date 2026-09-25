import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="border-t border-rule mt-10">
      <div class="max-w-[1180px] mx-auto px-5 md:px-10 py-6 flex flex-wrap items-center justify-between gap-3">
        <p class="caption">CalculusLearn — a free, open-source calculus learning platform. MIT licensed.</p>
        <p class="caption mono">Angular · Tailwind · MathJax · JSXGraph · ECharts</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
