import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurriculumService } from '../../services/curriculum.service';
import { ProgressService } from '../../services/progress.service';
import { SkillCardComponent } from '../../components/shared/skill-card.component';
import { MasteryBadgeComponent } from '../../components/shared/mastery-badge.component';
import { Category, LearningModule, MASTERY_LABELS, MasteryLevel } from '../../data/curriculum';

type Filter = 'all' | MasteryLevel;

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterLink, SkillCardComponent, MasteryBadgeComponent],
  template: `
    <div class="max-w-[1180px] mx-auto px-5 md:px-10 py-10 fade-in">
      <div class="mb-8">
        <div class="eyebrow mb-2">Skill Explorer</div>
        <h1 class="display text-[34px]">126 skills, 6 modules</h1>
      </div>

      <div class="grid gap-8 lg:grid-cols-[260px_1fr]">
        <!-- Category navigation -->
        <aside class="lg:sticky lg:top-20 self-start" aria-label="Categories">
          <div class="card p-4 max-h-[70vh] overflow-y-auto">
            <button class="w-full text-left px-2 py-1.5 text-[13px] font-semibold hover:text-accent"
                    (click)="selectModule(null)" [class.text-accent]="selectedModule() === null">
              All modules
            </button>
            @for (m of modules; track m.id) {
              <div class="mt-2">
                <button class="w-full text-left px-2 py-1.5 text-[13.5px] font-semibold rounded-[2px] hover:text-accent hover:bg-accent-soft"
                        (click)="selectModule(m)"
                        [class.text-accent]="selectedModule()?.id === m.id"
                        [class.bg-accent-soft]="selectedModule()?.id === m.id">
                  {{ m.title }}
                </button>
                @if (selectedModule()?.id === m.id) {
                  <div class="ml-3 border-l border-rule pl-2 mt-1">
                    @for (c of m.categories; track c.letter) {
                      <button class="w-full flex items-center gap-2 text-left px-2 py-1.5 text-[12.5px] rounded-[2px] hover:text-accent hover:bg-accent-soft"
                              (click)="selectCategory(c)"
                              [class.text-accent]="selectedCategory()?.letter === c.letter && selectedModule()?.id === m.id">
                        <span class="mono text-[10px] w-4 text-center border border-rule-strong rounded-[2px] leading-4">{{ c.letter }}</span>
                        <span class="truncate">{{ c.title }}</span>
                        <span class="caption ml-auto">{{ c.skills.length }}</span>
                      </button>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </aside>

        <!-- Skill grid -->
        <section>
          <!-- Controls -->
          <div class="flex flex-wrap items-center gap-3 mb-5">
            <label class="relative flex-1 min-w-[220px]">
              <span class="sr-only">Search skills</span>
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
              <input type="search" [value]="query()" (input)="onSearch($event)"
                     placeholder="Search skills…"
                     class="w-full pl-9 pr-3 py-2.5 min-h-[44px] text-[14px] bg-surface border border-rule-strong rounded-[2px] text-ink placeholder:text-muted focus:border-accent" />
            </label>

            <div class="flex gap-1.5 flex-wrap" role="group" aria-label="Filter by mastery level">
              <button class="chip" [class.chip-accent]="filter() === 'all'" (click)="setFilter(-1)">All</button>
              @for (lbl of filterLabels; track $index) {
                <button class="chip" [class.chip-accent]="filter() === $index" (click)="setFilter($index)">{{ lbl }}</button>
              }
            </div>
          </div>

          <div class="caption mb-4">{{ filtered().length }} skill{{ filtered().length === 1 ? '' : 's' }}</div>

          @if (filtered().length === 0) {
            <div class="card p-10 text-center">
              <p class="body mb-2">No skills match your search.</p>
              <button class="btn btn-outline" (click)="clearAll()">Clear filters</button>
            </div>
          } @else {
            <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              @for (item of filtered(); track item.skill.id) {
                <app-skill-card [skill]="item.skill" />
              }
            </div>
          }
        </section>
      </div>
    </div>
  `,
})
export class SkillsComponent implements OnInit, OnDestroy {
  readonly curriculum = inject(CurriculumService);
  private readonly progress = inject(ProgressService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly modules = this.curriculum.modules;
  readonly filterLabels = [MASTERY_LABELS[0], MASTERY_LABELS[1], MASTERY_LABELS[2], MASTERY_LABELS[3]];

  readonly query = signal('');
  readonly filter = signal<Filter>('all');
  readonly selectedModule = signal<LearningModule | null>(null);
  readonly selectedCategory = signal<Category | null>(null);

  /** -1 = All; 0..3 = mastery levels. */
  setFilter(f: number): void {
    this.filter.set(f < 0 ? 'all' : (f as MasteryLevel));
  }

  private readonly queryParams = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const f = this.filter();
    const mod = this.selectedModule();
    const cat = this.selectedCategory();

    return this.curriculum.search('').filter(({ skill, module, category }) => {
      if (mod && module.id !== mod.id) return false;
      if (cat && category.letter !== cat.letter) return false;
      if (f !== 'all' && this.progress.masteryOf(skill.id) !== f) return false;
      if (q && !(skill.name.toLowerCase().includes(q) || skill.id.toLowerCase().includes(q) || category.title.toLowerCase().includes(q))) return false;
      return true;
    });
  });

  ngOnInit() {
    const modId = Number(this.queryParams().get('module'));
    const catLetter = this.queryParams().get('category');
    if (modId) {
      const m = this.curriculum.getModule(modId) ?? null;
      this.selectedModule.set(m);
      if (m && catLetter) {
        this.selectedCategory.set(m.categories.find(c => c.letter === catLetter) ?? null);
      }
    }
  }

  onSearch(e: Event) {
    this.query.set((e.target as HTMLInputElement).value);
  }

  selectModule(m: LearningModule | null) {
    this.selectedModule.set(m);
    this.selectedCategory.set(null);
    this.syncQueryParams(m, null);
  }

  selectCategory(c: Category) {
    this.selectedCategory.set(c);
    this.syncQueryParams(this.selectedModule(), c);
  }

  clearAll() {
    this.query.set('');
    this.filter.set('all');
    this.selectModule(null);
  }

  private syncQueryParams(m: LearningModule | null, c: Category | null) {
    const params: Record<string, string> = {};
    if (m) params['module'] = String(m.id);
    if (c) params['category'] = c.letter;
    this.router.navigate([], { queryParams: params, replaceUrl: true });
  }

  // Keep template casts simple for strict templates
  ngOnDestroy() {}
}
