import { Module } from '@nestjs/common';

import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';
import { AppRepositoryModule } from 'src/db/app.repository.module';

@Module({
  imports: [AppRepositoryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
