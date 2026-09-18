import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HealthcareService } from '../models/healthcare-service.model';
import { Specialty } from '../models/specialty.model';
import { CareService } from '../services/care.service';

@Component({
    selector: 'app-specialties',
    templateUrl: './specialties.html',
    styleUrl: './specialties.scss',
    imports: [CommonModule],
    standalone: true,
})
export class Specialties implements OnInit {
    private readonly careService = inject(CareService);
    private readonly changeDetector = inject(ChangeDetectorRef);

    specialtiesKicker = '';
    specialtiesTitle = '';
    specialtiesDescription = '';
    servicesKicker = '';
    servicesTitle = '';
    specialties: Specialty[] = [];
    services: HealthcareService[] = [];
    selectedSpecialty = '';
    selectedService = '';
    @ViewChild('specialtyTrack') private specialtyTrack?: ElementRef<HTMLElement>;
    canScrollPrevious = false;
    canScrollNext = false;

    ngOnInit(): void {
        this.careService.getCareData().subscribe((careData) => {
            this.specialtiesKicker = careData.specialtiesKicker;
            this.specialtiesTitle = careData.specialtiesTitle;
            this.specialtiesDescription = careData.specialtiesDescription;
            this.servicesKicker = careData.servicesKicker;
            this.servicesTitle = careData.servicesTitle;
            this.specialties = careData.specialties;
            this.services = careData.services;
            this.changeDetector.markForCheck();
            setTimeout(() => this.updateScrollState());
        });
    }

    bookConsultation(specialty: Specialty): void {
        this.selectedSpecialty = specialty.name;
    }

    startService(service: HealthcareService): void {
        this.selectedService = service.name;
    }

    scrollSpecialties(direction: 'next' | 'previous'): void {
        const track = this.specialtyTrack?.nativeElement;
        if (!track) {
            return;
        }

        track.scrollBy({
            behavior: 'smooth',
            left: direction === 'next' ? track.clientWidth : -track.clientWidth,
        });
    }

    updateScrollState(): void {
        const track = this.specialtyTrack?.nativeElement;
        if (!track) {
            return;
        }

        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        this.canScrollPrevious = track.scrollLeft > 1;
        this.canScrollNext = track.scrollLeft < maxScrollLeft - 1;
        this.changeDetector.markForCheck();
    }
}
