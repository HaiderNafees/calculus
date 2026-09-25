import { Injectable } from '@angular/core';
import { getTemplate } from '../data/problem-templates';
import { GeneratedProblem } from '../data/problem-engine';

@Injectable({ providedIn: 'root' })
export class ProblemGeneratorService {
  private lastProblemText = '';

  generate(skillId: string): GeneratedProblem {
    const t = getTemplate(skillId);
    let problem = t.generate();
    // Avoid serving the identical question twice in a row
    let guard = 0;
    while (problem.questionLatex === this.lastProblemText && guard++ < 6) {
      problem = t.generate();
    }
    this.lastProblemText = problem.questionLatex;
    return problem;
  }
}
