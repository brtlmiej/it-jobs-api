import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Advertisement } from '../advertisements/advertisement.entity';
import { User } from '../users/user.entity';
import { ApplyOnAdvertisementDto } from '../advertisements/dto/apply-on-advertisement.dto';
import { Application } from './application.entity';

@Injectable()
export class ApplicationsService {
  async create (em: EntityManager, advertisement: Advertisement, user: User, data: ApplyOnAdvertisementDto) {
    const application = new Application();
    application.advertisement = advertisement;
    application.jobSeeker = user;
    application.contactEmail = data.contactEmail;
    application.expectedSalary = data.expectedSalary;
    application.experience = data.experience;
    application.firstName = data.firstName;
    application.lastName = data.lastName;
    application.lastCompanyName = data.lastCompanyName;
    application.personDescription = data.personDescription;
    application.phone = data.phone;
    return await em.save(application);
  }
}