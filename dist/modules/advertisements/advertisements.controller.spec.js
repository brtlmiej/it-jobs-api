"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const advertisements_controller_1 = require("./advertisements.controller");
const advertisements_service_1 = require("./advertisements.service");
describe('AdvertisementsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [advertisements_controller_1.AdvertisementsController],
            providers: [advertisements_service_1.AdvertisementsService],
        }).compile();
        controller = module.get(advertisements_controller_1.AdvertisementsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=advertisements.controller.spec.js.map