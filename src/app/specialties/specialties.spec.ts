import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Specialties } from './specialties';
import { CareService } from '../services/care.service';

describe('Specialties', () => {
    let component: Specialties;
    let fixture: ComponentFixture<Specialties>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Specialties],
            providers: [
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
                                specialties: [
                                    {
                                        name: 'Dermatology',
                                        description: 'Skin and hair treatments',
                                        focus: 'Acne and dandruff',
                                        icon: '🧴',
                                        doctors: 18,
                                    },
                                ],
                                services: [
                                    {
                                        name: 'Video Consultation',
                                        description: 'Talk to a doctor from home',
                                        icon: '💻',
                                        action: 'Start consultation',
                                    },
                                ],
                            }),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Specialties);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load specialties and services from the care service', () => {
        expect(component.specialties.length).toBe(1);
        expect(component.services.length).toBe(1);
        expect(fixture.nativeElement.textContent).toContain('Dermatology');
        expect(fixture.nativeElement.textContent).toContain('Video Consultation');
    });

    it('should record a consultation selection', () => {
        component.bookConsultation(component.specialties[0]);

        expect(component.selectedSpecialty).toBe('Dermatology');
    });

    it('should keep all specialties available in the swipe track', () => {
        component.specialties = Array.from({ length: 5 }, (_, index) => ({
            ...component.specialties[0],
            name: `Specialty ${index + 1}`,
        }));

        fixture.detectChanges();

        expect(component.specialties.length).toBe(5);
        expect(fixture.nativeElement.querySelector('.specialty-grid')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.swipe-hint')).toBeTruthy();
    });
});
