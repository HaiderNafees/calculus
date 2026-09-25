import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <div class="max-w-[720px] mx-auto px-5 md:px-10 py-14 fade-in">
      <div class="eyebrow mb-3">About</div>
      <h1 class="display text-[36px] mb-6">Free calculus, for everyone.</h1>
      <p class="body mb-4">
        CalculusLearn is a free, open-source calculus learning platform covering 126 skills across
        six modules — from limits and continuity through applications of integration. No account
        required: your progress is stored locally in your browser.
      </p>
      <p class="body mb-8">
        Every skill offers three ways to learn: a concise <strong>lesson</strong> with worked examples,
        <strong>interactive visualizations</strong> powered by JSXGraph, and <strong>adaptive practice</strong>
        with instant feedback, hints, and step-by-step solutions.
      </p>

      <h2 class="heading text-[20px] mb-3">Tech stack</h2>
      <ul class="body mb-8 list-disc pl-6 space-y-1">
        <li>Angular 17+ (standalone components, signals)</li>
        <li>Tailwind CSS for styling</li>
        <li>MathJax 3 for formula rendering</li>
        <li>JSXGraph for interactive graphs</li>
        <li>ECharts for progress analytics</li>
        <li>LocalStorage for progress (no backend)</li>
      </ul>

      <h2 class="heading text-[20px] mb-3">Credits</h2>
      <p class="body mb-2">
        Curriculum structure modeled on the IXL Calculus skills list. Video resources link to
        Khan Academy and other free educational YouTube channels.
      </p>
      <p class="body">
        Released under the MIT License — see the
        <a class="text-accent underline" href="https://github.com" target="_blank" rel="noopener">repository</a>
        for source and license.
      </p>
    </div>
  `,
})
export class AboutComponent {}
