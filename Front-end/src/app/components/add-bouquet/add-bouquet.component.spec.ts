import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBouquetComponent } from './add-bouquet.component';

describe('AddBouquetComponent', () => {
  let component: AddBouquetComponent;
  let fixture: ComponentFixture<AddBouquetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBouquetComponent]
    });
    fixture = TestBed.createComponent(AddBouquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
