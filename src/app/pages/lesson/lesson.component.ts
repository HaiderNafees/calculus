import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LessonService, Lesson } from '../../data/lessons';
import { TrustedUrlPipe } from '../../pipes/trusted-url.pipe';
import { MathFormulaComponent } from '../../components/shared/math-formula.component';
import { MasteryBadgeComponent } from '../../components/shared/mastery-badge.component';
import { findSkill, nextSkill, prevSkill, MasteryLevel } from '../../data/curriculum';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule, RouterLink, MathFormulaComponent, MasteryBadgeComponent, TrustedUrlPipe],
  template: `
    <div class="max-w-[760px] mx-auto px-5 md:px-10 py-10 fade-in">
      @if (lesson(); as l) {
        <nav class="caption mb-6" aria-label="Breadcrumb">
          <a routerLink="/skills" class="hover:text-accent">Skills</a>
          <span class="mx-1.5">/</span>
          <span>{{ categoryTitle }}</span>
          <span class="mx-1.5">/</span>
          <span class="text-ink">{{ l.skillId }}</span>
        </nav>

        <div class="eyebrow mb-2">Lesson</div>
        <div class="flex items-center justify-between gap-4 mb-6">
          <h1 class="display text-[32px]">{{ l.title }}</h1>
          <app-mastery-badge [level]="mastery()" />
        </div>

        <p class="body text-[16px] mb-8">{{ l.introduction }}</p>

        <!-- Key concepts -->
        <section class="mb-10">
          <h2 class="heading text-[20px] mb-4">Key concepts</h2>
          @for (c of l.keyConcepts; track c.title) {
            <div class="card p-5 mb-3">
              <h3 class="font-semibold text-[15px] text-ink mb-2">{{ c.title }}</h3>
              @if (c.latex) { <app-math-formula [latex]="c.latex" /> }
              <p class="body text-[14px] mt-2">{{ c.explanation }}</p>
            </div>
          }
        </section>

        <!-- Worked examples -->
        <section class="mb-10">
          <h2 class="heading text-[20px] mb-4">Worked examples</h2>
          @for (ex of l.workedExamples; track ex.problem) {
            <div class="border-l-3 p-5 mb-4 card" style="border-left:3px solid var(--accent)">
              <div class="mono text-[10px] text-accent uppercase tracking-wider mb-2">Example</div>
              <app-math-formula [latex]="ex.problem" />
              <ol class="mt-3 space-y-2">
                @for (s of ex.steps; track $index) {
                  <li class="body text-[14px] flex gap-2">
                    <span class="mono text-[11px] text-muted mt-0.5">{{$index + 1}}.</span>
                    <span>
                      {{ s.explanation }}
                      @if (s.latex) { <app-math-formula [latex]="s.latex" [inline]="true" /> }
                    </span>
                  </li>
                }
              </ol>
              <div class="mt-3 p-3 bg-accent-soft text-[14px]" style="border-left:3px solid var(--accent)">
                <span class="mono text-[10px] text-accent uppercase tracking-wider mr-2">Answer</span>
                <strong>{{ ex.finalAnswer }}</strong>
              </div>
            </div>
          }
        </section>

        <!-- Common mistakes -->
        <section class="mb-10">
          <h2 class="heading text-[20px] mb-4">Common mistakes</h2>
          <ul class="space-y-2">
            @for (m of l.commonMistakes; track m) {
              <li class="body text-[14px] flex gap-2">
                <span class="text-signal mt-0.5">✗</span>
                <span>{{ m }}</span>
              </li>
            }
          </ul>
        </section>

        <!-- Videos -->
        @if (l.videoResources.length) {
          <section class="mb-10">
            <h2 class="heading text-[20px] mb-4">Videos</h2>
            <div class="grid sm:grid-cols-2 gap-4">
              @for (v of l.videoResources; track v.url) {
                <div class="card overflow-hidden">
                  <div class="aspect-video">
                    <iframe [src]="v.url | trustedUrl" class="w-full h-full" loading="lazy"
                            [attr.title]="v.title" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                  </div>
                  <div class="p-3">
                    <div class="text-[13.5px] font-semibold text-ink">{{ v.title }}</div>
                    <div class="caption">{{ v.source }}</div>
                  </div>
                </div>
              }
            </div>
          </section>
        }

        <!-- CTA -->
        <div class="card p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="font-semibold text-ink">Ready to practice?</div>
            <div class="caption">Adaptive problems with hints and full solutions.</div>
          </div>
          <a [routerLink]="['/practice', l.skillId]" class="btn btn-primary">Start practicing →</a>
        </div>

        <!-- Prev / Next -->
        <div class="flex justify-between gap-4 mt-8 pt-6 border-t border-rule">
          @if (prev; as p) {
            <a [routerLink]="['/lesson', p.id]" class="btn btn-outline">← {{ p.name }}</a>
          } @else { <span></span> }
          @if (next; as n) {
            <a [routerLink]="['/lesson', n.id]" class="btn btn-outline ml-auto">{{ n.name }} →</a>
          }
        </div>
      } @else {
        <div class="text-center py-20">
          <div class="eyebrow mb-3">No lesson yet</div>
          <h1 class="display text-[28px] mb-4">Lesson coming soon</h1>
          <p class="body mb-6">We haven't written this lesson yet — but you can still practice the skill.</p>
          <div class="flex gap-3 justify-center">
            <a [routerLink]="['/practice', skillId]" class="btn btn-primary">Practice {{ skillId }}</a>
            <a routerLink="/skills" class="btn btn-outline">Browse skills</a>
          </div>
        </div>
      }
    </div>
  `,
})
export class LessonComponent implements OnInit {
  readonly skillId: string;
  readonly categoryTitle: string = '';

  readonly lesson = signal<Lesson | null>(null);
  readonly mastery = signal<MasteryLevel>(0);

  next: { id: string; name: string } | null = null;
  prev: { id: string; name: string } | null = null;

  private readonly route = inject(ActivatedRoute);
  private readonly lessons = inject(LessonService);
  private readonly progress = inject(ProgressService);

  constructor() {
    const id = this.route.snapshot.paramMap.get('skillId') ?? '';
    this.skillId = id;
    const found = findSkill(id);
    this.categoryTitle = found?.category.title ?? '';
  }

  ngOnInit() {
    this.lesson.set(this.lessons.getLesson(this.skillId));
    this.mastery.set(this.progress.masteryOf(this.skillId));
    this.prev = prevSkill(this.skillId);
    this.next = nextSkill(this.skillId);
  }
}
