import { UsersRepository } from '../users/users.repository';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserTypeEnum } from '../users/enum/user-type.enum';
export declare class AuthService {
    protected readonly usersRepository: UsersRepository;
    protected readonly jwtService: JwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    validateUser(email: string, plainPassword: string): Promise<User>;
    loginJwt(user: any): Promise<{
        access_token: string;
    }>;
    register(email: string, password: string, firstName: string, lastName: string, type: UserTypeEnum): Promise<User>;
}
