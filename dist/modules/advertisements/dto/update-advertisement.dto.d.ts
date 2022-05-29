import { CreateAdvertisementDto } from './create-advertisement.dto';
declare const UpdateAdvertisementDto_base: import("@nestjs/common").Type<Partial<CreateAdvertisementDto>>;
export declare class UpdateAdvertisementDto extends UpdateAdvertisementDto_base {
    title: string;
    description: string;
    salaryMin: number;
    salaryMax: number;
    lat: number;
    lng: number;
    city: string;
    benefits: string[];
    skills: string[];
    categoryId: number;
}
export {};
