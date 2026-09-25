import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), title: 'CalculusLearn — Dashboard' },
  { path: 'skills', loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent), title: 'CalculusLearn — Skill Explorer' },
  { path: 'practice/:skillId', loadComponent: () => import('./pages/practice/practice.component').then(m => m.PracticeComponent), title: 'CalculusLearn — Practice' },
  { path: 'lesson/:skillId', loadComponent: () => import('./pages/lesson/lesson.component').then(m => m.LessonComponent), title: 'CalculusLearn — Lesson' },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent), title: 'CalculusLearn — About' },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'CalculusLearn — Not Found' },
];
