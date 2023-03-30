import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocinaDeliveryComponent } from './cocina-delivery.component';

describe('CocinaDeliveryComponent', () => {
  let component: CocinaDeliveryComponent;
  let fixture: ComponentFixture<CocinaDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocinaDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocinaDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
