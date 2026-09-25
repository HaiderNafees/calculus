import { Component, Input, OnChanges } from '@angular/core';
import { MASTERY_LABELS, MasteryLevel } from '../../data/curriculum';

@Component({
  selector: 'app-mastery-badge',
  standalone: true,
  template: `<span class="chip" [class]="'mastery-' + cls">{{ label }}</span>`,
  styles: [`:host { display: inline-block; }`],
})
export class MasteryBadgeComponent implements OnChanges {
  @Input({ required: true }) level: MasteryLevel = 0;

  cls = 'new';
  label = 'New';

  ngOnChanges() {
    this.cls = ['new', 'learning', 'practiced', 'mastered'][this.level];
    this.label = MASTERY_LABELS[this.level];
  }
}
