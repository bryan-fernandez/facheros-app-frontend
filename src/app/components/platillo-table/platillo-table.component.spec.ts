import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatilloTableComponent } from './platillo-table.component';

describe('PlatilloTableComponent', () => {
  let component: PlatilloTableComponent;
  let fixture: ComponentFixture<PlatilloTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatilloTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatilloTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
