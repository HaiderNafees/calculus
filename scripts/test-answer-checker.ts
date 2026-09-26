// Quick sanity tests for the answer equivalence checker (run with node)
import { answersEquivalent } from '../src/app/data/answer-checker.ts';

let pass = 0, fail = 0;
function check(user: string, correct: string, expected: boolean, label = '') {
  const got = answersEquivalent(user, correct);
  if (got === expected) { pass++; }
  else {
    fail++;
    console.error(`FAIL ${label}: "${user}" vs "${correct}" expected ${expected}, got ${got}`);
  }
}

// Exact and simple numeric
check('6', '6', true, 'plain number');
check(' 6 ', '6', true, 'whitespace');
check('7', '6', false, 'wrong number');

// Fractions & decimals
check('1/4', '0.25', true, 'fraction vs decimal');
check('3/4', '0.75', true, 'fraction vs decimal 2');
check('1/6', '0.1667', true, 'rounded decimal');
check('-2/3', '-0.6667', true, 'negative fraction');

// Words
check('yes', 'yes', true, 'yes');
check('y', 'yes', true, 'y abbreviation');
check('no', 'no', true, 'no');
check('DNE', 'does not exist', true, 'DNE wording');
check('dne', 'dne', true, 'dne case');
check('infinity', '+infinity', true, 'infinity');
check('-infinity', '-∞', true, 'negative infinity unicode');
check('∞', 'infinity', true, 'unicode infinity');

// Expressions in x
check('2x^2', '2x^2', true, 'same expression');
check('2*x^2', '2x^2', true, 'implicit multiplication');
check('-6/x^3', '-6x^-3', true, 'negative exponent equivalence');
check('-6/x^3', '-6/(x**3)', true, 'parens equivalence');
check('x/sqrt(x^2+1)', 'x*(x^2+1)^(-1/2)', true, 'sqrt vs power');
check('3sin(2x)', '3*sin(2*x)', true, 'implicit sin');
check('e^(3x)', '3e^(3x)', false, 'missing coefficient');
check('6x', '6*x', true, 'coef times x');
check('-x/y', '(-x)/y', true, 'negative numerator');
check('-x/y', '-x/y^1', true, 'y^1 equivalence');

// Linear equation answers (tangent lines)
check('y=3x-2', 'y=3x+-2', false, 'weird accepted form should fail'); // note: +-2 is unusual
check('y=3x+5', 'y = 3x + 5', true, 'spaced line equation');

// Lists
check('2,5', '2, 5', true, 'comma list');
check('x=2', '2', true, 'x= prefix');

// Garbage safety
check('import', '1', false, 'injection attempt rejected');
check('constructor', '1', false, 'prototype word rejected');

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
