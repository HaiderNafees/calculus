import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'trustedUrl', standalone: true })
export class TrustedUrlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(url: string): SafeResourceUrl {
    // Only allow YouTube embed URLs
    if (!/^https:\/\/www\.youtube\.com\/embed\//.test(url)) {
      console.warn('Blocked non-YouTube embed URL:', url);
      return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
