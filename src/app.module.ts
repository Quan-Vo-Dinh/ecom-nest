import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ZodSerializerInterceptor } from 'nestjs-zod'

import { HttpExceptionFilter } from 'src/shared/filter/http-exception.filter'
import CustomZodValidationPipe from 'src/shared/pipes/custom-zod-validation.pipe'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    {
      provide: APP_FILTER, // show lỗi khi nó serialize bị lỗi
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
