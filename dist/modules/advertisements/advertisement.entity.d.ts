import { BaseEntity } from '../../common/database/base.entity';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
export declare class Advertisement extends BaseEntity {
    title: string;
    salaryMin: number;
    salaryMax: number;
    lat: number;
    lng: number;
    city: string;
    description: string;
    benefits: string[];
    skills: string[];
    creator: User;
    category: Category;
}
