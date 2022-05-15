"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository extends typeorm_1.Repository {
    async findAll(take = 10, skip = 0, options = {}) {
        options.take = take;
        options.skip = skip;
        const [result, total] = await this.findAndCount(options);
        return {
            data: result,
            page: skip + 1,
            count: take,
            total: total,
            totalPages: Math.ceil(total / take)
        };
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base-repository.js.map