import { BaseEntity } from '../../common/database/base.entity';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
export declare class Advertisement extends BaseEntity {
    title: string;
    salary: number;
    description: string;
    benefits: string[];
    creator: User;
    category: Category;
}
