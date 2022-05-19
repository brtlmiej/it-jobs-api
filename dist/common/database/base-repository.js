"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository extends typeorm_1.Repository {
    async findAll(records = 10, page = 0, orderBy, orderDirection, options = {}) {
        options.take = records;
        options.skip = page - 1;
        const [result, total] = await this.findAndCount(options);
        return {
            data: result,
            page: page,
            records: records,
            total: total,
            totalPages: Math.ceil(total / records)
        };
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base-repository.js.map