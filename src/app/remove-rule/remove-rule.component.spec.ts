import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRuleComponent } from './remove-rule.component';

describe('RemoveRuleComponent', () => {
  let component: RemoveRuleComponent;
  let fixture: ComponentFixture<RemoveRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveRuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
