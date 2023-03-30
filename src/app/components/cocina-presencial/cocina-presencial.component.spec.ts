import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocinaPresencialComponent } from './cocina-presencial.component';

describe('CocinaPresencialComponent', () => {
  let component: CocinaPresencialComponent;
  let fixture: ComponentFixture<CocinaPresencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocinaPresencialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocinaPresencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
