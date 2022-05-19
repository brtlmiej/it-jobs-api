"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisementsModule = void 0;
const common_1 = require("@nestjs/common");
const advertisements_service_1 = require("./advertisements.service");
const advertisements_controller_1 = require("./advertisements.controller");
const typeorm_1 = require("@nestjs/typeorm");
const advertisements_repository_1 = require("./advertisements.repository");
const categories_repository_1 = require("../categories/categories.repository");
const auth_module_1 = require("../auth/auth.module");
let AdvertisementsModule = class AdvertisementsModule {
};
AdvertisementsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                advertisements_repository_1.AdvertisementsRepository,
                categories_repository_1.CategoriesRepository,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [advertisements_controller_1.AdvertisementsController],
        providers: [advertisements_service_1.AdvertisementsService]
    })
], AdvertisementsModule);
exports.AdvertisementsModule = AdvertisementsModule;
//# sourceMappingURL=advertisements.module.js.map