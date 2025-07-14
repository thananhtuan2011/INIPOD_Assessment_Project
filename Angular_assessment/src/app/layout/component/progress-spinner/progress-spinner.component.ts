import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerService } from '@app/services/spinner.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss'
})
export class ProgressSpinnerComponent {

  public showSpinner = false;
  private spinnerService = inject(SpinnerService);
  private cdRef = inject(ChangeDetectorRef)
  destroyRef = inject(DestroyRef);
  constructor(
  ) { }


  ngAfterContentInit() {
    this.spinnerService.visibility.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((spin) => {
      this.showSpinner = spin;
      this.cdRef.detectChanges();
    })
  }
}
