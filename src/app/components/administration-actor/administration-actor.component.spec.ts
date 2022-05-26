import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationActorComponent } from './administration-actor.component';

describe('AdministrationActorComponent', () => {
  let component: AdministrationActorComponent;
  let fixture: ComponentFixture<AdministrationActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
