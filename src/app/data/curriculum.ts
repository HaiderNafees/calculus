// ===== CalculusLearn — Curriculum Data (typed) =====
// Structure modeled on the IXL Calculus curriculum: 126 skills,
// 23 lettered categories (A-W), grouped into 6 learning modules.

export type MasteryLevel = 0 | 1 | 2 | 3; // New, Learning, Practiced, Mastered

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  0: 'New',
  1: 'Learning',
  2: 'Practiced',
  3: 'Mastered',
};

export interface Skill {
  id: string; // e.g. "A.1"
  name: string;
}

export interface Category {
  letter: string; // "A" ... "W"
  title: string;
  skills: Skill[];
}

export interface LearningModule {
  id: number; // 1..6
  roman: string; // "I" ... "VI"
  title: string;
  description: string;
  categories: Category[];
}

// ---------- Module I: Limits & Continuity (A-E, 25 skills) ----------
const module1: LearningModule = {
  id: 1,
  roman: 'I',
  title: 'Limits & Continuity',
  description: 'The foundation of calculus: what happens as inputs approach a point, infinity, and the idea of continuity.',
  categories: [
    {
      letter: 'A',
      title: 'Introduction to Limits',
      skills: [
        { id: 'A.1', name: 'Find limits using graphs' },
        { id: 'A.2', name: 'Find one-sided limits using graphs' },
        { id: 'A.3', name: 'Determine if a limit exists' },
        { id: 'A.4', name: 'Find limits using tables' },
      ],
    },
    {
      letter: 'B',
      title: 'Calculate Limits',
      skills: [
        { id: 'B.1', name: 'Find limits using the division law' },
        { id: 'B.2', name: 'Find limits using limit laws' },
        { id: 'B.3', name: 'Find limits of polynomials and rational functions' },
        { id: 'B.4', name: 'Find limits using the conjugate method' },
        { id: 'B.5', name: 'Find limits of piecewise functions' },
        { id: 'B.6', name: 'Find limits involving absolute value' },
        { id: 'B.7', name: 'Find limits using the squeeze theorem' },
        { id: 'B.8', name: 'Find limits of composite functions' },
      ],
    },
    {
      letter: 'C',
      title: 'Infinite Limits',
      skills: [
        { id: 'C.1', name: 'Find infinite limits from graphs' },
        { id: 'C.2', name: 'Find infinite limits algebraically' },
        { id: 'C.3', name: 'Find vertical asymptotes using limits' },
      ],
    },
    {
      letter: 'D',
      title: 'Limits at Infinity',
      skills: [
        { id: 'D.1', name: 'Find limits at infinity of rational functions' },
        { id: 'D.2', name: 'Find horizontal asymptotes using limits' },
      ],
    },
    {
      letter: 'E',
      title: 'Continuity',
      skills: [
        { id: 'E.1', name: 'Identify continuity from graphs' },
        { id: 'E.2', name: 'Determine continuity at a point' },
        { id: 'E.3', name: 'Determine continuity on an interval' },
        { id: 'E.4', name: 'Find and classify discontinuities' },
        { id: 'E.5', name: 'Removable discontinuities' },
        { id: 'E.6', name: 'Continuity of piecewise functions' },
        { id: 'E.7', name: 'Intermediate Value Theorem' },
        { id: 'E.8', name: 'Continuity and limits combined review' },
      ],
    },
  ],
};

// ---------- Module II: Derivatives — Fundamentals (F-J, 41 skills) ----------
const module2: LearningModule = {
  id: 2,
  roman: 'II',
  title: 'Derivatives — Fundamentals',
  description: 'Rates of change, the limit definition, and every differentiation rule up to advanced techniques.',
  categories: [
    {
      letter: 'F',
      title: 'Introduction to Derivatives',
      skills: [
        { id: 'F.1', name: 'Average rate of change I' },
        { id: 'F.2', name: 'Average rate of change II' },
        { id: 'F.3', name: 'Instantaneous rate of change' },
        { id: 'F.4', name: 'Find derivatives using the definition' },
        { id: 'F.5', name: 'Derivative as a function' },
        { id: 'F.6', name: 'Differentiability and continuity' },
        { id: 'F.7', name: 'Find slopes of tangent lines from graphs' },
        { id: 'F.8', name: 'Power rule I' },
      ],
    },
    {
      letter: 'G',
      title: 'Derivative Rules',
      skills: [
        { id: 'G.1', name: 'Power rule II (negative and fractional exponents)' },
        { id: 'G.2', name: 'Constant, sum and difference rules' },
        { id: 'G.3', name: 'Product rule' },
        { id: 'G.4', name: 'Quotient rule' },
        { id: 'G.5', name: 'Chain rule' },
        { id: 'G.6', name: 'Combine differentiation rules' },
        { id: 'G.7', name: 'Find higher-order derivatives' },
        { id: 'G.8', name: 'Implicit differentiation' },
      ],
    },
    {
      letter: 'H',
      title: 'Transcendental Derivatives',
      skills: [
        { id: 'H.1', name: 'Derivatives of e^x' },
        { id: 'H.2', name: 'Derivatives of general exponential functions' },
        { id: 'H.3', name: 'Derivatives of natural logarithms' },
        { id: 'H.4', name: 'Derivatives of general logarithmic functions' },
        { id: 'H.5', name: 'Derivatives of sine and cosine' },
        { id: 'H.6', name: 'Derivatives of tangent and cotangent' },
        { id: 'H.7', name: 'Derivatives of secant and cosecant' },
        { id: 'H.8', name: 'Inverse trigonometric derivatives' },
        { id: 'H.9', name: 'Inverse function derivatives' },
      ],
    },
    {
      letter: 'I',
      title: 'Advanced Techniques',
      skills: [
        { id: 'I.1', name: 'Chain rule with exponential and trig functions' },
        { id: 'I.2', name: 'Implicit differentiation I' },
        { id: 'I.3', name: 'Implicit differentiation II' },
        { id: 'I.4', name: 'Logarithmic differentiation' },
        { id: 'I.5', name: 'Derivatives of inverse functions' },
        { id: 'I.6', name: 'Differentiate piecewise-defined functions' },
        { id: 'I.7', name: 'Tangent and normal lines' },
        { id: 'I.8', name: 'Higher-order derivatives of special functions' },
      ],
    },
    {
      letter: 'J',
      title: 'Linearization & Related Rates',
      skills: [
        { id: 'J.1', name: 'Local linearization' },
        { id: 'J.2', name: 'Linear approximation error' },
        { id: 'J.3', name: 'Differentials' },
        { id: 'J.4', name: "Newton's method" },
        { id: 'J.5', name: 'Related rates I' },
        { id: 'J.6', name: 'Related rates II' },
        { id: 'J.7', name: 'Related rates III' },
        { id: 'J.8', name: 'Local maxima and minima from graphs' },
      ],
    },
  ],
};

// ---------- Module III: Derivatives — Applications (K-P, 16 skills) ----------
const module3: LearningModule = {
  id: 3,
  roman: 'III',
  title: 'Derivatives — Applications',
  description: 'Use derivatives to analyze curves, optimize quantities, describe motion, and evaluate limits.',
  categories: [
    {
      letter: 'K',
      title: 'Curve Analysis',
      skills: [
        { id: 'K.1', name: 'Increasing and decreasing intervals' },
        { id: 'K.2', name: 'First derivative test' },
        { id: 'K.3', name: 'Relative extrema' },
      ],
    },
    {
      letter: 'L',
      title: 'Concavity',
      skills: [
        { id: 'L.1', name: 'Concavity from graphs' },
        { id: 'L.2', name: 'Concavity from the second derivative' },
        { id: 'L.3', name: 'Points of inflection' },
      ],
    },
    {
      letter: 'M',
      title: 'Absolute Extrema & Optimization',
      skills: [
        { id: 'M.1', name: 'Critical points' },
        { id: 'M.2', name: 'Absolute maxima and minima on closed intervals' },
        { id: 'M.3', name: 'Optimization problems' },
      ],
    },
    {
      letter: 'N',
      title: 'Mean Value Theorem',
      skills: [
        { id: 'N.1', name: 'Mean Value Theorem' },
        { id: "N.2", name: "Rolle's Theorem" },
        { id: 'N.3', name: 'Apply the Mean Value Theorem' },
      ],
    },
    {
      letter: 'O',
      title: 'Motion',
      skills: [
        { id: 'O.1', name: 'Position, velocity, and acceleration' },
        { id: 'O.2', name: 'Particle motion problems' },
      ],
    },
    {
      letter: 'P',
      title: 'Other Applications',
      skills: [
        { id: 'P.1', name: 'Rates of change in economics' },
        { id: "P.2", name: "L'Hôpital's rule" },
      ],
    },
  ],
};

// ---------- Module IV: Integration — Fundamentals (Q-U, 26 skills) ----------
const module4: LearningModule = {
  id: 4,
  roman: 'IV',
  title: 'Integration — Fundamentals',
  description: 'Antiderivatives, definite integrals, the Fundamental Theorem of Calculus, and integration techniques.',
  categories: [
    {
      letter: 'Q',
      title: 'Antiderivatives',
      skills: [
        { id: 'Q.1', name: 'Antiderivatives and indefinite integrals' },
        { id: 'Q.2', name: 'Power rule for integration' },
        { id: 'Q.3', name: 'Integration with initial conditions' },
        { id: 'Q.4', name: 'Indefinite integrals of trig functions' },
        { id: 'Q.5', name: 'Indefinite integrals of exponential functions' },
      ],
    },
    {
      letter: 'R',
      title: 'Definite Integrals',
      skills: [
        { id: 'R.1', name: 'Riemann sums I' },
        { id: 'R.2', name: 'Riemann sums II' },
        { id: 'R.3', name: 'Definite integrals and area under curves' },
        { id: 'R.4', name: 'Fundamental Theorem of Calculus I' },
        { id: 'R.5', name: 'Fundamental Theorem of Calculus II' },
        { id: 'R.6', name: 'Properties of definite integrals' },
      ],
    },
    {
      letter: 'S',
      title: 'Integration Techniques',
      skills: [
        { id: 'S.1', name: 'Basic u-substitution' },
        { id: 'S.2', name: 'u-substitution with definite integrals' },
        { id: 'S.3', name: 'Integration by parts' },
        { id: 'S.4', name: 'Integration by partial fractions' },
        { id: 'S.5', name: 'Choose the integration technique' },
      ],
    },
    {
      letter: 'T',
      title: 'Area & Accumulation',
      skills: [
        { id: 'T.1', name: 'Area between a curve and the x-axis' },
        { id: 'T.2', name: 'Net and total area' },
        { id: 'T.3', name: 'Accumulation functions' },
        { id: 'T.4', name: 'Average value of a function' },
        { id: 'T.5', name: 'Area between two curves' },
      ],
    },
    {
      letter: 'U',
      title: 'Applications of Integrals',
      skills: [
        { id: 'U.1', name: 'Volumes by slicing (cross-sections)' },
        { id: 'U.2', name: 'Volumes of revolution: disk method' },
        { id: 'U.3', name: 'Volumes of revolution: washer method' },
        { id: 'U.4', name: 'Arc length' },
        { id: 'U.5', name: 'Improper integrals' },
      ],
    },
  ],
};

// ---------- Module V: Differential Equations (V, 8 skills) ----------
const module5: LearningModule = {
  id: 5,
  roman: 'V',
  title: 'Differential Equations',
  description: 'Model change: separable equations, growth and decay, slope fields, and initial value problems.',
  categories: [
    {
      letter: 'V',
      title: 'Differential Equations',
      skills: [
        { id: 'V.1', name: 'Verify solutions of differential equations' },
        { id: 'V.2', name: 'Separable differential equations I' },
        { id: 'V.3', name: 'Separable differential equations II' },
        { id: 'V.4', name: 'Exponential growth and decay models' },
        { id: 'V.5', name: "Newton's law of cooling" },
        { id: 'V.6', name: 'Logistic growth models' },
        { id: 'V.7', name: 'Slope fields' },
        { id: 'V.8', name: 'Initial value problems' },
      ],
    },
  ],
};

// ---------- Module VI: Applications of Integration (W, 10 skills) ----------
const module6: LearningModule = {
  id: 6,
  roman: 'VI',
  title: 'Applications of Integration',
  description: 'Integral calculus in motion, physics, economics, and probability.',
  categories: [
    {
      letter: 'W',
      title: 'Applied Integration',
      skills: [
        { id: 'W.1', name: 'Particle motion with integrals' },
        { id: 'W.2', name: 'Displacement and total distance' },
        { id: 'W.3', name: 'Velocity and speed from acceleration' },
        { id: 'W.4', name: 'Work done by a variable force' },
        { id: 'W.5', name: 'Hydrostatic force and pressure' },
        { id: 'W.6', name: 'Center of mass' },
        { id: 'W.7', name: 'Consumer and producer surplus' },
        { id: 'W.8', name: 'Future and present value of income streams' },
        { id: 'W.9', name: 'Probability density functions' },
        { id: 'W.10', name: 'Exponential growth and decay review' },
      ],
    },
  ],
};

export const CURRICULUM: LearningModule[] = [module1, module2, module3, module4, module5, module6];

export const ALL_SKILLS: Skill[] = CURRICULUM.flatMap((m) =>
  m.categories.flatMap((c) => c.skills)
);

export const MODULE_TITLES = ['Limits', 'Derivatives — Basics', 'Derivatives — Apps', 'Integration — Basics', 'Diff. Equations', 'Apps of Integration'];

// Lookup helpers
export function findSkill(skillId: string): { module: LearningModule; category: Category; skill: Skill } | null {
  for (const m of CURRICULUM) {
    for (const c of m.categories) {
      const skill = c.skills.find((s) => s.id === skillId);
      if (skill) return { module: m, category: c, skill };
    }
  }
  return null;
}

export function skillCount(): number {
  return ALL_SKILLS.length;
}

export function categorySkillCount(cat: Category): number {
  return cat.skills.length;
}

export function nextSkill(skillId: string): Skill | null {
  const i = ALL_SKILLS.findIndex((s) => s.id === skillId);
  return i >= 0 && i < ALL_SKILLS.length - 1 ? ALL_SKILLS[i + 1] : null;
}

export function prevSkill(skillId: string): Skill | null {
  const i = ALL_SKILLS.findIndex((s) => s.id === skillId);
  return i > 0 ? ALL_SKILLS[i - 1] : null;
}
