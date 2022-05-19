import { CategoriesRepository } from './categories.repository';
export declare class CategoriesController {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    findAll(): Promise<import("./category.entity").Category[]>;
}
