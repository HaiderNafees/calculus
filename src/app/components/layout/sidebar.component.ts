import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurriculumService } from '../../services/curriculum.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="hidden lg:block w-[248px] shrink-0 border-r border-rule bg-surface">
      <nav class="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto p-4" aria-label="Curriculum">
        <div class="eyebrow mb-3 px-2">Modules</div>

        @for (m of curriculum.modules; track m.id) {
          <div class="mb-1">
            <a routerLink="/skills" [queryParams]="{ module: m.id }"
               class="flex items-center justify-between px-2 py-2 rounded-[2px] text-[13.5px] font-medium text-ink-soft hover:text-accent hover:bg-accent-soft transition-colors">
              <span class="truncate">{{ m.title }}</span>
            </a>

            <div class="ml-2 border-l border-rule pl-2 py-1">
              @for (c of m.categories; track c.letter) {
                <a [routerLink]="['/skills']" [queryParams]="{ module: m.id, category: c.letter }"
                   class="flex items-center gap-2 px-2 py-1.5 rounded-[2px] text-[12.5px] text-muted hover:text-accent hover:bg-accent-soft transition-colors">
                  <span class="mono text-[10px] w-4 text-center border border-rule-strong rounded-[2px] leading-4">{{ c.letter }}</span>
                  <span class="truncate">{{ c.title }}</span>
                </a>
              }
            </div>
          </div>
        }

        <div class="mt-4 pt-3 border-t border-rule px-2">
          <div class="caption">{{ curriculum.allSkills.length }} skills · 6 modules</div>
        </div>
      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  readonly curriculum = inject(CurriculumService);
}
