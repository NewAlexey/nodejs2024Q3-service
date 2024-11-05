import { Module } from '@nestjs/common';

import { AppRepository } from 'src/db/app-repository.service';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AppRepository, UserService],
})
export class UserModule {}
