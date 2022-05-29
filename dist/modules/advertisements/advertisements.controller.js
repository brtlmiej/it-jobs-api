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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisementsController = void 0;
const common_1 = require("@nestjs/common");
const advertisements_service_1 = require("./advertisements.service");
const create_advertisement_dto_1 = require("./dto/create-advertisement.dto");
const update_advertisement_dto_1 = require("./dto/update-advertisement.dto");
const advertisements_repository_1 = require("./advertisements.repository");
const list_dto_1 = require("../../common/dto/list.dto");
const current_user_decorator_1 = require("../auth/decorator/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const class_validator_1 = require("class-validator");
let AdvertisementsController = class AdvertisementsController {
    constructor(advertisementsService, advertisementsRepository) {
        this.advertisementsService = advertisementsService;
        this.advertisementsRepository = advertisementsRepository;
    }
    async findAll(query) {
        const data = await this.advertisementsRepository.findAll(query.records, query.page, query.sortBy, query.sortDirection, {
            where: {
                deletedAt: null,
            },
        });
        for (const a of data.data) {
            a.benefits = (0, class_validator_1.isString)(a.benefits) ? a.benefits.split(',') : a.benefits;
        }
        return data;
    }
    async findOne(id) {
        const a = await this.advertisementsRepository.findOne({
            where: {
                id: id,
                deletedAt: null,
            },
        });
        if (!a) {
            throw new common_1.NotFoundException();
        }
        a.benefits = (0, class_validator_1.isString)(a.benefits) ? a.benefits.split(',') : a.benefits;
        return a;
    }
    async create(data, user) {
        let advertisement;
        await (0, typeorm_1.getConnection)().transaction(async (em) => {
            advertisement = await this.advertisementsService.create(em, data, user);
        });
        return advertisement;
    }
    async update(id, data, user) {
        const advertisement = await this.advertisementsRepository.findOneOrFail({
            where: {
                id: id,
                deletedAt: null,
                creator: {
                    id: user.id,
                },
            },
        });
        await (0, typeorm_1.getConnection)().transaction(async (em) => {
            await this.advertisementsService.update(em, advertisement, data, user);
        });
        return advertisement;
    }
    async remove(id, user) {
        const advertisement = await this.advertisementsRepository.findOneOrFail({
            where: {
                id: id,
                deletedAt: null,
                creator: {
                    id: user.id,
                },
            },
        });
        await (0, typeorm_1.getConnection)().transaction(async (em) => {
            await this.advertisementsService.remove(em, advertisement);
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.SerializeOptions)({ groups: ['base', 'creator'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_dto_1.ListDto]),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.SerializeOptions)({ groups: ['base', 'creator'] }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_advertisement_dto_1.CreateAdvertisementDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_advertisement_dto_1.UpdateAdvertisementDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AdvertisementsController.prototype, "remove", null);
AdvertisementsController = __decorate([
    (0, common_1.Controller)('api/advertisements'),
    __metadata("design:paramtypes", [advertisements_service_1.AdvertisementsService,
        advertisements_repository_1.AdvertisementsRepository])
], AdvertisementsController);
exports.AdvertisementsController = AdvertisementsController;
//# sourceMappingURL=advertisements.controller.js.map