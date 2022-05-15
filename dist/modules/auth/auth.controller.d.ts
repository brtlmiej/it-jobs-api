import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtLoginDto } from './dto/jwt-login.dto';
import { User } from '../users/user.entity';
export declare class AuthController {
    protected readonly authService: AuthService;
    constructor(authService: AuthService);
    login(body: JwtLoginDto): Promise<{
        user: User;
        access_token: string;
    }>;
    registerJobSeeker(body: RegisterDto): Promise<{
        user: User;
        access_token: string;
    }>;
    registerAdvertiser(body: RegisterDto): Promise<{
        user: User;
        access_token: string;
    }>;
}
