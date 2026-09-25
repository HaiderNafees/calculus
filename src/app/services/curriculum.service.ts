import { Injectable, computed, signal } from '@angular/core';
import {
  CURRICULUM,
  ALL_SKILLS,
  findSkill,
  nextSkill,
  prevSkill,
  MasteryLevel,
  Category,
  LearningModule,
  Skill,
} from '../data/curriculum';
import { ProgressService } from './progress.service';

@Injectable({ providedIn: 'root' })
export class CurriculumService {
  readonly modules = CURRICULUM;
  readonly allSkills = ALL_SKILLS;

  private readonly progress = injectProgress();

  /** Last skill the user practiced (persisted by ProgressService). */
  readonly lastSkillId = signal<string | null>(this.progress.getLastSkillId());

  readonly continueSkill = computed(() => {
    const id = this.lastSkillId();
    if (!id) return null;
    const found = findSkill(id);
    return found ? { ...found.skill, moduleName: found.module.title } : null;
  });

  getModule(id: number): LearningModule | undefined {
    return this.modules.find((m) => m.id === id);
  }

  getSkill(skillId: string) {
    return findSkill(skillId);
  }

  masteryOf(skillId: string): MasteryLevel {
    return this.progress.masteryOf(skillId);
  }

  next(skillId: string): Skill | null {
    return nextSkill(skillId);
  }

  prev(skillId: string): Skill | null {
    return prevSkill(skillId);
  }

  /** Flat, searchable list with module/category context. */
  search(query: string): Array<{ skill: Skill; module: LearningModule; category: Category }> {
    const q = query.trim().toLowerCase();
    const out: Array<{ skill: Skill; module: LearningModule; category: Category }> = [];
    for (const m of this.modules) {
      for (const c of m.categories) {
        for (const s of c.skills) {
          if (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) ||
              c.title.toLowerCase().includes(q)) {
            out.push({ skill: s, module: m, category: c });
          }
        }
      }
    }
    return out;
  }

  markAccessed(skillId: string): void {
    this.lastSkillId.set(skillId);
    this.progress.setLastSkillId(skillId);
  }
}

/** Avoid a circular constructor dependency; resolve lazily. */
import { inject } from '@angular/core';
function injectProgress(): ProgressService {
  return inject(ProgressService);
}
