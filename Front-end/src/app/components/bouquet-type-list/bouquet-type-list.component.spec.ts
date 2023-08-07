import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouquetTypeListComponent } from './bouquet-type-list.component';

describe('BouquetTypeListComponent', () => {
  let component: BouquetTypeListComponent;
  let fixture: ComponentFixture<BouquetTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BouquetTypeListComponent]
    });
    fixture = TestBed.createComponent(BouquetTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
