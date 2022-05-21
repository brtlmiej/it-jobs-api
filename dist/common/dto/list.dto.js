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
exports.ListDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ListDto {
    constructor() {
        this.records = 10;
        this.page = 1;
        this.sortBy = 'id';
        this.sortDirection = 'DESC';
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of records' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], ListDto.prototype, "records", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Page number' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], ListDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sort field' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Sort direction. Available values: ASC, DESC' }),
    (0, class_validator_1.IsIn)(['ASC', 'DESC']),
    __metadata("design:type", String)
], ListDto.prototype, "sortDirection", void 0);
exports.ListDto = ListDto;
//# sourceMappingURL=list.dto.js.map