// ===== Lessons — content data + service =====
import { Injectable, signal } from '@angular/core';

export interface LessonStep {
  explanation: string;
  latex?: string;
}

export interface WorkedExample {
  problem: string; // LaTeX
  steps: LessonStep[];
  finalAnswer: string;
}

export interface Lesson {
  skillId: string;
  title: string;
  introduction: string; // plain text (kept short; math via LaTeX fields)
  keyConcepts: Array<{ title: string; latex?: string; explanation: string }>;
  workedExamples: WorkedExample[];
  commonMistakes: string[];
  videoResources: Array<{ title: string; url: string; source: string }>;
}

// ---------- Module I lessons (Categories A-E) ----------

const a1: Lesson = {
  skillId: 'A.1',
  title: 'Find limits using graphs',
  introduction: 'A limit asks: what y-value does a function get close to as x gets close to a number? Reading limits from a graph is the most intuitive way in — you trace the curve with your eyes and watch where it heads.',
  keyConcepts: [
    { title: 'The limit idea', latex: '\\lim_{x \\to a} f(x) = L', explanation: 'As x approaches a (from either side), f(x) approaches L. The limit is about the destination, not arrival — f(a) itself may not even exist.' },
    { title: 'Two sides must agree', latex: '\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x)', explanation: 'Trace from the left and from the right. The two-sided limit exists only if both one-sided limits are equal.' },
    { title: 'Limit ≠ value', latex: '\\lim_{x \\to a} f(x) \\neq f(a) \\text{ possible}', explanation: 'A filled dot elsewhere and a hole at x = a is fine: the limit is where the curve heads, not the plotted point.' },
  ],
  workedExamples: [
    {
      problem: '\\text{From the graph of } f(x)=x+1, \\text{ find } \\lim_{x \\to 2} f(x)',
      steps: [
        { explanation: 'The graph is a straight line with slope 1 and y-intercept 1 — no gaps.' },
        { explanation: 'As x approaches 2 from the left, y approaches 3; from the right, y also approaches 3.' },
      ],
      finalAnswer: '3',
    },
    {
      problem: '\\text{f has a hole at } (4, 5) \\text{ and } f(4)=1. \\text{ Find } \\lim_{x \\to 4} f(x)',
      steps: [
        { explanation: 'The hole does not matter for the limit.' },
        { explanation: 'Both sides of the curve head to a height of 5 near x = 4.' },
      ],
      finalAnswer: '5',
    },
  ],
  commonMistakes: [
    'Reading the value f(a) instead of where the curve is heading.',
    'Forgetting to check both sides — a jump on one side changes everything.',
    'Confusing an open circle (excluded point) with the limit location.',
  ],
  videoResources: [
    { title: 'Introduction to limits', url: 'https://www.youtube.com/embed/YNstP0ESndU', source: 'Khan Academy' },
    { title: 'Estimating limits from graphs', url: 'https://www.youtube.com/embed/OhYGeCCVvLi4', source: 'Khan Academy' },
  ],
};

const a2: Lesson = {
  skillId: 'A.2',
  title: 'Find one-sided limits using graphs',
  introduction: 'Sometimes a function behaves differently on each side of a point. One-sided limits let us describe each side separately — essential for piecewise functions and jump discontinuities.',
  keyConcepts: [
    { title: 'Left-hand limit', latex: '\\lim_{x \\to a^-} f(x)', explanation: 'The value f(x) approaches using only x-values smaller than a. The superscript minus means "from the left".' },
    { title: 'Right-hand limit', latex: '\\lim_{x \\to a^+} f(x)', explanation: 'The value f(x) approaches using only x-values larger than a.' },
    { title: 'Connecting to two-sided limits', latex: '\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} = \\lim_{x \\to a^+} = L', explanation: 'The two-sided limit exists exactly when both one-sided limits exist and are equal.' },
  ],
  workedExamples: [
    {
      problem: 'f(x)=\\begin{cases} 2x & x<3 \\\\ 10-x & x>3 \\end{cases}: \\text{ find both one-sided limits at } 3',
      steps: [
        { explanation: 'From the left, use 2x:', latex: '\\lim_{x \\to 3^-} 2x = 6' },
        { explanation: 'From the right, use 10 − x:', latex: '\\lim_{x \\to 3^+} (10-x) = 7' },
        { explanation: '6 ≠ 7, so the two-sided limit does not exist — the graph jumps.' },
      ],
      finalAnswer: 'Left: 6, Right: 7',
    },
  ],
  commonMistakes: [
    'Using the wrong piece of a piecewise function for a side.',
    'Assuming the two-sided limit always exists.',
    'Mixing up the minus (left) and plus (right) superscripts.',
  ],
  videoResources: [
    { title: 'One-sided limits from graphs', url: 'https://www.youtube.com/embed/PiAFjN9YIyA', source: 'Khan Academy' },
  ],
};

const a3: Lesson = {
  skillId: 'A.3',
  title: 'Determine if a limit exists',
  introduction: 'A limit exists only when the left and right behavior agree. Graphs make this a visual question: do the two branches approach the same height?',
  keyConcepts: [
    { title: 'Existence criterion', latex: '\\lim_{x \\to a} f(x) \\text{ exists} \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x)', explanation: 'Both one-sided limits must exist (be finite) and be equal.' },
    { title: 'When limits fail to exist', latex: '\\text{jump, unbounded growth, oscillation}', explanation: 'Three classic failures: a jump (sides disagree), a vertical asymptote (blow-up), or rapid oscillation like sin(1/x) near 0.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Left limit } = 3, \\text{ right limit } = 3, \\text{ but } f(5) = 8. \\text{ Does } \\lim_{x \\to 5} f(x) \\text{ exist?}',
      steps: [
        { explanation: 'The limit only cares about approach behavior, not the actual value.' },
        { explanation: 'Both sides agree on 3.' },
      ],
      finalAnswer: 'Yes — the limit is 3',
    },
    {
      problem: '\\text{Left limit } = -1, \\text{ right limit } = 4. \\text{ Does the limit exist?}',
      steps: [{ explanation: 'The sides disagree, so no single limit value exists.' }],
      finalAnswer: 'No — DNE',
    },
  ],
  commonMistakes: [
    'Saying the limit is f(a) when it exists.',
    'Declaring DNE just because f(a) is undefined.',
    'Missing oscillation-type nonexistence (e.g. sin(1/x) at 0).',
  ],
  videoResources: [
    { title: 'When does a limit exist?', url: 'https://www.youtube.com/embed/Zm9IeauwNHY', source: 'Khan Academy' },
  ],
};

const a4: Lesson = {
  skillId: 'A.4',
  title: 'Find limits using tables',
  introduction: 'Before algebra tools, numerically: plug in x-values ever closer to the target from both sides and watch what f(x) does. If both columns squeeze toward one number, that is the limit.',
  keyConcepts: [
    { title: 'Numerical approach', latex: 'x = a \\pm 0.1, \\pm 0.01, \\pm 0.001, \\dots', explanation: 'Evaluate f at points approaching a from both sides. The f(x) column reveals the limit.' },
    { title: 'Tables suggest, algebra confirms', latex: '\\text{table} \\Rightarrow \\text{guess},\\ \\text{algebra} \\Rightarrow \\text{proof}', explanation: 'A table gives strong evidence, but only algebra (or known continuity) proves the limit.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Estimate } \\lim_{x \\to 1} \\frac{x^2-1}{x-1} \\text{ with a table}',
      steps: [
        { explanation: 'At x = 0.9, 0.99, 0.999 the function gives 1.9, 1.99, 1.999.' },
        { explanation: 'At x = 1.1, 1.01, 1.001 it gives 2.1, 2.01, 2.001.' },
        { explanation: 'Both columns head to 2 — consistent with factoring and canceling.' },
      ],
      finalAnswer: '2',
    },
  ],
  commonMistakes: [
    'Using x-values only from one side.',
    'Concluding from too few table rows.',
    'Assuming the table value pattern proves the limit for all functions (oscillation can fool you).',
  ],
  videoResources: [
    { title: 'Estimating limits from tables', url: 'https://www.youtube.com/embed/QEq15EycBaE', source: 'Khan Academy' },
  ],
};

const b1: Lesson = {
  skillId: 'B.1',
  title: 'Find limits using the division law',
  introduction: 'When direct substitution produces 0/0 — an indeterminate form — the trick is usually to factor and cancel the term that is causing the zero in both numerator and denominator.',
  keyConcepts: [
    { title: 'Indeterminate 0/0', latex: '\\frac{0}{0} \\text{ is indeterminate}', explanation: '0/0 does not mean the limit is 0 or undefined — it means "keep simplifying to find out".' },
    { title: 'Factor → cancel → substitute', latex: '\\lim_{x \\to a} \\frac{(x-a)g(x)}{x-a} = \\lim_{x \\to a} g(x)', explanation: 'After canceling the (x − a) factor, the remaining function is usually continuous, so substitute.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 3} \\frac{x^2-9}{x-3}',
      steps: [
        { explanation: 'Substitution gives 0/0.', latex: '\\frac{9-9}{3-3} = \\frac{0}{0}' },
        { explanation: 'Factor the difference of squares and cancel:', latex: '\\lim_{x \\to 3} \\frac{(x-3)(x+3)}{x-3} = \\lim_{x \\to 3} (x+3)' },
        { explanation: 'Substitute:', latex: '= 6' },
      ],
      finalAnswer: '6',
    },
    {
      problem: '\\lim_{x \\to -2} \\frac{x^2+5x+6}{x+2}',
      steps: [
        { explanation: 'Factor the quadratic:', latex: 'x^2+5x+6 = (x+2)(x+3)' },
        { explanation: 'Cancel (x + 2) and substitute:', latex: '\\lim_{x \\to -2}(x+3) = 1' },
      ],
      finalAnswer: '1',
    },
  ],
  commonMistakes: [
    'Canceling terms that are not factors (e.g. x² − 9 over x − 3 ≠ x − 3… careful!).',
    'Forgetting that cancellation is valid only in the limit, not at the point itself.',
    'Not checking first whether direct substitution works — always try that first.',
  ],
  videoResources: [
    { title: 'Limits by factoring', url: 'https://www.youtube.com/embed/-ic0OFrFIA0', source: 'Khan Academy' },
  ],
};

const b2: Lesson = {
  skillId: 'B.2',
  title: 'Find limits using limit laws',
  introduction: 'Limits respect algebra: limits of sums are sums of limits, and so on. These laws let you break complicated limits into easy pieces.',
  keyConcepts: [
    { title: 'Sum & difference laws', latex: '\\lim (f \\pm g) = \\lim f \\pm \\lim g', explanation: 'Valid when both individual limits exist.' },
    { title: 'Product & quotient laws', latex: '\\lim (fg) = \\lim f \\cdot \\lim g;\\quad \\lim \\tfrac{f}{g} = \\tfrac{\\lim f}{\\lim g}', explanation: 'For the quotient law the denominator limit must be nonzero.' },
    { title: 'Constant & identity laws', latex: '\\lim c = c,\\quad \\lim x = a', explanation: 'The building blocks everything else reduces to.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 2} (3x^2 - 4x + 1)',
      steps: [
        { explanation: 'Break into pieces using the sum/difference and product laws.' },
        { explanation: 'Each piece is continuous, so:', latex: '3(2)^2 - 4(2) + 1 = 12 - 8 + 1 = 5' },
      ],
      finalAnswer: '5',
    },
  ],
  commonMistakes: [
    'Applying the quotient law when the denominator limit is 0.',
    'Splitting a limit whose pieces do not exist.',
    'Forgetting lim of a constant is the constant.',
  ],
  videoResources: [
    { title: 'Limit properties', url: 'https://www.youtube.com/embed/-ic0OFrFIA0', source: 'Khan Academy' },
  ],
};

const b3: Lesson = {
  skillId: 'B.3',
  title: 'Find limits of polynomials and rational functions',
  introduction: 'Polynomials are continuous everywhere — their limits are just substitution. Rational functions are continuous except where the denominator is zero; there, simplify or analyze one-sided behavior.',
  keyConcepts: [
    { title: 'Polynomial limits', latex: '\\lim_{x \\to a} p(x) = p(a)', explanation: 'Direct substitution always works for polynomials.' },
    { title: 'Rational limits', latex: '\\lim_{x \\to a} \\frac{p}{q} = \\frac{p(a)}{q(a)} \\text{ if } q(a) \\neq 0', explanation: 'If q(a) ≠ 0, substitute. If p(a) = 0 too, factor and cancel. If only q(a) = 0, look for asymptotes.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 1} \\frac{x^2+2x+3}{x+2}',
      steps: [
        { explanation: 'Denominator at 1 is 3 ≠ 0, so substitute:', latex: '\\frac{1+2+3}{3} = 2' },
      ],
      finalAnswer: '2',
    },
  ],
  commonMistakes: [
    'Factoring unnecessarily when direct substitution already works.',
    'Ignoring the denominator check before substituting.',
  ],
  videoResources: [
    { title: 'Limits of rational functions', url: 'https://www.youtube.com/embed/-ic0OFrFIA0', source: 'Khan Academy' },
  ],
};

const b4: Lesson = {
  skillId: 'B.4',
  title: 'Find limits using the conjugate method',
  introduction: 'Square roots resist factoring. The conjugate method multiplies by a clever form of 1 to unlock the 0/0 form.',
  keyConcepts: [
    { title: 'The conjugate', latex: '(\\sqrt{x} - \\sqrt{a})(\\sqrt{x} + \\sqrt{a}) = x - a', explanation: 'Multiplying numerator and denominator by the conjugate creates a difference of squares that cancels.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 4} \\frac{\\sqrt{x}-2}{x-4}',
      steps: [
        { explanation: 'Multiply top and bottom by (√x + 2):', latex: '\\frac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{(x-4)(\\sqrt{x}+2)} = \\frac{x-4}{(x-4)(\\sqrt{x}+2)}' },
        { explanation: 'Cancel and substitute:', latex: '\\lim_{x \\to 4} \\frac{1}{\\sqrt{x}+2} = \\frac{1}{4}' },
      ],
      finalAnswer: '\\frac{1}{4}',
    },
  ],
  commonMistakes: [
    'Multiplying only the numerator (changes the value!).',
    'Forgetting to keep the denominator factored for cancellation.',
  ],
  videoResources: [
    { title: 'Limits with square roots', url: 'https://www.youtube.com/embed/3YICn0dBNlk', source: 'Khan Academy' },
  ],
};

const b5: Lesson = {
  skillId: 'B.5',
  title: 'Find limits of piecewise functions',
  introduction: 'For piecewise functions, approach the boundary point using each piece separately, then compare.',
  keyConcepts: [
    { title: 'Match the piece to the side', latex: 'x \\le a \\Rightarrow \\text{left piece}', explanation: 'The condition tells you which formula to use on each side of the boundary.' },
    { title: 'Compare at the seam', latex: '\\text{left} = \\text{right}?', explanation: 'If the one-sided limits agree, that common value is the limit; otherwise DNE.' },
  ],
  workedExamples: [
    {
      problem: 'f(x)=\\begin{cases} x+1 & x \\le 2 \\\\ 5 & x > 2 \\end{cases}: \\lim_{x \\to 2} f(x)',
      steps: [
        { explanation: 'Left piece:', latex: '\\lim_{x \\to 2^-}(x+1) = 3' },
        { explanation: 'Right piece:', latex: '\\lim_{x \\to 2^+} 5 = 5' },
        { explanation: '3 ≠ 5, so the two-sided limit does not exist.' },
      ],
      finalAnswer: 'DNE',
    },
  ],
  commonMistakes: [
    'Using the wrong piece on a side.',
    'Ignoring the ≤ vs < boundary conditions.',
    'Reporting the value at the seam as the limit without checking.',
  ],
  videoResources: [
    { title: 'Limits of piecewise functions', url: 'https://www.youtube.com/embed/8dDNiV4TNsY', source: 'Khan Academy' },
  ],
};

const b6: Lesson = {
  skillId: 'B.6',
  title: 'Find limits involving absolute value',
  introduction: 'Absolute value is piecewise by nature: |x − a| = x − a on one side, a − x on the other. Split the limit at the corner.',
  keyConcepts: [
    { title: 'Definition to pieces', latex: '|u| = \\begin{cases} u & u \\ge 0 \\\\ -u & u < 0 \\end{cases}', explanation: 'Rewrite the absolute value as a piecewise definition around where the inside is zero.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 3} |x-3|',
      steps: [
        { explanation: 'Left: 3 − x → 0. Right: x − 3 → 0.' },
        { explanation: 'Both sides agree:', latex: '\\lim_{x \\to 3} |x-3| = 0' },
      ],
      finalAnswer: '0',
    },
  ],
  commonMistakes: [
    'Treating |x − a| as never zero.',
    'Forgetting the corner creates one-sided pieces.',
  ],
  videoResources: [
    { title: 'Limits with absolute value', url: 'https://www.youtube.com/embed/8dDNiV4TNsY', source: 'Khan Academy' },
  ],
};

const b7: Lesson = {
  skillId: 'B.7',
  title: 'Find limits using the squeeze theorem',
  introduction: 'When a function oscillates too wildly, pin it between two well-behaved functions that share the same limit — the squeeze theorem does the rest.',
  keyConcepts: [
    { title: 'The theorem', latex: 'g(x) \\le f(x) \\le h(x),\\ \\lim g = \\lim h = L \\Rightarrow \\lim f = L', explanation: 'If f is trapped between two functions converging to the same L, f must converge to L too.' },
    { title: 'Key trig bound', latex: '-1 \\le \\sin(\\cdot) \\le 1', explanation: 'This bound drives most squeeze-theorem problems in first-year calculus.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 0} x^2 \\sin(1/x)',
      steps: [
        { explanation: 'Bound the sine:', latex: '-1 \\le \\sin(1/x) \\le 1' },
        { explanation: 'Multiply by x² ≥ 0:', latex: '-x^2 \\le x^2\\sin(1/x) \\le x^2' },
        { explanation: 'Both bounds → 0, so by squeeze the limit is 0.' },
      ],
      finalAnswer: '0',
    },
  ],
  commonMistakes: [
    'Squeezing with bounds that do not share the same limit.',
    'Multiplying an inequality by a negative quantity without flipping it.',
  ],
  videoResources: [
    { title: 'Squeeze theorem', url: 'https://www.youtube.com/embed/kiwSGSCWns4', source: 'Khan Academy' },
  ],
};

const b8: Lesson = {
  skillId: 'B.8',
  title: 'Find limits of composite functions',
  introduction: 'Continuous functions compose beautifully: the limit of a composition is the outer function applied to the inner limit.',
  keyConcepts: [
    { title: 'Composition law', latex: '\\lim_{x \\to a} f(g(x)) = f\\left(\\lim_{x \\to a} g(x)\\right)', explanation: 'Valid when f is continuous at the inner limit. The outer continuity is the crucial condition.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 1} \\sqrt{x^2+3}',
      steps: [
        { explanation: 'Inner limit:', latex: '\\lim_{x \\to 1}(x^2+3) = 4' },
        { explanation: 'Outer function √ is continuous at 4:', latex: '\\sqrt{4} = 2' },
      ],
      finalAnswer: '2',
    },
  ],
  commonMistakes: [
    'Applying the law when the outer function is discontinuous at the inner limit.',
    'Evaluating the outer function before the inner limit exists.',
  ],
  videoResources: [
    { title: 'Limits by direct substitution', url: 'https://www.youtube.com/embed/-ic0OFrFIA0', source: 'Khan Academy' },
  ],
};

const c1: Lesson = {
  skillId: 'C.1',
  title: 'Find infinite limits from graphs',
  introduction: 'Sometimes a function does not approach a number — it grows without bound. We write ∞ or −∞ to describe the behavior, while remembering the limit still "does not exist" in the strict sense.',
  keyConcepts: [
    { title: 'Infinite limit notation', latex: '\\lim_{x \\to a} f(x) = \\infty', explanation: 'f(x) grows without bound as x → a. The graph climbs a vertical asymptote.' },
    { title: 'Asymptote connection', latex: 'x = a \\text{ VA} \\iff f \\to \\pm\\infty', explanation: 'Infinite limits at a point are exactly vertical asymptotes.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 0} \\frac{1}{x^2}',
      steps: [
        { explanation: 'The denominator is positive on both sides and shrinks to 0.' },
        { explanation: 'So the fraction grows without bound:', latex: '= \\infty' },
      ],
      finalAnswer: '\\infty',
    },
  ],
  commonMistakes: [
    'Treating ∞ as a real number answer.',
    'Not checking the sign on each side of the asymptote.',
  ],
  videoResources: [
    { title: 'Vertical asymptotes & infinite limits', url: 'https://www.youtube.com/embed/_X0s6L9KjK0', source: 'Khan Academy' },
  ],
};

const c2: Lesson = {
  skillId: 'C.2',
  title: 'Find infinite limits algebraically',
  introduction: 'To find infinite limits by hand: factor the denominator, find where it vanishes, and test the sign of each side.',
  keyConcepts: [
    { title: 'Sign analysis', latex: '\\text{sign of } \\frac{1}{x-a} \\text{ flips at } a', explanation: 'Odd powers flip sign across the asymptote; even powers do not.' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to 2^-} \\frac{1}{x-2}',
      steps: [
        { explanation: 'From the left, x − 2 is a small negative number.' },
        { explanation: 'So the fraction is large negative:', latex: '= -\\infty' },
      ],
      finalAnswer: '-\\infty',
    },
  ],
  commonMistakes: [
    'Assuming both sides always agree (they do for squares, not for odd powers).',
    'Reporting −∞ when the two-sided behavior is +∞ on one side.',
  ],
  videoResources: [
    { title: 'Infinite limits algebraically', url: 'https://www.youtube.com/embed/_X0s6L9KjK0', source: 'Khan Academy' },
  ],
};

const c3: Lesson = {
  skillId: 'C.3',
  title: 'Find vertical asymptotes using limits',
  introduction: 'A vertical asymptote lives where the denominator is zero and the numerator is not — and the factor does not cancel.',
  keyConcepts: [
    { title: 'VA criterion', latex: 'q(a) = 0,\\ p(a) \\neq 0 \\Rightarrow x = a \\text{ is a VA}', explanation: 'If both are zero, factor first — the canceled factor is a hole, not an asymptote.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Find the VAs of } f(x)=\\frac{x-1}{(x-2)(x+3)}',
      steps: [
        { explanation: 'Denominator zeros: x = 2 and x = −3; numerator nonzero at both.' },
        { explanation: 'No cancellation, so both are vertical asymptotes.' },
      ],
      finalAnswer: 'x = 2, x = −3',
    },
  ],
  commonMistakes: [
    'Calling canceled factors asymptotes (they are holes).',
    'Forgetting to factor the denominator completely.',
  ],
  videoResources: [
    { title: 'Vertical asymptotes', url: 'https://www.youtube.com/embed/_X0s6L9KjK0', source: 'Khan Academy' },
  ],
};

const d1: Lesson = {
  skillId: 'D.1',
  title: 'Find limits at infinity of rational functions',
  introduction: 'As x grows enormous, only the leading terms matter. Compare degrees to know the answer instantly.',
  keyConcepts: [
    { title: 'Degree comparison', latex: '\\deg p < \\deg q \\Rightarrow 0', explanation: 'Smaller top: limit 0. Equal degrees: ratio of leading coefficients. Bigger top: the limit is ±∞ (no horizontal asymptote).' },
  ],
  workedExamples: [
    {
      problem: '\\lim_{x \\to \\infty} \\frac{3x^2+1}{5x^2-2}',
      steps: [
        { explanation: 'Divide by x²:', latex: '\\frac{3 + 1/x^2}{5 - 2/x^2}' },
        { explanation: 'The small terms vanish:', latex: '= \\frac{3}{5}' },
      ],
      finalAnswer: '\\frac{3}{5}',
    },
  ],
  commonMistakes: [
    'Dividing by x instead of the highest power.',
    'Saying a limit "equals ∞" as if it were a number — describe behavior instead.',
  ],
  videoResources: [
    { title: 'Limits at infinity', url: 'https://www.youtube.com/embed/c9AcdZaMfNU', source: 'Khan Academy' },
  ],
};

const d2: Lesson = {
  skillId: 'D.2',
  title: 'Find horizontal asymptotes using limits',
  introduction: 'A horizontal asymptote is the line y = L where L is the limit at ±∞ (when that limit is finite).',
  keyConcepts: [
    { title: 'Definition', latex: 'y = L \\text{ HA} \\iff \\lim_{x \\to \\pm\\infty} f = L', explanation: 'One function can cross its horizontal asymptote — HA describes end behavior only.' },
  ],
  workedExamples: [
    {
      problem: '\\text{HA of } y = \\frac{4x+1}{2x-3}',
      steps: [
        { explanation: 'Equal degrees → ratio of leading coefficients:', latex: 'y = \\frac{4}{2} = 2' },
      ],
      finalAnswer: 'y = 2',
    },
  ],
  commonMistakes: [
    'Assuming the graph never touches the asymptote.',
    'Reporting HA when the degree of the top is larger (that is a slant case).',
  ],
  videoResources: [
    { title: 'Horizontal asymptotes', url: 'https://www.youtube.com/embed/c9AcdZaMfNU', source: 'Khan Academy' },
  ],
};

const e1: Lesson = {
  skillId: 'E.1',
  title: 'Identify continuity from graphs',
  introduction: 'A function is continuous at a point if you can draw the graph through it without lifting your pen.',
  keyConcepts: [
    { title: 'The pen test', latex: '\\text{no holes, jumps, or breaks}', explanation: 'Continuous = unbroken. Graphically: no holes, no jumps, no vertical asymptotes.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Which points break continuity on a graph with a hole at } (2,1)?',
      steps: [{ explanation: 'A hole is a removable discontinuity — the limit exists but the value is missing.' }],
      finalAnswer: 'x = 2 (removable)',
    },
  ],
  commonMistakes: [
    'Calling a hole a jump.',
    'Treating endpoints as discontinuities without checking one-sided behavior.',
  ],
  videoResources: [
    { title: 'Continuity and discontinuities', url: 'https://www.youtube.com/embed/h9eigvGlnQQ', source: 'Khan Academy' },
  ],
};

const e2: Lesson = {
  skillId: 'E.2',
  title: 'Determine continuity at a point',
  introduction: 'The three-part continuity checklist: the function must be defined, the limit must exist, and they must agree.',
  keyConcepts: [
    { title: 'Continuity checklist', latex: 'f(a) \\text{ defined},\\ \\lim_{x \\to a} f = L,\\ L = f(a)', explanation: 'All three conditions must hold; failing any one means a discontinuity at a.' },
  ],
  workedExamples: [
    {
      problem: 'f(x)=\\frac{x^2-4}{x-2} \\text{ for } x \\neq 2,\\ f(2)=4: \\text{ continuous at } 2?',
      steps: [
        { explanation: 'Limit:', latex: '\\lim_{x\\to 2}\\frac{(x-2)(x+2)}{x-2} = 4' },
        { explanation: 'Value: f(2) = 4. Limit = value, and the function is defined.' },
      ],
      finalAnswer: 'Yes — continuous',
    },
  ],
  commonMistakes: [
    'Checking only the limit, not the value.',
    'Checking only the value, not the limit.',
  ],
  videoResources: [
    { title: 'Continuity at a point', url: 'https://www.youtube.com/embed/h9eigvGlnQQ', source: 'Khan Academy' },
  ],
};

const e3: Lesson = {
  skillId: 'E.3',
  title: 'Determine continuity on an interval',
  introduction: 'Continuous on an interval means continuous at every interior point, with one-sided continuity at the endpoints.',
  keyConcepts: [
    { title: 'Interval continuity', latex: '\\text{continuous on } [a,b]', explanation: 'Continuous at every point of (a, b), plus right-continuity at a and left-continuity at b.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Where is } f(x)=\\sqrt{x} \\text{ continuous?}',
      steps: [
        { explanation: 'Defined for x ≥ 0; continuous on its whole domain.' },
        { explanation: 'Right-continuous at 0.' },
      ],
      finalAnswer: '[0, ∞)',
    },
  ],
  commonMistakes: [
    'Demanding two-sided continuity at endpoints.',
    'Forgetting domain restrictions like even roots.',
  ],
  videoResources: [
    { title: 'Continuity on an interval', url: 'https://www.youtube.com/embed/h9eigvGlnQQ', source: 'Khan Academy' },
  ],
};

const e4: Lesson = {
  skillId: 'E.4',
  title: 'Find and classify discontinuities',
  introduction: 'Three species: removable (hole), jump (step), and infinite (asymptote). Classification tells you how bad the break is.',
  keyConcepts: [
    { title: 'The three types', latex: '\\text{removable} \\mid \\text{jump} \\mid \\text{infinite}', explanation: 'Removable: limit exists. Jump: one-sided limits differ. Infinite: limit is ±∞.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Classify the discontinuity of } f(x)=\\frac{x^2-1}{x-1}',
      steps: [
        { explanation: 'Limit exists (2) but f(1) undefined → removable.' },
      ],
      finalAnswer: 'Removable at x = 1',
    },
  ],
  commonMistakes: [
    'Labeling all discontinuities "infinite".',
    'Missing that a missing point with an existing limit is removable, not DNE-everything.',
  ],
  videoResources: [
    { title: 'Types of discontinuities', url: 'https://www.youtube.com/embed/h9eigvGlnQQ', source: 'Khan Academy' },
  ],
};

const e5: Lesson = {
  skillId: 'E.5',
  title: 'Removable discontinuities',
  introduction: 'A removable discontinuity is a hole you can patch with a single point — the limit exists, but the value is missing or wrong.',
  keyConcepts: [
    { title: 'Patching', latex: 'f(a) := \\lim_{x \\to a} f(x)', explanation: 'Define (or redefine) f(a) as the limit and the function becomes continuous.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Patch } f(x)=\\frac{x^2-9}{x-3} \\text{ to be continuous}',
      steps: [
        { explanation: 'Limit:', latex: '\\lim_{x\\to 3}(x+3) = 6' },
        { explanation: 'Define f(3) = 6.' },
      ],
      finalAnswer: 'f(3) = 6',
    },
  ],
  commonMistakes: [
    'Patching with the function value instead of the limit.',
    'Forgetting removable discontinuities are invisible on many graphing calculators.',
  ],
  videoResources: [
    { title: 'Removable discontinuities', url: 'https://www.youtube.com/embed/h9eigvGlnQQ', source: 'Khan Academy' },
  ],
};

const e6: Lesson = {
  skillId: 'E.6',
  title: 'Continuity of piecewise functions',
  introduction: 'Piecewise functions are continuous wherever each piece is continuous and the pieces meet correctly at the seams.',
  keyConcepts: [
    { title: 'Seam condition', latex: '\\text{left limit} = \\text{right limit} = f(a)', explanation: 'At each boundary point, all three continuity conditions must hold across the pieces.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Find } k \\text{ so that } f(x)=\\begin{cases} x^2 & x \\le 1 \\\\ kx+1 & x>1 \\end{cases} \\text{ is continuous}',
      steps: [
        { explanation: 'Left limit at 1:', latex: '1^2 = 1' },
        { explanation: 'Right limit:', latex: 'k(1)+1 = k+1' },
        { explanation: 'Set equal:', latex: 'k + 1 = 1 \\Rightarrow k = 0' },
      ],
      finalAnswer: 'k = 0',
    },
  ],
  commonMistakes: [
    'Matching values instead of limits at the seam.',
    'Forgetting to check each piece is continuous on its own domain.',
  ],
  videoResources: [
    { title: 'Piecewise continuity', url: 'https://www.youtube.com/embed/h9eigvGlnQQ', source: 'Khan Academy' },
  ],
};

const e7: Lesson = {
  skillId: 'E.7',
  title: 'Intermediate Value Theorem',
  introduction: 'If a continuous function takes two values, it takes every value in between — that promise is the IVT.',
  keyConcepts: [
    { title: 'The theorem', latex: 'f \\text{ cont. on } [a,b],\\ N \\in [f(a),f(b)] \\Rightarrow \\exists\\, c: f(c) = N', explanation: 'Continuous + sign change guarantees a root; more generally, every intermediate value is achieved.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Show } x^3 + x - 3 = 0 \\text{ has a root in } (1, 2)',
      steps: [
        { explanation: 'f is a polynomial — continuous everywhere.' },
        { explanation: 'Endpoints:', latex: 'f(1) = -1 < 0,\\ f(2) = 7 > 0' },
        { explanation: 'Sign change + continuity ⟹ root exists in (1, 2) by IVT.' },
      ],
      finalAnswer: 'Root exists in (1, 2)',
    },
  ],
  commonMistakes: [
    'Applying IVT to discontinuous functions.',
    'Concluding where the root is — IVT guarantees existence, not location.',
  ],
  videoResources: [
    { title: 'Intermediate Value Theorem', url: 'https://www.youtube.com/embed/2h5MpD2p1Co', source: 'Khan Academy' },
  ],
};

const e8: Lesson = {
  skillId: 'E.8',
  title: 'Continuity and limits combined review',
  introduction: 'A capstone: mix limit evaluation, continuity checks, and classification into multi-step problems.',
  keyConcepts: [
    { title: 'Strategy', latex: '\\text{substitute} \\to \\text{simplify} \\to \\text{classify}', explanation: 'Always try direct substitution first; if 0/0, simplify; then decide continuity from limit vs value.' },
  ],
  workedExamples: [
    {
      problem: '\\text{Analyze } f(x)=\\frac{x^2-4}{x^2-3x+2} \\text{ completely}',
      steps: [
        { explanation: 'Factor:', latex: '\\frac{(x-2)(x+2)}{(x-1)(x-2)} = \\frac{x+2}{x-1},\\ x \\neq 2' },
        { explanation: 'Hole at x = 2 (limit 4), VA at x = 1.' },
      ],
      finalAnswer: 'Hole at x = 2; VA at x = 1',
    },
  ],
  commonMistakes: [
    'Stopping after one factor instead of fully analyzing.',
    'Mixing up holes and asymptotes.',
  ],
  videoResources: [
    { title: 'Limits review', url: 'https://www.youtube.com/embed/-ic0OFrFIA0', source: 'Khan Academy' },
  ],
};

const LESSONS: Lesson[] = [
  a1, a2, a3, a4, b1, b2, b3, b4, b5, b6, b7, b8,
  c1, c2, c3, d1, d2,
  e1, e2, e3, e4, e5, e6, e7, e8,
];

@Injectable({ providedIn: 'root' })
export class LessonService {
  private readonly cache = new Map<string, Lesson>();
  readonly count = signal(LESSONS.length);

  getLesson(skillId: string): Lesson | null {
    if (this.cache.has(skillId)) return this.cache.get(skillId)!;
    const lesson = LESSONS.find((l) => l.skillId === skillId) ?? null;
    if (lesson) this.cache.set(skillId, lesson);
    return lesson;
  }

  hasLesson(skillId: string): boolean {
    return LESSONS.some((l) => l.skillId === skillId);
  }
}
