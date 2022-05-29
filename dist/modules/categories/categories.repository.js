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
exports.CategoriesRepository = void 0;
const base_repository_1 = require("../../common/database/base-repository");
const category_entity_1 = require("./category.entity");
const typeorm_1 = require("typeorm");
let CategoriesRepository = class CategoriesRepository extends base_repository_1.BaseRepository {
    constructor() {
        super();
    }
    async seeder() {
        const categories = [
            { name: 'Frontend' },
            { name: 'Backend' },
            { name: 'Mobile' },
            { name: 'Admin' },
            { name: 'Project manager' },
        ];
        const objects = [];
        await (0, typeorm_1.getConnection)().transaction(async (em) => {
            for (const category of categories) {
                let obj = await this.findOne({ name: category.name });
                if (obj) {
                    continue;
                }
                obj = new category_entity_1.Category();
                obj.name = category.name;
                await em.save(obj);
                objects.push(obj);
            }
        });
        return objects;
    }
};
CategoriesRepository = __decorate([
    (0, typeorm_1.EntityRepository)(category_entity_1.Category),
    __metadata("design:paramtypes", [])
], CategoriesRepository);
exports.CategoriesRepository = CategoriesRepository;
//# sourceMappingURL=categories.repository.js.map