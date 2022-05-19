import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { AdvertisementsRepository } from './advertisements.repository';
import { Advertisement } from './advertisement.entity';
import { User } from '../users/user.entity';
import { EntityManager } from 'typeorm';
import { CategoriesRepository } from '../categories/categories.repository';
export declare class AdvertisementsService {
    private readonly advertisementsRepository;
    private readonly categoriesRepository;
    constructor(advertisementsRepository: AdvertisementsRepository, categoriesRepository: CategoriesRepository);
    create(em: EntityManager, data: CreateAdvertisementDto, user: User): Promise<Advertisement>;
    update(em: EntityManager, advertisement: Advertisement, data: UpdateAdvertisementDto, user: User): Promise<Advertisement>;
    remove(em: EntityManager, advertisement: Advertisement): Promise<void>;
}
