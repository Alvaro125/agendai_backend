import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LinkDto } from './application/dto/link.dto';
import { JwtGuard } from 'src/infra/guards/jwt-auth.guard';
import { LinkService } from './application/services/link.service';
@Controller('/api/v0/link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  create(@Body() body: LinkDto, @Req() request: Request) {
    const link = LinkDto.toDomain(body);
    link.setEmpresa(request['user']['client'] as number);
    return this.linkService.create(link);
  }

  @Get('list')
  @UseGuards(JwtGuard)
  list(@Req() request: Request) {
    console.log('request', request['user']);
    return this.linkService.findByEmpresa(request['user']['client'] as number);
  }
}
