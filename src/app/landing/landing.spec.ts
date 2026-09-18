import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Landing } from './landing';
import { CareService } from '../services/care.service';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [
        provideRouter([]),
        {
          provide: CareService,
          useValue: {
            getCareData: () =>
              of({
                specialtiesKicker: 'Expert care, made simple',
                specialtiesTitle: 'Top Specialties',
                specialtiesDescription: 'Connect with trusted doctors.',
                servicesKicker: 'More ways to care',
                servicesTitle: 'Healthcare Services',
                specialties: [],
                services: [],
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the landing page content', () => {
    expect(fixture.nativeElement.querySelector('app-specialties')).toBeTruthy();
  });
});
