import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './services/guards';

export const routes: Routes = [
  // Public
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'CalculusLearn — Learn Calculus Free' },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent), title: 'CalculusLearn — About' },

  // Auth (guests only)
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent), title: 'CalculusLearn — Log in' },
  { path: 'signup', canActivate: [guestGuard], loadComponent: () => import('./pages/auth/signup/signup.component').then(m => m.SignupComponent), title: 'CalculusLearn — Sign up' },

  // Signed-in app (also reachable while browsing as guest)
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), title: 'CalculusLearn — Dashboard' },
  { path: 'skills', loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent), title: 'CalculusLearn — Skill Explorer' },
  { path: 'practice/:skillId', loadComponent: () => import('./pages/practice/practice.component').then(m => m.PracticeComponent), title: 'CalculusLearn — Practice' },
  { path: 'lesson/:skillId', loadComponent: () => import('./pages/lesson/lesson.component').then(m => m.LessonComponent), title: 'CalculusLearn — Lesson' },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent), title: 'CalculusLearn — Profile' },

  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'CalculusLearn — Not Found' },
];
