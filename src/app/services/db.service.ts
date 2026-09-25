// ===== DbService — local JSON "database" =====
// All user data (accounts + per-user progress + session) lives in one JSON
// document persisted to localStorage under `cl-db-v1`. It can be exported to
// a physical .json file from the Profile page.

import { Injectable, signal } from '@angular/core';
import { ProgressState } from './progress.service';

export interface DbUser {
  id: string; // uuid-ish
  name: string;
  email: string; // lowercase
  salt: string;
  passwordHash: string; // SHA-256(salt + password), hex
  createdAt: string; // ISO
  lastLoginAt: string; // ISO
}

export interface DbSession {
  userId: string;
  createdAt: string;
}

export interface DbDocument {
  version: 1;
  users: DbUser[];
  session: DbSession | null;
  progress: Record<string, ProgressState>; // keyed by userId
}

const DB_KEY = 'cl-db-v1';

function emptyDb(): DbDocument {
  return { version: 1, users: [], session: null, progress: {} };
}

@Injectable({ providedIn: 'root' })
export class DbService {
  /** Reactive mirror of the DB document (read-only view for components). */
  readonly doc = signal<DbDocument>(this.load());

  // ---------- low-level ----------
  private load(): DbDocument {
    try {
      const raw = localStorage.getItem(DB_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DbDocument;
        return { ...emptyDb(), ...parsed };
      }
    } catch { /* corrupted -> reset */ }
    return emptyDb();
  }

  private persist(): void {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.doc()));
    } catch { /* storage full */ }
  }

  private commit(next: DbDocument): void {
    this.doc.set(next);
    this.persist();
  }

  // ---------- users ----------
  findUserByEmail(email: string): DbUser | null {
    const e = email.trim().toLowerCase();
    return this.doc().users.find((u) => u.email === e) ?? null;
  }

  findUserById(id: string): DbUser | null {
    return this.doc().users.find((u) => u.id === id) ?? null;
  }

  addUser(name: string, email: string, salt: string, passwordHash: string): DbUser {
    const user: DbUser = {
      id: this.uuid(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      salt,
      passwordHash,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    this.commit({ ...this.doc(), users: [...this.doc().users, user] });
    return user;
  }

  updateUser(id: string, patch: Partial<Pick<DbUser, 'name' | 'email' | 'salt' | 'passwordHash' | 'lastLoginAt'>>): void {
    const users = this.doc().users.map((u) => (u.id === id ? { ...u, ...patch } : u));
    this.commit({ ...this.doc(), users });
  }

  deleteUser(id: string): void {
    const { [id]: _removed, ...progress } = this.doc().progress;
    this.commit({
      ...this.doc(),
      users: this.doc().users.filter((u) => u.id !== id),
      progress,
      session: this.doc().session?.userId === id ? null : this.doc().session,
    });
  }

  // ---------- session ----------
  setSession(userId: string | null): void {
    this.commit({
      ...this.doc(),
      session: userId ? { userId, createdAt: new Date().toISOString() } : null,
    });
  }

  currentUser(): DbUser | null {
    const s = this.doc().session;
    return s ? this.findUserById(s.userId) : null;
  }

  // ---------- per-user progress ----------
  getProgress(userId: string): ProgressState | null {
    return this.doc().progress[userId] ?? null;
  }

  setProgress(userId: string, state: ProgressState): void {
    this.commit({ ...this.doc(), progress: { ...this.doc().progress, [userId]: state } });
  }

  // ---------- export / import ----------
  exportJson(): string {
    return JSON.stringify(this.doc(), null, 2);
  }

  importJson(json: string): { ok: boolean; error?: string } {
    try {
      const parsed = JSON.parse(json) as DbDocument;
      if (typeof parsed !== 'object' || parsed === null || !Array.isArray(parsed.users)) {
        return { ok: false, error: 'Not a valid CalculusLearn database file.' };
      }
      this.commit({ ...emptyDb(), ...parsed, version: 1 });
      return { ok: true };
    } catch {
      return { ok: false, error: 'Could not parse JSON.' };
    }
  }

  resetAll(): void {
    this.commit(emptyDb());
  }

  private uuid(): string {
    try {
      if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
    } catch { /* fallback below */ }
    return 'u-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }
}
