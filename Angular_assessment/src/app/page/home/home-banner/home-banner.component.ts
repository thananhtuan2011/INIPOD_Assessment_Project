import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Banner } from '../interface/iBanner.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageType } from '@app/layout/services/layout-utils.service';
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss'
})
export class HomeBannerComponent implements OnInit, OnDestroy {

  autoSlideInterval: any;
  currentSlide = 0;
  listBanner: Banner[] = []
  private destroyRef = inject(DestroyRef);
  private homeService = inject(HomeService)
  private sanitizer = inject(DomSanitizer)
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.listBanner.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.listBanner.length) % this.listBanner.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
  randomBanner() {
    this.homeService.randomBanner().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      if (res) {
        this.listBanner = res;
        console.log("listBanner", this.listBanner);

      }

    });
  }
  getSafeYoutubeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  extractVideoId(url: string): string {
    if (!url) return '';
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }
  ngOnInit(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 100000);
    this.randomBanner();
  }
  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

}
