// ===== Problem Templates — Module I (Categories A-E) =====
// Every template randomizes its numbers so practice never repeats exactly.
import {
  GeneratedProblem, ProblemTemplate,
  rndInt, pick, frac, latexPolynomial,
} from './problem-engine';

// ---------- Category A: Introduction to Limits ----------
const a1: ProblemTemplate = {
  skillId: 'A.1', difficulty: 1,
  generate: () => {
    const h = rndInt(1, 4);
    const k = rndInt(-4, 5);
    return {
      questionLatex: `\\lim_{x \\to ${k}} f(x) \\quad \\text{where the graph of } f \\text{ is shown}`,
      questionText: `The graph shows f(x) = x + ${h}. Use the graph to find the limit as x approaches ${k}.`,
      correctAnswer: `${k + h}`,
      graphExpr: `x+${h}`,
      graphPoint: { x: k, y: k + h },
      hints: [
        'Trace the graph from the left toward x = ' + k,
        'What y-value does the curve approach?',
        'Read off the y-coordinate at x = ' + k,
      ],
      solutionSteps: [
        { title: 'Locate x = ' + k, explanation: 'Find the point on the x-axis where x = ' + k + '.' },
        { title: 'Trace the curve', explanation: 'Follow the curve as x gets close to ' + k + ' from both sides.', latex: `\\lim_{x \\to ${k}} (x + ${h}) = ${k + h}` },
      ],
    };
  },
};

const a2: ProblemTemplate = {
  skillId: 'A.2', difficulty: 1,
  generate: () => {
    const k = rndInt(0, 3);
    const left = k;            // left limit = k
    const right = k + rndInt(1, 3); // right limit differs
    return {
      questionLatex: `\\lim_{x \\to ${k}^-} f(x) \\;\\text{ and }\\; \\lim_{x \\to ${k}^+} f(x)`,
      questionText: `A piecewise graph jumps at x = ${k}. From the left the curve approaches ${left}; from the right it approaches ${right}. What are the one-sided limits? (Answer as "L,R")`,
      correctAnswer: `${left},${right}`,
      acceptedAnswers: [`(${left},${right})`, `${left} and ${right}`],
      hints: [
        'Approach only from values smaller than ' + k + ' for the left limit.',
        'Then approach only from values larger than ' + k + '.',
        'The two values do not have to agree.',
      ],
      solutionSteps: [
        { title: 'Left-hand limit', explanation: `Tracing from the left, f(x) approaches ${left}.`, latex: `\\lim_{x \\to ${k}^-} f(x) = ${left}` },
        { title: 'Right-hand limit', explanation: `Tracing from the right, f(x) approaches ${right}.`, latex: `\\lim_{x \\to ${k}^+} f(x) = ${right}` },
      ],
    };
  },
};

const a3: ProblemTemplate = {
  skillId: 'A.3', difficulty: 2,
  generate: () => {
    const jump = rndInt(1, 4);
    return {
      questionLatex: `\\text{Does } \\lim_{x \\to 1} f(x) \\text{ exist?}`,
      questionText: `The graph of f has a jump discontinuity at x = 1: left limit is ${1}, right limit is ${1 + jump}. Does the (two-sided) limit exist? Answer "yes" or "no".`,
      correctAnswer: 'no',
      acceptedAnswers: ['no', 'n', 'does not exist', 'dne'],
      hints: [
        'A two-sided limit exists only if both one-sided limits agree.',
        'Compare the left and right limits at x = 1.',
        '1 ≠ ' + (1 + jump) + ', so what does that tell you?',
      ],
      solutionSteps: [
        { title: 'Compare one-sided limits', explanation: `Left limit is 1 and right limit is ${1 + jump}.`, latex: `1 \\neq ${1 + jump}` },
        { title: 'Conclusion', explanation: 'Because the one-sided limits differ, the two-sided limit does not exist.', latex: `\\lim_{x \\to 1} f(x) \\text{ DNE}` },
      ],
    };
  },
};

const a4: ProblemTemplate = {
  skillId: 'A.4', difficulty: 2,
  generate: () => {
    const k = rndInt(1, 3);
    const c = rndInt(2, 5);
    return {
      questionLatex: `\\text{Given } f(x) = ${c}x, \\text{ estimate } \\lim_{x \\to ${k}} f(x) \\text{ from a table}`,
      questionText: `A table of values near x = ${k} shows f(x) approaching a single number from both sides. Which number?`,
      correctAnswer: `${c * k}`,
      hints: [
        'Look at f(x) for x-values like ' + (k - 0.1) + ' and ' + (k + 0.1),
        'The values squeeze toward one number.',
        `Compute ${c}·${k} directly.`,
      ],
      solutionSteps: [
        { title: 'Observe the trend', explanation: 'As x → ' + k + ' from both sides, f(x) values approach one number.' },
        { title: 'Confirm algebraically', explanation: `f is continuous, so substitute x = ${k}.`, latex: `\\lim_{x \\to ${k}} ${c}x = ${c}\\cdot${k} = ${c * k}` },
      ],
    };
  },
};

// ---------- Category B: Calculate Limits ----------
const b1: ProblemTemplate = {
  skillId: 'B.1', difficulty: 2,
  generate: () => {
    const a = rndInt(1, 4), b = rndInt(1, 5), k = rndInt(1, 3);
    // (x^2 - k^2)/(x - k) at x = k -> 2k
    return {
      questionLatex: `\\lim_{x \\to ${k}} \\frac{x^2 - ${k * k}}{x - ${k}}`,
      correctAnswer: `${2 * k}`,
      graphExpr: `(x^2-${k * k})/(x-${k})`,
      graphPoint: { x: k, y: 2 * k },
      graphTarget: k,
      hints: [
        'Direct substitution gives 0/0 — an indeterminate form.',
        'Factor the numerator: it is a difference of squares.',
        `x^2 - ${k * k} = (x - ${k})(x + ${k})`,
      ],
      solutionSteps: [
        { title: 'Try substitution', explanation: `At x = ${k} we get 0/0, so simplify first.`, latex: `\\frac{${k * k - k * k}}{${k - k}} = \\frac{0}{0}` },
        { title: 'Factor and cancel', explanation: 'Cancel the common factor (x − ' + k + ').', latex: `\\lim_{x \\to ${k}} \\frac{(x-${k})(x+${k})}{x-${k}} = \\lim_{x \\to ${k}} (x + ${k})` },
        { title: 'Evaluate', explanation: 'Now substitute.', latex: `${k} + ${k} = ${2 * k}` },
      ],
    };
  },
};

const b2: ProblemTemplate = {
  skillId: 'B.2', difficulty: 1,
  generate: () => {
    const a = rndInt(1, 5), b = rndInt(-5, 5), k = rndInt(-3, 4);
    const val = a * k + b;
    return {
      questionLatex: `\\lim_{x \\to ${k}} (${a === 1 ? '' : a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)})`,
      correctAnswer: `${val}`,
      hints: [
        'Polynomials are continuous everywhere.',
        'For continuous functions, limits equal direct substitution.',
        `Substitute x = ${k}.`,
      ],
      solutionSteps: [
        { title: 'Limit law: direct substitution', explanation: 'Polynomials are continuous, so the limit is the function value.', latex: `\\lim_{x \\to ${k}} f(x) = f(${k})` },
        { title: 'Compute', explanation: '', latex: `${a}(${k}) ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${val}` },
      ],
    };
  },
};

const b3: ProblemTemplate = {
  skillId: 'B.3', difficulty: 2,
  generate: () => {
    const a = rndInt(1, 4), b = rndInt(1, 4), k = rndInt(1, 3);
    const num = a * k * k + b, den = k + 1;
    return {
      questionLatex: `\\lim_{x \\to ${k}} \\frac{${a}x^2 + ${b}}{x + 1}`,
      correctAnswer: frac(a * k * k + b, den),
      acceptedAnswers: [`${(a * k * k + b) / den}`],
      hints: [
        'Is the denominator zero at x = ' + k + '?',
        'No — so the quotient law applies.',
        'Substitute into numerator and denominator separately.',
      ],
      solutionSteps: [
        { title: 'Check continuity', explanation: `The denominator at x = ${k} is ${den} ≠ 0, so substitute directly.`, latex: `\\frac{${a}(${k})^2 + ${b}}{${k} + 1} = \\frac{${a * k * k + b}}{${den}}` },
        { title: 'Simplify', explanation: '', latex: `= ${frac(a * k * k + b, den)}` },
      ],
    };
  },
};

const b4: ProblemTemplate = {
  skillId: 'B.4', difficulty: 3,
  generate: () => {
    const k = rndInt(2, 4);
    // (sqrt(x) - sqrt(k))/(x - k) at x = k -> 1/(2 sqrt(k))
    return {
      questionLatex: `\\lim_{x \\to ${k}} \\frac{\\sqrt{x} - \\sqrt{${k}}}{x - ${k}}`,
      correctAnswer: `\\frac{1}{2\\sqrt{${k}}}`,
      acceptedAnswers: [`\\frac{1}{${2 * k}}`, `1/${2 * k}`, `${(1 / (2 * Math.sqrt(k))).toFixed(4)}`, `\\frac{1}{2\\sqrt{${k}}}`],
      hints: [
        'Substitution gives 0/0 again.',
        'Multiply numerator and denominator by the conjugate: √x + √' + k,
        'The numerator becomes a difference of squares: x − ' + k,
      ],
      solutionSteps: [
        { title: 'Multiply by the conjugate', explanation: '', latex: `\\frac{(\\sqrt{x}-\\sqrt{${k}})(\\sqrt{x}+\\sqrt{${k}})}{(x-${k})(\\sqrt{x}+\\sqrt{${k}})}` },
        { title: 'Simplify', explanation: 'The numerator is x − ' + k + ', which cancels.', latex: `\\frac{1}{\\sqrt{x}+\\sqrt{${k}}}` },
        { title: 'Evaluate', explanation: '', latex: `\\frac{1}{\\sqrt{${k}}+\\sqrt{${k}}} = \\frac{1}{${2 * k}\\,\\text{... in exact form: } \\frac{1}{2\\sqrt{${k}}}}` },
      ],
    };
  },
};

const b5: ProblemTemplate = {
  skillId: 'B.5', difficulty: 2,
  generate: () => {
    const k = rndInt(-1, 2);
    const a = rndInt(-4, 2);
    const agree = Math.random() < 0.5;
    const c = agree ? a - k : a - k + rndInt(1, 3);
    return {
      questionLatex: `f(x)=\\begin{cases} ${a} - x & x \\le ${k} \\\\ ${c} & x > ${k} \\end{cases}, \\quad \\lim_{x \\to ${k}} f(x)`,
      questionText: agree
        ? 'Both pieces agree at the boundary. Find the two-sided limit.'
        : 'The pieces disagree at the boundary. If the one-sided limits differ, answer "dne".',
      correctAnswer: agree ? `${a - k}` : 'dne',
      acceptedAnswers: agree ? [`${a - k}`] : ['dne', 'does not exist'],
      hints: [
        'Compute each one-sided limit using the matching piece.',
        'Left uses the ≤ piece; right uses the constant piece.',
        agree ? 'They agree — the limit is that common value.' : 'They disagree — no two-sided limit.',
      ],
      solutionSteps: [
        { title: 'Left-hand limit', explanation: 'Use the first piece.', latex: `\\lim_{x \\to ${k}^-} (${a} - x) = ${a - k}` },
        { title: 'Right-hand limit', explanation: 'Use the constant piece.', latex: `\\lim_{x \\to ${k}^+} ${c} = ${c}` },
        agree
          ? { title: 'Conclusion', explanation: 'The one-sided limits agree.', latex: `\\lim_{x \\to ${k}} f(x) = ${a - k}` }
          : { title: 'Conclusion', explanation: 'The one-sided limits differ, so the limit does not exist.', latex: `\\text{DNE}` },
      ],
    };
  },
};

const b6: ProblemTemplate = {
  skillId: 'B.6', difficulty: 2,
  generate: () => {
    const k = rndInt(-3, 3);
    return {
      questionLatex: `\\lim_{x \\to ${k}} |x - ${k}|`,
      correctAnswer: '0',
      hints: [
        'What does |x − ' + k + '| look like near x = ' + k + '?',
        'Both one-sided limits squeeze to the same value.',
        'Distance from ' + k + ' shrinks to zero.',
      ],
      solutionSteps: [
        { title: 'Left side', explanation: `For x < ${k}, |x − ${k}| = ${k} − x → 0.`, latex: `\\lim_{x \\to ${k}^-} (${k} - x) = 0` },
        { title: 'Right side', explanation: `For x > ${k}, |x − ${k}| = x − ${k} → 0.`, latex: `\\lim_{x \\to ${k}^+} (x - ${k}) = 0` },
        { title: 'Conclusion', explanation: 'Both sides agree.', latex: `\\lim_{x \\to ${k}} |x-${k}| = 0` },
      ],
    };
  },
};

const b7: ProblemTemplate = {
  skillId: 'B.7', difficulty: 3,
  generate: () => {
    return {
      questionLatex: `\\lim_{x \\to 0} x^2 \\sin\\frac{1}{x}`,
      questionText: 'Use the Squeeze Theorem.',
      correctAnswer: '0',
      graphExpr: 'x^2*sin(1/x)',
      hints: [
        'Bound the expression: −1 ≤ sin(1/x) ≤ 1.',
        'Multiply the inequality by x² (which is ≥ 0).',
        'What do both bounds approach as x → 0?',
      ],
      solutionSteps: [
        { title: 'Set up the squeeze', explanation: '', latex: `-x^2 \\le x^2\\sin\\tfrac{1}{x} \\le x^2` },
        { title: 'Take limits of the bounds', explanation: 'Both bounds go to 0.', latex: `\\lim_{x\\to 0} (-x^2) = \\lim_{x\\to 0} x^2 = 0` },
        { title: 'Conclude', explanation: 'By the Squeeze Theorem the limit is 0.', latex: `\\lim_{x\\to 0} x^2\\sin\\tfrac{1}{x} = 0` },
      ],
    };
  },
};

const b8: ProblemTemplate = {
  skillId: 'B.8', difficulty: 3,
  generate: () => {
    const inner = rndInt(1, 3), c = rndInt(1, 4);
    return {
      questionLatex: `\\lim_{x \\to ${c}} \\sqrt{x^2 - ${c * c - inner * inner}}`,
      questionText: `The inner function is continuous and positive near x = ${c}; the outer square root is continuous there too.`,
      correctAnswer: `${inner}`,
      hints: [
        'Continuous functions compose to continuous functions.',
        'Evaluate the inside first at x = ' + c + '.',
        'Then take the square root of that value.',
      ],
      solutionSteps: [
        { title: 'Inner limit', explanation: '', latex: `\\lim_{x \\to ${c}} (x^2 - ${c * c - inner * inner}) = ${c * c}-${c * c - inner * inner} = ${inner * inner}` },
        { title: 'Apply outer function', explanation: 'Continuity of √ lets us pass the limit through.', latex: `\\sqrt{${inner * inner}} = ${inner}` },
      ],
    };
  },
};

// ---------- Category C: Infinite Limits ----------
const c1: ProblemTemplate = {
  skillId: 'C.1', difficulty: 1,
  generate: () => {
    const k = rndInt(-2, 2);
    return {
      questionLatex: `\\lim_{x \\to ${k}} \\frac{1}{(x-${k})^2}`,
      questionText: 'What happens near the vertical asymptote? Answer "infinity" or "-infinity" or "dne".',
      correctAnswer: 'infinity',
      acceptedAnswers: ['infinity', 'inf', '+infinity', '∞', '+∞'],
      graphExpr: `1/((x-${k})^2)`,
      graphTarget: k,
      hints: [
        'The denominator is a square — always positive.',
        'As x → ' + k + ', the denominator shrinks to 0⁺.',
        '1 over a tiny positive number is…?',
      ],
      solutionSteps: [
        { title: 'Analyze the denominator', explanation: '(x − ' + k + ')² > 0 for all x ≠ ' + k + '.', latex: `(x-${k})^2 \\to 0^+` },
        { title: 'Conclusion', explanation: 'The fraction grows without bound.', latex: `\\lim_{x \\to ${k}} \\frac{1}{(x-${k})^2} = \\infty` },
      ],
    };
  },
};

const c2: ProblemTemplate = {
  skillId: 'C.2', difficulty: 2,
  generate: () => {
    const k = rndInt(1, 3);
    return {
      questionLatex: `\\lim_{x \\to ${k}^-} \\frac{1}{x-${k}}`,
      questionText: 'Approach from the left only. Answer "infinity", "-infinity", or "dne".',
      correctAnswer: '-infinity',
      acceptedAnswers: ['-infinity', '-inf', '-∞', 'negative infinity'],
      graphExpr: `1/(x-${k})`,
      graphTarget: k,
      hints: [
        'For x slightly less than ' + k + ', the denominator x − ' + k + ' is…',
        '…a small negative number.',
        '1 ÷ (small negative) is a large negative.',
      ],
      solutionSteps: [
        { title: 'Sign of the denominator', explanation: `For x → ${k}⁻, x − ${k} < 0 and → 0.`, latex: `x - ${k} \\to 0^-` },
        { title: 'Conclusion', explanation: '', latex: `\\lim_{x \\to ${k}^-} \\frac{1}{x-${k}} = -\\infty` },
      ],
    };
  },
};

const c3: ProblemTemplate = {
  skillId: 'C.3', difficulty: 2,
  generate: () => {
    const r1 = rndInt(1, 3), r2 = rndInt(-3, -1);
    return {
      questionLatex: `\\text{Find the vertical asymptotes of } f(x)=\\frac{x+${Math.abs(r2)}}{(x-${r1})(x+${Math.abs(r2)})}`,
      questionText: `Answer as a comma-separated list of x-values, e.g. "2,5". Include only true vertical asymptotes (not holes).`,
      correctAnswer: `${r1}`,
      hints: [
        'Vertical asymptotes occur where the denominator is 0 and does not cancel.',
        'Factor fully, then cancel common factors.',
        `x = ${Math.abs(r2)} is a hole (removable), not an asymptote.`,
      ],
      solutionSteps: [
        { title: 'Factor', explanation: 'The numerator shares a factor with the denominator.', latex: `f(x)=\\frac{x+${Math.abs(r2)}}{(x-${r1})(x+${Math.abs(r2)})}` },
        { title: 'Cancel the hole', explanation: `The factor (x + ${Math.abs(r2)}) cancels — that's a removable discontinuity.`, latex: `f(x)=\\frac{1}{x-${r1}}` },
        { title: 'Asymptote', explanation: `The denominator is zero (and doesn't cancel) at x = ${r1}.`, latex: `x = ${r1}` },
      ],
    };
  },
};

// ---------- Category D: Limits at Infinity ----------
const d1: ProblemTemplate = {
  skillId: 'D.1', difficulty: 2,
  generate: () => {
    const a = rndInt(2, 6), b = rndInt(1, 5), c = rndInt(1, 6);
    return {
      questionLatex: `\\lim_{x \\to \\infty} \\frac{${a}x^2 + ${b}}{${c}x^2 - 1}`,
      correctAnswer: frac(a, c),
      acceptedAnswers: [`${a / c}`],
      hints: [
        'Divide numerator and denominator by the highest power of x.',
        'Every term except the leading ones vanishes as x → ∞.',
        'The limit is the ratio of leading coefficients.',
      ],
      solutionSteps: [
        { title: 'Divide by x²', explanation: '', latex: `\\frac{${a} + ${b}/x^2}{${c} - 1/x^2}` },
        { title: 'Let x → ∞', explanation: 'The 1/x² terms vanish.', latex: `\\frac{${a}}{${c}} = ${frac(a, c)}` },
      ],
    };
  },
};

const d2: ProblemTemplate = {
  skillId: 'D.2', difficulty: 2,
  generate: () => {
    const a = rndInt(1, 5), c = rndInt(1, 5);
    return {
      questionLatex: `\\text{Horizontal asymptote of } y = \\frac{${a}x}{${c}x + 1}`,
      questionText: 'Give the equation of the horizontal asymptote, like "y=3".',
      correctAnswer: `y=${frac(a, c)}`,
      acceptedAnswers: [`y=${a / c}`, `y = ${frac(a, c)}`],
      hints: [
        'Take the limit as x → ∞.',
        'Compare the degrees of numerator and denominator.',
        'Same degree: ratio of leading coefficients.',
      ],
      solutionSteps: [
        { title: 'Limit at infinity', explanation: 'Divide top and bottom by x.', latex: `\\lim_{x\\to\\infty}\\frac{${a}}{${c}+1/x} = \\frac{${a}}{${c}}` },
        { title: 'Asymptote', explanation: '', latex: `y = ${frac(a, c)}` },
      ],
    };
  },
};

// ---------- Category E: Continuity ----------
const e1: ProblemTemplate = {
  skillId: 'E.1', difficulty: 1,
  generate: () => {
    const type = pick(['removable', 'jump', 'infinite']);
    return {
      questionLatex: `\\text{Classify the discontinuity at } x = 2`,
      questionText: `The graph has a ${type === 'removable' ? 'hole (limit exists, value differs or undefined)' : type === 'jump' ? 'sudden jump (one-sided limits differ)' : 'vertical blow-up (limit is infinite)'} at x = 2. Answer: removable, jump, or infinite.`,
      correctAnswer: type,
      hints: [
        'Removable = a hole you could fill with one point.',
        'Jump = both sides exist but disagree.',
        'Infinite = the function blows up.',
      ],
      solutionSteps: [
        { title: 'Check the limit', explanation: type === 'removable' ? 'The two-sided limit exists.' : type === 'jump' ? 'The one-sided limits exist but differ.' : 'The limit is infinite.' },
        { title: 'Classify', explanation: `This is a ${type} discontinuity.` },
      ],
    };
  },
};

const e2: ProblemTemplate = {
  skillId: 'E.2', difficulty: 2,
  generate: () => {
    const k = rndInt(1, 4), c = rndInt(1, 5);
    const patched = Math.random() < 0.5;
    return {
      questionLatex: `f(x)=\\begin{cases} \\frac{x^2-${k * k}}{x-${k}} & x \\neq ${k} \\\\ ${patched ? 2 * k : 2 * k + c} & x = ${k} \\end{cases}`,
      questionText: 'Is f continuous at x = ' + k + '? Answer "yes" or "no".',
      correctAnswer: patched ? 'yes' : 'no',
      acceptedAnswers: patched ? ['yes', 'y'] : ['no', 'n'],
      hints: [
        'Continuity needs: limit exists, value exists, and they are equal.',
        `The limit is ${2 * k} (factor and cancel).`,
        `The defined value is ${patched ? 2 * k : 2 * k + c}.`,
      ],
      solutionSteps: [
        { title: 'Compute the limit', explanation: 'Factor and cancel.', latex: `\\lim_{x\\to ${k}}\\frac{(x-${k})(x+${k})}{x-${k}} = ${2 * k}` },
        { title: 'Compare with the value', explanation: `f(${k}) = ${patched ? 2 * k : 2 * k + c}.`, latex: patched ? `\\lim = f(${k}) \\;\\Rightarrow\\; \\text{continuous}` : `\\lim \\neq f(${k}) \\;\\Rightarrow\\; \\text{discontinuous}` },
      ],
    };
  },
};

const e7: ProblemTemplate = {
  skillId: 'E.7', difficulty: 3,
  generate: () => {
    const c = rndInt(-2, 3);
    return {
      questionLatex: `f(x) = x^3 ${c >= 0 ? '+' : '-'} ${Math.abs(c)} \\text{ on } [-2, 2]`,
      questionText: `By the Intermediate Value Theorem, f must take the value 0 somewhere in (−2, 2) if f(−2) and f(2) have opposite signs. Do they? Answer "yes" or "no".`,
      correctAnswer: 'yes',
      acceptedAnswers: ['yes', 'y'],
      hints: [
        'Compute f(−2) and f(2).',
        'IVT applies to continuous functions on closed intervals.',
        'Polynomials are continuous everywhere.',
      ],
      solutionSteps: [
        { title: 'Evaluate endpoints', explanation: '', latex: `f(-2) = -8 ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${-8 + c},\\quad f(2) = 8 ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${8 + c}` },
        { title: 'Apply IVT', explanation: 'Continuous + opposite signs ⟹ a root exists in (−2, 2).', latex: `\\exists\\, c \\in (-2,2):\\; f(c) = 0` },
      ],
    };
  },
};

// Fallbacks for skills without bespoke templates: generic limit/continuity problems
function genericFor(skillId: string): ProblemTemplate {
  return {
    skillId, difficulty: 2,
    generate: () => {
      const a = rndInt(1, 5), k = rndInt(1, 4);
      return {
        questionLatex: `\\lim_{x \\to ${k}} (${a}x)`,
        questionText: 'General practice problem.',
        correctAnswer: `${a * k}`,
        hints: ['This function is continuous.', 'Use direct substitution.', `Compute ${a}·${k}.`],
        solutionSteps: [{ title: 'Substitute', explanation: 'Continuous function.', latex: `${a}\\cdot${k} = ${a * k}` }],
      };
    },
  };
}

const bespoke: Record<string, ProblemTemplate> = {
  'A.1': a1, 'A.2': a2, 'A.3': a3, 'A.4': a4,
  'B.1': b1, 'B.2': b2, 'B.3': b3, 'B.4': b4, 'B.5': b5, 'B.6': b6, 'B.7': b7, 'B.8': b8,
  'C.1': c1, 'C.2': c2, 'C.3': c3,
  'D.1': d1, 'D.2': d2,
  'E.1': e1, 'E.2': e2, 'E.7': e7,
};

export function getTemplate(skillId: string): ProblemTemplate {
  return bespoke[skillId] ?? genericFor(skillId);
}
