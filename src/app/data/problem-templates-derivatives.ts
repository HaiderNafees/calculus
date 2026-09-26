// ===== Problem Templates — Module II (Categories F-J: Derivatives) =====
// Multi-variant: each skill has several question shapes, chosen at random.
import {
  GeneratedProblem, ProblemTemplate,
  rndInt, pick, frac, latexPolynomial,
} from './problem-engine';

export function makeDerivativeTemplates(skillId: string): ProblemTemplate[] {
  const pool: Array<() => GeneratedProblem> = [];

  const S = skillId;

  // ============ F: Introduction to Derivatives ============
  if (S === 'F.1') {
    pool.push(() => {
      const a = rndInt(1, 4), x1 = rndInt(1, 4);
      const f = (x: number) => a * x * x;
      const slope = f(x1 + 1) - f(x1);
      return {
        questionLatex: `\\text{Average rate of change of } f(x)=${a}x^2 \\text{ on } [${x1}, ${x1 + 1}]`,
        correctAnswer: `${slope}`,
        graphExpr: `${a}*x^2`,
        hints: [
          'Average rate of change = slope of the secant line.',
          'Use the formula (f(b) − f(a)) / (b − a).',
          `f(${x1 + 1}) = ${a * (x1 + 1) * (x1 + 1)}, f(${x1}) = ${a * x1 * x1}`,
        ],
        solutionSteps: [
          { title: 'Formula', explanation: 'Secant slope over [a, b].', latex: `\\frac{f(${x1 + 1}) - f(${x1})}{(${x1 + 1}) - (${x1})}` },
          { title: 'Evaluate', explanation: '', latex: `\\frac{${a * (x1 + 1) * (x1 + 1)} - ${a * x1 * x1}}{1} = ${slope}` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(2, 5), b = rndInt(-4, 4), h = rndInt(1, 2), x0 = rndInt(0, 3);
      // f(x) = ax + b, secant over [x0, x0+h] -> slope a
      return {
        questionLatex: `\\text{Average rate of change of } f(x)=${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)} \\text{ from } x=${x0} \\text{ to } x=${x0 + h}`,
        correctAnswer: `${a}`,
        hints: [
          'This is a line — what is special about a line\'s rate of change?',
          'Compute (f(b) − f(a)) / (b − a) anyway and watch what happens.',
          'The slope is constant.',
        ],
        solutionSteps: [
          { title: 'Secant slope', explanation: '', latex: `\\frac{(${a}(${x0 + h}) ${b >= 0 ? '+' : '-'} ${Math.abs(b)}) - (${a}(${x0}) ${b >= 0 ? '+' : '-'} ${Math.abs(b)})}{${h}}` },
          { title: 'Simplify', explanation: 'Constants cancel; the slope equals the coefficient of x.', latex: `\\frac{${a * h}}{${h}} = ${a}` },
        ],
      };
    });
  }

  if (S === 'F.2') {
    pool.push(() => {
      const a = rndInt(1, 3), x0 = rndInt(1, 3);
      // f(x)=x^3, average ROC on [x0, x0+h]
      const f = (x: number) => x * x * x;
      const h = 1;
      return {
        questionLatex: `\\text{Average rate of change of } f(x)=x^3 \\text{ on } [${x0}, ${x0 + h}]`,
        correctAnswer: `${3 * x0 * x0 + 3 * x0 + 1}`,
        hints: [
          'Apply (f(b) − f(a))/(b − a).',
          'Use the difference of cubes factoring after expanding.',
          `Or directly: (${x0 + h})³ − ${x0}³ = ${f(x0 + h) - f(x0)}`,
        ],
        solutionSteps: [
          { title: 'Compute endpoints', explanation: '', latex: `f(${x0 + h}) = ${f(x0 + h)},\\quad f(${x0}) = ${f(x0)}` },
          { title: 'Divide', explanation: '', latex: `\\frac{${f(x0 + h) - f(x0)}}{1} = ${f(x0 + h) - f(x0)}` },
        ],
      };
    });
    pool.push(() => {
      const t = pick([2, 3, 4]);
      // Height h(t) = 16t^2 style free-fall: average velocity
      const t0 = rndInt(1, 3);
      const g = 16;
      const v = g * (2 * t0 + 1);
      return {
        questionLatex: `\\text{A ball drops with } h(t) = ${g}t^2 \\text{ feet. Find its average velocity on } [${t0}, ${t0 + 1}]`,
        questionText: 'Average velocity = average rate of change of height. Answer in ft/s (just the number).',
        correctAnswer: `${v}`,
        hints: [
          'Average velocity is (h(b) − h(a)) / (b − a).',
          `h(${t0 + 1}) = ${g * (t0 + 1) * (t0 + 1)}, h(${t0}) = ${g * t0 * t0}`,
          'Divide by the elapsed time, 1 second.',
        ],
        solutionSteps: [
          { title: 'Heights', explanation: '', latex: `h(${t0 + 1}) = ${g * (t0 + 1) * (t0 + 1)},\\ h(${t0}) = ${g * t0 * t0}` },
          { title: 'Average velocity', explanation: '', latex: `\\frac{${g * (t0 + 1) * (t0 + 1) - g * t0 * t0}}{1} = ${v}\\ \\text{ft/s}` },
        ],
      };
    });
  }

  if (S === 'F.3') {
    pool.push(() => {
      const a = rndInt(2, 5);
      return {
        questionLatex: `\\text{Instantaneous rate of change of } f(x)=${a}x^2 \\text{ at } x = 1`,
        correctAnswer: `${2 * a}`,
        graphExpr: `${a}*x^2`,
        graphPoint: { x: 1, y: a },
        hints: [
          'Instantaneous rate = slope of the tangent line.',
          'Take the limit of the average rate as the interval shrinks.',
          'The derivative of ax² is 2ax; evaluate at x = 1.',
        ],
        solutionSteps: [
          { title: 'Derivative', explanation: 'Differentiate.', latex: `f'(x) = ${2 * a}x` },
          { title: 'Evaluate', explanation: '', latex: `f'(1) = ${2 * a}` },
        ],
      };
    });
    pool.push(() => {
      const x0 = rndInt(1, 4);
      return {
        questionLatex: `\\text{Instantaneous rate of change of } f(x) = x^3 \\text{ at } x = ${x0}`,
        correctAnswer: `${3 * x0 * x0}`,
        hints: [
          'Find f′(x) first.',
          'Power rule: d/dx x³ = 3x².',
          `Substitute x = ${x0}.`,
        ],
        solutionSteps: [
          { title: 'Differentiate', explanation: '', latex: `f'(x) = 3x^2` },
          { title: 'Evaluate', explanation: '', latex: `f'(${x0}) = ${3 * x0 * x0}` },
        ],
      };
    });
  }

  if (S === 'F.4') {
    pool.push(() => {
      const n = rndInt(2, 4);
      return {
        questionLatex: `\\text{Use the limit definition to differentiate } f(x) = x^${n}`,
        questionText: 'What is f′(x)? Enter your answer as an expression in x.',
        correctAnswer: `${n}x^${n - 1}`,
        acceptedAnswers: [`${n} * x^${n - 1}`],
        hints: [
          'Start from f′(x) = lim (f(x+h) − f(x)) / h.',
          `Expand (x + h)^${n} and cancel x^${n}.`,
          'Every remaining term has a factor of h — cancel it, then let h → 0.',
        ],
        solutionSteps: [
          { title: 'Set up', explanation: '', latex: `f'(x)=\\lim_{h\\to 0}\\frac{(x+h)^{${n}} - x^{${n}}}{h}` },
          { title: 'Expand', explanation: 'Binomial expansion gives terms in h.', latex: `=\\lim_{h\\to 0}\\frac{${n}x^{${n - 1}}h + \\cdots}{h}` },
          { title: 'Cancel and take the limit', explanation: '', latex: `= ${n}x^{${n - 1}}` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(2, 6), b = rndInt(-5, 5);
      return {
        questionLatex: `\\text{Use the limit definition for } f(x) = ${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`,
        correctAnswer: `${a}`,
        hints: [
          'The slope of a line never changes.',
          'f(x + h) − f(x) = a·h — the constants cancel.',
          'Divide by h and let h → 0.',
        ],
        solutionSteps: [
          { title: 'Difference quotient', explanation: '', latex: `\\frac{(${a}(x+h) ${b >= 0 ? '+' : '-'} ${Math.abs(b)}) - (${a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)})}{h} = \\frac{${a}h}{h}` },
          { title: 'Limit', explanation: '', latex: `= ${a}` },
        ],
      };
    });
  }

  if (S === 'F.5') {
    pool.push(() => {
      const x0 = rndInt(-3, 3, [0]);
      return {
        questionLatex: `f(x) = x^2,\\quad f'(x) = 2x.\\quad \\text{Where does } f'(x) = ${2 * x0}?`,
        questionText: 'Solve for x. Enter just the number.',
        correctAnswer: `${x0}`,
        hints: [
          'Set the derivative equal to the given value.',
          'Solve 2x = ' + (2 * x0),
          'Divide by 2.',
        ],
        solutionSteps: [
          { title: 'Set up the equation', explanation: '', latex: `2x = ${2 * x0}` },
          { title: 'Solve', explanation: '', latex: `x = ${x0}` },
        ],
      };
    });
    pool.push(() => {
      return {
        questionLatex: `f(x)=x^3 - 3x.\\quad \\text{Find } f'(2)`,
        correctAnswer: `9`,
        hints: [
          'Differentiate term by term.',
          'd/dx x³ = 3x², d/dx 3x = 3.',
          'f′(x) = 3x² − 3; substitute x = 2.',
        ],
        solutionSteps: [
          { title: 'Differentiate', explanation: '', latex: `f'(x) = 3x^2 - 3` },
          { title: 'Evaluate', explanation: '', latex: `f'(2) = 12 - 3 = 9` },
        ],
      };
    });
  }

  if (S === 'F.8') {
    pool.push(() => {
      const n = rndInt(2, 6);
      return {
        questionLatex: `\\frac{d}{dx}\\, x^{${n}}`,
        correctAnswer: `${n}x^${n - 1}`,
        hints: ['Power rule: bring down the exponent, subtract one.', `d/dx x^n = n·x^(n−1).`, `With n = ${n}.`],
        solutionSteps: [
          { title: 'Power rule', explanation: '', latex: `\\frac{d}{dx}x^{${n}} = ${n}x^{${n - 1}}` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(2, 5), n = rndInt(2, 4);
      return {
        questionLatex: `\\frac{d}{dx}\\left(${a}x^{${n}}\\right)`,
        correctAnswer: `${a * n}x^${n - 1}`,
        hints: ['Constants multiply straight through the derivative.', `d/dx c·x^n = c·n·x^(n−1).`, `Coefficient: ${a}·${n} = ${a * n}.`],
        solutionSteps: [
          { title: 'Constant multiple + power rule', explanation: '', latex: `${a}\\cdot ${n}x^{${n - 1}} = ${a * n}x^{${n - 1}}` },
        ],
      };
    });
  }

  // ============ G: Derivative Rules ============
  if (S === 'G.1') {
    pool.push(() => {
      const n = pick([-2, -3, 4, 5]);
      return {
        questionLatex: `\\frac{d}{dx}\\, x^{${n}}`,
        correctAnswer: `${n}x^{${n - 1}}`,
        acceptedAnswers: n < 0 ? [`${n}/x^{${Math.abs(n) + 1}}`, `${n}/x^${Math.abs(n) + 1}`] : [],
        hints: ['Power rule works for negative exponents too.', `n = ${n}, so n − 1 = ${n - 1}.`, 'Keep the coefficient as the old exponent.'],
        solutionSteps: [
          { title: 'Power rule', explanation: '', latex: `\\frac{d}{dx}x^{${n}} = ${n}x^{${n - 1}}` },
        ],
      };
    });
    pool.push(() => {
      const n = rndInt(2, 3);
      return {
        questionLatex: `\\frac{d}{dx}\\, \\sqrt[${n}]{x}`,
        correctAnswer: frac(1, n) + `x^{${frac(1 - n, n)}}`,
        acceptedAnswers: [`${1 / n}*x^${(1 - n) / n}`],
        hints: [
          'Rewrite the root as a fractional exponent first.',
          `x^(1/${n})`,
          'Then apply the power rule.',
        ],
        solutionSteps: [
          { title: 'Rewrite', explanation: '', latex: `\\sqrt[${n}]{x} = x^{1/${n}}` },
          { title: 'Power rule', explanation: '', latex: `\\frac{1}{${n}}x^{1/${n} - 1} = ${frac(1, n)}x^{${frac(1 - n, n)}}` },
        ],
      };
    });
  }

  if (S === 'G.3') {
    pool.push(() => {
      const a = rndInt(1, 4), b = rndInt(1, 4), m = rndInt(1, 3), n = rndInt(2, 4);
      // (x^m + a)(x^n + b)
      const coef = new Array(m + n + 1).fill(0);
      coef[m + n] = 1; coef[m] = b; coef[n] = a; coef[0] = a * b;
      const prod = latexPolynomial(coef);
      return {
        questionLatex: `\\text{Differentiate } f(x) = (x^{${m}} ${a >= 0 ? '+' : '-'} ${Math.abs(a)})(${b >= 0 ? 'x^' + n + ' + ' + b : 'x^' + n + ' - ' + Math.abs(b)})`,
        correctAnswer: latexPolynomial(coef.slice(1).map((c, i) => c * (i + 1))),
        acceptedAnswers: [
          `(${m}*x^${m - 1})(${b >= 0 ? 'x^' + n + '+' + b : 'x^' + n + '-' + Math.abs(b)}) + (${a >= 0 ? 'x^' + m + '+' + a : 'x^' + m + '-' + Math.abs(a)})(${n}*x^${n - 1})`,
          `${m}*x^${m - 1}*(x^${n}+${b}) + ${n}*x^${n - 1}*(x^${m}+${a})`,
        ],
        hints: [
          'Product rule: (fg)′ = f′g + fg′.',
          'Name the two factors f and g and differentiate each.',
          'Multiply out carefully, or expand first — both work.',
        ],
        solutionSteps: [
          { title: 'Product rule setup', explanation: '', latex: `f'g + fg'` },
          { title: 'Expand the product (optional check)', explanation: `The product is ${prod}.`, latex: `\\frac{d}{dx}[${prod}]` },
          { title: 'Differentiate the expansion', explanation: '', latex: `= ${latexPolynomial(coef.slice(1).map((c, i) => c * (i + 1)))}` },
        ],
      };
    });
    pool.push(() => {
      const m = rndInt(2, 4);
      return {
        questionLatex: `\\frac{d}{dx}\\left[x^{${m}} \\cdot x^{3}\\right]`,
        questionText: 'Simplify before or after differentiating — your choice.',
        correctAnswer: `${m + 3}x^{${m + 2}}`,
        hints: [
          'x^a · x^b = x^(a+b).',
          `Combine: x^${m + 3}`,
          'Then power rule.',
        ],
        solutionSteps: [
          { title: 'Combine exponents', explanation: '', latex: `x^{${m}}\\cdot x^3 = x^{${m + 3}}` },
          { title: 'Differentiate', explanation: '', latex: `${m + 3}x^{${m + 2}}` },
        ],
      };
    });
  }

  if (S === 'G.4') {
    pool.push(() => {
      const a = rndInt(1, 5);
      return {
        questionLatex: `\\frac{d}{dx}\\left[\\frac{x}{x + ${a}}\\right]`,
        correctAnswer: `${a}/(x+${a})^2`,
        acceptedAnswers: [`\\frac{${a}}{(x+${a})^2}`, `${a}/((x+${a})**2)`],
        hints: [
          'Quotient rule: (f/g)′ = (f′g − fg′)/g².',
          'Here f = x, g = x + ' + a,
          'Numerator: 1·(x + a) − x·1 = a.',
        ],
        solutionSteps: [
          { title: 'Quotient rule', explanation: '', latex: `\\frac{(1)(x+${a}) - (x)(1)}{(x+${a})^2}` },
          { title: 'Simplify', explanation: '', latex: `\\frac{${a}}{(x+${a})^2}` },
        ],
      };
    });
    pool.push(() => {
      const n = rndInt(1, 3);
      return {
        questionLatex: `\\frac{d}{dx}\\left[\\frac{1}{x^{${n}}}\\right]`,
        correctAnswer: `-${n}/x^${n + 1}`,
        acceptedAnswers: [`-${n}*x^-${n + 1}`, `\\frac{-${n}}{x^{${n + 1}}}`],
        hints: [
          'Rewrite as a power: x^(−n).',
          'Power rule on x^(−' + n + ').',
          `Coefficient: −${n}, new exponent −${n + 1}.`,
        ],
        solutionSteps: [
          { title: 'Rewrite', explanation: '', latex: `\\frac{1}{x^{${n}}} = x^{-${n}}` },
          { title: 'Differentiate', explanation: '', latex: `-${n}x^{-${n + 1}} = -\\frac{${n}}{x^{${n + 1}}}` },
        ],
      };
    });
  }

  if (S === 'G.5') {
    pool.push(() => {
      const a = rndInt(1, 5);
      return {
        questionLatex: `\\frac{d}{dx}\\,(${a}x + 1)^{3}`,
        correctAnswer: `3*${a}*(${a}x+1)^2`,
        acceptedAnswers: [`${3 * a}(${a}x+1)^2`, `${3 * a}*(${a}x+1)^2`, `\\frac{d}{dx}`],
        hints: [
          'Chain rule: outer′(inner) · inner′.',
          'Outer is u³, inner is u = ' + a + 'x + 1.',
          '3u² · u′, where u′ = ' + a,
        ],
        solutionSteps: [
          { title: 'Outer derivative', explanation: '', latex: `3(${a}x+1)^2` },
          { title: 'Times inner derivative', explanation: '', latex: `3(${a}x+1)^2 \\cdot ${a} = ${3 * a}(${a}x+1)^2` },
        ],
      };
    });
    pool.push(() => {
      return {
        questionLatex: `\\frac{d}{dx}\\,\\sqrt{x^2 + 1}`,
        correctAnswer: `x/sqrt(x^2+1)`,
        acceptedAnswers: [`\\frac{x}{\\sqrt{x^2+1}}`, `x/(x^2+1)^(1/2)`, `x*(x^2+1)^(-1/2)`],
        hints: [
          'Write the square root as a power: (x² + 1)^(1/2).',
          'Chain rule: (1/2)(x² + 1)^(−1/2) · 2x.',
          'Simplify the constants.',
        ],
        solutionSteps: [
          { title: 'Chain rule', explanation: '', latex: `\\frac{1}{2}(x^2+1)^{-1/2}\\cdot 2x` },
          { title: 'Simplify', explanation: '', latex: `\\frac{x}{\\sqrt{x^2+1}}` },
        ],
      };
    });
  }

  if (S === 'G.7') {
    pool.push(() => {
      const a = rndInt(1, 4);
      return {
        questionLatex: `f(x) = x^3.\\quad \\text{Find } f''(x)`,
        correctAnswer: `6x`,
        hints: [
          'First derivative, then differentiate again.',
          'f′(x) = 3x².',
          'f″(x) = 6x.',
        ],
        solutionSteps: [
          { title: 'First derivative', explanation: '', latex: `f'(x) = 3x^2` },
          { title: 'Second derivative', explanation: '', latex: `f''(x) = 6x` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(2, 5);
      return {
        questionLatex: `f(x) = ${a}x^3 + x.\\quad \\text{Find } f''(1)`,
        correctAnswer: `${6 * a}`,
        hints: [
          'Differentiate twice before substituting.',
          `f′(x) = ${3 * a}x² + 1`,
          `f″(x) = ${6 * a}x; plug in x = 1.`,
        ],
        solutionSteps: [
          { title: 'First derivative', explanation: '', latex: `f'(x) = ${3 * a}x^2 + 1` },
          { title: 'Second derivative', explanation: '', latex: `f''(x) = ${6 * a}x` },
          { title: 'Evaluate', explanation: '', latex: `f''(1) = ${6 * a}` },
        ],
      };
    });
  }

  if (S === 'G.8') {
    pool.push(() => {
      const a = rndInt(1, 4), b = rndInt(1, 9);
      return {
        questionLatex: `x^2 + y^2 = ${b * b} \\quad (\\text{circle}). \\text{ Find } \\frac{dy}{dx}`,
        questionText: 'Differentiate implicitly. Answer as an expression in x and y.',
        correctAnswer: `-x/y`,
        acceptedAnswers: [`\\frac{-x}{y}`, `-x/y`],
        hints: [
          'Differentiate both sides with respect to x.',
          'Remember the chain rule on y²: you get 2y·y′.',
          'Solve for y′.',
        ],
        solutionSteps: [
          { title: 'Differentiate implicitly', explanation: '', latex: `2x + 2y\\,y' = 0` },
          { title: 'Solve for y′', explanation: '', latex: `y' = -\\frac{x}{y}` },
        ],
      };
    });
    pool.push(() => {
      return {
        questionLatex: `y^3 + xy = 2. \\text{ Find } \\frac{dy}{dx}`,
        correctAnswer: `-y/(3y^2+x)`,
        acceptedAnswers: [`\\frac{-y}{3y^2 + x}`, `-y/(3y^2 + x)`],
        hints: [
          'Differentiate each term with respect to x.',
          'y³ gives 3y²·y′; xy needs the product rule: y + x·y′.',
          'Collect the y′ terms, then divide.',
        ],
        solutionSteps: [
          { title: 'Differentiate', explanation: '', latex: `3y^2 y' + y + x y' = 0` },
          { title: 'Collect y′', explanation: '', latex: `y'(3y^2 + x) = -y` },
          { title: 'Solve', explanation: '', latex: `y' = -\\frac{y}{3y^2 + x}` },
        ],
      };
    });
  }

  // ============ H: Transcendental Derivatives ============
  if (S === 'H.1') {
    pool.push(() => {
      const a = rndInt(1, 4);
      return {
        questionLatex: `\\frac{d}{dx}\\, e^{${a}x}`,
        correctAnswer: `${a}e^{${a}x}`,
        acceptedAnswers: [`${a}e^${a}x`, `${a}*e^(${a}x)`, `${a}e^(${a}x)`],
        hints: [
          'd/dx e^u = e^u · u′.',
          `Here u = ${a}x, so u′ = ${a}.`,
          'Multiply the exponential by u′.',
        ],
        solutionSteps: [
          { title: 'Chain rule on the exponential', explanation: '', latex: `\\frac{d}{dx}e^{${a}x} = e^{${a}x}\\cdot ${a}` },
        ],
      };
    });
    pool.push(() => {
      return {
        questionLatex: `\\frac{d}{dx}\\left(x^2 e^x\\right)`,
        correctAnswer: `x*e^x*(x+2)`,
        acceptedAnswers: [`e^x(x^2+2x)`, `e^x*(x^2+2x)`, `x^2e^x+2xe^x`],
        hints: [
          'Product rule with f = x², g = e^x.',
          'f′ = 2x, g′ = e^x.',
          'Factor the result to simplify.',
        ],
        solutionSteps: [
          { title: 'Product rule', explanation: '', latex: `2xe^x + x^2e^x` },
          { title: 'Factor', explanation: '', latex: `xe^x(x + 2)` },
        ],
      };
    });
  }

  if (S === 'H.3') {
    pool.push(() => {
      const b = rndInt(2, 8);
      return {
        questionLatex: `\\frac{d}{dx}\\,\\ln(x + ${b})`,
        correctAnswer: `1/(x+${b})`,
        acceptedAnswers: [`\\frac{1}{x+${b}}`],
        hints: [
          'd/dx ln(u) = u′/u.',
          `u = x + ${b}, u′ = 1.`,
          'The answer is a simple fraction.',
        ],
        solutionSteps: [
          { title: 'Chain rule on log', explanation: '', latex: `\\frac{1}{x+${b}}\\cdot 1` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(2, 4);
      return {
        questionLatex: `\\frac{d}{dx}\\,\\ln(${a}x)`,
        questionText: 'Hint: simplify with log properties first if you like.',
        correctAnswer: `1/x`,
        acceptedAnswers: [`\\frac{1}{x}`],
        hints: [
          'ln(' + a + 'x) = ln ' + a + ' + ln x.',
          'The constant ln ' + a + ' differentiates to 0.',
          'So only ln x matters.',
        ],
        solutionSteps: [
          { title: 'Split the log', explanation: '', latex: `\\ln(${a}x) = \\ln ${a} + \\ln x` },
          { title: 'Differentiate', explanation: '', latex: `0 + \\frac{1}{x}` },
        ],
      };
    });
  }

  if (S === 'H.5') {
    pool.push(() => {
      const f = pick(['sin', 'cos']);
      const other = f === 'sin' ? 'cos' : 'sin';
      const sign = f === 'sin' ? '' : '-';
      return {
        questionLatex: `\\frac{d}{dx}\\,${f}(x)`,
        correctAnswer: `${sign}${other}(x)`,
        acceptedAnswers: [`${sign}${other}`],
        hints: [
          'One of the most famous derivatives — memorize the pair.',
          'Sine\'s derivative starts with a +.',
          'Cosine\'s derivative starts with a −.',
        ],
        solutionSteps: [
          { title: 'Standard derivative', explanation: '', latex: `\\frac{d}{dx}${f}(x) = ${sign}${other}(x)` },
        ],
      };
    });
    pool.push(() => {
      const a = rndInt(2, 5), f = pick(['sin', 'cos']);
      const sign = f === 'sin' ? '' : '-';
      const other = f === 'sin' ? 'cos' : 'sin';
      return {
        questionLatex: `\\frac{d}{dx}\\,${f}(${a}x)`,
        correctAnswer: `${a}${sign}${other}(${a}x)`,
        acceptedAnswers: [`${sign}${a}${other}(${a}x)`, `${a}*${sign}${other}(${a}x)`],
        hints: [
          'Chain rule: derivative of the inside times derivative of the outside.',
          `Inside u = ${a}x, u′ = ${a}.`,
          'Multiply the trig derivative by ' + a,
        ],
        solutionSteps: [
          { title: 'Chain rule', explanation: '', latex: `${sign}${other}(${a}x)\\cdot ${a}` },
        ],
      };
    });
  }

  // ============ I: Advanced Techniques ============
  if (S === 'I.7') {
    pool.push(() => {
      const a = rndInt(1, 4), x0 = rndInt(1, 3);
      const slope = 2 * a * x0, y0 = a * x0 * x0;
      const b = y0 - slope * x0;
      return {
        questionLatex: `\\text{Find the tangent line to } f(x)=${a}x^2 \\text{ at } x = ${x0}`,
        questionText: 'Enter the equation as y = mx + b, e.g. "y=3x-2".',
        correctAnswer: `y=${slope}x${b >= 0 ? '+' : '-'}${Math.abs(b)}`,
        acceptedAnswers: [`y=${slope}x + ${b}`, `y = ${slope}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`],
        graphExpr: `${a}*x^2`,
        tangentAt: x0,
        hints: [
          'Slope = f′(x0); point = (x0, f(x0)).',
          `f′(x) = ${2 * a}x, so the slope is ${slope}.`,
          `Point-slope: y − ${y0} = ${slope}(x − ${x0}).`,
        ],
        solutionSteps: [
          { title: 'Slope', explanation: '', latex: `m = f'(${x0}) = ${slope}` },
          { title: 'Point', explanation: '', latex: `f(${x0}) = ${y0}` },
          { title: 'Line', explanation: '', latex: `y = ${slope}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}` },
        ],
      };
    });
    pool.push(() => {
      const x0 = rndInt(1, 3);
      const m = 3 * x0 * x0, y0 = x0 * x0 * x0, b = y0 - m * x0;
      return {
        questionLatex: `\\text{Tangent line to } f(x) = x^3 \\text{ at } x = ${x0}`,
        questionText: 'Enter as y = mx + b.',
        correctAnswer: `y=${m}x${b >= 0 ? '+' : '-'}${Math.abs(b)}`,
        acceptedAnswers: [`y=${m}x + ${b}`, `y = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`],
        hints: [
          'f′(x) = 3x².',
          `Slope at ${x0}: ${m}; point: (${x0}, ${y0}).`,
          'b = y − mx.',
        ],
        solutionSteps: [
          { title: 'Slope and point', explanation: '', latex: `m = ${m},\\ (x_0, y_0) = (${x0}, ${y0})` },
          { title: 'Assemble', explanation: '', latex: `y = ${m}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)}` },
        ],
      };
    });
  }

  if (S === 'J.5' || S === 'J.6') {
    pool.push(() => {
      const r = rndInt(2, 5);
      return {
        questionLatex: `\\text{A square's side grows at } ${r}\\ \\text{cm/s. How fast is its area growing when the side is } 3?`,
        questionText: 'Answer in cm²/s (number only).',
        correctAnswer: `${6 * r}`,
        hints: [
          'A = s². Differentiate with respect to time.',
          'dA/dt = 2s · ds/dt.',
          `Substitute s = 3, ds/dt = ${r}.`,
        ],
        solutionSteps: [
          { title: 'Relate variables', explanation: '', latex: `A = s^2` },
          { title: 'Differentiate in time', explanation: '', latex: `\\frac{dA}{dt} = 2s\\frac{ds}{dt}` },
          { title: 'Substitute', explanation: '', latex: `2(3)(${r}) = ${6 * r}\\ \\text{cm}^2/\\text{s}` },
        ],
      };
    });
    pool.push(() => {
      const r = rndInt(1, 4);
      return {
        questionLatex: `\\text{A circle's radius grows at } ${r}\\ \\text{cm/s. How fast is the circumference growing?}`,
        questionText: 'C = 2πr. Answer in cm/s (number only).',
        correctAnswer: `${2 * r}`,
        acceptedAnswers: [`${2 * r}`, `${2 * r}π`, `${2 * r}pi`],
        hints: [
          'C = 2πr.',
          'dC/dt = 2π · dr/dt.',
          `dr/dt = ${r}.`,
        ],
        solutionSteps: [
          { title: 'Differentiate', explanation: '', latex: `\\frac{dC}{dt} = 2\\pi\\frac{dr}{dt}` },
          { title: 'Substitute', explanation: '', latex: `2\\pi(${r})\\ \\text{cm/s}` },
        ],
      };
    });
  }

  // If this skill had no bespoke variants, return an empty pool (caller falls back).
  if (pool.length === 0) return [];

  return pool.map((gen) => ({ skillId: S, difficulty: 2, generate: gen } as ProblemTemplate));
}
