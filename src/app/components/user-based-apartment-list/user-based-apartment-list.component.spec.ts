import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasedApartmentListComponent } from './user-based-apartment-list.component';

describe('UserBasedApartmentListComponent', () => {
  let component: UserBasedApartmentListComponent;
  let fixture: ComponentFixture<UserBasedApartmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBasedApartmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBasedApartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
