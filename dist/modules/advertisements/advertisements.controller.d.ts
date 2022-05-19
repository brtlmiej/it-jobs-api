import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { AdvertisementsRepository } from './advertisements.repository';
import { ListDto } from '../../common/dto/list.dto';
import { User } from '../users/user.entity';
export declare class AdvertisementsController {
    private readonly advertisementsService;
    private readonly advertisementsRepository;
    constructor(advertisementsService: AdvertisementsService, advertisementsRepository: AdvertisementsRepository);
    findAll(query: ListDto): Promise<import("../../common/database/paginator").Paginator<import("./advertisement.entity").Advertisement>>;
    findOne(id: string): Promise<import("./advertisement.entity").Advertisement>;
    create(data: CreateAdvertisementDto, user: User): Promise<any>;
    update(id: string, data: UpdateAdvertisementDto, user: User): Promise<import("./advertisement.entity").Advertisement>;
    remove(id: string, user: User): Promise<void>;
}
