import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllComponent } from './page-all.component';

describe('PageAllComponent', () => {
  let component: PageAllComponent;
  let fixture: ComponentFixture<PageAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
