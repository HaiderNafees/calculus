import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="fade-in">
      <!-- Hero -->
      <section class="border-b border-rule">
        <div class="max-w-[1180px] mx-auto px-5 md:px-10 py-20 md:py-28">
          <div class="max-w-[760px]">
            <div class="eyebrow mb-4">Free & Open Source</div>
            <h1 class="display text-[clamp(40px,6vw,68px)] mb-6">
              Master calculus,<br><span class="text-accent">one skill at a time.</span>
            </h1>
            <p class="body text-[18px] mb-8 max-w-[620px]">
              126 interactive skills across limits, derivatives, integrals, and differential
              equations — with lessons, live graphing, and adaptive practice that generates
              fresh problems every time.
            </p>
            <div class="flex flex-wrap gap-3">
              @if (auth.isLoggedIn()) {
                <a routerLink="/dashboard" class="btn btn-primary">Go to dashboard →</a>
                <a routerLink="/skills" class="btn btn-outline">Browse skills</a>
              } @else {
                <a routerLink="/signup" class="btn btn-primary">Create free account</a>
                <a routerLink="/skills" class="btn btn-outline">Start without an account</a>
              }
            </div>
            <div class="caption mt-4">No credit card. No install. Progress saved on your device — or to your account.</div>
          </div>
        </div>
      </section>

      <!-- Stats strip -->
      <section class="border-b border-rule bg-surface">
        <div class="max-w-[1180px] mx-auto px-5 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div class="display text-[28px] text-accent">126</div><div class="caption">skills</div></div>
          <div><div class="display text-[28px] text-accent">6</div><div class="caption">modules</div></div>
          <div><div class="display text-[28px] text-accent">∞</div><div class="caption">generated problems</div></div>
          <div><div class="display text-[28px] text-accent">0</div><div class="caption">dollars, ever</div></div>
        </div>
      </section>

      <!-- Features -->
      <section class="border-b border-rule">
        <div class="max-w-[1180px] mx-auto px-5 md:px-10 py-16">
          <div class="eyebrow mb-3">Why it works</div>
          <h2 class="display text-[32px] mb-10">Learn it. See it. Master it.</h2>

          <div class="grid md:grid-cols-3 gap-4">
            <div class="card p-6">
              <div class="w-8 h-8 bg-accent-soft text-accent flex items-center justify-center rounded-[2px] mb-4 font-bold">1</div>
              <h3 class="heading text-[17px] mb-2">Concise lessons</h3>
              <p class="body text-[14px]">Key concepts, worked examples, common mistakes, and curated videos — everything needed to grasp a topic fast.</p>
            </div>
            <div class="card p-6">
              <div class="w-8 h-8 bg-accent-soft text-accent flex items-center justify-center rounded-[2px] mb-4 font-bold">2</div>
              <h3 class="heading text-[17px] mb-2">Interactive graphs</h3>
              <p class="body text-[14px]">Drag points, watch tangent lines slide, and grow Riemann rectangles — intuition built by manipulation, not memorization.</p>
            </div>
            <div class="card p-6">
              <div class="w-8 h-8 bg-accent-soft text-accent flex items-center justify-center rounded-[2px] mb-4 font-bold">3</div>
              <h3 class="heading text-[17px] mb-2">Adaptive practice</h3>
              <p class="body text-[14px]">Endless generated problems with instant feedback, hints, and step-by-step solutions. Climb from New to Mastered.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Mastery path -->
      <section class="border-b border-rule bg-surface">
        <div class="max-w-[1180px] mx-auto px-5 md:px-10 py-16">
          <div class="eyebrow mb-3">The mastery system</div>
          <h2 class="display text-[32px] mb-10">From New to Mastered</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="card p-5"><span class="chip mastery-new mb-3">New</span><p class="body text-[13.5px] mt-2">Every skill starts here. Pick any card in the explorer to begin.</p></div>
            <div class="card p-5"><span class="chip mastery-learning mb-3">Learning</span><p class="body text-[13.5px] mt-2">One correct answer gets you going. Momentum matters.</p></div>
            <div class="card p-5"><span class="chip mastery-practiced mb-3">Practiced</span><p class="body text-[13.5px] mt-2">Three correct answers show you're getting comfortable.</p></div>
            <div class="card p-5"><span class="chip mastery-mastered mb-3">Mastered</span><p class="body text-[13.5px] mt-2">Five in a row proves it. The skill turns solid green.</p></div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section>
        <div class="max-w-[1180px] mx-auto px-5 md:px-10 py-20 text-center">
          <h2 class="display text-[clamp(30px,4vw,44px)] mb-4">Ready to see <span class="text-accent">your first limit?</span></h2>
          <p class="body mb-8">Join free — or just start practicing. Either way, calculus is waiting.</p>
          <div class="flex flex-wrap gap-3 justify-center">
            <a routerLink="/signup" class="btn btn-primary">Sign up free</a>
            <a routerLink="/login" class="btn btn-outline">I already have an account</a>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {
  readonly auth = inject(AuthService);
}
