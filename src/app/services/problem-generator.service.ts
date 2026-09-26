import { Injectable } from '@angular/core';
import { getTemplates } from '../data/problem-registry';
import { GeneratedProblem } from '../data/problem-engine';

@Injectable({ providedIn: 'root' })
export class ProblemGeneratorService {
  private lastProblemText = '';

  generate(skillId: string): GeneratedProblem {
    const templates = getTemplates(skillId);
    // Pick a random variant for variety
    const t = templates[Math.floor(Math.random() * templates.length)];
    let problem = t.generate();

    // Avoid serving the identical question twice in a row
    let guard = 0;
    while (problem.questionLatex === this.lastProblemText && guard++ < 8) {
      const t2 = templates[Math.floor(Math.random() * templates.length)];
      problem = t2.generate();
    }
    this.lastProblemText = problem.questionLatex;
    return problem;
  }
}
