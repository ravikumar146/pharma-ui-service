import { HealthcareService } from './healthcare-service.model';
import { Specialty } from './specialty.model';

export interface CareDataResponse {
    specialtiesKicker: string;
    specialtiesTitle: string;
    specialtiesDescription: string;
    servicesKicker: string;
    servicesTitle: string;
    specialties: Specialty[];
    services: HealthcareService[];
}
