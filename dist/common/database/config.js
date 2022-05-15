"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
function databaseConfig() {
    return {
        type: 'sqlite',
        database: 'db.sqlite3',
        synchronize: true,
        entities: ['dist/**/*.entity{.ts,.js}']
    };
}
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=config.js.map