import { UserTypeEnum } from './enum/user-type.enum';
import { BaseEntity } from '../../common/database/base.entity';
import { Advertisement } from '../advertisements/advertisement.entity';
export declare class User extends BaseEntity {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    status: number;
    type: UserTypeEnum;
    advertisements: Advertisement[];
}
