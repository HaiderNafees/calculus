import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MasteryBadgeComponent } from './mastery-badge.component';
import { ProgressService } from '../../services/progress.service';
import { MasteryLevel, Skill } from '../../data/curriculum';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [RouterLink, MasteryBadgeComponent],
  template: `
    <div class="card p-4 flex flex-col gap-3 hover:border-accent transition-colors fade-slide-in">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <div class="mono text-[10px] text-muted mb-1">{{ skill.id }}</div>
          <h3 class="text-[14.5px] font-semibold text-ink leading-snug">{{ skill.name }}</h3>
        </div>
        <app-mastery-badge [level]="mastery()" />
      </div>

      <div>
        <div class="h-1.5 bg-rule rounded-full overflow-hidden">
          <div class="h-full bg-accent rounded-full" [style.width.%]="progressPct()"></div>
        </div>
        <div class="caption mt-1.5">{{ progressLabel() }}</div>
      </div>

      <div class="flex gap-2 mt-auto pt-1">
        <a [routerLink]="['/lesson', skill.id]" class="btn btn-outline !min-h-[36px] flex-1 text-[13px]">Lesson</a>
        <a [routerLink]="['/practice', skill.id]" class="btn btn-primary !min-h-[36px] flex-1 text-[13px]">Practice</a>
      </div>
    </div>
  `,
})
export class SkillCardComponent implements OnInit {
  @Input({ required: true }) skill!: Skill;

  private readonly progress = inject(ProgressService);
  readonly mastery = signal<MasteryLevel>(0);
  readonly progressPct = computed(() => (this.mastery() / 3) * 100);

  ngOnInit() {
    this.mastery.set(this.progress.masteryOf(this.skill.id));
  }

  progressLabel(): string {
    const p = this.progress.getSkillProgress(this.skill.id);
    if (p.attempts === 0) return 'Not started';
    return `${p.correct}/${p.attempts} correct · best streak ${p.bestStreak}`;
  }
}
