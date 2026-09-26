// ===== Problem Templates — Modules III–VI (Categories K-W) =====
import {
  GeneratedProblem, ProblemTemplate,
  rndInt, pick, frac,
} from './problem-engine';

export function makeAdvancedTemplates(skillId: string): ProblemTemplate[] {
  const pool: Array<() => GeneratedProblem> = [];
  const S = skillId;

  // ============ K: Curve Analysis ============
  if (S === 'K.1') {
    pool.push(() => {
      const a = rndInt(1, 4);
      return {
        questionLatex: `f(x) = x^2 - ${a * 2}x. \\text{ On which interval is } f \\text{ decreasing?}`,
        questionText: 'Answer like "x<3" or "(-infinity,3)".',
        correctAnswer: `x<${a}`,
        acceptedAnswers: [`(-infinity,${a})`, `(-inf,${a})`, `x < ${a}`],
        hints: [
          'Find f′(x) first.',
          `f′(x) = 2x − ${2 * a}`,
          'f is decreasing where f′ < 0.',
        ],
        solutionSteps: [
          { title: 'Derivative', explanation: '', latex: `f'(x) = 2x - ${2 * a}` },
          { title: 'Solve f′ < 0', explanation: '', latex: `2x - ${2 * a} < 0 \\Rightarrow x < ${a}` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(1, 3);
      return {
        questionLatex: `f(x) = -x^2 + ${2 * a}x. \\text{ On which interval is } f \\text{ increasing?}`,
        correctAnswer: `x<${a}`,
        acceptedAnswers: [`(-infinity,${a})`, `x < ${a}`],
        hints: [
          'f′(x) = −2x + ' + (2 * a),
          'Increasing where f′ > 0.',
          'Solve the inequality.',
        ],
        solutionSteps: [
          { title: 'Derivative', explanation: '', latex: `f'(x) = -2x + ${2 * a}` },
          { title: 'Solve f′ > 0', explanation: '', latex: `x < ${a}` },
        ],
      };
    });
  }

  if (S === 'K.3') {
    pool.push(() => {
      const a = rndInt(1, 4);
      return {
        questionLatex: `f(x)=x^2 - ${2 * a}x + 1.\\ \\text{Find the } x\\text{-coordinate of the relative minimum.}`,
        correctAnswer: `${a}`,
        hints: [
          'Critical points where f′(x) = 0.',
          `f′(x) = 2x − ${2 * a}`,
          'f′ changes − to + there, so it is a minimum.',
        ],
        solutionSteps: [
          { title: 'Critical point', explanation: '', latex: `f'(x) = 2x - ${2 * a} = 0 \\Rightarrow x = ${a}` },
          { title: 'Classify', explanation: 'f″ = 2 > 0, so a minimum.', latex: `f''(x) = 2 > 0` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(1, 3);
      return {
        questionLatex: `f(x)=-x^3 + ${3 * a}x.\\ \\text{Relative maximum at } x = \\,?`,
        correctAnswer: `${a}`,
        hints: [
          'f′(x) = −3x² + ' + (3 * a),
          'Set f′ = 0: x² = ' + a * a,
          'Check the sign change: + to − means a maximum.',
        ],
        solutionSteps: [
          { title: 'Critical points', explanation: '', latex: `-3x^2 + ${3 * a} = 0 \\Rightarrow x = \\pm ${a}` },
          { title: 'First derivative test', explanation: `At x = ${a}, f′ goes + to −: maximum.`, latex: `x = ${a}` },
        ],
      };
    });
  }

  // ============ L: Concavity ============
  if (S === 'L.2') {
    pool.push(() => {
      return {
        questionLatex: `f(x) = x^3. \\text{ Where is } f \\text{ concave up?}`,
        correctAnswer: `x>0`,
        acceptedAnswers: [`(0,infinity)`, `x > 0`],
        hints: [
          'Concavity is read from the sign of f″.',
          'f′ = 3x², f″ = 6x.',
          'f″ > 0 when x > 0.',
        ],
        solutionSteps: [
          { title: 'Second derivative', explanation: '', latex: `f''(x) = 6x` },
          { title: 'Sign', explanation: 'Positive for x > 0 → concave up.', latex: `x > 0` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(1, 3);
      return {
        questionLatex: `f(x)=x^3 - ${3 * a}x^2. \\text{ Find the inflection point's } x\\text{-coordinate.}`,
        correctAnswer: `${a}`,
        hints: [
          'f″(x) = 6x − ' + (6 * a),
          'Inflection where f″ = 0 AND changes sign.',
          `x = ${a}; the sign does flip (linear f″).`,
        ],
        solutionSteps: [
          { title: 'Second derivative', explanation: '', latex: `f''(x) = 6x - ${6 * a}` },
          { title: 'Set to zero', explanation: '', latex: `x = ${a}` },
        ],
      };
    });
  }

  // ============ M: Absolute Extrema & Optimization ============
  if (S === 'M.2') {
    pool.push(() => {
      const a = rndInt(1, 3);
      return {
        questionLatex: `f(x)=x^2 \\text{ on } [-${a}, ${a + 1}]. \\text{ Find the absolute minimum value.}`,
        correctAnswer: `0`,
        hints: [
          'Candidates: critical points inside the interval + endpoints.',
          'f′ = 2x = 0 at x = 0, which is inside.',
          'Compare f(0) with the endpoint values.',
        ],
        solutionSteps: [
          { title: 'Critical point', explanation: '', latex: `x = 0,\\ f(0) = 0` },
          { title: 'Endpoints', explanation: `f(−${a}) = ${a * a}, f(${a + 1}) = ${(a + 1) * (a + 1)} — both larger.` },
          { title: 'Conclusion', explanation: 'Absolute minimum is 0.', latex: `\\min f = 0` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(1, 3);
      return {
        questionLatex: `f(x) = ${a}x + 2 \\text{ on } [1, 4]. \\text{ Absolute maximum value?}`,
        correctAnswer: `${a * 4 + 2}`,
        hints: [
          'Lines are monotonic — extrema sit at endpoints.',
          `f(4) = ${a * 4 + 2}, f(1) = ${a + 2}`,
          'The larger value wins.',
        ],
        solutionSteps: [
          { title: 'Evaluate endpoints', explanation: '', latex: `f(1)=${a + 2},\\ f(4)=${a * 4 + 2}` },
          { title: 'Compare', explanation: `Maximum is ${a * 4 + 2}.` },
        ],
      };
    });
  }

  if (S === 'M.3') {
    pool.push(() => {
      const P = rndInt(20, 60);
      const side = Math.sqrt(P / 6); // minimize surface for box... simpler: square pen
      return {
        questionLatex: `\\text{A farmer has } ${P}\\ \\text{m of fence for a rectangular pen. What width maximizes the area?}`,
        questionText: 'The pen has width w and length L = P/2 − w (half the fence each way). Give w.',
        correctAnswer: `${frac(P, 4)}`,
        acceptedAnswers: [`${P / 4}`],
        hints: [
          'Perimeter: 2w + 2L = P, so L = P/2 − w.',
          'Area A(w) = w(P/2 − w) — a downward parabola.',
          'Vertex at w = P/4.',
        ],
        solutionSteps: [
          { title: 'Set up', explanation: '', latex: `A(w) = w\\left(\\tfrac{${P}}{2} - w\\right)` },
          { title: 'Maximize', explanation: '', latex: `A'(w) = \\tfrac{${P}}{2} - 2w = 0 \\Rightarrow w = \\tfrac{${P}}{4}` },
        ],
      };
    });
    pool.push(() => {
      const n = rndInt(2, 6);
      return {
        questionLatex: `\\text{Two numbers sum to } ${2 * n}. \\text{ Maximize their product. What is the first number?}`,
        correctAnswer: `${n}`,
        hints: [
          'Let the numbers be x and S − x.',
          'Product P(x) = x(S − x).',
          'Maximize: P′ = S − 2x = 0.',
        ],
        solutionSteps: [
          { title: 'Set up', explanation: '', latex: `P(x) = x(${2 * n} - x)` },
          { title: 'Critical point', explanation: '', latex: `P'(x) = ${2 * n} - 2x = 0 \\Rightarrow x = ${n}` },
          { title: 'Confirm max', explanation: 'P″ = −2 < 0: maximum.' },
        ],
      };
    });
  }

  // ============ N: MVT ============
  if (S === 'N.1') {
    pool.push(() => {
      const a = rndInt(1, 3);
      const c = Math.sqrt(a); // f(x)=x^2 on [0,a] -> c = a/2... wait: 2c = (a^2-0)/a => c = a/2
      const cVal = a / 2;
      return {
        questionLatex: `f(x)=x^2 \\text{ on } [0, ${a}]. \\text{ Find the } c \\text{ guaranteed by MVT.}`,
        correctAnswer: `${cVal}`,
        acceptedAnswers: [`${a}/2`],
        hints: [
          'MVT: f′(c) = (f(b) − f(a)) / (b − a).',
          `Slope = (${a * a} − 0)/(${a}) = ${a}`,
          `Solve 2c = ${a}.`,
        ],
        solutionSteps: [
          { title: 'Average slope', explanation: '', latex: `\\frac{f(${a}) - f(0)}{${a} - 0} = ${a}` },
          { title: 'Set f′(c) equal', explanation: '', latex: `2c = ${a} \\Rightarrow c = ${cVal}` },
        ],
      };
    });
    pool.push(() => {
      return {
        questionLatex: `f(x)=x^3 \\text{ on } [0, 3]. \\text{ MVT } c = \\, ?`,
        correctAnswer: `3`,
        acceptedAnswers: ['3'],
        hints: [
          'Slope = (27 − 0)/3 = 9.',
          'f′(c) = 3c² = 9.',
          'c² = 3, c = √3 ≈ 1.73 (in [0,3]).',
        ],
        solutionSteps: [
          { title: 'Average slope', explanation: '', latex: `\\frac{27 - 0}{3} = 9` },
          { title: 'Solve', explanation: '', latex: `3c^2 = 9 \\Rightarrow c = \\sqrt{3} \\approx 1.73` },
        ],
      };
    });
  }

  // ============ O: Motion ============
  if (S === 'O.1') {
    pool.push(() => {
      const a = rndInt(2, 6);
      return {
        questionLatex: `s(t) = t^3 - ${a}t^2. \\text{ Find the velocity } v(t).`,
        correctAnswer: `3t^2 - ${2 * a}t`,
        acceptedAnswers: [`3*t^2 - ${2 * a}*t`],
        hints: [
          'Velocity is the derivative of position.',
          'Differentiate term by term.',
          'd/dt t³ = 3t², d/dt t² = 2t.',
        ],
        solutionSteps: [
          { title: 'Differentiate', explanation: '', latex: `v(t) = s'(t) = 3t^2 - ${2 * a}t` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(2, 4);
      return {
        questionLatex: `v(t) = ${a}t. \\text{ Find the acceleration } a(t).`,
        correctAnswer: `${a}`,
        hints: [
          'Acceleration is the derivative of velocity.',
          'd/dt of a linear function is its slope.',
          `a(t) = ${a}.`,
        ],
        solutionSteps: [
          { title: 'Differentiate', explanation: '', latex: `a(t) = v'(t) = ${a}` },
        ],
      };
    });
  }

  // ============ P: Other Applications ============
  if (S === 'P.2') {
    pool.push(() => {
      const n = rndInt(1, 4);
      return {
        questionLatex: `\\lim_{x \\to \\infty} \\frac{\\ln x}{x^{${n}}} \\quad \\text{(use L'Hôpital)}`,
        correctAnswer: `0`,
        hints: [
          '∞/∞ form — L\'Hôpital applies.',
          'Differentiate top and bottom separately.',
          `Becomes (1/x)/(${n}x^${n - 1}) = 1/(${n}x^${n}).`,
        ],
        solutionSteps: [
          { title: "Apply L'Hôpital", explanation: '', latex: `\\lim \\frac{1/x}{${n}x^{${n - 1}}}` },
          { title: 'Simplify', explanation: '', latex: `\\lim \\frac{1}{${n}x^{${n}}} = 0` },
        ],
      };
    });
    pool.push(() => {
      const k = rndInt(1, 3);
      return {
        questionLatex: `\\lim_{x \\to 0} \\frac{\\sin(${k}x)}{x}`,
        correctAnswer: `${k}`,
        hints: [
          '0/0 form — L\'Hôpital works.',
          'Derivative of sin(' + k + 'x) is ' + k + 'cos(' + k + 'x).',
          'Derivative of x is 1.',
        ],
        solutionSteps: [
          { title: "L'Hôpital", explanation: '', latex: `\\lim \\frac{${k}\\cos(${k}x)}{1}` },
          { title: 'Evaluate', explanation: '', latex: `${k}\\cos 0 = ${k}` },
        ],
      };
    });
  }

  // ============ Q: Antiderivatives ============
  if (S === 'Q.1' || S === 'Q.2') {
    pool.push(() => {
      const n = rndInt(2, 5);
      return {
        questionLatex: `\\int x^{${n}}\\,dx`,
        questionText: 'Use "+C" in your answer, e.g. "x^3/3+C".',
        correctAnswer: `x^${n + 1}/${n + 1}+C`,
        acceptedAnswers: [`\\frac{x^{${n + 1}}}{${n + 1}}+C`, `x^${n + 1}/${n + 1} + C`, `(1/${n + 1})x^${n + 1}+C`],
        hints: [
          'Power rule for integration: ∫xⁿ dx = x^(n+1)/(n+1) + C.',
          `New exponent: ${n + 1}.`,
          'Don\'t forget +C!',
        ],
        solutionSteps: [
          { title: 'Power rule', explanation: '', latex: `\\int x^{${n}}dx = \\frac{x^{${n + 1}}}{${n + 1}} + C` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(2, 6), n = rndInt(1, 3);
      return {
        questionLatex: `\\int ${a}x^{${n}}\\,dx`,
        questionText: 'Include +C.',
        correctAnswer: `${a}x^${n + 1}/${n + 1}+C`,
        acceptedAnswers: [`\\frac{${a}x^{${n + 1}}}{${n + 1}}+C`, `${a / (n + 1)}x^${n + 1}+C`],
        hints: [
          'Constants factor out of integrals.',
          `∫x^${n} dx = x^${n + 1}/${n + 1}.`,
          `Multiply by ${a}, add C.`,
        ],
        solutionSteps: [
          { title: 'Factor the constant', explanation: '', latex: `${a}\\int x^{${n}}dx = ${a}\\cdot\\frac{x^{${n + 1}}}{${n + 1}} + C` },
        ],
      };
    });
  }

  if (S === 'R.4' || S === 'R.5') {
    pool.push(() => {
      const n = rndInt(1, 3), a = rndInt(0, 1), b = a + rndInt(1, 2);
      const val = (Math.pow(b, n + 1) - Math.pow(a, n + 1)) / (n + 1);
      return {
        questionLatex: `\\int_{${a}}^{${b}} x^{${n}}\\,dx`,
        correctAnswer: `${Number(val.toFixed(4))}`,
        acceptedAnswers: [`${frac(Math.round((Math.pow(b, n + 1) - Math.pow(a, n + 1)) * 100), (n + 1) * 100)}`],
        hints: [
          'FTC: F(b) − F(a) where F is any antiderivative.',
          `F(x) = x^${n + 1}/${n + 1}`,
          `Compute F(${b}) − F(${a}).`,
        ],
        solutionSteps: [
          { title: 'Antiderivative', explanation: '', latex: `F(x) = \\frac{x^{${n + 1}}}{${n + 1}}` },
          { title: 'Evaluate', explanation: '', latex: `F(${b}) - F(${a}) = ${frac(Math.round((Math.pow(b, n + 1) - Math.pow(a, n + 1)) * 100), (n + 1) * 100)}` },
        ],
      };
    });
    pool.push(() => {
      const k = rndInt(2, 5), b = rndInt(1, 3);
      return {
        questionLatex: `\\int_{0}^{${b}} ${k}x\\,dx`,
        correctAnswer: `${(k * b * b) / 2}`,
        acceptedAnswers: [`${frac(k * b * b, 2)}`],
        hints: [
          `F(x) = ${frac(k, 2)}x²`,
          `F(${b}) = ${frac(k * b * b, 2)}, F(0) = 0.`,
          'Subtract.',
        ],
        solutionSteps: [
          { title: 'FTC', explanation: '', latex: `\\left[${frac(k, 2)}x^2\\right]_0^{${b}} = ${frac(k * b * b, 2)}` },
        ],
      };
    });
  }

  if (S === 'S.1' || S === 'S.2') {
    pool.push(() => {
      const a = rndInt(1, 5);
      return {
        questionLatex: `\\int ${a}x\\,\\cos(x^2)\\,dx \\quad \\text{(use } u\\text{-substitution)}`,
        questionText: 'Hint: u = x². Include +C.',
        correctAnswer: `${a}/2*sin(x^2)+C`,
        acceptedAnswers: [`\\frac{${a}}{2}\\sin(x^2)+C`, `${a / 2}*sin(x^2)+C`],
        hints: [
          'Let u = x², so du = 2x dx.',
          `The integrand has ${a}x dx = (${a}/2) du.`,
          '∫cos(u) du = sin(u) + C.',
        ],
        solutionSteps: [
          { title: 'Substitute', explanation: '', latex: `u = x^2,\\ du = 2x\\,dx` },
          { title: 'Integrate', explanation: '', latex: `\\frac{${a}}{2}\\int \\cos u\\,du = \\frac{${a}}{2}\\sin u + C` },
          { title: 'Back-substitute', explanation: '', latex: `\\frac{${a}}{2}\\sin(x^2) + C` },
        ],
      };
    });
    pool.push(() => {
      return {
        questionLatex: `\\int \\frac{(\ln x)^2}{x}\\,dx`,
        questionText: 'Try u = ln x. Include +C.',
        correctAnswer: `(ln(x))^3/3+C`,
        acceptedAnswers: [`\\frac{(\\ln x)^3}{3}+C`, `ln(x)^3/3+C`],
        hints: [
          'u = ln x gives du = dx/x.',
          'The integral becomes ∫u² du.',
          '∫u² du = u³/3.',
        ],
        solutionSteps: [
          { title: 'Substitute', explanation: '', latex: `u = \\ln x,\\ du = \\frac{dx}{x}` },
          { title: 'Integrate and back-substitute', explanation: '', latex: `\\frac{u^3}{3} = \\frac{(\\ln x)^3}{3} + C` },
        ],
      };
    });
  }

  if (S === 'T.4') {
    pool.push(() => {
      const a = rndInt(1, 3), b = a + rndInt(1, 3);
      const avg = (b + a) / 2; // average of f(x)=x on [a,b]
      return {
        questionLatex: `\\text{Find the average value of } f(x) = x \\text{ on } [${a}, ${b}]`,
        correctAnswer: `${avg}`,
        acceptedAnswers: [`${frac(a + b, 2)}`],
        hints: [
          'Average value = (1/(b−a)) ∫ f dx.',
          `∫ x dx from ${a} to ${b} = (b² − a²)/2.`,
          'Then divide by (b − a).',
        ],
        solutionSteps: [
          { title: 'Integral', explanation: '', latex: `\\int_{${a}}^{${b}} x\\,dx = \\frac{${b * b} - ${a * a}}{2}` },
          { title: 'Average', explanation: '', latex: `\\frac{1}{${b - a}}\\cdot\\frac{${b * b} - ${a * a}}{2} = ${frac(a + b, 2)}` },
        ],
      };
    });
    pool.push(() => {
      const b = rndInt(1, 4);
      return {
        questionLatex: `\\text{Average value of } f(x)=x^2 \\text{ on } [0, ${b}]`,
        correctAnswer: `${frac(b * b, 3)}`,
        acceptedAnswers: [`${b * b / 3}`],
        hints: [
          'Average = (1/b)∫₀^b x² dx.',
          '∫₀^b x² dx = b³/3.',
          'Divide by b.',
        ],
        solutionSteps: [
          { title: 'Integral', explanation: '', latex: `\\int_0^{${b}} x^2 dx = \\frac{${b}^3}{3}` },
          { title: 'Average', explanation: '', latex: `\\frac{1}{${b}}\\cdot\\frac{${b}^3}{3} = ${frac(b * b, 3)}` },
        ],
      };
    });
  }

  if (S === 'T.5') {
    pool.push(() => {
      const a = rndInt(1, 3);
      // area between y=x and y=x^2 on [0,1]: 1/6 — but generalize with x^a
      return {
        questionLatex: `\\text{Find the area between } y = x \\text{ and } y = x^2 \\text{ on } [0, 1]`,
        correctAnswer: `${frac(1, 6)}`,
        acceptedAnswers: ['1/6', '0.1667', '0.16667'],
        hints: [
          'Area = ∫ (top − bottom) dx.',
          'On [0,1], x ≥ x².',
          '∫₀¹ (x − x²) dx.',
        ],
        solutionSteps: [
          { title: 'Set up', explanation: '', latex: `\\int_0^1 (x - x^2)\\,dx` },
          { title: 'Evaluate', explanation: '', latex: `\\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}` },
        ],
      };
    });
    pool.push(() => {
      const k = rndInt(2, 4);
      return {
        questionLatex: `\\text{Area between } y = ${k}x \\text{ and } y = ${k}x^2 \\text{ on } [0, 1]`,
        correctAnswer: `${frac(k, 6)}`,
        acceptedAnswers: [`${k / 6}`],
        hints: [
          `Top is ${k}x, bottom is ${k}x².`,
          `Integrand: ${k}x − ${k}x² = ${k}(x − x²).`,
          'Use the earlier result times ' + k,
        ],
        solutionSteps: [
          { title: 'Set up', explanation: '', latex: `${k}\\int_0^1 (x - x^2)dx = ${k}\\cdot\\frac{1}{6}` },
          { title: 'Evaluate', explanation: '', latex: `${frac(k, 6)}` },
        ],
      };
    });
  }

  // ============ V: Differential Equations ============
  if (S === 'V.2' || S === 'V.3' || S === 'V.8') {
    pool.push(() => {
      const k = rndInt(1, 4);
      return {
        questionLatex: `\\frac{dy}{dx} = ${k}y, \\quad y(0) = 3. \\text{ Solve for } y.`,
        questionText: 'Exponential solution. Answer like "3e^(4x)".',
        correctAnswer: `3e^(${k}x)`,
        acceptedAnswers: [`3e^{${k}x}`, `3*e^(${k}x)`, `3e^${k}x`],
        hints: [
          'Separable: dy/y = k dx.',
          'Integrate: ln|y| = kx + C.',
          `y = Ce^{kx}; use y(0) = 3 to find C.`,
        ],
        solutionSteps: [
          { title: 'Separate', explanation: '', latex: `\\frac{dy}{y} = ${k}\\,dx` },
          { title: 'Integrate', explanation: '', latex: `\\ln|y| = ${k}x + C` },
          { title: 'Solve', explanation: '', latex: `y = 3e^{${k}x}` },
        ],
      };
    });
    pool.push(() => {
      const k = rndInt(2, 4);
      return {
        questionLatex: `\\frac{dy}{dx} = \\frac{x}{k}. \\text{ General solution?}`,
        questionText: 'Include +C. Answer like "x^2/4+C".',
        correctAnswer: `x^2/${2 * k}+C`,
        acceptedAnswers: [`\\frac{x^2}{${2 * k}}+C`, `x^2/${2 * k} + C`],
        hints: [
          'Integrate both sides with respect to x.',
          `∫ x/${k} dx = x²/(2·${k}).`,
          'Add C.',
        ],
        solutionSteps: [
          { title: 'Integrate', explanation: '', latex: `y = \\frac{x^2}{${2 * k}} + C` },
        ],
      };
    });
  }

  // ============ W: Applications of Integration ============
  if (S === 'W.2') {
    pool.push(() => {
      const a = rndInt(2, 5);
      // v(t) = t^2 - a^2 on [0, a]: displacement = a^3/3 - a^3 = -2a^3/3
      const disp = (-2 * a * a * a) / 3;
      return {
        questionLatex: `v(t) = t^2 - ${a * a} \\text{ on } [0, ${a}]. \\text{ Find the displacement.}`,
        correctAnswer: `${Number(disp.toFixed(4))}`,
        acceptedAnswers: [`${frac(-2 * a * a * a, 3)}`],
        hints: [
          'Displacement = ∫ v dt.',
          `Antiderivative: t³/3 − ${a * a}t.`,
          `Evaluate at ${a} and 0.`,
        ],
        solutionSteps: [
          { title: 'Integrate', explanation: '', latex: `\\int_0^{${a}} (t^2 - ${a * a})\\,dt = \\frac{${a}^3}{3} - ${a * a}\\cdot${a}` },
          { title: 'Compute', explanation: '', latex: `= ${frac(-2 * a * a * a, 3)}` },
        ],
      };
    });
  }

  if (S === 'W.9') {
    pool.push(() => {
      const k = rndInt(1, 4);
      return {
        questionLatex: `f(x) = ${k}x \\text{ on } [0, 1] \\text{ is a density. Find } P(X \\le 1/2)`,
        questionText: `First verify the total density is 1 (it is: ∫₀¹ ${k}x dx = ${k}/2... use the normalized f(x) = ${k === 2 ? '2x' : k + 'x normalized'}). Answer as a fraction or decimal.`,
        correctAnswer: `${k / 8}`,
        acceptedAnswers: [`${frac(k, 8)}`],
        hints: [
          'P(X ≤ 1/2) = ∫₀^{1/2} f(x) dx.',
          `∫ ${k}x dx = ${k}x²/2.`,
          `At 1/2: ${k}(1/4)/2.`,
        ],
        solutionSteps: [
          { title: 'Integrate the density', explanation: '', latex: `\\int_0^{1/2} ${k}x\\,dx = \\frac{${k}}{2}\\cdot\\frac{1}{4} = ${frac(k, 8)}` },
        ],
      };
    });
  }

  if (pool.length === 0) return [];
  return pool.map((gen) => ({ skillId: S, difficulty: 2, generate: gen } as ProblemTemplate));
}
