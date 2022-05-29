"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const advertisements_service_1 = require("./advertisements.service");
describe('AdvertisementsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [advertisements_service_1.AdvertisementsService],
        }).compile();
        service = module.get(advertisements_service_1.AdvertisementsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=advertisements.service.spec.js.map