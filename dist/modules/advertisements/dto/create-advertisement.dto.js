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
exports.CreateAdvertisementDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAdvertisementDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 5, maxLength: 100 }),
    (0, class_validator_1.Length)(5, 100),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 20, maxLength: 1000 }),
    (0, class_validator_1.Length)(20, 1000),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0, maximum: 1000000 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000000),
    __metadata("design:type", Number)
], CreateAdvertisementDto.prototype, "salaryMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0, maximum: 1000000 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000000),
    __metadata("design:type", Number)
], CreateAdvertisementDto.prototype, "salaryMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: -90, maximum: 90 }),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], CreateAdvertisementDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: -180, maximum: 180 }),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], CreateAdvertisementDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minLength: 2, maxLength: 100 }),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], CreateAdvertisementDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.Length)(1, 50, { each: true }),
    __metadata("design:type", Array)
], CreateAdvertisementDto.prototype, "benefits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.Length)(1, 50, { each: true }),
    __metadata("design:type", Array)
], CreateAdvertisementDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAdvertisementDto.prototype, "categoryId", void 0);
exports.CreateAdvertisementDto = CreateAdvertisementDto;
//# sourceMappingURL=create-advertisement.dto.js.map