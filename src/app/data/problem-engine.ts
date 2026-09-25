// ===== Practice Engine — Problem Generation =====
// Templates are parameterized: each call generates fresh randomized values.
// Each generated problem carries a LaTeX question, correct answer, optional graph,
// progressive hints, and step-by-step solution.

export interface SolutionStep {
  title: string;
  explanation: string;
  latex?: string;
}

export interface GeneratedProblem {
  questionLatex: string;
  questionText?: string; // optional plain-text lead-in
  correctAnswer: string; // canonical answer string (also accepted forms listed)
  acceptedAnswers?: string[];
  graphExpr?: string;      // JSXGraph expression, if a graph helps
  graphPoint?: { x: number; y: number };
  graphTarget?: number;    // limit visualizer target x
  riemann?: { expr: string; a: number; b: number };
  hints: string[];
  solutionSteps: SolutionStep[];
}

export interface ProblemTemplate {
  skillId: string;
  difficulty: 1 | 2 | 3;
  generate: () => GeneratedProblem;
}

// ---------- small helpers ----------
export function rndInt(min: number, max: number, exclude: number[] = []): number {
  let v = min + Math.floor(Math.random() * (max - min + 1));
  let guard = 0;
  while (exclude.includes(v) && guard++ < 50) {
    v = min + Math.floor(Math.random() * (max - min + 1));
  }
  return v;
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

export function frac(num: number, den: number): string {
  const g = gcd(num, den);
  const n = num / g, d = den / g;
  if (d === 1) return `${n}`;
  if (d < 0) return frac(-n, -d);
  return `\\frac{${n}}{${d}}`;
}

export function signedCoef(c: number, term: string, first = false): string {
  if (c === 0) return '';
  const abs = Math.abs(c);
  const coefStr = term && abs === 1 ? '' : `${abs}`;
  const core = `${coefStr}${term}`;
  if (first) return c < 0 ? `-${core}` : core;
  return c < 0 ? ` - ${core}` : ` + ${core}`;
}

export function latexPolynomial(coeffs: number[], variable = 'x'): string {
  // coeffs[i] is coefficient of x^i
  const parts: string[] = [];
  for (let i = coeffs.length - 1; i >= 0; i--) {
    const c = coeffs[i];
    if (c === 0) continue;
    const term = i === 0 ? '' : i === 1 ? variable : `${variable}^${i}`;
    parts.push(signedCoef(c, term, parts.length === 0));
  }
  return parts.join('') || '0';
}

// ----- Common validation helpers -----
export function answersEq(a: string, b: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '').replace(/\\/g, '').replace(/[{}$]/g, '');
  return norm(a) === norm(b);
}
