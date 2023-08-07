import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBouquetTypeComponent } from './add-bouquet-type.component';

describe('AddBouquetTypeComponent', () => {
  let component: AddBouquetTypeComponent;
  let fixture: ComponentFixture<AddBouquetTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBouquetTypeComponent]
    });
    fixture = TestBed.createComponent(AddBouquetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
