import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilloutComponent } from './billout.component';

describe('BilloutComponent', () => {
  let component: BilloutComponent;
  let fixture: ComponentFixture<BilloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilloutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
