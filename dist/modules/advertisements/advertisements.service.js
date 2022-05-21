"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisementsService = void 0;
const common_1 = require("@nestjs/common");
const advertisements_repository_1 = require("./advertisements.repository");
const advertisement_entity_1 = require("./advertisement.entity");
const categories_repository_1 = require("../categories/categories.repository");
let AdvertisementsService = class AdvertisementsService {
    constructor(advertisementsRepository, categoriesRepository) {
        this.advertisementsRepository = advertisementsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async create(em, data, user) {
        const advertisement = new advertisement_entity_1.Advertisement();
        return await this.update(em, advertisement, data, user);
    }
    async update(em, advertisement, data, user) {
        const category = await this.categoriesRepository
            .findOne(data.categoryId);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        advertisement.title = data.title;
        advertisement.description = data.description;
        advertisement.creator = user;
        advertisement.category = category;
        advertisement.salary = data.salary;
        advertisement.benefits = data.benefits;
        return await em.save(advertisement);
    }
    async remove(em, advertisement) {
        advertisement.deletedAt = new Date();
        await em.save(advertisement);
    }
};
AdvertisementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [advertisements_repository_1.AdvertisementsRepository,
        categories_repository_1.CategoriesRepository])
], AdvertisementsService);
exports.AdvertisementsService = AdvertisementsService;
//# sourceMappingURL=advertisements.service.js.map