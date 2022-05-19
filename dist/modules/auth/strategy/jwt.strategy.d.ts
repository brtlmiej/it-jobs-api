import { UsersRepository } from '../../users/users.repository';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    validate(payload: any): Promise<import("../../users/user.entity").User>;
}
export {};
