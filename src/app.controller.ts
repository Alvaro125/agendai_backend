import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/chats-upsert')
  chatsupsert(@Body() body: any): any {
    this.logger.log(body);
    return body;
  }
  @Post('/messages-upsert')
  hook(@Body() body: any): any {
    this.logger.log(body);
    return body;
  }
}
