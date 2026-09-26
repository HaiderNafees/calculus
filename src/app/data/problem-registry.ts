// ===== Problem Template Registry =====
// Combines bespoke Module 1 templates, derivative templates (F-J), and
// advanced templates (K-W), with sensible per-category fallbacks so every
// one of the 126 skills can generate problems.

import { ProblemTemplate, rndInt, frac } from './problem-engine';
import { getTemplate } from './problem-templates';
import { makeDerivativeTemplates } from './problem-templates-derivatives';
import { makeAdvancedTemplates } from './problem-templates-advanced';

/** Category-specific generic problems, used when a skill has no bespoke variants. */
function categoryFallback(skillId: string): ProblemTemplate[] {
  const letter = skillId[0];
  const pool: Array<() => ReturnType<typeof build>> = [];

  function build(
    questionLatex: string,
    correctAnswer: string,
    hints: string[],
    solutionSteps: Array<{ title: string; explanation: string; latex?: string }>,
    extra: Partial<{ questionText: string; acceptedAnswers: string[]; graphExpr: string }> = {}
  ) {
    return {
      questionLatex,
      correctAnswer,
      hints,
      solutionSteps,
      ...extra,
    };
  }

  switch (letter) {
    case 'A': // limits from graphs
      pool.push(() => {
        const k = rndInt(1, 4), h = rndInt(1, 4);
        return build(
          `\\lim_{x \\to ${k}} (x + ${h})`,
          `${k + h}`,
          ['This function is continuous.', 'Use direct substitution.', `Answer: ${k} + ${h}.`],
          [{ title: 'Substitute', explanation: '', latex: `${k} + ${h} = ${k + h}` }],
          { graphExpr: `x+${h}` }
        );
      });
      break;
    case 'B': // limit laws
      pool.push(() => {
        const a = rndInt(2, 5), k = rndInt(1, 3);
        return build(
          `\\lim_{x \\to ${k}} ${a}x^2`,
          `${a * k * k}`,
          ['Continuous function — substitute.', `Compute ${a}·${k}².`, `${a}·${k * k} = ${a * k * k}`],
          [{ title: 'Substitute', explanation: '', latex: `${a}\\cdot ${k * k} = ${a * k * k}` }]
        );
      });
      break;
    case 'C': // infinite limits
      pool.push(() => {
        const k = rndInt(1, 3);
        return build(
          `\\lim_{x \\to ${k}^+} \\frac{1}{x - ${k}}`,
          'infinity',
          ['Denominator sign?', 'From the right, x − k is small positive.', '1 ÷ (tiny positive) = +∞.'],
          [{ title: 'Conclusion', explanation: '', latex: `= +\\infty` }]
        );
      });
      break;
    case 'D': // limits at infinity
      pool.push(() => {
        const a = rndInt(1, 5), c = rndInt(1, 5);
        return build(
          `\\lim_{x \\to \\infty} \\frac{${a}x^3}{${c}x^3 + 1}`,
          frac(a, c),
          ['Compare degrees.', 'Equal degrees → leading coefficient ratio.', `${a}/${c}`],
          [{ title: 'Ratio of leading coefficients', explanation: '', latex: `\\frac{${a}}{${c}}` }]
        );
      });
      break;
    case 'E': // continuity
      pool.push(() => {
        return build(
          `\\text{Is } f(x)=|x| \\text{ continuous at } x = 0?`,
          'yes',
          ['Check the three conditions.', 'f(0) = 0 exists; the limit is 0 too.', 'Limit = value → continuous.'],
          [{ title: 'Verify', explanation: 'All three continuity conditions hold.' }]
        );
      });
      break;
    case 'F': // intro derivatives
    case 'G': // derivative rules
      pool.push(() => {
        const n = rndInt(2, 6);
        return build(
          `\\frac{d}{dx}\\, x^{${n}}`,
          `${n}x^${n - 1}`,
          ['Power rule.', 'Bring down the exponent, subtract one.', `${n}x^${n - 1}`],
          [{ title: 'Power rule', explanation: '', latex: `${n}x^{${n - 1}}` }]
        );
      });
      break;
    case 'H': // transcendental
      pool.push(() => {
        return build(
          `\\frac{d}{dx}\\,\\ln x`,
          `1/x`,
          ['Standard result.', 'd/dx ln x = 1/x.', 'Memorize this one!'],
          [{ title: 'Standard derivative', explanation: '', latex: `\\frac{1}{x}` }]
        );
      });
      break;
    case 'I': // advanced techniques
    case 'J': // linearization/related rates
      pool.push(() => {
        const a = rndInt(2, 5);
        return build(
          `\\text{Find } f'(3) \\text{ if } f(x) = ${a}x^2`,
          `${6 * a}`,
          ['Differentiate first.', `f′(x) = ${2 * a}x`, `f′(3) = ${6 * a}`],
          [{ title: 'Evaluate', explanation: '', latex: `${2 * a}(3) = ${6 * a}` }]
        );
      });
      break;
    case 'K': // curve analysis
    case 'L': // concavity
      pool.push(() => {
        return build(
          `f(x) = x^3 - 3x. \\text{ Find } f'(x)`,
          `3x^2-3`,
          ['Differentiate term by term.', 'd/dx x³ = 3x²; d/dx 3x = 3.', 'Combine.'],
          [{ title: 'Differentiate', explanation: '', latex: `3x^2 - 3` }]
        );
      });
      break;
    case 'M': // optimization
    case 'N': // MVT
      pool.push(() => {
        const a = rndInt(1, 4);
        return build(
          `\\text{Critical points of } f(x) = x^2 - ${2 * a}x`,
          `${a}`,
          ['Set f′ = 0.', `f′(x) = 2x − ${2 * a}`, `x = ${a}`],
          [{ title: 'Solve', explanation: '', latex: `2x - ${2 * a} = 0` }]
        );
      });
      break;
    case 'O': // motion
      pool.push(() => {
        const a = rndInt(2, 5);
        return build(
          `s(t) = ${a}t^2. \\text{ Find } v(t)`,
          `${2 * a}t`,
          ['Velocity = position derivative.', `v(t) = ${2 * a}t`, 'Power rule.'],
          [{ title: 'Differentiate', explanation: '', latex: `${2 * a}t` }]
        );
      });
      break;
    case 'P': // L'Hôpital etc
      pool.push(() => {
        return build(
          `\\lim_{x \\to 0} \\frac{\\sin x}{x}`,
          `1`,
          ['Classic limit.', "L'Hôpital or the standard limit.", 'Answer: 1.'],
          [{ title: 'Standard limit', explanation: '', latex: `\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1` }]
        );
      });
      break;
    case 'Q': // antiderivatives
    case 'R': // definite integrals
      pool.push(() => {
        const n = rndInt(1, 4);
        return build(
          `\\int x^{${n}}\\,dx`,
          `x^${n + 1}/${n + 1}+C`,
          ['Power rule for integrals.', 'Raise the exponent, divide by it.', 'Add +C.'],
          [{ title: 'Power rule', explanation: '', latex: `\\frac{x^{${n + 1}}}{${n + 1}} + C` }]
        );
      });
      break;
    case 'S': // techniques
      pool.push(() => {
        return build(
          `\\int \\cos x\\,dx`,
          `sin(x)+C`,
          ['Standard integral.', '∫cos = sin.', 'Add +C.'],
          [{ title: 'Standard integral', explanation: '', latex: `\\sin x + C` }]
        );
      });
      break;
    case 'T': // area/accumulation
      pool.push(() => {
        const b = rndInt(1, 4);
        return build(
          `\\int_0^{${b}} 1\\,dx`,
          `${b}`,
          ['Area under y = 1.', 'A rectangle of height 1, width ' + b + '.', `Area = ${b}.`],
          [{ title: 'Evaluate', explanation: '', latex: `${b}` }]
        );
      });
      break;
    case 'U': // volumes
      pool.push(() => {
        const b = rndInt(1, 3);
        return build(
          `\\text{Disk method: } V = \\pi\\int_0^{${b}} x^2\\,dx`,
          `${frac(b * b * b, 3)}\\pi`,
          ['V = π∫R² dx.', `∫₀^{${b}} x² dx = ${b}³/3.`, 'Multiply by π.'],
          [{ title: 'Evaluate', explanation: '', latex: `\\pi\\cdot\\frac{${b}^3}{3} = ${frac(b * b * b, 3)}\\pi` }]
        );
      });
      break;
    case 'V': // diff eq
      pool.push(() => {
        return build(
          `\\frac{dy}{dx} = x. \\text{ General solution?}`,
          `x^2/2+C`,
          ['Integrate both sides.', '∫x dx = x²/2.', 'Add +C.'],
          [{ title: 'Integrate', explanation: '', latex: `y = \\frac{x^2}{2} + C` }]
        );
      });
      break;
    case 'W': // apps of integration
      pool.push(() => {
        const a = rndInt(1, 4);
        return build(
          `v(t) = ${a} \\text{ on } [0, 2]. \\text{ Displacement?}`,
          `${2 * a}`,
          ['Displacement = ∫v dt.', `∫${a} dt from 0 to 2.`, `${a}·2 = ${2 * a}.`],
          [{ title: 'Integrate', explanation: '', latex: `${a}\\cdot 2 = ${2 * a}` }]
        );
      });
      break;
  }

  if (pool.length === 0) return [];
  return pool.map((gen) => ({ skillId, difficulty: 1, generate: gen } as ProblemTemplate));
}

/** All variants available for a skill. Never empty. */
export function getTemplates(skillId: string): ProblemTemplate[] {
  const custom = makeDerivativeTemplates(skillId);
  const advanced = makeAdvancedTemplates(skillId);
  const fallback = categoryFallback(skillId);
  const legacy = [getTemplate(skillId)]; // original bespoke Module 1 templates

  const all = [...custom, ...advanced, ...fallback, ...legacy].filter(
    (t): t is ProblemTemplate => !!t && typeof t.generate === 'function'
  );

  if (all.length === 0) {
    // Absolute last resort: simple linear problem
    return [{
      skillId,
      difficulty: 1,
      generate: () => {
        const a = rndInt(2, 6), k = rndInt(1, 5);
        return {
          questionLatex: `\\lim_{x \\to ${k}} ${a}x`,
          correctAnswer: `${a * k}`,
          hints: ['Continuous function — substitute.', `${a}·${k} = ${a * k}.`],
          solutionSteps: [{ title: 'Substitute', explanation: '', latex: `${a}\\cdot${k} = ${a * k}` }],
        };
      },
    }];
  }
  return all;
}
