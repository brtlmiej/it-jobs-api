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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../users/users.repository");
const bcrypt = require("bcrypt");
const user_status_enum_1 = require("../users/enum/user-status.enum");
const user_entity_1 = require("../users/user.entity");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, plainPassword) {
        const user = await this.usersRepository.findOne({ email: email });
        if (user &&
            (await bcrypt.compare(plainPassword, user.password)) &&
            user.status == user_status_enum_1.UserStatus.ACTIVE) {
            return user;
        }
        return null;
    }
    async loginJwt(user) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }
    async register(email, password, firstName, lastName, type) {
        let user = await this.usersRepository.findOne({
            email: email,
            type: type,
        });
        if (user) {
            throw new common_1.BadRequestException('User with given e-mail already exist');
        }
        user = new user_entity_1.User();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.status = user_status_enum_1.UserStatus.ACTIVE;
        user.password = bcrypt.hashSync(password, 12);
        user.type = type;
        return await this.usersRepository.save(user);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map