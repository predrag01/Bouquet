import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStoresComponent } from './my-stores.component';

describe('MyStoresComponent', () => {
  let component: MyStoresComponent;
  let fixture: ComponentFixture<MyStoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyStoresComponent]
    });
    fixture = TestBed.createComponent(MyStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
