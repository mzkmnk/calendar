import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MzkmnkCalendarComponent } from './mzkmnk-calendar.component';

describe('MzkmnkCalendarComponent', () => {
  let component: MzkmnkCalendarComponent;
  let fixture: ComponentFixture<MzkmnkCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MzkmnkCalendarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MzkmnkCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
