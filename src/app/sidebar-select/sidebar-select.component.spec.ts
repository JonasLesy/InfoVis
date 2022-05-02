import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSelectComponent } from './sidebar-select.component';

describe('SidebarSelectComponent', () => {
  let component: SidebarSelectComponent;
  let fixture: ComponentFixture<SidebarSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
