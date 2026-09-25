import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '../../services/curriculum.service';
import { ProgressService } from '../../services/progress.service';
import { ProgressRingComponent } from '../../components/shared/progress-ring.component';
import { MasteryBadgeComponent } from '../../components/shared/mastery-badge.component';
import { LearningModule, MasteryLevel, MASTERY_LABELS } from '../../data/curriculum';

declare const echarts: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, ProgressRingComponent, MasteryBadgeComponent],
  template: `
    <div class="max-w-[1180px] mx-auto px-5 md:px-10 py-10 fade-in">
      <!-- Page header -->
      <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div class="eyebrow mb-2">Dashboard</div>
          <h1 class="display text-[34px]">Welcome back</h1>
        </div>
        <a routerLink="/skills" class="btn btn-outline">Browse all skills →</a>
      </div>

      <!-- Top row: ring + continue + streak -->
      <div class="grid gap-4 md:grid-cols-3 mb-8">
        <!-- Overall progress -->
        <div class="card p-6 flex items-center gap-6">
          <app-progress-ring [percent]="overallPct()" subtitle="complete" />
          <div>
            <div class="eyebrow mb-2">Overall</div>
            <div class="text-[15px] font-semibold text-ink">{{ masteredCount() }} of {{ totalSkills }} skills mastered</div>
            <div class="caption mt-1">{{ todayStats().total > 0 ? todayStats().correct + '/' + todayStats().total + ' correct today' : 'No practice yet today' }}</div>
          </div>
        </div>

        <!-- Continue learning -->
        <div class="card p-6 flex flex-col">
          <div class="eyebrow mb-2">Continue learning</div>
          @if (continueSkill(); as cs) {
            <div class="mono text-[10px] text-muted mb-1">{{ cs.id }}</div>
            <h3 class="heading text-[17px] mb-2">{{ cs.name }}</h3>
            <div class="caption mb-4">{{ cs.moduleName }}</div>
            <div class="mt-auto flex gap-2">
              <a [routerLink]="['/practice', cs.id]" class="btn btn-primary !min-h-[38px] text-[13px]">Practice</a>
              <a [routerLink]="['/lesson', cs.id]" class="btn btn-outline !min-h-[38px] text-[13px]">Lesson</a>
            </div>
          } @else {
            <p class="body text-[14px] mb-4">Start your journey — pick a skill and dive in.</p>
            <a routerLink="/skills" class="btn btn-primary !min-h-[38px] mt-auto text-[13px]">Find a skill</a>
          }
        </div>

        <!-- Streak -->
        <div class="card p-6 flex flex-col justify-between">
          <div class="eyebrow mb-2">Streak</div>
          <div class="flex items-end gap-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--signal)" aria-hidden="true"><path d="M13.5 0.7s.7 2.6-.9 5.2c-1.4 2.3-3.6 3.3-3.6 6.1 0 1.6.7 2.7.7 2.7s-2.2-1-2.2-3.7c-2.3 1.9-3.7 4.6-3.7 7.4 0 4.6 3.7 7.9 8.2 7.9s8.2-3.3 8.2-7.9c0-5.9-4.7-7.4-6.7-17.7z"/></svg>
            <span class="display text-[38px] leading-none">{{ streak() }}</span>
            <span class="body text-[14px] mb-1">day{{ streak() === 1 ? '' : 's' }}</span>
          </div>
          <div class="caption mt-3">Consistent daily practice builds lasting habits.</div>
        </div>
      </div>

      <!-- Mastery chart + modules -->
      <div class="grid gap-4 lg:grid-cols-3 mb-8">
        <div class="card p-6 lg:col-span-1">
          <div class="eyebrow mb-4">Mastery distribution</div>
          <div id="mastery-chart" class="w-full" style="height: 240px;" aria-label="Skills per mastery level chart" role="img"></div>
        </div>

        <div class="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          @for (m of modules; track m.id) {
            <a [routerLink]="['/skills']" [queryParams]="{ module: m.id }" class="card p-5 hover:border-accent transition-colors block">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <div class="mono text-[10px] text-muted mb-1">MODULE {{ m.roman }}</div>
                  <h3 class="heading text-[16px]">{{ m.title }}</h3>
                </div>
                <span class="chip">{{ moduleSkillCount(m) }} skills</span>
              </div>
              <div class="h-1.5 bg-rule rounded-full overflow-hidden mb-2">
                <div class="h-full bg-accent rounded-full transition-all" [style.width.%]="modulePct(m)"></div>
              </div>
              <div class="caption">{{ moduleMastered(m) }}/{{ moduleSkillCount(m) }} mastered</div>
            </a>
          }
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit, OnDestroy {
  readonly curriculum = inject(CurriculumService);
  readonly progress = inject(ProgressService);

  readonly modules = this.curriculum.modules;
  readonly totalSkills = this.curriculum.allSkills.length;

  readonly masteredCount = this.progress.masteredCount;
  readonly streak = this.progress.streak;
  readonly todayStats = this.progress.todayStats;
  readonly continueSkill = this.curriculum.continueSkill;

  readonly overallPct = computed(() => Math.round((this.masteredCount() / this.totalSkills) * 100));

  private chart: any = null;

  moduleSkillCount(m: LearningModule): number {
    return m.categories.reduce((n, c) => n + c.skills.length, 0);
  }

  moduleMastered(m: LearningModule): number {
    return m.categories.reduce((n, c) => n + c.skills.filter(s => this.progress.masteryOf(s.id) === 3).length, 0);
  }

  modulePct(m: LearningModule): number {
    const total = this.moduleSkillCount(m);
    return total === 0 ? 0 : Math.round((this.moduleMastered(m) / total) * 100);
  }

  ngOnInit() {
    this.renderChart();
    // Re-render if progress changes while dashboard is open
    // (simple polling is avoided; chart refreshes on navigation)
  }

  ngOnDestroy() {
    this.chart?.dispose();
    this.chart = null;
  }

  private renderChart(): void {
    const el = document.getElementById('mastery-chart');
    if (!el || typeof echarts === 'undefined') return;

    const counts = this.progress.levelCounts();
    const labels = [MASTERY_LABELS[0], MASTERY_LABELS[1], MASTERY_LABELS[2], MASTERY_LABELS[3]];

    this.chart = echarts.init(el);
    this.chart.setOption({
      grid: { left: 40, right: 16, top: 20, bottom: 30 },
      xAxis: { type: 'category', data: labels, axisLine: { lineStyle: { color: '#c9c4b8' } }, axisLabel: { color: '#8a8a8a', fontSize: 11 } },
      yAxis: { type: 'value', minInterval: 1, axisLabel: { color: '#8a8a8a', fontSize: 11 }, splitLine: { lineStyle: { color: '#e5e1d8' } } },
      tooltip: { trigger: 'axis' },
      series: [{
        type: 'bar',
        data: [
          { value: counts[0], itemStyle: { color: '#c9c4b8' } },
          { value: counts[1], itemStyle: { color: '#b85c2a' } },
          { value: counts[2], itemStyle: { color: '#4a8a6f' } },
          { value: counts[3], itemStyle: { color: '#0f4c3a' } },
        ],
        barWidth: '52%',
      }],
    });
  }
}
