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
exports.Advertisement = void 0;
const base_entity_1 = require("../../common/database/base.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const category_entity_1 = require("../categories/category.entity");
const class_transformer_1 = require("class-transformer");
let Advertisement = class Advertisement extends base_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.benefits = [];
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Expose)({ groups: ['base'] }),
    __metadata("design:type", String)
], Advertisement.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Advertisement.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1200 }),
    (0, class_transformer_1.Expose)({ groups: ['base'] }),
    __metadata("design:type", String)
], Advertisement.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'blob' }),
    __metadata("design:type", Array)
], Advertisement.prototype, "benefits", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (obj) => obj.advertisements),
    (0, class_transformer_1.Expose)({ groups: ['creator'] }),
    __metadata("design:type", user_entity_1.User)
], Advertisement.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category),
    (0, class_transformer_1.Expose)({ groups: ['category'] }),
    __metadata("design:type", category_entity_1.Category)
], Advertisement.prototype, "category", void 0);
Advertisement = __decorate([
    (0, typeorm_1.Entity)()
], Advertisement);
exports.Advertisement = Advertisement;
//# sourceMappingURL=advertisement.entity.js.map