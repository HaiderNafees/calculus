import { Component, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProblemGeneratorService } from '../../services/problem-generator.service';
import { ProgressService } from '../../services/progress.service';
import { MathJaxService } from '../../services/mathjax.service';
import { MathFormulaComponent } from '../../components/shared/math-formula.component';
import { MathInputComponent } from '../../components/shared/math-input.component';
import { FunctionGraphComponent } from '../../components/graphs/function-graph.component';
import { LimitVisualizerComponent } from '../../components/graphs/limit-visualizer.component';
import { RiemannSumComponent } from '../../components/graphs/riemann-sum.component';
import { MasteryBadgeComponent } from '../../components/shared/mastery-badge.component';
import { findSkill, MASTERY_LABELS, MasteryLevel } from '../../data/curriculum';
import { GeneratedProblem, answersEq } from '../../data/problem-engine';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MathFormulaComponent, MathInputComponent,
    FunctionGraphComponent, LimitVisualizerComponent, RiemannSumComponent,
    MasteryBadgeComponent,
  ],
  template: `
    <div class="max-w-[900px] mx-auto px-5 md:px-10 py-10 fade-in">
      <!-- Skill header -->
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div class="eyebrow mb-1">Practice · {{ skillName }}</div>
          <div class="flex items-center gap-3">
            <h1 class="mono text-[15px] text-ink">{{ skillId }}</h1>
            <app-mastery-badge [level]="mastery()" />
          </div>
        </div>
        <div class="flex gap-2">
          <a [routerLink]="['/lesson', skillId]" class="btn btn-outline !min-h-[38px] text-[13px]">Read the lesson</a>
          <a routerLink="/skills" class="btn btn-ghost !min-h-[38px] text-[13px]">All skills</a>
        </div>
      </div>

      <!-- Problem card -->
      <div class="card p-6 md:p-8" [class.feedback-correct]="feedback() === 'correct'"
           [class.feedback-incorrect]="feedback() === 'incorrect'">
        <div class="flex items-center justify-between mb-4">
          <span class="chip chip-accent">Question {{ questionNumber() }}</span>
          <div class="flex gap-2">
            <button class="btn btn-ghost !min-h-[34px] text-[13px]" (click)="skip()" aria-label="Skip to a new problem">Skip →</button>
          </div>
        </div>

        @if (problem(); as p) {
          @if (p.questionText) {
            <p class="body mb-3">{{ p.questionText }}</p>
          }
          <app-math-formula [latex]="p.questionLatex" />

          @if (p.graphExpr) {
            <div class="mt-5">
              @if (p.graphTarget !== undefined) {
                <app-limit-visualizer [expr]="p.graphExpr" [target]="p.graphTarget" />
              } @else {
                <app-function-graph [expr]="p.graphExpr" [point]="p.graphPoint ?? null" />
              }
            </div>
            <div class="caption mt-2">Interactive — drag, pan and zoom.</div>
          }
          @if (p.riemann) {
            <div class="mt-5">
              <app-riemann-sum [expr]="p.riemann.expr" [a]="p.riemann.a" [b]="p.riemann.b" />
            </div>
          }
        }

        <!-- Answer area -->
        <div class="mt-6 pt-5 border-t border-rule">
          <div class="eyebrow mb-3">Your answer</div>
          <app-math-input #answerInput (submit)="check()" />

          <div class="flex flex-wrap gap-2 mt-4">
            <button class="btn btn-primary flex-1 sm:flex-none" (click)="check()" [disabled]="feedback() === 'correct'">Check answer</button>
            <button class="btn btn-outline" (click)="revealHint()" [disabled]="hintIndex() >= currentHints().length">
              Hint ({{ currentHints().length - hintIndex() }} left)
            </button>
            <button class="btn btn-ghost" type="button" (click)="toggleSolution()" [attr.aria-pressed]="solutionVisible()">
              {{ solutionVisible() ? 'Hide solution' : 'Show step-by-step solution' }}
            </button>
          </div>

          @if (feedback(); as fb) {
            <div class="mt-4 p-4 border rounded-[2px] fade-slide-in"
                 [style.border-color]="fb === 'correct' ? 'var(--accent)' : 'var(--signal)'"
                 [style.background]="fb === 'correct' ? 'var(--accent-soft)' : 'var(--signal-soft)'">
              @if (fb === 'correct') {
                <div class="font-semibold" style="color:var(--accent-ink)">✓ Correct — nice work!</div>
                <div class="caption mt-1">Mastery is now “{{ masteryLabel() }}”.</div>
              } @else {
                <div class="font-semibold" style="color:var(--signal)">✗ Not quite — try again or get a hint.</div>
                @if (solutionVisible()) { <div class="caption mt-1">The full solution is shown below.</div> }
              }
            </div>
          }

          <!-- Hints -->
          @if (hintIndex() > 0) {
            <div class="mt-4 space-y-2">
              @for (h of shownHints(); track $index) {
                <div class="p-3 border-l-3 border-l-[var(--signal)] bg-signal-soft text-[14px] text-ink-soft fade-slide-in">
                  <span class="mono text-[10px] text-signal uppercase tracking-wider mr-2">Hint {{$index + 1}}</span>{{ h }}
                </div>
              }
            </div>
          }

          <!-- Step-by-step solution -->
          @if (solutionVisible()) {
            <div class="mt-5 border-t border-rule pt-4">
              <div class="eyebrow mb-3">Solution</div>
              @for (step of currentSolution(); track $index) {
                <div class="mb-4 fade-slide-in">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="mono text-[11px] font-semibold text-accent">{{ $index + 1 }}.</span>
                    <span class="font-semibold text-[14px] text-ink">{{ step.title }}</span>
                  </div>
                  @if (step.explanation) { <p class="body text-[13.5px] mb-1">{{ step.explanation }}</p> }
                  @if (step.latex) { <app-math-formula [latex]="step.latex" /> }
                </div>
              }
              <div class="p-3 bg-accent-soft text-[14px] fade-slide-in" style="border-left:3px solid var(--accent)">
                <span class="mono text-[10px] text-accent uppercase tracking-wider mr-2">Answer</span>
                <strong>{{ problem()?.correctAnswer }}</strong>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Next problem -->
      @if (feedback() === 'correct') {
        <div class="mt-5 flex justify-end">
          <button class="btn btn-primary" (click)="nextProblem()">Next problem →</button>
        </div>
      }
    </div>
  `,
})
export class PracticeComponent implements OnInit {
  readonly skillId: string;
  readonly skillName: string;

  @ViewChild('answerInput') answerInput?: MathInputComponent;

  private readonly generator = inject(ProblemGeneratorService);
  private readonly progress = inject(ProgressService);
  private readonly mathjax = inject(MathJaxService);
  private readonly route = inject(ActivatedRoute);

  readonly problem = signal<GeneratedProblem | null>(null);
  readonly feedback = signal<'correct' | 'incorrect' | null>(null);
  readonly hintIndex = signal(0);
  readonly solutionVisible = signal(false);
  readonly questionNumber = signal(1);
  readonly mastery = signal<MasteryLevel>(0);

  readonly currentHints = computed(() => this.problem()?.hints ?? []);
  readonly currentSolution = computed(() => this.problem()?.solutionSteps ?? []);
  readonly shownHints = computed(() => this.currentHints().slice(0, this.hintIndex()));
  readonly masteryLabel = computed(() => MASTERY_LABELS[this.mastery()]);

  constructor() {
    const found = findSkill(this.route.snapshot.paramMap.get('skillId') ?? '');
    this.skillId = found?.skill.id ?? 'A.1';
    this.skillName = found?.skill.name ?? 'Unknown skill';
  }

  ngOnInit() {
    this.progress.setLastSkillId(this.skillId);
    this.mastery.set(this.progress.masteryOf(this.skillId));
    this.loadProblem();
  }

  loadProblem() {
    const p = this.generator.generate(this.skillId);
    this.problem.set(p);
    this.feedback.set(null);
    this.hintIndex.set(0);
    this.solutionVisible.set(false);
    this.answerInput?.clear();
  }

  loadProblemAndScroll() {
    this.loadProblem();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextProblem() { this.loadProblemAndScroll(); }
  skip() { this.loadProblemAndScroll(); }

  check() {
    const p = this.problem();
    if (!p) return;
    const user = this.answerInput?.value() ?? '';
    if (!user.trim()) return;

    const accepted = [p.correctAnswer, ...(p.acceptedAnswers ?? [])];
    const correct = accepted.some((a) => answersEq(a, user));

    this.feedback.set(correct ? 'correct' : 'incorrect');
    const level = this.progress.recordAttempt(this.skillId, correct);
    this.mastery.set(level);
    if (correct) this.mathjax.typeset();
  }

  revealHint() {
    this.hintIndex.update((i) => Math.min(i + 1, this.currentHints().length));
  }

  toggleSolution() {
    this.solutionVisible.update((v) => !v);
  }
}
