import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInfoComponent } from './menu-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('MenuInfoComponent', () => {
  let component: MenuInfoComponent;
  let fixture: ComponentFixture<MenuInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuInfoComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
