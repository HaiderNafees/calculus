// ===== Practice Engine — expression evaluation & equivalence =====
// Small, safe-ish numeric evaluator for student answers like "2x^2", "-6/x^3",
// "3sin(x)", "sqrt(x)", "e^x", "2(x+1)". Used by the practice page to accept
// mathematically equivalent forms rather than exact string matches.

/** Convert a student answer into Python/JS-like plain math syntax. */
export function normalizeExpression(raw: string): string {
  let s = raw.trim().toLowerCase();

  // Strip $, LaTeX wrappers and common LaTeX commands
  s = s.replace(/\$+/g, '');
  s = s.replace(/\\left|\\right/g, '');
  s = s.replace(/\\cdot|\\times/g, '*');
  s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))');
  s = s.replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)');
  s = s.replace(/\\sqrt/g, 'sqrt');
  s = s.replace(/\\pi/g, 'pi');
  s = s.replace(/\\infty/g, 'infinity');
  s = s.replace(/\\ln/g, 'ln');
  s = s.replace(/\\log/g, 'log');
  s = s.replace(/\\sin|\\cos|\\tan|\\sec|\\csc|\\cot/g, (m) => m.slice(1));
  s = s.replace(/\\/g, '');
  s = s.replace(/[{}]/g, '');

  // Word forms
  s = s.replace(/infinity|infinite|∞/g, 'Infinity');
  s = s.replace(/dne|does\s*not\s*exist/g, 'DNE');
  s = s.replace(/\bminus\b/g, '-');
  s = s.replace(/\bplus\b/g, '+');

  // Implicit multiplication: 2x -> 2*x, 2(x+1) -> 2*(x+1), 3sin(x) -> 3*sin(x),
  // x^2x -> nonsense but x(x+1) -> x*(x+1)
  s = s.replace(/(\d)\s*([a-z(])/g, '$1*$2');
  s = s.replace(/\)\s*\(/g, ')*(');
  s = s.replace(/\)\s*([a-z0-9])/g, ')*$2');
  s = s.replace(/([a-z])\s*(?=[a-z])/g, (m, _c, off, str) => {
    // split runs of letters at known function boundaries handled below; keep as-is otherwise
    return m;
  });

  // Exponent notation: x^2 -> x**2. Also fix JS left-to-right ** precedence:
  // "3e^(2x)" raw would parse as (3*e)**(2x) — insert parens so a**b**c groups right.
  s = s.replace(/\^/g, '**');
  s = s.replace(/([0-9])e\*\*/g, '$1*e**');  // 3e**(...) -> 3*e**(...)
  s = s.replace(/\be\*\*/g, 'P.e**'); // placeholder, real P.e substitution happens in compile

  // Words to functions
  s = s.replace(/\b(sin|cos|tan|sec|csc|cot|sqrt|abs|ln|log|exp)\s*\(/g, '$1(');

  return s;
}

interface FnEnv {
  [k: string]: (...args: number[]) => number;
}

const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

function makeEvaluator(): { evalIn: (expr: string, x: number) => number } {
  const fns: FnEnv = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    sec: (x) => 1 / Math.cos(x), csc: (x) => 1 / Math.sin(x), cot: (x) => 1 / Math.tan(x),
    sqrt: Math.sqrt, abs: Math.abs, ln: Math.log, log: Math.log10, exp: Math.exp,
  };

  const fnNames = Object.keys(fns).join('|');

  function compile(expr: string): (x: number) => number {
    // Tokenize check: only allow safe characters
    const cleaned = expr.replace(/\s+/g, '');
    if (!/^[0-9+\-*/().,*a-zA-Z_]+$/.test(cleaned)) {
      throw new Error('unsafe characters');
    }
    if (/Infinity/.test(cleaned)) {
      return () => Infinity; // trivial "constant" answer
    }

    // Insert explicit function-call commas? Not needed; Math functions take single args here.
    // Replace recognized function names with Math-scoped lookups via destructure.
    const body = cleaned
      .replace(new RegExp(`\\b(${fnNames})\\(`, 'g'), 'F.$1(')
      .replace(/\bpi\b/g, 'P.pi')
      .replace(/\be\b(?![a-z])/g, 'P.e');

    // eslint-disable-next-line no-new-func
    const fn = new Function('x', 'F', 'P', `"use strict"; if (typeof x !== 'number') throw new Error('bad'); return (${body});`);
    // Probe: must return a finite-ish number, not objects (e.g. `constructor`)
    const probe = fn(1, fns, CONSTS);
    if (typeof probe !== 'number') throw new Error('not a numeric expression');
    return (x: number) => fn(x, fns, CONSTS);
  }

  return { evalIn: (expr, x) => compile(expr)(x) };
}

/**
 * Compare two answers for mathematical equivalence.
 * Handles: numeric answers (incl. fractions), yes/no/DNE/infinity words,
 * and expressions in x (samples the normalized forms at several points).
 */
export function answersEquivalent(userRaw: string, correctRaw: string): boolean {
  const u = userRaw.trim();
  const c = correctRaw.trim();
  if (!u) return false;

  // Fast path: exact/normalized string match
  if (answersEq(u, c)) return true;

  // Word answers: yes/no, DNE, infinity, classifications
  const word = (s: string) => s.toLowerCase().replace(/[^a-z∞+-]/g, '');
  const wu = word(u), wc = word(c);
  const norm = (w: string): string => {
    if (/^(yes|y|yep|true)$/.test(w)) return 'yes';
    if (/^(no|n|nope|false)$/.test(w)) return 'no';
    if (/^(dne|doesnotexist|nolimit)$/.test(w)) return 'dne';
    if (/^(\+?infinity|\+?inf|∞|\+?∞|unbounded|posinfinity)$/.test(w)) return '+inf';
    if (/^(-infinity|-inf|-∞|neginfinity|negativeinfinity)$/.test(w)) return '-inf';
    if (/^(removable|hole)$/.test(w)) return 'removable';
    if (/^(jump|step)$/.test(w)) return 'jump';
    if (/^(infinite|verticalasymptote|blowup)$/.test(w)) return 'infinite';
    if (/^(continuous|yescontinuous)$/.test(w)) return 'yes';
    if (/^(discontinuous|notcontinuous)$/.test(w)) return 'no';
    return w;
  };
  if (norm(wu) === norm(wc) && norm(wu) !== '') return true;

  // Numeric answers (possibly fractions like 3/4, or "y=2", "x=2,5" lists)
  const numsU = extractNumbers(u);
  const numsC = extractNumbers(c);
  if (numsU.length && numsU.length === numsC.length) {
    return numsU.every((n, i) => {
      const scale = Math.max(1, Math.abs(numsC[i]));
      return Math.abs(n - numsC[i]) / scale < 5e-4; // tolerate rounded decimals
    });
  }

  // Expression answers: compare normalized expressions at sample points
  try {
    const ev = makeEvaluator();
    const fu = normalizeExpression(u).replace(/^\+/, '');
    const fc = normalizeExpression(c).replace(/^\+/, '');
    const samples = [0.5, 0.9, 1.3, 2.1, 2.7, 3.4, -0.7, -1.9];
    let compared = 0;
    for (const x of samples) {
      let a: number, b: number;
      try { a = ev.evalIn(fu, x); } catch { return false; }
      try { b = ev.evalIn(fc, x); } catch { return false; }
      if (!isFinite(a) || !isFinite(b)) { compared++; continue; }
      const scale = Math.max(1, Math.abs(b));
      if (Math.abs(a - b) / scale > 1e-6) return false;
      compared++;
    }
    return compared > 0;
  } catch {
    return false;
  }
}

/** Pull numeric values out of an answer like "x=2,5" or "y=3/4" or "-6/x^3". */
function extractNumbers(s: string): number[] {
  // If it contains x, sin, etc., it's not a pure number list (except "x=2" style)
  const cleaned = s.replace(/\$+/g, '').toLowerCase();

  // "x=..." or "y=..." prefix
  const m = cleaned.match(/^[xy]\s*=\s*(.+)$/);
  const target = m ? m[1] : cleaned;

  // Pure numeric list (comma or "and" separated)
  if (/^[0-9+\-./,\s]+$/.test(target.replace(/\band\b/g, ','))) {
    const parts = target.split(/[,\s]+/).filter((p) => p && p !== 'and');
    const nums: number[] = [];
    for (const p of parts) {
      const v = parseNumber(p);
      if (v === null) return [];
      nums.push(v);
    }
    return nums;
  }
  return [];
}

function parseNumber(s: string): number | null {
  const t = s.trim();
  if (!t) return null;
  // Fraction a/b
  const f = t.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (f) {
    const d = Number(f[2]);
    return d === 0 ? null : Number(f[1]) / d;
  }
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

// exact-string fallback (kept from original engine)
export function answersEq(a: string, b: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '').replace(/\\/g, '').replace(/[{}$]/g, '');
  return norm(a) === norm(b);
}
