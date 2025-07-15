import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  Placement,
  shift,
} from "@floating-ui/dom";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss'
})

export class PopoverComponent implements OnDestroy, AfterViewInit {


  @Input() public content: TemplateRef<any> | null = null
  @Input() public position?: Placement = 'bottom-end'
  @Input() public isClearPadding?: boolean = false;
  @Input() public isClickOverlayToClose?: boolean = true;
  @Input() public isClickOnContentToClose?: boolean = true;

  @Output() private onOpen = new EventEmitter<any>();
  @Output() private onClose = new EventEmitter<any>();

  @Input() private isShowDefault?: boolean = false;

  @ViewChild('targetElement') public targetElement?: ElementRef<HTMLDivElement>
  @ViewChild('contentElement') public contentElement?: ElementRef<HTMLDivElement>

  public isShow: boolean = false;
  private cleanAutoUpdateFunction?: () => void;

  constructor() { }

  ngAfterViewInit() {
    if (this.isShowDefault) {
      this.handleShowContent()
    }
  }

  private getPopoverElement() {
    const result = {
      targetRef: null,
      contentRef: null,
    }

    if (!this.targetElement?.nativeElement || !this.contentElement?.nativeElement) {
      return result
    }

    result.targetRef = this.targetElement.nativeElement as any
    result.contentRef = this.contentElement.nativeElement as any

    return result
  }

  handleHideContent() {
    const { contentRef } = this.getPopoverElement()
    if (!contentRef) return

    (contentRef as HTMLElement).style.display = 'none'
    this.isShow = false;

    if (this.cleanAutoUpdateFunction) {
      this.cleanAutoUpdateFunction();
    }

    this.onClose.emit()
  }

  handleShowContent() {
    const { targetRef, contentRef } = this.getPopoverElement()
    if (!targetRef || !contentRef) return

    (contentRef as HTMLElement).style.display = 'block'
    this.isShow = true;

    this.cleanAutoUpdateFunction = autoUpdate(
      targetRef,
      contentRef,
      () => {
        computePosition(targetRef, contentRef, {
          placement: this.position,
          strategy: 'fixed',
          middleware: [
            offset(10),
            flip({
              padding: 10,
              mainAxis: true,
            }),
            shift({
              padding: 10,
              mainAxis: true,
              crossAxis: true,
            }),
          ],
        })
          .then(({ x, y }) => {
            Object.assign((contentRef as HTMLElement).style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          });
      }
    )

    this.onOpen.emit()
  }

  handleClickOnContent() {
    if (this.isClickOnContentToClose) {
      this.handleHideContent()
    }
  }

  async handleToggle() {
    this.isShow = !this.isShow

    // delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const { targetRef, contentRef } = this.getPopoverElement()
    if (!targetRef || !contentRef) return

    if (this.isShow) {
      this.handleShowContent()
    } else {
      this.handleHideContent()
    }
  }

  ngOnDestroy() {
    if (this.cleanAutoUpdateFunction) {
      this.cleanAutoUpdateFunction();
    }
  }
}
