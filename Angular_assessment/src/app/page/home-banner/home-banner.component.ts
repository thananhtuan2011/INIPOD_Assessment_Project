import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Banner } from '../interface/iBanner.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PokemonService } from '../services/pokemon.service';
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',

})
export class HomeBannerComponent implements OnInit, OnDestroy {

  autoSlideInterval: any;
  currentSlide = 0;
  listBanner: Banner[] = []
  private destroyRef = inject(DestroyRef);
  private pokemonService = inject(PokemonService)
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
    this.pokemonService.randomBanner().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      if (res) {
        this.listBanner = res;
        console.log("listBanner", this.listBanner);

      }

    });
  }
  safeUrlMap: Record<string, SafeResourceUrl> = {};

  getSafeYoutubeUrl(url: string): SafeResourceUrl {
    if (this.safeUrlMap[url]) return this.safeUrlMap[url];

    const videoId = this.extractVideoId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    this.safeUrlMap[url] = safeUrl;
    return safeUrl;
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
    console.log("dess");

    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

}
