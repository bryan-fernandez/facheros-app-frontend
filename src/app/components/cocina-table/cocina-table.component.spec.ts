import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocinaTableComponent } from './cocina-table.component';

describe('CocinaTableComponent', () => {
  let component: CocinaTableComponent;
  let fixture: ComponentFixture<CocinaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocinaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocinaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
