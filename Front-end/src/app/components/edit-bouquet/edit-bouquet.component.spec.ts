import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBouquetComponent } from './edit-bouquet.component';

describe('EditBouquetComponent', () => {
  let component: EditBouquetComponent;
  let fixture: ComponentFixture<EditBouquetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBouquetComponent]
    });
    fixture = TestBed.createComponent(EditBouquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
