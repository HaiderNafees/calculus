import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { MasteryLevel } from '../data/curriculum';
import { DbService } from './db.service';
import { AuthService } from './auth.service';

export interface SkillProgress {
  level: MasteryLevel;
  correct: number;
  attempts: number;
  bestStreak: number;
  lastAttempt: number; // epoch ms
}

export interface ProgressState {
  skills: Record<string, SkillProgress>;
  lastSkillId: string | null;
  streak: { current: number; longest: number; lastActiveDay: string };
  today: { day: string; correct: number; total: number };
  history: Record<string, { correct: number; total: number }>; // per-day counts
}

const ANON_KEY = 'cl-progress-anon-v1';

const EMPTY_SKILL: SkillProgress = { level: 0, correct: 0, attempts: 0, bestStreak: 0, lastAttempt: 0 };

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function emptyState(): ProgressState {
  return {
    skills: {},
    lastSkillId: null,
    streak: { current: 0, longest: 0, lastActiveDay: '' },
    today: { day: todayKey(), correct: 0, total: 0 },
    history: {},
  };
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly db = inject(DbService);
  private readonly auth = inject(AuthService);

  private readonly storageKey = signal<string>(this.keyForUser());
  private readonly state = signal<ProgressState>(this.load());

  /** When the signed-in user changes, swap to their saved progress. */
  private readonly swapEffect = effect(() => {
    const key = this.keyForUser();
    if (key !== this.storageKey()) {
      this.storageKey.set(key);
      this.state.set(this.load());
    }
  });

  // ---- Read API ----
  readonly totalCorrect = computed(() =>
    Object.values(this.state().skills).reduce((sum, s) => sum + s.correct, 0)
  );
  readonly totalAttempts = computed(() =>
    Object.values(this.state().skills).reduce((sum, s) => sum + s.attempts, 0)
  );
  readonly masteredCount = computed(() => this.countLevel(3));
  readonly practicedCount = computed(() => this.countLevel(2));
  readonly learningCount = computed(() => this.countLevel(1));
  readonly streak = computed(() => this.state().streak.current);
  readonly todayStats = computed(() => {
    const t = this.state().today;
    return t.day === todayKey() ? { correct: t.correct, total: t.total } : { correct: 0, total: 0 };
  });

  /** Skills per mastery level for charts. */
  readonly levelCounts = computed(() => [
    this.countLevel(0), this.countLevel(1), this.countLevel(2), this.countLevel(3),
  ] as const);

  getSkillProgress(skillId: string): SkillProgress {
    return this.state().skills[skillId] ?? { ...EMPTY_SKILL };
  }

  masteryOf(skillId: string): MasteryLevel {
    return this.getSkillProgress(skillId).level;
  }

  getLastSkillId(): string | null {
    return this.state().lastSkillId;
  }

  setLastSkillId(id: string): void {
    this.update({ lastSkillId: id });
  }

  // ---- Write API: called after each practice attempt ----
  recordAttempt(skillId: string, correct: boolean): MasteryLevel {
    const s = this.getSkillProgress(skillId);
    const streakNow = correct ? s.correct + 1 : 0;
    let level: MasteryLevel = s.level;

    if (correct) {
      const total = s.correct + 1;
      level = total >= 5 && streakNow >= 3 ? 3 : total >= 3 ? 2 : total >= 1 ? 1 : 0;
    } else {
      // Wrong answers decrease level slightly (never below 0)
      level = s.level > 0 ? ((s.level - 1) as MasteryLevel) : 0;
    }

    const day = todayKey();
    const prevDayState = this.state().today.day === day ? this.state().today : { day, correct: 0, total: 0 };
    const history = { ...this.state().history };
    const h = history[day] ?? { correct: 0, total: 0 };
    history[day] = { correct: h.correct + (correct ? 1 : 0), total: h.total + 1 };

    this.update({
      skills: {
        ...this.state().skills,
        [skillId]: {
          level,
          correct: s.correct + (correct ? 1 : 0),
          attempts: s.attempts + 1,
          bestStreak: Math.max(s.bestStreak, streakNow),
          lastAttempt: Date.now(),
        },
      },
      today: { day, correct: prevDayState.correct + (correct ? 1 : 0), total: prevDayState.total + 1 },
      history,
      streak: this.bumpStreak(day),
    });

    return level;
  }

  resetMyProgress(): void {
    this.state.set(emptyState());
    this.save();
  }

  // ---- Internals ----
  private keyForUser(): string {
    const u = this.auth.user();
    return u ? `user:${u.id}` : 'anon';
  }

  private countLevel(level: MasteryLevel): number {
    return Object.values(this.state().skills).filter((s) => s.level === level).length;
  }

  private bumpStreak(day: string): ProgressState['streak'] {
    const st = { ...this.state().streak };
    if (st.lastActiveDay === day) return st;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    st.current = st.lastActiveDay === yesterday ? st.current + 1 : 1;
    st.longest = Math.max(st.longest, st.current);
    st.lastActiveDay = day;
    return st;
  }

  private update(patch: Partial<ProgressState>): void {
    this.state.set({ ...this.state(), ...patch });
    this.save();
  }

  private load(): ProgressState {
    const key = this.storageKey();
    if (key !== 'anon') {
      const userId = key.slice(5);
      return this.db.getProgress(userId) ?? emptyState();
    }
    try {
      const raw = localStorage.getItem(ANON_KEY);
      if (raw) return { ...emptyState(), ...JSON.parse(raw) };
    } catch { /* ignore */ }
    return emptyState();
  }

  private save(): void {
    const key = this.storageKey();
    if (key !== 'anon') {
      this.db.setProgress(key.slice(5), this.state());
      return;
    }
    try {
      localStorage.setItem(ANON_KEY, JSON.stringify(this.state()));
    } catch { /* storage full */ }
  }
}
